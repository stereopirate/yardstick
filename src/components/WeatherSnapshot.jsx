import React, { useState } from 'react';
import { GRASS_INFO, SOIL_TYPES } from '../constants.js';

export const WMO_CODES = {
    0: { label: 'Clear Sky', icon: '☀️' }, 1: { label: 'Mainly Clear', icon: '🌤️' },
    2: { label: 'Partly Cloudy', icon: '⛅' }, 3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Foggy', icon: '🌫️' }, 48: { label: 'Icy Fog', icon: '🌫️' },
    51: { label: 'Light Drizzle', icon: '🌦️' }, 53: { label: 'Drizzle', icon: '🌦️' },
    55: { label: 'Heavy Drizzle', icon: '🌧️' }, 61: { label: 'Light Rain', icon: '🌧️' },
    63: { label: 'Rain', icon: '🌧️' }, 65: { label: 'Heavy Rain', icon: '🌧️' },
    71: { label: 'Light Snow', icon: '🌨️' }, 73: { label: 'Snow', icon: '❄️' },
    75: { label: 'Heavy Snow', icon: '❄️' }, 80: { label: 'Light Showers', icon: '🌦️' },
    81: { label: 'Showers', icon: '🌧️' }, 82: { label: 'Heavy Showers', icon: '⛈️' },
    95: { label: 'Thunderstorm', icon: '⛈️' }, 99: { label: 'Thunderstorm w/ Hail', icon: '⛈️' }
};

export const getWindDirection = (deg) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW'];
    return dirs[Math.round(deg / 45) % 8];
};

// ─── Soil Test Helpers ────────────────────────────────────────────────────────
export const getSoilTestAge = (testDate) => {
    if (!testDate) return null;
    const ms = Date.now() - new Date(testDate).getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24 * 365));
};

export const getSoilPHStatus = (pH, grassKey) => {
    if (!pH) return null;
    const phNum = parseFloat(pH);
    if (isNaN(phNum)) return null;
    // Ideal pH ranges by grass type (university extension sourced)
    const ranges = {
        'bermuda': [6.0, 7.0], 'zoysia': [6.0, 7.0], 'st-augustine': [6.0, 7.5],
        'centipede': [4.5, 6.0], 'bahia': [5.5, 6.5], 'buffalograss': [6.0, 7.5],
        'tall-fescue': [6.0, 7.0], 'kentucky-bluegrass': [6.0, 7.0],
        'perennial-ryegrass': [6.0, 7.0], 'fine-fescue': [5.5, 7.0],
        'sun-shade-mix': [6.0, 7.0], 'dense-shade-mix': [5.5, 7.0], 'tall-fescue-blend': [6.0, 7.0]
    };
    const [low, high] = ranges[grassKey] || [6.0, 7.0];
    if (phNum < low - 0.3) return { status: 'low', label: 'Too Acidic', action: 'Apply lime to raise pH', color: 'orange' };
    if (phNum > high + 0.3) return { status: 'high', label: 'Too Alkaline', action: 'Apply sulfur to lower pH', color: 'orange' };
    if (phNum < low) return { status: 'slightly-low', label: 'Slightly Low', action: 'Light lime application may help', color: 'yellow' };
    if (phNum > high) return { status: 'slightly-high', label: 'Slightly High', action: 'Monitor; may need sulfur', color: 'yellow' };
    return { status: 'ideal', label: 'Ideal', action: null, color: 'green' };
};

