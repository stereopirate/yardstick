import React, { useState, useEffect } from 'react';
import { GRASS_INFO, GRASS_KEY_MAP, MONTH_NAMES } from '../constants.js';
import { grassPrograms } from '../grass-programs.js';

const getParentZone = (zone) => zone ? zone.replace(/[ab]$/, '') : zone;

export default function WelcomeSplashCard({ onZipLookup, zipLookupLoading, zipLookupError, lawnProfile, onSignIn, onSaveProfile, onComplete, onDismiss, onManualZone }) {
    const [step, setStep] = useState('splash'); // 'splash' | 'grass' | 'done'
    const [zipInput, setZipInput] = useState('');
    const [localZipError, setLocalZipError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [selectedGrass, setSelectedGrass] = useState('');
    const [zonePickerValue, setZonePickerValue] = useState('');
    const [idOpen, setIdOpen] = useState(false);

    // Detect successful zip lookup → advance to grass step
    useEffect(() => {
        if (submitted && !zipLookupLoading) {
            if (!zipLookupError && lawnProfile && lawnProfile.zone) {
                setStep('grass');
            }
            setSubmitted(false);
        }
    }, [submitted, zipLookupLoading, zipLookupError, lawnProfile && lawnProfile.zone]);

    const handleZipSubmit = () => {
        const zip = zipInput.trim();
        if (!/^\d{5}$/.test(zip)) { setLocalZipError('Enter a valid 5-digit US zip code.'); return; }
        setLocalZipError('');
        setSubmitted(true);
        onZipLookup(zip);
    };

    const handleGrassSelect = async (grassKey) => {
        setSelectedGrass(grassKey);
        const existing = localStorage.getItem('lawnProfile');
        const merged = Object.assign({}, existing ? JSON.parse(existing) : {}, { specificGrass: grassKey });
        await onSaveProfile(merged);
        onComplete && onComplete();
        setStep('done');
    };

    const COOL = [
        { key: 'tall-fescue',       name: 'Tall Fescue' },
        { key: 'kentucky-bluegrass', name: 'Kentucky Bluegrass' },
        { key: 'perennial-ryegrass', name: 'Perennial Ryegrass' },
        { key: 'fine-fescue',        name: 'Fine Fescue' },
    ];
    const BLENDS = [
        { key: 'sun-shade-mix',     name: 'Sun & Shade Mix',   note: 'KBG + Rye + Fine Fescue' },
        { key: 'dense-shade-mix',   name: 'Dense Shade Mix',   note: 'Fine Fescue dominant' },
        { key: 'tall-fescue-blend', name: 'Tall Fescue Blend', note: 'Tall Fescue + KBG' },
    ];
    const WARM = [
        { key: 'bermuda',      name: 'Bermudagrass' },
        { key: 'zoysia',       name: 'Zoysiagrass' },
        { key: 'st-augustine', name: 'St. Augustinegrass' },
        { key: 'centipede',    name: 'Centipedegrass' },
        { key: 'bahia',        name: 'Bahiagrass' },
        { key: 'buffalograss', name: 'Buffalograss' },
    ];

    const features = [
        { icon: '🔬', label: 'University-Backed',  desc: '25 extension programs, not guesses' },
        { icon: '📅', label: 'Personalized Plan',  desc: 'Month-by-month tasks for your grass & zone' },
        { icon: '🌤️', label: 'Weather-Smart',      desc: 'Local forecast-based advisories' },
        { icon: '📊', label: 'Track Everything',   desc: 'Every mow, feed, and treatment logged' },
    ];

    const accountPerks = [
        { icon: '☁️', text: 'Sync your data across all your devices' },
        { icon: '🌱', text: 'Save a detailed lawn & grass profile' },
        { icon: '🎯', text: 'More personalized recommendations over time' },
        { icon: '📋', text: 'Full activity history — every mow, feed & treatment' },
        { icon: '🗓️', text: 'Seasonal care reminders for your grass type' },
    ];

    // ── Step 1: Splash ──
    if (step === 'splash') return (
        <div className="rounded-2xl overflow-hidden animate-fade-in" style={{
            background: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            border: '1px solid rgba(0,0,0,0.06)',
        }}>
            {/* Top accent bar */}
            <div style={{height:'4px', background:'linear-gradient(90deg, var(--ys-green-700) 0%, var(--ys-green-500) 60%, var(--ys-yellow) 100%)'}} />

            <div className="px-5 pt-5 pb-5">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{background:'var(--ys-green-100)', color:'var(--ys-green-700)', border:'1px solid var(--ys-green-200)'}}>
                    🌿 Free &middot; No Account Required
                </div>
                {/* Headline */}
                <h2 className="text-2xl font-bold leading-tight mb-2"
                    style={{fontFamily:'var(--ys-font-display)', color:'var(--ys-soil-800)'}}>
                    Enter your zip.<br/>Get your grass program.
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                    Research-backed care plans from 25 university extension programs — personalized to your grass type, USDA zone, and local weather.
                </p>
                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                    {features.map(f => (
                        <div key={f.label} className="flex items-start gap-2.5 rounded-xl px-3 py-2.5"
                            style={{background:'var(--ys-green-50)', border:'1px solid var(--ys-green-100)'}}>
                            <span className="text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
                            <div>
                                <div className="text-xs font-bold leading-tight" style={{color:'var(--ys-soil-800)'}}>{f.label}</div>
                                <div className="text-xs leading-tight text-gray-500">{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Zip input */}
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'var(--ys-green-700)'}}>
                    Step 1 of 2 — Your zip code
                </div>
                <div className="flex gap-2 mb-1">
                    <input
                        type="text" inputMode="numeric" pattern="\d*" maxLength={5}
                        value={zipInput}
                        onChange={e => { setZipInput(e.target.value.replace(/\D/g,'')); setLocalZipError(''); }}
                        onKeyDown={e => { if (e.key === 'Enter') handleZipSubmit(); }}
                        placeholder="Enter your zip code"
                        className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold outline-none"
                        style={{background:'var(--ys-canvas)', color:'var(--ys-soil-800)', border:'2px solid var(--ys-green-200)', fontFamily:'var(--ys-font-body)'}}
                    />
                    <button onClick={handleZipSubmit} disabled={zipLookupLoading}
                        className="ys-btn-primary px-4 py-3 text-sm font-bold rounded-xl flex-shrink-0 btn-press"
                        style={{minWidth:'96px', opacity:zipLookupLoading?0.7:1}}>
                        {zipLookupLoading ? '…' : 'Get My Plan →'}
                    </button>
                </div>
                {(localZipError || zipLookupError) && (
                    <div className="text-xs font-semibold px-1 py-1" style={{color:'#DC2626'}}>
                        ⚠️ {localZipError || zipLookupError}
                    </div>
                )}
                {zipLookupError && (
                    <div className="mt-3 pt-3" style={{borderTop:'1px solid var(--ys-green-100)'}}>
                        <div className="text-xs font-semibold mb-1.5" style={{color:'var(--ys-soil-600)'}}>Select your USDA zone manually to continue:</div>
                        <div className="flex gap-2">
                            <select
                                value={zonePickerValue}
                                onChange={e => setZonePickerValue(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-xl text-sm font-semibold outline-none"
                                style={{background:'var(--ys-canvas)', color:'var(--ys-soil-800)', border:'2px solid var(--ys-green-200)', fontFamily:'var(--ys-font-body)'}}>
                                <option value="">— Pick your zone —</option>
                                {['4','4a','4b','5','5a','5b','6','6a','6b','7','7a','7b','8','8a','8b','9','9a','9b'].map(z => (
                                    <option key={z} value={z}>Zone {z.toUpperCase()}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                disabled={!zonePickerValue}
                                onClick={() => {
                                    if (!zonePickerValue) return;
                                    onManualZone && onManualZone(zonePickerValue);
                                    setStep('grass');
                                }}
                                className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold btn-press"
                                style={{background:'var(--ys-green-600)', color:'white', opacity: zonePickerValue ? 1 : 0.5}}>
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Sign-in section — prominent, contrasting footer */}
            <div className="px-5 py-4 flex items-center justify-between gap-4"
                style={{background:'var(--ys-canvas)', borderTop:'1px solid rgba(0,0,0,0.06)'}}>
                <div>
                    <div className="text-sm font-bold" style={{color:'var(--ys-soil-800)'}}>Already have an account?</div>
                    <div className="text-xs text-gray-500">Sign in to restore your lawn data</div>
                </div>
                <button onClick={onSignIn}
                    className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold btn-press"
                    style={{background:'var(--ys-green-800)', color:'white', border:'none', whiteSpace:'nowrap'}}>
                    Log In →
                </button>
            </div>
        </div>
    );

    // ── Step 2: Grass type ──
    if (step === 'grass') return (
        <div className="rounded-2xl overflow-hidden animate-fade-in ys-card">
            <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{background:'var(--ys-green-100)'}}>🌱</div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-0.5"
                            style={{color:'var(--ys-green-600)'}}>
                            Zone {lawnProfile && lawnProfile.zone ? lawnProfile.zone.toUpperCase() : '–'} &middot; Step 2 of 2
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 leading-tight"
                            style={{fontFamily:'var(--ys-font-display)'}}>
                            What type of grass do you have?
                        </h3>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                    Knowing your grass type unlocks a research-backed year-round care plan. Use the zone hints on each section, or expand the identifier below.
                </p>
                {/* Cool Season */}
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'#3B82F6'}}>❄️ Cool Season — Zones 5–7 (Northern US)</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {COOL.map(g => (
                        <button key={g.key} onClick={() => handleGrassSelect(g.key)}
                            className="text-left px-3 py-2.5 rounded-xl border-2 text-sm font-semibold btn-press transition"
                            style={{
                                borderColor: selectedGrass === g.key ? 'var(--ys-green-600)' : '#E5E7EB',
                                background:  selectedGrass === g.key ? 'var(--ys-green-50)' : 'white',
                                color:       selectedGrass === g.key ? 'var(--ys-green-700)' : '#374151',
                            }}>
                            {g.name}
                        </button>
                    ))}
                </div>
                {/* Cool Season Blends */}
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'#8B5CF6'}}>🌿 Cool Season Blends — Popular Seed Mixes</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {BLENDS.map(g => (
                        <button key={g.key} onClick={() => handleGrassSelect(g.key)}
                            className="text-left px-3 py-2.5 rounded-xl border-2 text-sm font-semibold btn-press transition"
                            style={{
                                borderColor: selectedGrass === g.key ? 'var(--ys-green-600)' : '#E5E7EB',
                                background:  selectedGrass === g.key ? 'var(--ys-green-50)' : 'white',
                                color:       selectedGrass === g.key ? 'var(--ys-green-700)' : '#374151',
                            }}>
                            <div>{g.name}</div>
                            <div className="text-xs font-normal mt-0.5" style={{color: selectedGrass === g.key ? 'var(--ys-green-600)' : '#9CA3AF'}}>{g.note}</div>
                        </button>
                    ))}
                </div>
                {/* Warm Season */}
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'#F97316'}}>☀️ Warm Season — Zones 8–10 (Southern US)</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                    {WARM.map(g => (
                        <button key={g.key} onClick={() => handleGrassSelect(g.key)}
                            className="text-left px-3 py-2.5 rounded-xl border-2 text-sm font-semibold btn-press transition"
                            style={{
                                borderColor: selectedGrass === g.key ? 'var(--ys-green-600)' : '#E5E7EB',
                                background:  selectedGrass === g.key ? 'var(--ys-green-50)' : 'white',
                                color:       selectedGrass === g.key ? 'var(--ys-green-700)' : '#374151',
                            }}>
                            {g.name}
                        </button>
                    ))}
                </div>
                {/* "Help me identify" accordion */}
                <div className="mb-3 rounded-xl border border-gray-200 overflow-hidden">
                    <button onClick={() => setIdOpen(o => !o)}
                        className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 btn-press"
                        style={{border:'none'}}>
                        <span className="text-xs font-semibold text-gray-500">🔍 Not sure? Help me identify my grass</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2.5} strokeLinecap="round"
                            style={{transform: idOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s', flexShrink:0}}>
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </button>
                    {idOpen && (
                        <div className="px-3 py-3 bg-white space-y-2.5 border-t border-gray-100">
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="flex-shrink-0">❄️</span>
                                <span><strong className="text-gray-800">Green in winter, struggles in peak summer heat?</strong> Cool season — Tall Fescue, Kentucky Bluegrass, or Ryegrass.</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="flex-shrink-0">☀️</span>
                                <span><strong className="text-gray-800">Tan/straw in winter, lush in summer?</strong> Warm season — Bermudagrass, Zoysia, or St. Augustine.</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="flex-shrink-0">📍</span>
                                <span><strong className="text-gray-800">Zone 7 or further south (TX, GA, FL, Carolinas)?</strong> Almost certainly warm season unless you specifically seeded cool season grass.</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="flex-shrink-0">🔬</span>
                                <span><strong className="text-gray-800">Still unsure?</strong> Your local cooperative extension office can ID a grass sample for free —{' '}
                                    <a href={`https://www.google.com/search?q=cooperative+extension+office+grass+identification`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="font-semibold underline" style={{color:'var(--ys-green-600)'}}>
                                        find yours here
                                    </a>.
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={() => { onComplete && onComplete(); setStep('done'); }}
                    className="w-full text-center text-xs text-gray-400 btn-press py-1">
                    Skip for now — I'll set this in My Yard later
                </button>
            </div>
        </div>
    );

    // ── Step 3: Done — show real tasks preview then CTA ──
    const doneGrassInfo = selectedGrass && GRASS_INFO[selectedGrass] ? GRASS_INFO[selectedGrass] : null;
    const doneProgramKey = selectedGrass && lawnProfile && lawnProfile.zone
        ? (GRASS_KEY_MAP[selectedGrass] + '_zone' + getParentZone(lawnProfile.zone))
        : null;
    const doneProgram = doneProgramKey ? grassPrograms[doneProgramKey] : null;
    const currentMonthName = MONTH_NAMES[new Date().getMonth()];
    const isGameplanTask = (t) => !/\bmow(ing)?\b|\bcut (height|grass)\b|mow (weekly|at|every)|watering|irrigat|water (as needed|deeply|1|0\.|per week)|\bdrip\b/.test(t.toLowerCase());
    const getTaskIcon = (t) => {
        const l = t.toLowerCase();
        if (/pre-emergent|crabgrass/.test(l)) return '🛡️';
        if (/overseed|reseed/.test(l)) return '🌱';
        if (/fertili|nitrogen|winterizer/.test(l)) return '🌾';
        if (/aerat/.test(l)) return '🔧';
        if (/dethatch|scalp/.test(l)) return '✂️';
        if (/soil test|lime/.test(l)) return '🧪';
        if (/herbicide|weed/.test(l)) return '🌿';
        if (/fungicide|disease/.test(l)) return '💊';
        return '📋';
    };

    // Pull this month's tasks from the program
    let previewTasks = [];
    if (doneProgram && doneProgram.schedule) {
        const currentIdx = new Date().getMonth();
        for (const entry of doneProgram.schedule) {
            const m = entry.month || '';
            const match = m === currentMonthName || (m.includes('-') && (() => {
                const parts = m.split('-');
                const s = MONTH_NAMES.indexOf(parts[0].trim()), e = MONTH_NAMES.indexOf(parts[1].trim());
                return s >= 0 && e >= 0 && currentIdx >= s && currentIdx <= e;
            })());
            if (match && entry.tasks) {
                previewTasks = entry.tasks.filter(isGameplanTask).slice(0, 3);
                break;
            }
        }
    }

    return (
        <div className="rounded-2xl overflow-hidden animate-scale-in" style={{
            background: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.06)',
        }}>
            {/* Green header */}
            <div style={{background:'linear-gradient(135deg, var(--ys-green-800) 0%, var(--ys-green-700) 100%)'}}>
                <div className="px-5 pt-5 pb-4 text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                        style={{background:'var(--ys-yellow)'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ys-soil-800)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1" style={{fontFamily:'var(--ys-font-display)'}}>
                        Your plan is ready!
                    </h3>
                    {doneGrassInfo && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                            style={{background:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.22)'}}>
                            🌱 {doneGrassInfo.name} · Zone {lawnProfile && lawnProfile.zone ? lawnProfile.zone.toUpperCase() : '–'}
                        </div>
                    )}
                </div>
            </div>

            {/* Task preview — this month */}
            {previewTasks.length > 0 && (
                <div className="px-5 pt-4 pb-3">
                    <div className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{color:'var(--ys-green-600)'}}>
                        📅 {currentMonthName} Tasks for Your Lawn
                    </div>
                    <div className="space-y-2 mb-1">
                        {previewTasks.map((task, i) => (
                            <div key={i} className="flex items-start gap-2.5 rounded-xl px-3 py-2.5"
                                style={{background:'var(--ys-green-50)', border:'1px solid var(--ys-green-100)'}}>
                                <span className="text-base flex-shrink-0 mt-0.5">{getTaskIcon(task)}</span>
                                <span className="text-xs text-gray-700 leading-snug">{task}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-xs text-gray-400 text-center pt-1">
                        + a full 12-month program waiting in your dashboard
                    </div>
                </div>
            )}

            {/* CTA section */}
            <div className="px-5 pt-2 pb-5">
                <button onClick={onDismiss}
                    className="w-full py-3.5 rounded-xl text-sm font-bold btn-press mb-2"
                    style={{background:'var(--ys-green-700)', color:'white', border:'none'}}>
                    Go to My Dashboard →
                </button>
                <button onClick={onSignIn}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold btn-press"
                    style={{background:'var(--ys-yellow)', color:'var(--ys-soil-800)', border:'none'}}>
                    Save My Plan — Create Free Account
                </button>
                <div className="text-center mt-2 text-xs text-gray-400">
                    Your plan is saved locally — create an account to sync across devices
                </div>
            </div>
        </div>
    );
}
