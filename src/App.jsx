import React, { useState, useEffect, useCallback, useRef } from 'react';
import useDataStore from './hooks/useDataStore.js';
import AccountPage from './components/AccountPage.jsx';
import ActivityForm, { ProFeatureNotice } from './components/ActivityForm.jsx';
import ActivitySelector from './components/ActivitySelector.jsx';
import AdminSubmissionsPage from './components/AdminSubmissionsPage.jsx';
import AuthModal from './components/AuthModal.jsx';
import ContactPage from './components/ContactPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import GalleryView from './components/GalleryView.jsx';
import GrassIdentifierView from './components/GrassIdentifierView.jsx';
import HistoryView from './components/HistoryView.jsx';
import LawnProfile from './components/LawnProfile.jsx';
import MyGarage from './components/MyGarage.jsx';
import PricingView from './components/PricingView.jsx';
import ProSignupView from './components/ProSignupView.jsx';
import ProductGuide from './components/ProductGuide.jsx';
import ResearchSourcesPage from './components/ResearchSourcesPage.jsx';
import SchedulesView from './components/SchedulesView.jsx';
import ToolsView from './components/ToolsView.jsx';
import TreatmentCalculator from './components/TreatmentCalculator.jsx';
import WeatherSnapshot, { TodayAdvisoryCard, SeasonBanner, getTaskWeatherStatus } from './components/WeatherSnapshot.jsx';
import WelcomeSplashCard from './components/WelcomeSplashCard.jsx';
import YearlyGameplan from './components/YearlyGameplan.jsx';
import { GRASS_INFO, GRASS_KEY_MAP, MONTH_NAMES, ZONE_INFO, ACTIVITY_COLORS, ACTIVITY_TYPES, SOIL_TYPES } from './constants.js';
import { grassPrograms } from './grass-programs.js';

const ADMIN_EMAIL = 'yardsticklawncareapp@gmail.com';
const PRO_GATE_ENABLED = false;

const WMO_CODES = {
    0: { label: 'Clear Sky', icon: '\u2600\ufe0f' }, 1: { label: 'Mainly Clear', icon: '\ud83c\udf24\ufe0f' },
    2: { label: 'Partly Cloudy', icon: '\u26c5' }, 3: { label: 'Overcast', icon: '\u2601\ufe0f' },
    45: { label: 'Foggy', icon: '\ud83c\udf2b\ufe0f' }, 48: { label: 'Icy Fog', icon: '\ud83c\udf2b\ufe0f' },
    51: { label: 'Light Drizzle', icon: '\ud83c\udf26\ufe0f' }, 53: { label: 'Drizzle', icon: '\ud83c\udf26\ufe0f' },
    55: { label: 'Heavy Drizzle', icon: '\ud83c\udf27\ufe0f' }, 61: { label: 'Light Rain', icon: '\ud83c\udf27\ufe0f' },
    63: { label: 'Rain', icon: '\ud83c\udf27\ufe0f' }, 65: { label: 'Heavy Rain', icon: '\ud83c\udf27\ufe0f' },
    71: { label: 'Light Snow', icon: '\ud83c\udf28\ufe0f' }, 73: { label: 'Snow', icon: '\u2744\ufe0f' },
    75: { label: 'Heavy Snow', icon: '\u2744\ufe0f' }, 80: { label: 'Light Showers', icon: '\ud83c\udf26\ufe0f' },
    81: { label: 'Showers', icon: '\ud83c\udf27\ufe0f' }, 82: { label: 'Heavy Showers', icon: '\u26c8\ufe0f' },
    95: { label: 'Thunderstorm', icon: '\u26c8\ufe0f' }, 99: { label: 'Thunderstorm w/ Hail', icon: '\u26c8\ufe0f' }
};

const getWindDirection = (deg) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW'];
    return dirs[Math.round(deg / 45) % 8];
};

const getParentZone = (zone) => zone ? zone.replace(/[ab]$/i, '') : zone;

const VALID_VIEWS = ['add', 'history', 'gallery', 'garage', 'profile', 'gameplan',
    'schedules', 'dashboard', 'products', 'sources', 'account', 'contact',
    'tools', 'grass-id', 'calculator', 'admin', 'pricing', 'proSignup'];