export const generateAdvisories = (w, lawnProfile, activities) => {
    if (!w) return [];
    const candidates = [];
    const rain24 = w.rainNext24h || 0;
    const rain48 = w.rainNext48h || 0;
    const rain72 = w.rainNext72h || 0;
    const weeklyTarget = (w.et0Past7 && w.et0Past7 > 0) ? w.et0Past7 : 1.25;
    const waterDeficit = weeklyTarget - (w.rainfall || 0) - rain48;
    const frost = w.frostRiskDays;

    // Priority 0: imminent frost
    if (frost !== null && frost <= 3) {
        const when = frost === 0 ? 'next 24h' : `${frost} day${frost !== 1 ? 's' : ''}`;
        candidates.push({ priority: 0, status: 'hold', icon: '🌡️', title: `Frost in ${when}`, detail: 'Hold all seeding, overseeding, and chemical applications until after frost.' });
    }
    // Priority 1: heavy rain — hold fertilizing & sprays
    if (rain24 > 0.75) {
        candidates.push({ priority: 1, status: 'hold', icon: '🌧️', title: `Heavy rain today (${rain24}")`, detail: 'Hold granular fertilizer and spray treatments — product will wash off or leach.' });
    }
    // Priority 2: irrigation deficit + no incoming rain
    if (waterDeficit > weeklyTarget * 0.5 && rain72 < 0.1) {
        candidates.push({ priority: 2, status: 'hold', icon: '💧', title: 'Lawn water deficit', detail: `Deficit ~${Math.round(waterDeficit * 100) / 100}" vs ET0 target — irrigate deeply soon.` });
    }
    // Priority 3a: light rain today — good for granular, bad for spray
    if (rain24 > 0.1 && rain24 <= 0.75) {
        candidates.push({ priority: 3, status: 'caution', icon: '🌦️', title: `Light rain today (${rain24}")`, detail: 'Good window for granular fertilizer activation. Hold spray herbicides/fungicides.' });
    }
    // Priority 3b: heat stress
    if (w.highTemp > 90) {
        candidates.push({ priority: 3, status: 'caution', icon: '🌡️', title: `Heat advisory (${w.highTemp}°F high)`, detail: 'Mow early morning, raise blade height. Skip fertilizing until temps drop below 85°F.' });
    }
    // Priority 4: rain covered weekly ET0 need
    if (waterDeficit <= 0 && (w.rainfall || 0) > 0) {
        candidates.push({ priority: 4, status: 'go', icon: '✅', title: 'Irrigation need covered', detail: `${w.rainfall}" rain this week satisfies ET0 target — skip watering.` });
    }
    // Priority 5: clear, calm conditions — good for treatments
    if (rain24 < 0.1 && rain48 < 0.1 && w.windSpeed < 10 && (frost === null || frost > 7) && w.highTemp <= 90) {
        candidates.push({ priority: 5, status: 'go', icon: '✅', title: 'Good conditions today', detail: 'Calm, dry forecast — ideal window for mowing, trimming, and spray treatments.' });
    }
    // Priority 6: soil test advisories (from lawnProfile)
    if (lawnProfile) {
        const st = lawnProfile.soilTest;
        const testAge = getSoilTestAge(lawnProfile.soilTestDate);
        if (!st || !st.pH) {
            candidates.push({ priority: 6, status: 'caution', icon: '🧪', title: 'No soil test on record', detail: 'A soil test unlocks precise fertilizer & pH recommendations. Most state extension labs cost $15–20.' });
        } else {
            if (testAge !== null && testAge >= 2) {
                candidates.push({ priority: 6, status: 'caution', icon: '🧪', title: `Soil test is ${testAge} year${testAge > 1 ? 's' : ''} old`, detail: 'University extension programs recommend testing every 2–3 years. Results may no longer reflect current conditions.' });
            }
            const phStatus = getSoilPHStatus(st.pH, lawnProfile.specificGrass);
            if (phStatus && phStatus.status === 'low') {
                candidates.push({ priority: 6, status: 'caution', icon: '⚗️', title: `Soil pH ${st.pH} — too acidic`, detail: `${phStatus.action}. Low pH locks out nutrients even when you fertilize — correct this first.` });
            } else if (phStatus && phStatus.status === 'high') {
                candidates.push({ priority: 6, status: 'caution', icon: '⚗️', title: `Soil pH ${st.pH} — too alkaline`, detail: `${phStatus.action}. High pH can cause iron and manganese deficiency.` });
            }
            if (st.phosphorus === 'low') {
                candidates.push({ priority: 6, status: 'caution', icon: '🌱', title: 'Low phosphorus detected', detail: 'Apply starter fertilizer (high P) before seeding or overseeding this season.' });
            }
            if (st.potassium === 'low') {
                candidates.push({ priority: 6, status: 'caution', icon: '💪', title: 'Low potassium detected', detail: 'Potassium improves drought and stress tolerance. Include K in your next fertilizer application.' });
            }
        }
    }
    // Priority 6b: soil type advisories
    if (lawnProfile && lawnProfile.soilType && SOIL_TYPES[lawnProfile.soilType]) {
        const st = SOIL_TYPES[lawnProfile.soilType];
        if (lawnProfile.soilType === 'clay' || lawnProfile.soilType === 'clay-loam') {
            // Clay: flag compaction risk, prioritize aeration
            const month = new Date().getMonth() + 1; // 1-12
            if (month >= 3 && month <= 5) {
                candidates.push({ priority: 6, status: 'caution', icon: '🔧', title: 'Clay soil — compaction season', detail: 'Spring foot traffic on clay compacts soil quickly. Core aerate before fertilizing for best nutrient uptake.' });
            }
        } else if (lawnProfile.soilType === 'sandy' || lawnProfile.soilType === 'sandy-loam') {
            // Sandy: watering and fertilizer leaching warnings
            if (waterDeficit > weeklyTarget * 0.3 && rain72 < 0.25) {
                candidates.push({ priority: 6, status: 'caution', icon: '💧', title: 'Sandy soil — elevated water deficit', detail: `${st.wateringNote}. Increase irrigation frequency rather than volume.` });
            }
        }
    }
    // Priority 6c: sun/shade advisories
    if (lawnProfile && lawnProfile.sunExposure === 'heavy-shade') {
        const month = new Date().getMonth() + 1;
        if (month >= 8 && month <= 10) {
            candidates.push({ priority: 6, status: 'caution', icon: '🌑', title: 'Heavy shade — seeding window note', detail: 'Seeding success is significantly reduced under heavy shade. Choose certified shade-tolerant varieties (fine fescue, dense shade mix) and overseed at 1.5× normal rate.' });
        }
    }
    // Priority 7: activity cross-reference
    if (lawnProfile && activities && activities.length > 0) {
        const now = new Date();
        const sixWeeksAgo = new Date(now - 42 * 86400000);
        const thisYear = now.getFullYear();
        const growthMonth = new Date().getMonth() + 1;
        const inGrowingSeason = growthMonth >= 4 && growthMonth <= 10;
        if (inGrowingSeason) {
            const recentFert = activities.some(a => a.type === 'fertilizer' && new Date(a.date) >= sixWeeksAgo);
            if (!recentFert && candidates.length < 3) {
                candidates.push({ priority: 7, status: 'caution', icon: '🌾', title: 'No fertilizer logged in 6+ weeks', detail: 'Your activity log shows no fertilizer applied recently. Check your Yearly Gameplan for the recommended next application.' });
            }
        }
        const aerated = activities.some(a => a.type === 'aeration' && new Date(a.date).getFullYear() === thisYear);
        const soilType = lawnProfile.soilType;
        if (!aerated && (soilType === 'clay' || soilType === 'clay-loam') && (growthMonth >= 8 && growthMonth <= 10) && candidates.length < 3) {
            candidates.push({ priority: 7, status: 'caution', icon: '🔧', title: 'No aeration logged this year', detail: 'Clay soil benefits from annual core aeration. Fall is the best window for cool-season grasses; late spring for warm-season.' });
        }
    }

    candidates.sort((a, b) => a.priority - b.priority);
    return candidates.slice(0, 3);
};

