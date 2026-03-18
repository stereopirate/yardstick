import React, { useState } from 'react';
import { GRASS_INFO, GRASS_KEY_MAP, MONTH_NAMES } from '../constants.js';
import { grassPrograms } from '../grass-programs.js';
import { getTaskWeatherStatus } from './WeatherSnapshot.jsx';

export default function YearlyGameplan({ lawnProfile, weather, onNavigate }) {
    const [activeTab, setActiveTab] = useState('upcoming');
    const currentMonthIdx = new Date().getMonth();
    const currentMonth = MONTH_NAMES[currentMonthIdx];

    const getParentZone = (zone) => zone ? zone.replace(/[ab]$/, '') : zone;

    if (!lawnProfile || !lawnProfile.specificGrass || !lawnProfile.zone) {
        return (
            <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">📅 Lawn Care Program</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
                    <div className="text-3xl mb-2">🌱</div>
                    <div className="font-bold text-gray-800 mb-1">Set Up Your Lawn Profile First</div>
                    <div className="text-sm text-gray-500 mb-4">We need your grass type and zone to build a personalized yearly plan.</div>
                    <button onClick={() => onNavigate('profile')} className="px-6 py-3 bg-[#367C2B] text-white rounded-xl font-bold">
                        Set Up My Lawn →
                    </button>
                </div>
            </div>
        );
    }

    const programKey = GRASS_KEY_MAP[lawnProfile.specificGrass] + '_zone' + getParentZone(lawnProfile.zone);
    const program = grassPrograms[programKey];
    const grassInfo = GRASS_INFO[lawnProfile.specificGrass];

    // Filter out mowing and watering tasks — gameplan focuses on scheduled treatments
    const isGameplanTask = (task) => {
        const lower = task.toLowerCase();
        return !/\bmow(ing)?\b|\bcut (height|grass)\b|mow (weekly|at|every)|watering|irrigat|water (as needed|deeply|1|0\.|per week)|\bdrip\b/.test(lower);
    };

    // Assign a type and color to each task for visual grouping
    const getTaskMeta = (task) => {
        const lower = task.toLowerCase();
        if (/pre-emergent|pre emergent|crabgrass prev|prodiamine|dithiopyr/.test(lower))
            return { icon: '🛡️', label: 'Pre-Emergent', color: 'bg-amber-100 text-amber-800 border-amber-300' };
        if (/overseed|reseed|sow/.test(lower))
            return { icon: '🌱', label: 'Seeding', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
        if (/fertili|feeding|\blb n\b|nitrogen|winterizer/.test(lower))
            return { icon: '🌾', label: 'Fertilizer', color: 'bg-green-100 text-green-800 border-green-300' };
        if (/aerat/.test(lower))
            return { icon: '🔧', label: 'Aeration', color: 'bg-purple-100 text-purple-800 border-purple-300' };
        if (/dethatch|scalp|thatch/.test(lower))
            return { icon: '✂️', label: 'Dethatch/Scalp', color: 'bg-stone-100 text-stone-700 border-stone-300' };
        if (/soil test|lime|ph|potassium|\biron\b/.test(lower))
            return { icon: '🧪', label: 'Soil Care', color: 'bg-orange-100 text-orange-800 border-orange-300' };
        if (/herbicide|weed|post-emergent|broadleaf/.test(lower))
            return { icon: '🌿', label: 'Weed Control', color: 'bg-red-100 text-red-800 border-red-300' };
        if (/fungicide|disease|patch|rust|blight|chinch/.test(lower))
            return { icon: '💊', label: 'Disease/Pest', color: 'bg-pink-100 text-pink-800 border-pink-300' };
        if (/ryegrass|overseed.*rye|winter color/.test(lower))
            return { icon: '🌾', label: 'Winter Overseed', color: 'bg-teal-100 text-teal-800 border-teal-300' };
        return { icon: '📋', label: 'General', color: 'bg-gray-100 text-gray-700 border-gray-300' };
    };

    const isCurrentMonthEntry = (monthStr) => {
        if (monthStr === currentMonth) return true;
        if (monthStr && monthStr.includes('-')) {
            const parts = monthStr.split('-');
            const s = MONTH_NAMES.indexOf(parts[0].trim()), e = MONTH_NAMES.indexOf(parts[1].trim());
            if (s >= 0 && e >= 0 && currentMonthIdx >= s && currentMonthIdx <= e) return true;
        }
        return false;
    };

    const monthIndexForEntry = (monthStr) => {
        if (!monthStr) return -1;
        const direct = MONTH_NAMES.indexOf(monthStr);
        if (direct >= 0) return direct;
        if (monthStr.includes('-')) {
            const s = MONTH_NAMES.indexOf(monthStr.split('-')[0].trim());
            return s >= 0 ? s : -1;
        }
        return -1;
    };

    if (!program) {
        return (
            <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">📅 Lawn Care Program</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    No gameplan is available for {grassInfo?.name || lawnProfile.specificGrass} in Zone {lawnProfile.zone} — this combination may not be recommended for your area.
                </div>
            </div>
        );
    }

    // Build list of entries with only gameplan-relevant tasks
    const allEntries = program.schedule.map(entry => ({
        ...entry,
        gameplanTasks: (entry.tasks || []).filter(isGameplanTask)
    })).filter(e => e.gameplanTasks.length > 0);

    // "Coming Up": current month + next 2 months of entries
    const upcomingEntries = allEntries.filter(entry => {
        if (isCurrentMonthEntry(entry.month)) return true;
        const entryStart = monthIndexForEntry(entry.month);
        if (entryStart < 0) return false;
        const next1 = (currentMonthIdx + 1) % 12;
        const next2 = (currentMonthIdx + 2) % 12;
        return entryStart === next1 || entryStart === next2;
    });

    const MonthCard = ({ entry, isCurrent }) => (
        <div className={`rounded-xl border-2 p-4 ${isCurrent ? 'border-[#367C2B] bg-[#e8f5e9]' : 'border-gray-100 bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-gray-800 flex items-center gap-1.5">
                    {isCurrent && <span className="text-[#367C2B]">▶</span>}
                    <span>{entry.month}</span>
                    {isCurrent && <span className="text-xs font-semibold text-[#367C2B] bg-white px-2 py-0.5 rounded-full border border-[#367C2B] ml-1">Now</span>}
                </div>
                {entry.importance && <span className="text-xs font-bold text-white bg-orange-500 px-2 py-0.5 rounded-full">{entry.importance}</span>}
            </div>
            {entry.soilTemp && <div className="text-xs text-gray-500 mb-2">Target soil temp: {entry.soilTemp}</div>}
            <div className="space-y-2">
                {entry.gameplanTasks.map((task, j) => {
                    const meta = getTaskMeta(task);
                    const ws = weather ? getTaskWeatherStatus(task, weather, lawnProfile) : null;
                    return (
                        <div key={j} className="flex items-start gap-2">
                            <span className="text-base mt-0.5 shrink-0">{meta.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${meta.color}`}>{meta.label}</span>
                                    {ws && <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${ws.status === 'go' ? 'bg-[#e8f5e9] text-[#367C2B]' : ws.status === 'caution' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{ws.status === 'go' ? '✓ Good timing' : ws.status === 'caution' ? '⚠ Note' : '✕ Hold'}</span>}
                                </div>
                                <div className="text-sm text-gray-700 mt-0.5">{task}</div>
                                {ws && ws.reason && <div className={`text-xs mt-0.5 ${ws.status === 'go' ? 'text-[#367C2B]' : ws.status === 'caution' ? 'text-amber-600' : 'text-red-600'}`}>{ws.reason}</div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="space-y-4 animate-fade-in pb-4">
            <div>
                <h2 className="text-2xl font-bold">📅 Lawn Care Program</h2>
                <div className="text-sm text-gray-500 mt-0.5">
                    {grassInfo?.name || lawnProfile.specificGrass} · Zone {lawnProfile.zone}
                    {lawnProfile.lawnSize && ` · ${Number(lawnProfile.lawnSize).toLocaleString()} sq ft`}
                </div>
            </div>

            {/* Rough estimate disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
                <span className="text-blue-500 text-base shrink-0 mt-0.5">ℹ️</span>
                <p className="text-xs text-blue-800 leading-relaxed">
                    <strong>Heads up:</strong> This plan is a general estimate based on your grass type and zone. Actual timing may vary depending on your past treatments, local weather changes, and how your lawn is responding this season. Always adjust accordingly.
                </p>
            </div>

            {program.warning && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-sm text-amber-800">
                    ⚠️ {program.warning}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setActiveTab('upcoming')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition btn-press ${activeTab === 'upcoming' ? 'bg-[#367C2B] text-white shadow' : 'text-gray-600'}`}>
                    Coming Up
                </button>
                <button onClick={() => setActiveTab('full')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition btn-press flex items-center justify-center gap-1.5 ${activeTab === 'full' ? 'bg-[#367C2B] text-white shadow' : 'text-gray-600'}`}>
                    Full Year
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === 'full' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>PRO</span>
                </button>
            </div>

            {activeTab === 'upcoming' && (
                <div className="space-y-3">
                    {upcomingEntries.length === 0 ? (
                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="text-2xl mb-2">✅</div>
                            <div className="font-semibold text-gray-700">You're in a quiet period</div>
                            <div className="text-sm text-gray-500 mt-1">No scheduled treatments in the next couple months. Switch to Full Year to see the whole plan.</div>
                        </div>
                    ) : (
                        upcomingEntries.map((entry, i) => (
                            <MonthCard key={i} entry={entry} isCurrent={isCurrentMonthEntry(entry.month)} />
                        ))
                    )}
                </div>
            )}

            {activeTab === 'full' && (
                <div className="space-y-3">
                    {/* Early tester access banner */}
                    <div className="rounded-xl border flex items-center gap-3 px-3 py-2.5" style={{borderColor:'var(--ys-gold-300)', background:'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'}}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:'var(--ys-gold-500)'}}>
                            <span className="text-white text-xs">⭐</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 text-xs leading-tight" style={{fontFamily:'var(--ys-font-display)'}}>Yardstick Pro — Early Tester Access</div>
                            <div className="text-xs mt-0.5 text-gray-500">Full Year Plan is a Pro feature. You have early tester access.</div>
                        </div>
                    </div>

                    {/* Full year content — unlocked for early testers */}
                    <div className="space-y-3">
                        <div className="text-xs text-gray-500 px-1">{program.description}</div>
                        {allEntries.map((entry, i) => (
                            <MonthCard key={i} entry={entry} isCurrent={isCurrentMonthEntry(entry.month)} />
                        ))}
                    </div>
                </div>
            )}

            {program.sources && program.sources.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">📚 Research Sources</div>
                    <div className="space-y-1">
                        {program.sources.map((s, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                                <span className="text-[#367C2B] mt-0.5">·</span>
                                {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#367C2B] hover:text-[#2d6323] underline font-semibold">{s.institution || s.name}</a> : <span className="font-semibold text-gray-700">{s.institution || s.name}</span>}
                                {s.title && <span className="text-gray-400">— {s.title}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