function getViewFromHash() {
    const hash = window.location.hash.replace(/^#\//, '');
    return VALID_VIEWS.includes(hash) ? hash : null;
}

function LawnCareTracker() {
    const [activities, setActivities] = useState([]);
    const [view, setViewState] = useState(() => getViewFromHash());
    const setView = React.useCallback((newView) => {
        window.history.pushState({ view: newView }, '', newView ? `#/${newView}` : '#/');
        setViewState(newView);
    }, []);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedActivityType, setSelectedActivityType] = useState(null);
    const [weather, setWeather] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const weatherFetchKeyRef = React.useRef(null);
    const [syncError, setSyncError] = useState(null);
    const [equipment, setEquipment] = useState([]);
    const [schedules, setSchedules] = useState(() => JSON.parse(localStorage.getItem('lawnCareSchedules') || '[]'));
    const [lawnProfile, setLawnProfile] = useState(null);
    const [statsView, setStatsView] = useState('year');
    const [profileFormData, setProfileFormData] = useState(() => {
        const s = localStorage.getItem('lawnProfile');
        return s ? JSON.parse(s) : { lawnSize: '', zone: '', specificGrass: '', soilType: '', sunExposure: '', zipCode: '' };
    });
    const [profileEditing, setProfileEditing] = useState(() => {
        const s = localStorage.getItem('lawnProfile');
        if (!s) return true;
        const p = JSON.parse(s);
        return !p.specificGrass || !p.zone;
    });
    const [zipLookupLoading, setZipLookupLoading] = useState(false);
    const [zipLookupError, setZipLookupError] = useState('');

    // \u2500\u2500 Onboarding \u2014 shown to logged-out users who haven't completed setup \u2500\u2500
    // Also treat as done if the profile already has zone + grass (returning users pre-flag)
    const [onboardingDone, setOnboardingDone] = useState(() => {
        if (localStorage.getItem('yardstick_onboarding_done') === '1') return true;
        try {
            const p = JSON.parse(localStorage.getItem('lawnProfile') || 'null');
            return !!(p && p.zone && p.specificGrass);
        } catch(e) { return false; }
    });
    const [splashJustDone, setSplashJustDone] = useState(false);
    const [saveBannerDismissed, setSaveBannerDismissed] = useState(() => localStorage.getItem('yardstick_save_banner_dismissed') === '1');

    // \u2500\u2500 Auth state \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const [currentUser, setCurrentUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [userName, setUserName] = useState(() => localStorage.getItem('yardstick_display_name') || '');
    const handleUserNameChange = (name) => {
        const trimmed = name.trim();
        setUserName(trimmed);
        if (trimmed) localStorage.setItem('yardstick_display_name', trimmed);
        else localStorage.removeItem('yardstick_display_name');
    };
    const fb = window.__FIREBASE__ || {};

    // \u2500\u2500 Data store (wraps localStorage \u2194 Firestore) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const store = useDataStore(currentUser);

    // \u2500\u2500 Listen for Firebase auth state \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    useEffect(() => {
        const setupAuth = () => {
            const firebase = window.__FIREBASE__ || {};
            if (!firebase.configured) {
                setAuthReady(true);
                return () => {};
            }
            const unsub = firebase.onAuthStateChanged(firebase.auth, (user) => {
                setCurrentUser(user);
                setAuthReady(true);
            });
            return unsub;
        };

        if (window.__FIREBASE__ !== undefined) {
            return setupAuth();
        }

        let cleanupAuth = () => {};
        const onFirebaseReady = () => {
            cleanupAuth = setupAuth() || (() => {});
        };
        window.addEventListener('firebase-ready', onFirebaseReady, { once: true });
        return () => {
            window.removeEventListener('firebase-ready', onFirebaseReady);
            cleanupAuth();
        };
    }, []);

    // \u2500\u2500 Sync view state with browser back/forward navigation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    useEffect(() => {
        if (!window.location.hash || window.location.hash === '#/') {
            window.history.replaceState({ view: null }, '', '#/');
        }
        const handlePop = () => setViewState(getViewFromHash());
        window.addEventListener('popstate', handlePop);
        return () => window.removeEventListener('popstate', handlePop);
    }, []);

    // \u2500\u2500 GA4: fire page_view on every SPA view change \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    useEffect(() => {
        window.trackEvent('page_view', { page_name: view || 'home' });
    }, [view]);

    // \u2500\u2500 Load data whenever auth state settles or user changes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    useEffect(() => {
        if (!authReady) return;
        setDataLoading(true);
        store.loadAll().then(({ activities: acts, equipment: eq, profile: prof }) => {
            setSyncError(null);
            setActivities(acts || []);
            setEquipment(eq || []);
            if (prof) {
                setLawnProfile(prof);
                setProfileFormData(prof);
                setProfileEditing(!prof.specificGrass || !prof.zone);
                fetchWeatherData(prof.lat, prof.lon, prof.zipCode);
            } else {
                fetchWeatherData();
            }
            setDataLoading(false);
        }).catch((e) => {
            console.error('Failed to load data:', e);
            setSyncError('Could not load your cloud data \u2014 showing last saved data. Check your connection.');
            setDataLoading(false);
        });
    }, [authReady, currentUser]);

    const handleSignOut = async () => {
        window.trackEvent('sign_out', {});
        if (fb.configured) await fb.signOut(fb.auth);
        setCurrentUser(null);
    };

    const fetchWeatherData = async (lat, lon, label, city, state) => {
        if (!lat || !lon) {
            const stored = localStorage.getItem('lawnProfile');
            if (stored) {
                const p = JSON.parse(stored);
                lat = p.lat; lon = p.lon; label = label || p.zipCode || '';
                city = city || p.city || '';
                state = state || p.state || '';
            }
        }
        if (!lat || !lon) { setWeatherLoading(false); return; }
        const fetchKey = `${lat},${lon}`;
        if (weatherFetchKeyRef.current === fetchKey) return;
        weatherFetchKeyRef.current = fetchKey;
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,winddirection_10m` +
                `&hourly=soil_temperature_6cm` +
                `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,et0_fao_evapotranspiration` +
                `&temperature_unit=fahrenheit&precipitation_unit=inch&windspeed_unit=mph&timezone=auto&past_days=7&forecast_days=14`
            );
            const data = await response.json();
            const airTemp = data.current.temperature_2m;
            const hourlyTimes = (data.hourly && data.hourly.time) || [];
            const hourlySoilF = (data.hourly && data.hourly.soil_temperature_6cm) || [];
            const nowDate = new Date();
            const nowHourStr = nowDate.getFullYear() + '-' +
                String(nowDate.getMonth() + 1).padStart(2, '0') + '-' +
                String(nowDate.getDate()).padStart(2, '0') + 'T' +
                String(nowDate.getHours()).padStart(2, '0') + ':00';
            const currHourIdx = hourlyTimes.indexOf(nowHourStr);
            const soilTempLive = (currHourIdx >= 0 && hourlySoilF[currHourIdx] != null)
                ? Math.round(hourlySoilF[currHourIdx])
                : null;
            const soilTemp = soilTempLive !== null ? soilTempLive : Math.round(airTemp - 7);
            const dailyHighs = data.daily.temperature_2m_max || [];
            const dailyLows = data.daily.temperature_2m_min || [];
            const dailyPrecip = data.daily.precipitation_sum || [];
            const dailyPrecipP = data.daily.precipitation_probability_max || [];
            const dailyET0 = data.daily.et0_fao_evapotranspiration || [];
            const dailyDates = data.daily.time || [];
            let weeklyRainfall = 0;
            for (let i = 0; i <= 6 && i < dailyPrecip.length; i++) weeklyRainfall += (dailyPrecip[i] || 0);
            weeklyRainfall = Math.round(weeklyRainfall * 10) / 10;
            const rainNext24h = Math.round((dailyPrecip[7] || 0) * 100) / 100;
            const rainNext48h = Math.round(((dailyPrecip[7] || 0) + (dailyPrecip[8] || 0)) * 100) / 100;
            const rainNext72h = Math.round(((dailyPrecip[7] || 0) + (dailyPrecip[8] || 0) + (dailyPrecip[9] || 0)) * 100) / 100;
            let frostRiskDays = null;
            for (let i = 7; i < dailyLows.length; i++) {
                if ((dailyLows[i] ?? 999) <= 32) { frostRiskDays = i - 7; break; }
            }
            const pastHighs = dailyHighs.slice(0, 7);
            const futureHighs = dailyHighs.slice(7, 14);
            const pastAvgSoilTemp = pastHighs.length ? Math.round(pastHighs.reduce((s,v) => s + ((v ?? airTemp) - 7), 0) / pastHighs.length) : soilTemp;
            const futureAvgSoilTemp = futureHighs.length ? Math.round(futureHighs.reduce((s,v) => s + ((v ?? airTemp) - 7), 0) / futureHighs.length) : soilTemp;
            const soilTempDelta = futureAvgSoilTemp - pastAvgSoilTemp;
            const soilTempTrend = soilTempDelta >= 3 ? 'warming' : soilTempDelta <= -3 ? 'cooling' : 'stable';
            const forecastDays = dailyDates.slice(7).map((date, i) => ({
                date, high: Math.round(dailyHighs[7+i] ?? airTemp),
                low: Math.round(dailyLows[7+i] ?? airTemp),
                precip: Math.round((dailyPrecip[7+i] || 0) * 100) / 100,
                precipProb: dailyPrecipP[7+i] ?? null,
            }));
            const wmoCode = data.current.weathercode;
            const condition = WMO_CODES[wmoCode] || { label: 'Unknown', icon: '\ud83c\udf21\ufe0f' };
            setWeather({
                temperature: Math.round(airTemp), feelsLike: Math.round(data.current.apparent_temperature),
                soilTemp, humidity: data.current.relative_humidity_2m,
                highTemp: Math.round(dailyHighs[7] ?? airTemp), lowTemp: Math.round(dailyLows[7] ?? airTemp),
                rainfall: weeklyRainfall, precipitation: Math.round(data.current.precipitation * 100) / 100,
                precipProbability: dailyPrecipP[7] ?? null,
                windSpeed: Math.round(data.current.windspeed_10m), windDirection: getWindDirection(data.current.winddirection_10m),
                uvIndex: data.daily.uv_index_max?.[7] ?? null,
                conditionLabel: condition.label, conditionIcon: condition.icon,
                location: (city && state) ? `${city}, ${state}` : (label ? `Zip ${label}` : 'Your Location'),
                forecastDays, rainNext24h, rainNext48h, rainNext72h,
                minTempNext14: Math.min(...dailyLows.slice(7).map(v => v ?? 999)),
                frostRiskDays, pastAvgSoilTemp, futureAvgSoilTemp, soilTempTrend,
                et0Past7: Math.round(dailyET0.slice(0, 7).reduce((s, v) => s + (v || 0), 0) * 100) / 100,
            });
            setWeatherLoading(false);
        } catch (error) {
            console.error('Weather fetch error:', error);
            setWeatherLoading(false);
        } finally {
            weatherFetchKeyRef.current = null;
        }
    };


    const lookupZoneByZip = async (zipOverride) => {
        const zip = (zipOverride || profileFormData.zipCode || '').trim();
        if (!/^\d{5}$/.test(zip)) { setZipLookupError('Enter a valid 5-digit US zip code.'); return; }
        setZipLookupError(''); setZipLookupLoading(true);
        try {
            const [zoneRes, geoRes] = await Promise.all([
                fetch(`https://phzmapi.org/${zip}.json`),
                fetch(`https://api.zippopotam.us/us/${zip}`).catch(() => null),
            ]);
            if (!zoneRes.ok) throw new Error('Not found');
            const data = await zoneRes.json();
            const zone = (data.zone || '').toLowerCase().trim();
            if (zone && ZONE_INFO[zone]) {
                const lat = parseFloat(data.coordinates?.lat);
                const lon = parseFloat(data.coordinates?.lon);
                let city = '', state = '';
                if (geoRes && geoRes.ok) {
                    const geoData = await geoRes.json();
                    city = geoData.places?.[0]?.['place name'] || '';
                    state = geoData.places?.[0]?.['state abbreviation'] || '';
                }
                setProfileFormData(prev => ({ ...prev, zone, lat, lon, zipCode: zip, city, state }));
                fetchWeatherData(lat, lon, zip, city, state);
                const existing = localStorage.getItem('lawnProfile');
                const merged = { ...(existing ? JSON.parse(existing) : {}), zone, lat, lon, zipCode: zip, city, state };
                localStorage.setItem('lawnProfile', JSON.stringify(merged));
                setLawnProfile(merged);
            } else {
                setZipLookupError('Zone not found. Please select manually.');
            }
        } catch(e) {
            setZipLookupError('Could not look up zone. Check connection or select manually.');
        } finally { setZipLookupLoading(false); }
    };

    // Activity actions (async, go through store)
    const addActivity = async (activityData) => {
        let photoUrl = null;

        // Upload photo to Firebase Storage if provided
        if (activityData.photoFile && currentUser && fb.configured) {
            try {
                const compressed = await window.compressImage(activityData.photoFile);
                const { storage, storageRef, uploadBytes, getDownloadURL } = fb;
                const path = 'photos/' + currentUser.uid + '/' + Date.now() + '.jpg';
                const sRef = storageRef(storage, path);
                const snap = await uploadBytes(sRef, compressed);
                photoUrl = await getDownloadURL(snap.ref);
            } catch(e) {
                console.error('Photo upload failed:', e);
            }
        }

        const newActivity = {
            id: Date.now(),
            type: selectedActivityType,
            date: activityData.date,
            notes: activityData.notes,
            cost: activityData.cost ? parseFloat(activityData.cost) : null,
            data: activityData.data,
            ...(photoUrl && { photoUrl }),
            createdAt: new Date().toISOString()
        };
        const saved = await store.saveActivity(newActivity);
        setActivities(prev => [...prev, saved]);
        window.trackEvent('activity_logged', {
            activity_type: selectedActivityType,
            has_photo: !!photoUrl,
            has_cost: !!(activityData.cost && parseFloat(activityData.cost) > 0),
            has_notes: !!(activityData.notes && activityData.notes.trim()),
        });

        // Share photo to community gallery if requested
        if (photoUrl && activityData.shareToGallery && fb.configured && currentUser) {
            try {
                const { db, collection, addDoc, serverTimestamp } = fb;
                await addDoc(collection(db, 'gallery'), {
                    photoUrl,
                    userId: currentUser.uid,
                    userName: userName || currentUser.displayName || currentUser.email || 'Anonymous',
                    activityType: selectedActivityType,
                    caption: activityData.notes || '',
                    date: activityData.date,
                    grassType: profileFormData.specificGrass || null,
                    grassName: (profileFormData.specificGrass && GRASS_INFO[profileFormData.specificGrass])
                        ? GRASS_INFO[profileFormData.specificGrass].name
                        : null,
                    zone: profileFormData.zone || null,
                    lawnSize: profileFormData.lawnSize ? String(profileFormData.lawnSize) : null,
                    soilType: profileFormData.soilType || null,
                    createdAt: serverTimestamp()
                });
                window.trackEvent('gallery_share', { activity_type: selectedActivityType });
            } catch(e) {
                console.error('Gallery share failed:', e);
            }
        }

        setView(null);
        setSelectedActivityType(null);
    };

    const deleteActivity = async (id) => {
        if (confirm('Delete this activity?')) {
            await store.deleteActivity(id);
            setActivities(prev => prev.filter(a => a.id !== id));
            window.trackEvent('activity_deleted', {});
        }
    };

    const addEquipment = async (equipmentData) => {
        const newItem = { id: Date.now(), ...equipmentData, createdAt: new Date().toISOString() };
        const saved = await store.saveEquipment(newItem);
        setEquipment(prev => [...prev, saved]);
        window.trackEvent('equipment_added', { equipment_type: equipmentData.type });
    };

    const deleteEquipment = async (id) => {
        if (confirm('Remove this equipment?')) {
            await store.deleteEquipment(id);
            setEquipment(prev => prev.filter(e => e.id !== id));
        }
    };

    const updateEquipment = async (id, updates) => {
        await store.updateEquipment(id, updates);
        setEquipment(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    };

    const handleProfileSave = async (profile) => {
        await store.saveProfile(profile);
        setLawnProfile(profile);
        setProfileFormData(profile);
        setProfileEditing(false);
        window.trackEvent('profile_saved', {
            grass_type: profile.specificGrass || null,
            zone: profile.zone || null,
            has_lawn_size: !!(profile.lawnSize),
            has_soil_type: !!(profile.soilType),
        });
    };

    // Schedule actions (localStorage only)
    const saveSchedulesToStorage = (updated) => {
        localStorage.setItem('lawnCareSchedules', JSON.stringify(updated));
    };

    const addSchedule = (schedData) => {
        const newSched = { id: Date.now(), ...schedData, lastDone: null, createdAt: new Date().toISOString() };
        const updated = [...schedules, newSched];
        setSchedules(updated);
        saveSchedulesToStorage(updated);
        window.trackEvent('schedule_added', { activity_type: schedData.type, frequency_days: schedData.frequencyDays });
    };

    const deleteSchedule = (id) => {
        if (confirm('Remove this schedule?')) {
            const updated = schedules.filter(s => s.id !== id);
            setSchedules(updated);
            saveSchedulesToStorage(updated);
        }
    };

    const logScheduledActivity = (sched) => {
        const today = new Date().toISOString().split('T')[0];
        const updated = schedules.map(s => s.id === sched.id ? { ...s, lastDone: today } : s);
        setSchedules(updated);
        saveSchedulesToStorage(updated);
        const newActivity = {
            id: Date.now(),
            type: sched.type,
            date: today,
            notes: `Logged from schedule: ${sched.name}`,
            cost: null,
            data: {},
            createdAt: new Date().toISOString()
        };
        store.saveActivity(newActivity).then(saved => {
            setActivities(prev => [...prev, saved]);
            window.trackEvent('schedule_activity_logged', { activity_type: sched.type });
        });
    };

    // Loading screen
    if (!authReady || dataLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <img src="yardstick-logo-light.svg" alt="Yardstick" className="h-auto mb-4" style={{width:'240px'}} />
                <div className="text-sm text-gray-500">Loading your lawn data...</div>
                <div className="mt-6 flex gap-1">
                    {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-[#367C2B] rounded-full animate-bounce" style={{animationDelay: `${i*0.15}s`}}></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    onSuccess={(user) => { setCurrentUser(user); setShowAuthModal(false); }}
                />
            )}

            <header className="sticky top-0 z-40" style={{background: 'var(--ys-green-800)', boxShadow: '0 2px 16px rgba(28,51,24,0.25)'}}>
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <button onClick={() => { setView(null); setSelectedActivityType(null); setMobileMenuOpen(false); }} className="flex items-center btn-press">
                        <svg viewBox="0 0 340 72" xmlns="http://www.w3.org/2000/svg" aria-label="Yardstick" role="img" style={{height:'32px', width:'auto'}}>
                            <title>Yardstick</title>
                            <text x="0" y="54" fill="white" style={{fontFamily:"'Bitter', Georgia, serif", fontWeight:900, fontSize:'58px', letterSpacing:'-0.5px'}}>Yardstick</text>
                            <rect x="0" y="62" width="334" height="7" rx="1.5" fill="#F5C842"/>
                            <rect x="38"  y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                            <rect x="76"  y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                            <rect x="114" y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                            <rect x="152" y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                            <rect x="190" y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                            <rect x="228" y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                            <rect x="266" y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                            <rect x="304" y="62" width="2" height="7" fill="#1E1A14" opacity="0.2"/>
                        </svg>
                    </button>
                    {/* Right side: auth + hamburger */}
                    <div className="flex items-center gap-2">
                        {currentUser ? (
                            <button
                                onClick={() => { setView('account'); setSelectedActivityType(null); }}
                                className="flex items-center gap-1.5 bg-white/12 text-white text-xs font-bold px-3 py-2 rounded-xl btn-press transition"
                                style={{border:'1px solid rgba(255,255,255,0.22)', backdropFilter:'blur(4px)'}}
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="truncate">Hi {userName || (currentUser.displayName || currentUser.email || '').split(/[\s@]/)[0] || 'there'}</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="flex items-center gap-1.5 bg-white/12 text-white text-xs font-bold px-3 py-2 rounded-xl btn-press transition whitespace-nowrap"
                                style={{border:'1px solid rgba(255,255,255,0.22)', backdropFilter:'blur(4px)'}}
                            >
                                Sign Up / Log In
                            </button>
                        )}
                        {/* Hamburger */}
                        <button
                            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl btn-press"
                            style={{background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)', ...((!currentUser && !onboardingDone) ? {display:'none'} : {})}}
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen
                                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            }
                        </button>
                    </div>
                </div>
                {/* Mobile menu panel */}
                {mobileMenuOpen && (currentUser || onboardingDone) && (
                    <div className="md:hidden border-t border-white/20 bg-white shadow-xl menu-slide" style={{maxHeight:'calc(100vh - 56px)', overflowY:'auto'}}>
                        <div className="max-w-5xl mx-auto px-2 py-2">
                            {/* Prominent Log CTA */}
                            <button
                                onClick={() => { setView('add'); setSelectedActivityType(null); setMobileMenuOpen(false); }}
                                className="w-full mb-2 text-white rounded-2xl py-3.5 flex items-center justify-center gap-3 btn-press"
                                style={{background:'var(--ys-green-600)', boxShadow:'0 3px 14px rgba(54,124,43,0.32)'}}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16m8-8H4"/></svg>
                                <span className="text-base font-extrabold" style={{fontFamily:'var(--ys-font-body)'}}>Log Activity</span>
                            </button>
                            {/* Dashboard */}
                            <button
                                onClick={() => { setView(null); setSelectedActivityType(null); setMobileMenuOpen(false); }}
                                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${view === null ? 'bg-[#367C2B]/10 text-[#367C2B]' : 'hover:bg-gray-50'}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                <span className="text-base font-semibold text-gray-800">Dashboard</span>
                                {view === null && <span className="ml-auto w-1.5 h-5 rounded-full bg-[#367C2B]" />}
                            </button>
                            {/* Your Lawn group */}
                            <div className="px-3 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Your Lawn</div>
                            {[
                                { key: 'dashboard', icon: '\ud83d\udcca', label: 'Lawn Stats' },
                                { key: 'profile',   icon: '\ud83c\udf31', label: 'My Yard' },
                                { key: 'garage',    icon: '\ud83c\udfe0', label: 'My Garage' },
                                { key: 'gameplan',  icon: '\ud83d\udcc5', label: 'Lawn Care Program', pro: true },
                            ].map(item => (
                                <button key={item.key}
                                    onClick={() => { setView(item.key); setSelectedActivityType(null); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${view === item.key ? 'bg-[#367C2B]/10 text-[#367C2B]' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="text-xl w-7 text-center">{item.icon}</span>
                                    <span className="text-base font-semibold text-gray-800">{item.label}</span>
                                    {item.pro && <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{background:'var(--ys-gold-100)', color:'var(--ys-gold-500)', border:'1px solid var(--ys-gold-300)'}}>PRO</span>}
                                    {view === item.key && <span className={`w-1.5 h-5 rounded-full bg-[#367C2B] flex-shrink-0 ${!item.pro ? 'ml-auto' : ''}`} />}
                                </button>
                            ))}
                            <div className="border-t border-gray-100 my-1" />
                            {/* Tools group */}
                            <div className="px-3 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Tools</div>
                            {[
                                { key: 'tools', icon: '\ud83d\udee0\ufe0f', label: 'Lawn Tools' },
                            ].map(item => (
                                <button key={item.key}
                                    onClick={() => { setView(item.key); setSelectedActivityType(null); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${view === item.key ? 'bg-[#367C2B]/10 text-[#367C2B]' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="text-xl w-7 text-center">{item.icon}</span>
                                    <span className="text-base font-semibold text-gray-800">{item.label}</span>
                                    {view === item.key && <span className="ml-auto w-1.5 h-5 rounded-full bg-[#367C2B]" />}
                                </button>
                            ))}
                            <div className="border-t border-gray-100 my-1" />
                            {/* Resources group */}
                            <div className="px-3 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Resources</div>
                            {[
                                { key: 'sources',  icon: '\ud83d\udcda', label: 'Research Sources' },
                                { key: 'contact',  icon: '\ud83d\udcac', label: 'Help & Feedback' },
                                { key: 'account', icon: '\ud83d\udc64', label: 'My Account' },
                            ].map(item => (
                                <button key={item.key}
                                    onClick={() => { setView(item.key); setSelectedActivityType(null); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${view === item.key ? 'bg-[#367C2B]/10 text-[#367C2B]' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="text-xl w-7 text-center">{item.icon}</span>
                                    <span className="text-base font-semibold text-gray-800">{item.label}</span>
                                    {item.pro && <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{background:'var(--ys-gold-100)', color:'var(--ys-gold-500)', border:'1px solid var(--ys-gold-300)'}}>PRO</span>}
                                    {view === item.key && <span className={`w-1.5 h-5 rounded-full bg-[#367C2B] flex-shrink-0 ${!item.pro ? 'ml-auto' : ''}`} />}
                                </button>
                            ))}
                            {currentUser?.email === ADMIN_EMAIL && (
                                <button
                                    onClick={() => { setView('admin'); setSelectedActivityType(null); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${view === 'admin' ? 'bg-[#367C2B]/10 text-[#367C2B]' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="text-xl w-7 text-center">\ud83d\udee0\ufe0f</span>
                                    <span className="text-base font-semibold text-gray-800">Submissions</span>
                                    {view === 'admin' && <span className="ml-auto w-1.5 h-5 rounded-full bg-[#367C2B]" />}
                                </button>
                            )}
                            {/* Auth row */}
                            <div className="border-t border-gray-100 mt-2 pt-2 pb-2">
                                <button
                                    onClick={() => {
                                        if (!currentUser) { setView(null); setMobileMenuOpen(false); setShowAuthModal(true); }
                                        else { setView('account'); setSelectedActivityType(null); setMobileMenuOpen(false); }
                                    }}
                                    className="w-full text-left px-4 py-3.5 rounded-xl hover:bg-gray-50 flex items-center gap-3"
                                >
                                    <svg className="w-6 h-6 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-base font-semibold text-gray-700">
                                        {currentUser ? (currentUser.displayName || currentUser.email || 'My Account') : 'Sign In / Create Account'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Backdrop overlay */}
            {mobileMenuOpen && (currentUser || onboardingDone) && (
                <div
                    className="md:hidden fixed inset-0 bg-black/20"
                    style={{zIndex: 35}}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}


            {syncError && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border-b border-red-200 text-sm text-red-700">
                    <span>\u26a0\ufe0f {syncError}</span>
                    <button onClick={() => setSyncError(null)} className="ml-auto text-red-400 hover:text-red-600 font-bold text-base leading-none" aria-label="Dismiss">\u00d7</button>
                </div>
            )}

            <div className="max-w-5xl mx-auto flex">

                {/* Desktop Left Sidebar */}
                <aside className="ys-sidebar hidden md:flex flex-col" style={(!currentUser && !onboardingDone) ? {display:'none'} : {}}>
                    {/* Log Activity CTA */}
                    <button
                        onClick={() => { setView('add'); setSelectedActivityType(null); }}
                        className="ys-btn-primary w-full py-3 px-4 flex items-center gap-2.5 mb-3"
                        style={{borderRadius:'12px', fontSize:'15px', fontFamily:'var(--ys-font-body)', fontWeight:'700'}}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16m8-8H4"/></svg>
                        Log Activity
                    </button>
                    {/* Dashboard */}
                    <button
                        onClick={() => { setView(null); setSelectedActivityType(null); }}
                        className={`ys-sidebar-item ${view === null ? 'ys-sidebar-active' : ''}`}
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Dashboard
                    </button>
                    {/* Your Lawn group */}
                    <div className="ys-sidebar-section-label mt-2">Your Lawn</div>
                    {[
                        { key: 'dashboard', emoji: '\ud83d\udcca', label: 'Lawn Stats' },
                        { key: 'profile',   emoji: '\ud83c\udf31', label: 'My Yard' },
                        { key: 'garage',    emoji: '\ud83c\udfe0', label: 'My Garage' },
                        { key: 'gameplan',  emoji: '\ud83d\udcc5', label: 'Lawn Program', pro: true },
                    ].map(item => (
                        <button key={item.key}
                            onClick={() => { setView(item.key); setSelectedActivityType(null); }}
                            className={`ys-sidebar-item ${view === item.key ? 'ys-sidebar-active' : ''}`}
                        >
                            <span className="text-base w-5 text-center flex-shrink-0">{item.emoji}</span>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.pro && <span className="text-xs font-bold px-1 py-0.5 rounded-full flex-shrink-0" style={{background:'var(--ys-gold-100)', color:'var(--ys-gold-500)', border:'1px solid var(--ys-gold-300)'}}>PRO</span>}
                        </button>
                    ))}
                    {/* Tools group */}
                    <div className="ys-sidebar-section-label mt-2">Tools</div>
                    {[
                        { key: 'tools',      emoji: '\ud83d\udee0\ufe0f', label: 'Lawn Tools' },
                    ].map(item => (
                        <button key={item.key}
                            onClick={() => { setView(item.key); setSelectedActivityType(null); }}
                            className={`ys-sidebar-item ${view === item.key ? 'ys-sidebar-active' : ''}`}
                        >
                            <span className="text-base w-5 text-center flex-shrink-0">{item.emoji}</span>
                            <span className="flex-1 truncate">{item.label}</span>
                        </button>
                    ))}
                    {/* Resources group */}
                    <div className="ys-sidebar-section-label mt-2">Resources</div>
                    {[
                        { key: 'proSignup', emoji: '\u2b50', label: 'Yardstick Pro' },
                        { key: 'sources',  emoji: '\ud83d\udcda', label: 'Research Sources' },
                        { key: 'contact',  emoji: '\ud83d\udcac', label: 'Help & Feedback' },
                        { key: 'account', emoji: '\ud83d\udc64', label: 'My Account' },
                    ].map(item => (
                        <button key={item.key}
                            onClick={() => { setView(item.key); setSelectedActivityType(null); }}
                            className={`ys-sidebar-item ${view === item.key ? 'ys-sidebar-active' : ''}`}
                        >
                            <span className="text-base w-5 text-center flex-shrink-0">{item.emoji}</span>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.pro && <span className="text-xs font-bold px-1 py-0.5 rounded-full flex-shrink-0" style={{background:'var(--ys-gold-100)', color:'var(--ys-gold-500)', border:'1px solid var(--ys-gold-300)'}}>PRO</span>}
                        </button>
                    ))}
                    {currentUser?.email === ADMIN_EMAIL && (
                        <button
                            onClick={() => { setView('admin'); setSelectedActivityType(null); }}
                            className={`ys-sidebar-item ${view === 'admin' ? 'ys-sidebar-active' : ''}`}
                        >
                            <span className="text-base w-5 text-center flex-shrink-0">\ud83d\udee0\ufe0f</span>
                            <span className="flex-1 truncate">Submissions</span>
                        </button>
                    )}
                    {/* Auth row pinned at bottom */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                        <button
                            onClick={() => {
                                if (!currentUser) { setShowAuthModal(true); }
                                else { setView('account'); setSelectedActivityType(null); }
                            }}
                            className="ys-sidebar-item w-full"
                        >
                            <svg className="w-4 h-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate">
                                {currentUser ? (currentUser.displayName || currentUser.email || 'My Account') : 'Sign In'}
                            </span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 p-2 md:p-4 pb-6">
                {!view && (
                    <div className="space-y-3">
                        {/* Welcome Splash Card */}
                        {!currentUser && (!onboardingDone || splashJustDone) && (
                            <WelcomeSplashCard
                                onZipLookup={lookupZoneByZip}
                                zipLookupLoading={zipLookupLoading}
                                zipLookupError={zipLookupError}
                                lawnProfile={lawnProfile}
                                onSignIn={() => setShowAuthModal(true)}
                                onSaveProfile={handleProfileSave}
                                onComplete={() => {
                                    localStorage.setItem('yardstick_onboarding_done', '1');
                                    setOnboardingDone(true);
                                    setSplashJustDone(true);
                                    window.trackEvent('onboarding_complete', {
                                        grass_type: lawnProfile?.specificGrass || null,
                                        zone: lawnProfile?.zone || null,
                                    });
                                }}
                                onDismiss={() => setSplashJustDone(false)}
                                onManualZone={(zone) => {
                                    const existing = localStorage.getItem('lawnProfile');
                                    const merged = { ...(existing ? JSON.parse(existing) : {}), zone };
                                    localStorage.setItem('lawnProfile', JSON.stringify(merged));
                                    setLawnProfile(merged);
                                    setProfileFormData(prev => ({ ...prev, zone }));
                                }}
                            />
                        )}
                        {/* Dashboard -- only shown after onboarding is complete or user is logged in */}
                        {(currentUser || onboardingDone) && (<>
                        {/* Save plan banner */}
                        {!currentUser && onboardingDone && !saveBannerDismissed && (
                            <div className="rounded-2xl border px-4 py-3 flex items-center gap-3" style={{background:'var(--ys-green-50)', borderColor:'var(--ys-green-200)'}}>
                                <span className="text-lg flex-shrink-0">\u2601\ufe0f</span>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm font-semibold text-gray-800">Save your plan \u2014 </span>
                                    <span className="text-sm text-gray-600">create a free account.</span>
                                </div>
                                <button onClick={() => setView('account')} className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg text-white btn-press" style={{background:'var(--ys-green-600)'}}>
                                    Save \u2192
                                </button>
                                <button onClick={() => { setSaveBannerDismissed(true); localStorage.setItem('yardstick_save_banner_dismissed', '1'); }}
                                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full btn-press"
                                    style={{background:'transparent', border:'1px solid rgba(0,0,0,0.1)', color:'#9CA3AF'}}
                                    aria-label="Dismiss">
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                </button>
                            </div>
                        )}
                        {/* Coach Card */}
                        {(() => {
                            const getCoachUrgency = () => {
                                if (!weather || !lawnProfile || !lawnProfile.specificGrass) return null;
                                const st = weather.soilTemp;
                                const grassInfo = GRASS_INFO[lawnProfile.specificGrass];
                                if (!grassInfo) return null;
                                const isCool = grassInfo.season === 'Cool Season';
                                const isWarm = grassInfo.season === 'Warm Season';
                                const month = new Date().getMonth();
                                const isSpring = month >= 1 && month <= 5;
                                const isFall   = month >= 7 && month <= 10;
                                const daysSince = (type, maxDays) => {
                                    const match = [...activities].reverse().find(a => a.type === type);
                                    if (!match) return Infinity;
                                    return (new Date() - new Date(match.date)) / (1000 * 60 * 60 * 24);
                                };
                                const recentFertilizer  = daysSince('fertilizer', 42) <= 42;
                                const recentMow         = daysSince('mowing', 10) <= 10;
                                if (isCool && isSpring) {
                                    if (st >= 50 && st <= 54) return 'act-now';
                                    if (st >= 44 && st < 50)  return 'upcoming';
                                    if (st >= 55)             return 'on-track';
                                    return 'on-track';
                                }
                                if (isCool && isFall) {
                                    if (st >= 50 && st <= 65) return 'on-track';
                                    if (st > 65 && st <= 70)  return 'upcoming';
                                    return 'on-track';
                                }
                                if (isWarm && isSpring) {
                                    if (st >= 65 && st <= 75) return recentFertilizer ? 'on-track' : 'act-now';
                                    if (st >= 60 && st < 65)  return 'upcoming';
                                    return 'on-track';
                                }
                                return 'on-track';
                            };
                            const urgency = getCoachUrgency();
                            const urgencyPill = urgency === 'act-now'  ? { label: 'Act now',   bg: '#DC4A26', text: 'white' } :
                                                urgency === 'upcoming' ? { label: 'Upcoming',  bg: '#C8960C', text: 'white' } :
                                                urgency === 'on-track' ? { label: 'On track',  bg: 'rgba(255,255,255,0.22)', text: 'white' } : null;
                            return (
                        <div className="ys-coach-card px-4 py-3">
                            <div className="flex items-center justify-between" style={{position:'relative', zIndex:1}}>
                                <div className="flex-1 min-w-0 pr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                    <div className="text-xs font-semibold uppercase tracking-widest" style={{color:'rgba(255,255,255,0.6)'}}>
                                        {(() => {
                                            const h = new Date().getHours();
                                            const tod = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
                                            const greetName = userName || (currentUser?.displayName?.split(' ')[0]) || '';
                                            return greetName ? `${tod}, ${greetName}` : tod;
                                        })()}
                                    </div>
                                    {urgencyPill && (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                                            style={{background: urgencyPill.bg, color: urgencyPill.text, border: urgency === 'on-track' ? '1px solid rgba(255,255,255,0.3)' : 'none'}}>
                                            {urgencyPill.label}
                                        </span>
                                    )}
                                    </div>
                                    <div className="text-xl font-bold text-white leading-tight mt-0.5" style={{fontFamily:'var(--ys-font-display)'}}>Your Lawn Dashboard</div>
                                    {(() => {
                                        const locLabel = weather ? weather.location
                                            : (lawnProfile?.city && lawnProfile?.state) ? `${lawnProfile.city}, ${lawnProfile.state}`
                                            : lawnProfile?.zipCode ? `Zip ${lawnProfile.zipCode}` : null;
                                        return locLabel ? (
                                            <div className="flex items-center gap-1 mt-1" style={{color:'rgba(255,255,255,0.55)'}}>
                                                <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.5 0C2.015 0 0 2.015 0 4.5c0 3.375 4.5 6.5 4.5 6.5S9 7.875 9 4.5C9 2.015 6.985 0 4.5 0zm0 6.125A1.625 1.625 0 1 1 4.5 2.875a1.625 1.625 0 0 1 0 3.25z" fill="currentColor"/>
                                                </svg>
                                                <span className="text-xs">{locLabel}</span>
                                            </div>
                                        ) : null;
                                    })()}
                                </div>
                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    {(() => {
                                        const thisMonth = new Date().getMonth();
                                        const thisYear = new Date().getFullYear();
                                        const monthCount = activities.filter(a => { const d = new Date(a.date); return d.getMonth() === thisMonth && d.getFullYear() === thisYear; }).length;
                                        return (
                                            <div className="ys-badge-white">
                                                {monthCount} {monthCount === 1 ? 'activity' : 'activities'} this month
                                            </div>
                                        );
                                    })()}
                                    {(() => {
                                        if (activities.length === 0) return null;
                                        const now = new Date();
                                        let month = now.getMonth(), year = now.getFullYear(), streak = 0;
                                        for (let i = 0; i < 24; i++) {
                                            if (!activities.some(a => { const d = new Date(a.date); return d.getMonth() === month && d.getFullYear() === year; })) break;
                                            streak++;
                                            if (--month < 0) { month = 11; year--; }
                                        }
                                        if (streak < 2) return null;
                                        return <div className="ys-badge-white">\ud83d\udd25 {streak}-month streak</div>;
                                    })()}
                                </div>
                            </div>
                        </div>
                            ); })()}
                        {/* Section: Weather & Conditions */}
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Weather &amp; Conditions</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                        {/* Weather card */}
                        <WeatherSnapshot weather={weather} weatherLoading={weatherLoading} lawnProfile={lawnProfile} zipLookupLoading={zipLookupLoading} zipLookupError={zipLookupError} onZipLookup={lookupZoneByZip} />
                        {/* Season banner card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <SeasonBanner weather={weather} />
                        </div>
                        {/* Section: Your Plan */}
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Plan</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                        {/* Today's Advisory card */}
                        {weather && <TodayAdvisoryCard weather={weather} lawnProfile={lawnProfile} activities={activities} />}
                        {/* Frost countdown banner */}
                        {(() => {
                            if (!lawnProfile || !lawnProfile.zone) return null;
                            const zd = ZONE_INFO[lawnProfile.zone] || ZONE_INFO[getParentZone(lawnProfile.zone)];
                            if (!zd || !zd.firstFrost || !zd.lastFrost) return null;
                            const now = new Date(), yr = now.getFullYear();
                            const firstFrost = new Date(yr, zd.firstFrost.month - 1, zd.firstFrost.day);
                            const lastFrost  = new Date(yr, zd.lastFrost.month  - 1, zd.lastFrost.day );
                            const dToFirst = Math.floor((firstFrost - now) / 864e5);
                            const dToLast  = Math.floor((lastFrost  - now) / 864e5);
                            let banner = null;
                            if (dToFirst >= 0 && dToFirst <= 45) {
                                const urgency = dToFirst <= 7 ? 'urgent' : dToFirst <= 21 ? 'warning' : 'info';
                                const advice  = dToFirst <= 7  ? 'Finish seeding immediately — seedlings need 6 weeks to harden.' :
                                                dToFirst <= 21 ? 'Wrap up overseeding and final fall fertilization.' :
                                                'Plan final seeding, fertilization, and lime applications.';
                                banner = { icon: '🍂', label: `First frost ~${zd.firstFrost.month}/${zd.firstFrost.day}`, days: dToFirst, advice, urgency };
                            } else if (dToLast >= 0 && dToLast <= 30) {
                                banner = { icon: '❄️', label: `Last frost ~${zd.lastFrost.month}/${zd.lastFrost.day}`, days: dToLast, advice: 'Hold warm-season fertilizing and new seeding until after last frost.', urgency: 'info' };
                            } else if (dToLast >= -14 && dToLast < 0) {
                                banner = { icon: '✅', label: 'Frost season ended', days: Math.abs(dToLast), advice: 'Lawn season open — time for pre-emergent and spring first fertilizer.', urgency: 'go', past: true };
                            }
                            if (!banner) return null;
                            const colors = {
                                urgent:  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', sub: 'text-orange-600' },
                                warning: { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700',  sub: 'text-amber-600'  },
                                go:      { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  sub: 'text-green-600'  },
                                info:    { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700',   sub: 'text-blue-500'   },
                            }[banner.urgency];
                            return (
                                <div className={`${colors.bg} border ${colors.border} rounded-xl px-4 py-3 flex items-start gap-3`}>
                                    <div className="text-xl flex-shrink-0 mt-0.5">{banner.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-xs font-bold uppercase tracking-widest ${colors.text} mb-0.5`}>
                                            {banner.label} {banner.past ? `(${banner.days}d ago)` : `— ${banner.days} day${banner.days !== 1 ? 's' : ''}`}
                                        </div>
                                        <div className={`text-xs ${colors.sub}`}>{banner.advice}</div>
                                    </div>
                                </div>
                            );
                        })()}
                        {/* Schedules due card */}
                        {schedules.length > 0 && (() => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const getDaysUntil = (s) => {
                                const ref = new Date(s.lastDone || s.createdAt);
                                ref.setHours(0, 0, 0, 0);
                                const due = new Date(ref);
                                due.setDate(due.getDate() + s.frequencyDays);
                                return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
                            };
                            const overdue     = schedules.filter(s => getDaysUntil(s) < 0);
                            const dueTodayArr = schedules.filter(s => getDaysUntil(s) === 0);
                            const urgentCount = overdue.length + dueTodayArr.length;
                            const mostUrgent  = [...schedules].sort((a, b) => getDaysUntil(a) - getDaysUntil(b))[0];
                            const d = getDaysUntil(mostUrgent);
                            const isUrgent = d <= 0;
                            // Precompute strings — no nested template literals in JSX
                            const mainText = urgentCount > 0
                                ? (urgentCount + ' task' + (urgentCount > 1 ? 's' : '') + ' due')
                                : ('Next: ' + mostUrgent.name);
                            const parts = [];
                            if (overdue.length > 0)     parts.push(overdue.length + ' overdue');
                            if (dueTodayArr.length > 0) parts.push(dueTodayArr.length + ' today');
                            const subText = urgentCount > 0 ? parts.join(', ') : ('in ' + d + ' day' + (d !== 1 ? 's' : ''));
                            const cardCls = 'w-full rounded-2xl shadow-sm border p-4 card-hover btn-press text-left flex items-center gap-3 ' + (isUrgent ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100');
                            const iconCls = 'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ' + (isUrgent ? 'bg-orange-100' : 'bg-blue-50');
                            const headCls = 'text-sm font-bold ' + (isUrgent ? 'text-orange-800' : 'text-gray-800');
                            const subCls  = 'text-xs ' + (isUrgent ? 'text-orange-600' : 'text-gray-400');
                            const chevCls = 'text-xs font-bold ' + (isUrgent ? 'text-orange-600' : 'text-[#367C2B]');
                            return (
                                <button onClick={() => setView('schedules')} className={cardCls}>
                                    <div className={iconCls}>&#128467;</div>
                                    <div className="flex-1 min-w-0">
                                        <div className={headCls}>{mainText}</div>
                                        <div className={subCls}>{subText}</div>
                                    </div>
                                    <div className={chevCls}>View &#8594;</div>
                                </button>
                            );
                        })()}
                        {/* This Week's Priority */}
                        {(() => {
                            if (!lawnProfile || !lawnProfile.specificGrass || !lawnProfile.zone) return null;
                            const programKey = GRASS_KEY_MAP[lawnProfile.specificGrass] + '_zone' + getParentZone(lawnProfile.zone);
                            const program = typeof grassPrograms !== 'undefined' ? grassPrograms[programKey] : null;
                            if (!program) return null;
                            const curIdx = new Date().getMonth();
                            const curMonth = MONTH_NAMES[curIdx];
                            const isMatch = (mStr) => {
                                if (mStr === curMonth) return true;
                                if (mStr && mStr.includes('-')) {
                                    const parts = mStr.split('-');
                                    const s = MONTH_NAMES.indexOf(parts[0].trim()), e = MONTH_NAMES.indexOf(parts[1].trim());
                                    return s >= 0 && e >= 0 && curIdx >= s && curIdx <= e;
                                }
                                return false;
                            };
                            const isGameplanTask = (t) => !/\bmow(ing)?\b|mow (weekly|at|every)|watering|irrigat|water (as needed|deeply|1|0\.|per week)/.test(t.toLowerCase());
                            const currentEntry = program.schedule.find(e => isMatch(e.month));
                            const gameplanTasks = currentEntry ? (currentEntry.tasks || []).filter(isGameplanTask) : [];
                            const nextEntry = program.schedule.find(e => {
                                const s = MONTH_NAMES.indexOf((e.month || '').split('-')[0].trim());
                                return s === (curIdx + 1) % 12 || s === (curIdx + 2) % 12;
                            });
                            const upNext = nextEntry ? nextEntry.month : null;
                            const taskIcons = { 'pre-emergent': '🛡️', 'fertili': '🌾', 'aerat': '🔧', 'overseed': '🌱', 'seed': '🌱', 'soil test': '🧪', 'lime': '🧪', 'dethatch': '✂️', 'scalp': '✂️', 'weed': '🌿', 'herbicide': '🌿', 'fungicide': '💊', 'chinch': '💊' };
                            const getIcon = (task) => { const lower = task.toLowerCase(); for (const [k, v] of Object.entries(taskIcons)) { if (lower.includes(k)) return v; } return '📋'; };
                            const scoredTasks = gameplanTasks.map(task => {
                                const ws = getTaskWeatherStatus(task, weather, lawnProfile);
                                const order = !ws ? 1 : ws.status === 'go' ? 0 : ws.status === 'caution' ? 1 : 2;
                                return { task, ws, order };
                            }).sort((a, b) => a.order - b.order);
                            const weekLabel = (() => {
                                const d = new Date().getDate();
                                return d <= 7 ? 'Early' : d <= 14 ? 'Mid' : d <= 21 ? 'Mid–Late' : 'Late';
                            })();
                            const StatusBadge = ({ status }) => {
                                if (!status) return null;
                                if (status === 'go')      return <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 flex-shrink-0 whitespace-nowrap">Go</span>;
                                if (status === 'caution') return <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 flex-shrink-0 whitespace-nowrap">Soon</span>;
                                return <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 flex-shrink-0 whitespace-nowrap">Hold</span>;
                            };
                            return (
                                <button onClick={() => setView('gameplan')} className="w-full bg-white rounded-2xl shadow-sm border border-[#367C2B]/20 p-4 card-hover btn-press text-left">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{background:'var(--ys-green-100)'}}>📅</div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-800">This Week's Priority</div>
                                                <div className="text-xs text-gray-400">{weekLabel} {curMonth}{currentEntry?.importance ? ` · ${currentEntry.importance}` : ''}</div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-[#367C2B]">Full plan →</span>
                                    </div>
                                    {scoredTasks.length > 0 ? (
                                        <div className="space-y-2 mt-1">
                                            {scoredTasks.slice(0, 3).map(({ task, ws }, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-2">
                                                    <span className="flex-shrink-0 text-base">{getIcon(task)}</span>
                                                    <span className="flex-1 text-xs text-gray-700 leading-snug font-medium">{task}</span>
                                                    {ws && <StatusBadge status={ws.status} />}
                                                </div>
                                            ))}
                                            {scoredTasks.length > 3 && <div className="text-xs text-[#367C2B] font-semibold px-1">+{scoredTasks.length - 3} more this month</div>}
                                            {upNext && !weather && <div className="text-xs text-gray-400 mt-1 pt-1 border-t border-gray-100">Up next: {upNext}</div>}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-gray-500 mt-1">
                                            {upNext ? `Quiet period — next tasks in ${upNext}` : 'No scheduled treatments this month'}
                                        </div>
                                    )}
                                </button>
                            );
                        })()}
                        {/* ── Section: Quick Actions ── */}
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quick Actions</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                        {/* Primary CTA */}
                        <button onClick={() => { setView('add'); setSelectedActivityType(null); }} className="w-full text-white rounded-2xl py-4 flex items-center justify-center gap-3 btn-press transition" style={{background:'var(--ys-green-600)', boxShadow:'0 4px 20px rgba(54,124,43,0.32)'}}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:'rgba(255,255,255,0.2)'}}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                                </svg>
                            </div>
                            <span className="text-base font-extrabold tracking-wide" style={{fontFamily:'var(--ys-font-body)'}}>Log Activity</span>
                        </button>
                        {/* Recent activity strip */}
                        {activities.length > 0 && (() => {
                            const recent = [...activities].reverse().slice(0, 3);
                            return (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Activity</div>
                                        <button onClick={() => setView('history')} className="text-xs font-semibold text-[#367C2B]">View all →</button>
                                    </div>
                                    <div className="space-y-2">
                                        {recent.map(activity => {
                                            const colors = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.mowing;
                                            const type = ACTIVITY_TYPES[activity.type] || { icon: '📋', name: activity.type };
                                            const days = Math.floor((new Date() - new Date(activity.date)) / (1000*60*60*24));
                                            const when = days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days} days ago`;
                                            return (
                                                <div key={activity.id} className="bg-white rounded-xl shadow-sm px-3 py-2.5 flex items-center gap-3 card-hover overflow-hidden" style={{border: `1px solid ${colors.hex}28`, borderLeft: `4px solid ${colors.hex}`}}>
                                                    <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center text-base flex-shrink-0`}>{type.imgSrc ? <img src={type.imgSrc} className="w-5 h-5 object-contain" alt="" /> : type.icon}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-bold text-gray-800">{type.name}</div>
                                                        <div className="text-xs text-gray-400">{when}</div>
                                                    </div>
                                                    <svg className="w-4 h-4 flex-shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })()}
                        {/* Data-loss warning — logged-out users with activities */}
                        {!currentUser && activities.length > 0 && (
                            <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 flex items-start gap-3">
                                <span className="text-lg flex-shrink-0 mt-0.5">⚠️</span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-gray-800 mb-0.5">Your lawn data is only on this device</div>
                                    <div className="text-xs text-gray-500">Create a free account to back up your {activities.length} {activities.length === 1 ? 'activity' : 'activities'} and access them anywhere.</div>
                                </div>
                                <button onClick={() => setView('account')} className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg text-white btn-press" style={{background:'var(--ys-green-600)'}}>
                                    Back Up →
                                </button>
                            </div>
                        )}
                        {/* Monthly summary strip */}
                        {(() => {
                            const thisMonth = new Date().getMonth();
                            const thisYear = new Date().getFullYear();
                            const monthActivities = activities.filter(a => { const d = new Date(a.date); return d.getMonth() === thisMonth && d.getFullYear() === thisYear; });
                            const monthCount = monthActivities.length;
                            const lastMow = [...activities].reverse().find(a => a.type === 'mowing');
                            const mowText = lastMow ? (() => { const d = Math.floor((new Date() - new Date(lastMow.date)) / (1000*60*60*24)); return d === 0 ? 'Mowed today' : d === 1 ? 'Mowed yesterday' : `Mowed ${d}d ago`; })() : null;
                            const rainText = weather ? `${weather.rainfall}" rain` : null;
                            const summaryParts = [monthCount > 0 ? `${monthCount} ${monthCount === 1 ? 'activity' : 'activities'}` : null, rainText, mowText].filter(Boolean);
                            if (summaryParts.length === 0) return null;
                            const monthName = new Date().toLocaleString('default', { month: 'long' });
                            return (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#367C2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">This Month</div>
                                        <div className="text-sm font-semibold text-gray-700 truncate">{summaryParts.join(' · ')}</div>
                                    </div>
                                    <button onClick={() => setView('dashboard')} className="text-xs font-bold text-[#367C2B] flex-shrink-0">{monthName} →</button>
                                </div>
                            );
                        })()}
                        {/* Account callout card — only shown to logged-out users */}
                        {!currentUser && (
                            <div className="rounded-2xl border p-4" style={{background:'var(--ys-green-50)', borderColor:'var(--ys-green-200)'}}>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xl">🌿</span>
                                    <span className="text-sm font-bold text-gray-800">Get your full lawn plan — free</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">Create a free account to unlock your Full Year Program, Treatment Calculator, Smart Scheduler &amp; Stats.</p>
                                <button onClick={() => setView('account')} className="w-full py-2.5 rounded-xl text-sm font-bold text-white btn-press" style={{background:'var(--ys-green-600)', boxShadow:'0 2px 10px rgba(54,124,43,0.25)'}}>
                                    Create Free Account →
                                </button>
                                <div className="text-center mt-2">
                                    <button onClick={() => setView('proSignup')} className="text-xs text-gray-400 btn-press" style={{background:'none', border:'none', cursor:'pointer'}}>
                                        See what's included in Pro →
                                    </button>
                                </div>
                            </div>
                        )}
                        </>)}
                    </div>
                )}
                {view === 'add' && <div><button onClick={() => { setView(null); setSelectedActivityType(null); }} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button>{!selectedActivityType && <ActivitySelector onSelectType={setSelectedActivityType} onCancel={() => setView(null)} currentUser={currentUser} />}{selectedActivityType && <ActivityForm selectedActivityType={selectedActivityType} onSubmit={addActivity} onCancel={() => { setSelectedActivityType(null); setView(null); }} currentUser={currentUser} />}</div>}
                {view === 'history' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button>{!currentUser && (<div className="mb-4 rounded-2xl border p-4 flex items-center gap-3" style={{background:'var(--ys-gold-100)', borderColor:'var(--ys-gold-300)'}}><span className="text-xl flex-shrink-0">📊</span><div className="flex-1 min-w-0"><div className="text-sm font-bold text-gray-800">Want advanced stats &amp; charts?</div><div className="text-xs text-gray-500">Create a free account to unlock monthly breakdowns, streaks &amp; trends.</div></div><button onClick={() => setView('account')} className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg text-white btn-press" style={{background:'var(--ys-green-600)'}}>Unlock →</button></div>)}<HistoryView activities={activities} onDelete={deleteActivity} /></div>}
                {view === 'gallery' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><GalleryView currentUser={currentUser} onSignIn={() => setShowAuthModal(true)} /></div>}
                {view === 'garage' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><MyGarage equipment={equipment} activities={activities} onAdd={addEquipment} onDelete={deleteEquipment} onUpdate={updateEquipment} onNavigate={setView} /></div>}
                {view === 'profile' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><LawnProfile profileFormData={profileFormData} profileEditing={profileEditing} lawnProfile={lawnProfile} weather={weather} zipLookupLoading={zipLookupLoading} zipLookupError={zipLookupError} onZipLookup={lookupZoneByZip} onSave={handleProfileSave} onEditToggle={setProfileEditing} onNavigate={setView} /></div>}
                {view === 'gameplan' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button>{PRO_GATE_ENABLED && !currentUser ? <ProFeatureNotice featureName="Full Year Lawn Program" onUnlock={() => setView('account')} onViewPricing={() => setView('proSignup')} /> : <YearlyGameplan lawnProfile={lawnProfile} weather={weather} onNavigate={setView} />}</div>}
                {view === 'schedules' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><SchedulesView schedules={schedules} onAdd={addSchedule} onDelete={deleteSchedule} onLog={logScheduledActivity} /></div>}
                {view === 'dashboard' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button>{PRO_GATE_ENABLED && !currentUser ? <ProFeatureNotice featureName="Advanced Stats" onUnlock={() => setView('account')} onViewPricing={() => setView('proSignup')} /> : <Dashboard activities={activities} statsView={statsView} onStatsViewChange={setStatsView} weather={weather} lawnProfile={lawnProfile} onNavigate={setView} onDelete={deleteActivity} />}</div>}
                {view === 'products' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button>{PRO_GATE_ENABLED && !currentUser ? <ProFeatureNotice featureName="Product Guide" onUnlock={() => setView('account')} onViewPricing={() => setView('proSignup')} /> : <ProductGuide />}</div>}
                {view === 'sources' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><ResearchSourcesPage /></div>}
                {view === 'account' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><AccountPage activities={activities} equipment={equipment} lawnProfile={lawnProfile} store={store} currentUser={currentUser} onSignOut={handleSignOut} onSignIn={() => setShowAuthModal(true)} firebaseConfigured={!!fb.configured} userName={userName} onUserNameChange={handleUserNameChange} onNavigate={setView} /></div>}
                {view === 'contact' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><ContactPage currentUser={currentUser} firebaseConfigured={!!fb.configured} /></div>}
                {view === 'tools' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><ToolsView onNavigate={setView} lawnProfile={lawnProfile} /></div>}
                {view === 'grass-id' && <div><button onClick={() => setView('tools')} className="text-[#367C2B] mb-4 btn-press font-semibold">← Tools</button><GrassIdentifierView lawnProfile={lawnProfile} onSaveProfile={handleProfileSave} onNavigate={setView} /></div>}
                {view === 'calculator' && <div><button onClick={() => setView('tools')} className="text-[#367C2B] mb-4 btn-press font-semibold">← Tools</button><TreatmentCalculator lawnProfile={lawnProfile} onNavigate={setView} proGated={PRO_GATE_ENABLED && !currentUser} onUnlock={() => setView('account')} /></div>}
                {view === 'admin' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><AdminSubmissionsPage currentUser={currentUser} firebaseConfigured={!!fb.configured} /></div>}
                {view === 'pricing' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><PricingView onSignIn={() => { setView(null); setShowAuthModal(true); }} onClose={() => setView(null)} /></div>}
                {view === 'proSignup' && <div><button onClick={() => setView(null)} className="text-[#367C2B] mb-4 btn-press font-semibold">← Back</button><ProSignupView currentUser={currentUser} onClose={() => setView(null)} onSignIn={() => { setView('account'); }} /></div>}

                {/* ─── Feedback Footer ─────────────────────────────────── */}
                <div className="mt-8 mb-4 rounded-xl border border-[#367C2B]/20 bg-[#367C2B]/5 px-4 py-3 flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">💬</span>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-700">Found a bug or have feedback?</div>
                        <div className="text-xs text-gray-400">Help us improve Yardstick during beta</div>
                    </div>
                    <a
                        href="mailto:yardsticklawncareapp@gmail.com?subject=Yardstick%3A%20Feedback"
                        className="flex-shrink-0 bg-[#367C2B] text-white text-xs font-bold px-3 py-2 rounded-lg btn-press transition"
                        style={{textDecoration:'none'}}
                    >
                        Email Us
                    </a>
                </div>
                {/* ── Grass footer strip — negative margins break out of main padding ── */}
                <div className="ys-grass-footer -mx-2 -mb-6 md:-mx-4" aria-hidden="true" />
                </main>
            </div>

        </div>
    );
}

export default LawnCareTracker;