export const TodayAdvisoryCard = ({ weather, lawnProfile, activities }) => {
    const advisories = generateAdvisories(weather, lawnProfile, activities);
    if (!advisories.length) return null;
    const statusStyle = {
        hold:    { bg: '#FEF2F2', badge: '#EF4444', badgeText: '#fff', label: 'HOLD',   border: '#FECACA', accentColor: '#EF4444' },
        caution: { bg: '#FFFBEB', badge: '#F59E0B', badgeText: '#fff', label: 'CAUTION', border: '#FDE68A', accentColor: '#F59E0B' },
        go:      { bg: '#F0FDF4', badge: '#16A34A', badgeText: '#fff', label: 'GOOD',   border: '#BBF7D0', accentColor: '#16A34A' },
    };
    const topStatus = advisories.find(a => a.status === 'hold') || advisories.find(a => a.status === 'caution') || advisories[0];
    const topStyle = statusStyle[topStatus.status];
    return (
        <div className="rounded-2xl shadow-sm overflow-hidden" style={{border: `1px solid ${topStyle.border}`, borderLeft: `4px solid ${topStyle.accentColor}`}}>
            <div className="flex items-center justify-between px-4 py-2.5" style={{background: topStyle.bg, borderBottom: `1px solid ${topStyle.border}`}}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background: topStyle.accentColor}}></div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{color: topStyle.accentColor}}>Today's Advisory</span>
                </div>
                <span className="text-xs text-gray-400">{weather.location}</span>
            </div>
            {advisories.map((adv, i) => {
                const s = statusStyle[adv.status];
                return (
                    <div key={i} className="bg-white" style={{borderBottom: i < advisories.length - 1 ? `1px solid ${s.border}` : 'none'}}>
                        <div className="px-4 py-3 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5" style={{background: s.bg}}>
                                {adv.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide" style={{backgroundColor: s.badge, color: s.badgeText}}>{s.label}</span>
                                    <span className="text-sm font-bold text-gray-800">{adv.title}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-snug">{adv.detail}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const getTaskWeatherStatus = (taskText, w, lawnProfile) => {
    if (!w) return null;
    const t = taskText.toLowerCase();
    const isSeed = /seed|overseed|\bsod\b|plug/.test(t);
    const isPreEmergent = /pre-emergent|pre emergent|crabgrass prev|prodiamine|dithiopyr/.test(t);
    const isFertilizer = !isPreEmergent && /fertil|\bfeed\b|nitrogen|weed[- ]and[- ]feed|milorganite|scotts/.test(t);
    const isTreatment = !isPreEmergent && !isFertilizer && !isSeed && /herbicide|fungicide|insecticide|pesticide|post-emergent|treatment|\bspray\b|\bapply\b/.test(t);
    const isMowing = /\bmow\b|cut height|blade height|mowing/.test(t);
    const isWatering = /\bwater\b|irrigat|drought/.test(t);
    const isAeration = /aerat|core plug|plug pull/.test(t);
    const frost = w.frostRiskDays;
    const rainNext24 = w.rainNext24h || 0;
    const rainNext48 = w.rainNext48h || 0;
    const rainNext72 = w.rainNext72h || 0;
    const avgSoil = w.pastAvgSoilTemp ?? w.soilTemp;
    const soilTrend = w.soilTempTrend;
    if (isSeed) {
        if (frost !== null && frost <= 21) return { status: 'hold', reason: `Frost risk in ${frost === 0 ? 'next 24h' : frost + ' days'} — seedlings won't survive`, window: 'Wait until 21+ frost-free days in forecast' };
        if (rainNext24 > 0.5) return { status: 'hold', reason: `Heavy rain (${rainNext24}") in next 24h — seeds wash away`, window: 'Apply after rain passes' };
        if (avgSoil < 50) return { status: 'hold', reason: `Soil avg ${avgSoil}°F is below germination threshold (50°F min)`, window: 'Wait for sustained soil temps above 50°F' };
        return { status: 'go', reason: 'Soil temps and forecast look favorable for seeding', window: null };
    }
    if (isPreEmergent) {
        if (avgSoil >= 55) return { status: 'hold', reason: `Soil avg ${avgSoil}°F — pre-emergent window has passed`, window: 'Switch to post-emergent control' };
        if (rainNext48 > 0.75) return { status: 'hold', reason: `Heavy rain (${rainNext48}") in 48h may wash product before it binds`, window: 'Apply after heavy rain event' };
        return { status: 'go', reason: `Soil avg ${avgSoil}°F is in the pre-emergent window`, window: null };
    }
    if (isFertilizer) {
        if (avgSoil < 50) return { status: 'hold', reason: `Soil avg ${avgSoil}°F — grass not actively growing, can't uptake nutrients`, window: 'Wait for soil temps above 50°F' };
        if (rainNext24 > 0.75) return { status: 'hold', reason: `Heavy rain (${rainNext24}") in next 24h — fertilizer leaches before roots absorb`, window: rainNext72 <= 0.25 ? 'Apply in ~72h' : 'Wait for next dry window' };
        if (w.highTemp > 90) return { status: 'caution', reason: `High of ${w.highTemp}°F — fertilizer can burn heat-stressed turf`, window: null };
        // pH advisory — check soil test data
        if (lawnProfile && lawnProfile.soilTest && lawnProfile.soilTest.pH) {
            const phStatus = getSoilPHStatus(lawnProfile.soilTest.pH, lawnProfile.specificGrass);
            if (phStatus && (phStatus.status === 'low' || phStatus.status === 'high')) {
                return { status: 'caution', reason: `Soil pH ${lawnProfile.soilTest.pH} is out of range — nutrients won't absorb efficiently`, window: phStatus.action + ' before fertilizing for best results' };
            }
        }
        if (rainNext48 > 0.5) return { status: 'caution', reason: `Moderate rain (${rainNext48}") in 48h — watch for runoff on slopes`, window: null };
        // Sandy soil leaching advisory
        if (lawnProfile && (lawnProfile.soilType === 'sandy' || lawnProfile.soilType === 'sandy-loam')) {
            if (rainNext24 > 0.4) return { status: 'caution', reason: `Sandy soil + rain (${rainNext24}") — fertilizer may leach before roots absorb`, window: 'Use slow-release product or wait for drier window' };
        }
        if (rainNext48 < 0.1 && rainNext72 < 0.1) return { status: 'caution', reason: `No rain in forecast — water in within 24h after granular application to activate`, window: 'Apply early morning, then irrigate lightly' };
        return { status: 'go', reason: `Light rain (${rainNext48}") in forecast — ideal to activate granular fertilizer without leaching`, window: null };
    }
    if (isTreatment) {
        if (rainNext24 > 0.1) return { status: 'hold', reason: `Rain expected in next 24h — product washes off`, window: 'Apply after rain clears' };
        if (w.windSpeed > 10) return { status: 'hold', reason: `Wind at ${w.windSpeed} mph — spray drift risk`, window: 'Apply when wind drops below 10 mph' };
        return { status: 'go', reason: 'Clear, calm conditions — good window for treatment', window: null };
    }
    if (isMowing) {
        if (w.precipitation > 0.05 || (w.conditionLabel || '').toLowerCase().includes('rain')) return { status: 'caution', reason: 'Grass is wet — mowing wet spreads disease', window: 'Wait until grass dries' };
        // Shade-adjusted mowing note
        if (lawnProfile && lawnProfile.sunExposure === 'heavy-shade') {
            return { status: 'caution', reason: 'Shaded lawn — mow at the top of your grass type\'s range (3.5–4"). Taller height captures more light in low-sun areas', window: null };
        }
        return { status: 'go', reason: 'Good conditions for mowing', window: null };
    }
    if (isWatering) {
        const soilMult = (lawnProfile && lawnProfile.soilType && SOIL_TYPES[lawnProfile.soilType]) ? SOIL_TYPES[lawnProfile.soilType].wateringMultiplier : 1.0;
        const baseTarget = (w.et0Past7 && w.et0Past7 > 0) ? w.et0Past7 : 1.25;
        const weeklyTarget = Math.round(baseTarget * soilMult * 100) / 100;
        const deficit = weeklyTarget - (w.rainfall || 0) - rainNext48;
        const deficitRounded = Math.round(Math.max(0, deficit) * 100) / 100;
        const soilNote = soilMult !== 1.0 ? ` (${soilMult > 1 ? 'increased' : 'reduced'} for ${SOIL_TYPES[lawnProfile.soilType].name} soil)` : '';
        const targetLabel = (w.et0Past7 && w.et0Past7 > 0) ? `ET0 need (${weeklyTarget}")${soilNote}` : `est. weekly need (${weeklyTarget}")${soilNote}`;
        if (deficit <= 0) return { status: 'hold', reason: `Rain covers ${targetLabel} — skip irrigation this cycle`, window: null };
        if (deficitRounded < 0.25) return { status: 'caution', reason: `Small deficit (~${deficitRounded}") vs ${targetLabel} — monitor before irrigating`, window: null };
        return { status: 'go', reason: `Deficit ~${deficitRounded}" vs ${targetLabel} — supplemental irrigation recommended`, window: null };
    }
    if (isAeration) {
        // Clay soil: elevate aeration to go status when conditions are right
        if (lawnProfile && (lawnProfile.soilType === 'clay' || lawnProfile.soilType === 'clay-loam')) {
            if (w.precipitation > 0.1) return { status: 'go', reason: 'Clay soil benefits from aeration — moist soil improves core plug extraction', window: null };
        }
    }
    return null;
};

export const SeasonBanner = ({ weather }) => {
    const month = new Date().getMonth();
    let seasonLabel, seasonDetail, bannerIcon, actionText, gradFrom, gradTo;
    if (weather) {
        const avgSoil = weather.pastAvgSoilTemp ?? weather.soilTemp;
        const trend = weather.soilTempTrend;
        const trendStr = trend === 'warming' ? ' · warming' : trend === 'cooling' ? ' · cooling' : '';
        const soilStr = `Soil avg ${avgSoil}°F${trendStr}`;
        if (weather.frostRiskDays !== null && weather.frostRiskDays <= 7) {
            const when = weather.frostRiskDays === 0 ? 'next 24h' : `${weather.frostRiskDays} days`;
            seasonLabel = 'Frost Alert'; bannerIcon = '🌡️';
            seasonDetail = `Freezing temps in ${when}`;
            actionText = '→ Hold seeding & treatments';
            gradFrom = '#1e3a5f'; gradTo = '#1e4875';
        } else if (avgSoil < 45) {
            seasonLabel = 'Dormant Season'; bannerIcon = '❄️';
            seasonDetail = soilStr;
            actionText = '→ Plan pre-emergent timing';
            gradFrom = '#1e3a5f'; gradTo = '#1e4875';
        } else if (avgSoil < 55) {
            seasonLabel = 'Early Spring'; bannerIcon = '🌤️';
            seasonDetail = soilStr;
            actionText = trend === 'warming' ? '→ Pre-emergent window opening' : '→ Check pre-emergent timing';
            gradFrom = '#6d3309'; gradTo = '#8a3f0a';
        } else if (avgSoil <= 70) {
            seasonLabel = 'Growing Season'; bannerIcon = '🌱';
            seasonDetail = soilStr;
            actionText = '→ Prime time for lawn care';
            gradFrom = '#1a4f14'; gradTo = '#2d6b20';
        } else if (avgSoil <= 85) {
            seasonLabel = 'Peak Summer'; bannerIcon = '☀️';
            seasonDetail = soilStr;
            actionText = '→ Raise mow height';
            gradFrom = '#7c2d12'; gradTo = '#9a3412';
        } else {
            seasonLabel = 'Heat Stress'; bannerIcon = '🔥';
            seasonDetail = soilStr;
            actionText = '→ Water deeply';
            gradFrom = '#7f1d1d'; gradTo = '#991b1b';
        }
    } else if (month >= 10 || month <= 1) {
        seasonLabel = 'Dormant Season'; bannerIcon = '❄️';
        seasonDetail = 'Plan your spring pre-emergent timing';
        actionText = '→ Plan pre-emergent timing';
        gradFrom = '#1e3a5f'; gradTo = '#1e4875';
    } else if (month >= 2 && month <= 4) {
        seasonLabel = 'Spring Season'; bannerIcon = '🌱';
        seasonDetail = 'Time for pre-emergent and first feeds';
        actionText = '→ Apply first feeds';
        gradFrom = '#1a4f14'; gradTo = '#2d6b20';
    } else if (month >= 5 && month <= 7) {
        seasonLabel = 'Summer Season'; bannerIcon = '☀️';
        seasonDetail = 'Focus on watering and mow height';
        actionText = '→ Raise mow height';
        gradFrom = '#7c2d12'; gradTo = '#9a3412';
    } else {
        seasonLabel = 'Fall Season'; bannerIcon = '🍂';
        seasonDetail = 'Best time to overseed and fertilize';
        actionText = '→ Overseed now';
        gradFrom = '#6d3309'; gradTo = '#8a3f0a';
    }
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
        return `rgba(${r},${g},${b},${alpha})`;
    };
    return (
        <div className="animate-fade-in px-4 py-3 flex items-center justify-between" style={{background: hexToRgba(gradFrom, 0.07), borderLeft: `4px solid ${gradFrom}`}}>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background: hexToRgba(gradFrom, 0.15)}}>
                    {bannerIcon}
                </div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{color: gradFrom}}>{seasonLabel}</div>
                    <div className="text-xs text-gray-600">{seasonDetail}</div>
                </div>
            </div>
            <div className="text-xs font-semibold rounded-lg px-2.5 py-1.5 whitespace-nowrap flex-shrink-0 ml-3" style={{background: hexToRgba(gradFrom, 0.12), color: gradFrom}}>
                {actionText}
            </div>
        </div>
    );
};

export const ForecastImpactCard = ({ tasks, weather, lawnProfile }) => {
    if (!weather || !tasks || tasks.length === 0) return null;
    const evaluated = tasks.map(task => ({ task, result: getTaskWeatherStatus(task, weather, lawnProfile) })).filter(r => r.result !== null);
    const holds = evaluated.filter(e => e.result.status === 'hold');
    const cautions = evaluated.filter(e => e.result.status === 'caution');
    if (holds.length === 0 && cautions.length === 0) {
        return (
            <div className="bg-[#e8f5e9] border border-[#367C2B] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">✅</span>
                    <span className="text-sm font-bold text-[#367C2B]">Good Week for Lawn Work</span>
                </div>
                <div className="text-xs text-gray-600">Forecast conditions are favorable for all recommended tasks this month.</div>
            </div>
        );
    }
    return (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-base">⚠️</span>
                <span className="text-sm font-bold text-gray-800">Weather Timing Alert</span>
            </div>
            <div className="space-y-3">
                {holds.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span className="text-xs font-bold text-white bg-red-500 rounded px-1.5 py-0.5 shrink-0 mt-0.5">HOLD</span>
                        <div>
                            <div className="text-xs font-semibold text-gray-800">{h.task}</div>
                            <div className="text-xs text-gray-600 mt-0.5">{h.result.reason}</div>
                            {h.result.window && <div className="text-xs text-[#367C2B] font-medium mt-0.5">→ {h.result.window}</div>}
                        </div>
                    </div>
                ))}
                {cautions.map((c, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span className="text-xs font-bold text-white bg-amber-500 rounded px-1.5 py-0.5 shrink-0 mt-0.5">NOTE</span>
                        <div>
                            <div className="text-xs font-semibold text-gray-800">{c.task}</div>
                            <div className="text-xs text-gray-600 mt-0.5">{c.result.reason}</div>
                            {c.result.window && <div className="text-xs text-[#367C2B] font-medium mt-0.5">→ {c.result.window}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const WaterDeficitCard = ({ grassInfo, weather }) => {
    if (!weather) return null;
    let weeklyNeed = 1.25;
    if (grassInfo && grassInfo.waterPerWeek) {
        const nums = grassInfo.waterPerWeek.match(/[\d.]+/g);
        if (nums && nums.length === 1) weeklyNeed = parseFloat(nums[0]);
        else if (nums && nums.length >= 2) weeklyNeed = (parseFloat(nums[0]) + parseFloat(nums[1])) / 2;
    }
    // Use ET0 evapotranspiration when available — more accurate than grass-type average
    const usingET0 = weather.et0Past7 && weather.et0Past7 > 0;
    if (usingET0) weeklyNeed = weather.et0Past7;
    const pastRain = weather.rainfall || 0;
    const forecastRain = weather.rainNext48h || 0;
    const deficit = Math.max(0, Math.round((weeklyNeed - pastRain - forecastRain) * 100) / 100);
    const surplus = pastRain + forecastRain >= weeklyNeed;
    const statusIcon = surplus ? '✅' : deficit < 0.5 ? '⚠️' : '💧';
    const statusColor = surplus ? 'text-[#367C2B]' : deficit < 0.5 ? 'text-amber-600' : 'text-blue-700';
    const statusMsg = surplus ? 'Weekly water need covered — skip supplemental irrigation'
        : deficit < 0.25 ? `Minor deficit (~${deficit}") — monitor and supplement if grass shows stress`
        : `Supplement with ~${deficit}" — water early morning for best absorption`;
    return (
        <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-xs font-bold text-blue-700 uppercase mb-3">💧 Weekly Water Budget</div>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div className="bg-white rounded-lg p-2 shadow-sm"><div className="text-xs text-gray-500 mb-0.5">{usingET0 ? 'ET0 need' : 'Weekly need'}</div><div className="text-sm font-bold text-gray-800">{weeklyNeed}"</div></div>
                <div className="bg-white rounded-lg p-2 shadow-sm"><div className="text-xs text-gray-500 mb-0.5">Past 7d rain</div><div className="text-sm font-bold text-gray-800">{pastRain}"</div></div>
                <div className="bg-white rounded-lg p-2 shadow-sm"><div className="text-xs text-gray-500 mb-0.5">Forecast 48h</div><div className="text-sm font-bold text-gray-800">{forecastRain}"</div></div>
            </div>
            <div className={`text-xs font-semibold ${statusColor} flex items-center gap-1.5`}>
                <span>{statusIcon}</span><span>{statusMsg}</span>
            </div>
        </div>
    );
};

export default function WeatherSnapshot({ weather, weatherLoading, lawnProfile, zipLookupLoading, zipLookupError, onZipLookup }) {
    const [zipInput, setZipInput] = useState('');
    if (weatherLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            </div>
        );
    }
    if (!weather) return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-3">
            <div className="flex items-center gap-2 mb-3">
                <div className="text-2xl">📍</div>
                <div className="font-semibold text-gray-700 text-sm">Enter your zip code for local weather</div>
            </div>
            <div className="flex gap-2">
                <input type="text" inputMode="numeric" maxLength={5} value={zipInput} onChange={(e) => setZipInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') onZipLookup(zipInput); }}
                    placeholder="e.g. 43201" className="flex-1 px-3 py-2 border-2 rounded-lg text-sm" />
                <button type="button" onClick={() => onZipLookup(zipInput)} disabled={zipLookupLoading}
                    className="px-4 py-2 bg-[#367C2B] text-white rounded-lg font-semibold text-sm disabled:opacity-60 whitespace-nowrap">
                    {zipLookupLoading ? 'Looking up...' : 'Get Weather'}
                </button>
            </div>
            {zipLookupError && <div className="mt-1 text-xs text-red-600">{zipLookupError}</div>}
        </div>
    );

    let soilRec = '', soilRecColor = 'text-gray-700', soilAlert = null;
    const _curMon = new Date().getMonth();
    const _grassInfo = lawnProfile && GRASS_INFO[lawnProfile.specificGrass] ? GRASS_INFO[lawnProfile.specificGrass] : null;
    const _isCool = _grassInfo && _grassInfo.season === 'Cool Season';
    const _isWarm = _grassInfo && _grassInfo.season === 'Warm Season';
    const _isSpring = _curMon >= 1 && _curMon <= 5;
    const _isFall   = _curMon >= 7 && _curMon <= 10;
    const _st = weather.soilTemp;
    if (_isCool && _isSpring && _st >= 44 && _st < 50) {
        soilRec = '⚠️ Pre-emergent window approaching'; soilRecColor = 'text-amber-600';
        soilAlert = { level: 'warning', text: `Soil ${_st}°F — pre-emergent triggers at 50°F. Apply within the next 1–2 weeks.` };
    } else if (_isCool && _isSpring && _st >= 50 && _st <= 54) {
        soilRec = '🚨 Pre-emergent window open now'; soilRecColor = 'text-orange-600';
        soilAlert = { level: 'urgent', text: `Soil ${_st}°F — apply pre-emergent before it hits 55°F or crabgrass germinates!` };
    } else if (_isCool && _isSpring && _st >= 55 && _st <= 62) {
        soilRec = '🔴 Pre-emergent window has closed'; soilRecColor = 'text-red-600';
        soilAlert = { level: 'note', text: `Soil passed 55°F. Switch to post-emergent herbicide for crabgrass control this season.` };
    } else if (_isCool && _isFall && _st >= 50 && _st <= 65) {
        soilRec = '✅ Prime overseeding window'; soilRecColor = 'text-green-700';
        soilAlert = { level: 'go', text: `Soil ${_st}°F — ideal for cool-season seed germination. Overseed now for best results.` };
    } else if (_isCool && _isFall && _st > 0 && _st < 50) {
        soilRec = '⚠️ Seeding window is closing'; soilRecColor = 'text-amber-600';
        soilAlert = { level: 'warning', text: `Soil ${_st}°F — below 50°F germination threshold. Last call for overseeding this fall.` };
    } else if (_isWarm && _isSpring && _st >= 60 && _st < 65) {
        soilRec = '🌱 Warm-season grass emerging soon'; soilRecColor = 'text-green-700';
        soilAlert = { level: 'go', text: `Soil ${_st}°F — green-up is near. Hold fertilizer until soil consistently hits 65°F.` };
    } else if (_isWarm && _isSpring && _st >= 65 && _st <= 75) {
        soilRec = '✅ Green-up zone — fertilizer ready'; soilRecColor = 'text-[#367C2B]';
        soilAlert = { level: 'go', text: `Soil ${_st}°F — warm-season grass actively growing. Time for first fertilizer application.` };
    } else if (_st < 50) {
        soilRec = '❄️ Too cold for most lawn activity'; soilRecColor = 'text-blue-700';
    } else if (_st <= 65) {
        soilRec = '🌱 Good for cool-season grass care'; soilRecColor = 'text-green-700';
    } else if (_st <= 85) {
        soilRec = '☀️ Ideal growing conditions'; soilRecColor = 'text-[#367C2B]';
    } else {
        soilRec = '🔥 Very warm — focus on watering'; soilRecColor = 'text-orange-700';
    }

    const uvLabel = weather.uvIndex !== null
        ? weather.uvIndex <= 2 ? 'Low' : weather.uvIndex <= 5 ? 'Moderate' : weather.uvIndex <= 7 ? 'High' : 'Very High' : null;

    return (
        <div className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{weather.location} · Live</div>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-gray-900 leading-none">{weather.temperature}°</span>
                                <div className="pb-1.5">
                                    <div className="text-sm font-semibold text-gray-500">Feels like {weather.feelsLike}°</div>
                                    <div className="text-xs text-gray-400">H: {weather.highTemp}° · L: {weather.lowTemp}°</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl">{weather.conditionIcon}</div>
                            <div className="text-xs font-semibold text-gray-600 mt-1.5 bg-gray-100 rounded-lg px-2 py-0.5">{weather.conditionLabel}</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-gray-50">
                    <div className="text-center py-2.5 px-1 bg-white rounded-xl shadow-sm">
                        <svg className="w-3.5 h-3.5 mx-auto mb-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                        <div className="text-[10px] text-gray-400 mb-0.5">Humidity</div>
                        <div className="text-sm font-bold text-gray-800">{weather.humidity}%</div>
                    </div>
                    <div className="text-center py-2.5 px-1 bg-white rounded-xl shadow-sm">
                        <svg className="w-3.5 h-3.5 mx-auto mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
                        <div className="text-[10px] text-gray-400 mb-0.5">Wind</div>
                        <div className="text-sm font-bold text-gray-800">{weather.windSpeed} mph</div>
                    </div>
                    <div className="text-center py-2.5 px-1 bg-white rounded-xl shadow-sm">
                        <svg className="w-3.5 h-3.5 mx-auto mb-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25M8 19v3m4-3v3m4-3v3"/></svg>
                        <div className="text-[10px] text-gray-400 mb-0.5">7-Day Rain</div>
                        <div className="text-sm font-bold text-gray-800">{weather.rainfall}"</div>
                    </div>
                    <div className="text-center py-2.5 px-1 bg-white rounded-xl shadow-sm">
                        {weather.precipProbability !== null ? (
                            <>
                                <svg className="w-3.5 h-3.5 mx-auto mb-1 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg>
                                <div className="text-[10px] text-gray-400 mb-0.5">Rain %</div>
                                <div className="text-sm font-bold text-gray-800">{weather.precipProbability}%</div>
                            </>
                        ) : uvLabel ? (
                            <>
                                <svg className="w-3.5 h-3.5 mx-auto mb-1 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="4"/><path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                                <div className="text-[10px] text-gray-400 mb-0.5">UV</div>
                                <div className="text-sm font-bold text-gray-800">{weather.uvIndex} {uvLabel}</div>
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5 mx-auto mb-1 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="4"/><path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                                <div className="text-[10px] text-gray-400 mb-0.5">UV</div>
                                <div className="text-sm font-bold text-gray-800">—</div>
                            </>
                        )}
                    </div>
                </div>
                <div className="border-t border-gray-100 flex items-center divide-x divide-gray-100">
                    <div className="flex-1 px-4 py-3">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Soil Temp</div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-extrabold text-amber-600">{weather.soilTemp}°F</span>
                            <span className="text-xs text-gray-400">6cm depth · live</span>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-3">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Status</div>
                        <div className={`text-xs font-bold ${soilRecColor}`}>{soilRec}</div>
                    </div>
                </div>
                {soilAlert && (
                    <div className={`px-4 py-2.5 border-t flex items-start gap-2 ${
                        soilAlert.level === 'urgent'  ? 'bg-orange-50 border-orange-100' :
                        soilAlert.level === 'warning' ? 'bg-amber-50 border-amber-100'   :
                        soilAlert.level === 'go'      ? 'bg-green-50 border-green-100'   :
                        'bg-gray-50 border-gray-100'
                    }`}>
                        <div className={`text-xs font-semibold leading-snug ${
                            soilAlert.level === 'urgent'  ? 'text-orange-700' :
                            soilAlert.level === 'warning' ? 'text-amber-700'  :
                            soilAlert.level === 'go'      ? 'text-green-700'  :
                            'text-gray-600'
                        }`}>{soilAlert.text}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
