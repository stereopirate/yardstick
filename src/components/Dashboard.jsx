import React, { useState } from 'react';
import { ACTIVITY_COLORS, ACTIVITY_TYPES } from '../constants.js';
import ActivityDetails from './ActivityDetails.jsx';

export default function Dashboard({ activities, statsView, onStatsViewChange, weather, lawnProfile, onNavigate }) {
    const [expandedRecentId, setExpandedRecentId] = useState(null);
    const now = new Date();
    const filtered = statsView === 'year'
        ? activities.filter(a => new Date(a.date).getFullYear() === now.getFullYear())
        : statsView === 'season'
            ? activities.filter(a => { const year = now.getFullYear(); const d = new Date(a.date); return d >= new Date(year, 3, 1) && d <= new Date(year, 9, 31); })
            : activities;
    const stats = {
        total: filtered.length,
        mowing: filtered.filter(a => a.type === 'mowing').length,
        fertilizer: filtered.filter(a => a.type === 'fertilizer').length,
        watering: filtered.filter(a => a.type === 'watering').length,
        seeding: filtered.filter(a => a.type === 'seeding').length,
        trimming: filtered.filter(a => a.type === 'trimming').length,
        aeration: filtered.filter(a => a.type === 'aeration').length,
        treatment: filtered.filter(a => a.type === 'treatment').length,
        maintenance: filtered.filter(a => a.type === 'maintenance').length,
        totalHours: filtered.reduce((sum, a) => sum + (parseFloat(a.data?.duration) || 0), 0) / 60,
        totalSpend: filtered.reduce((sum, a) => sum + (a.cost > 0 ? a.cost : 0), 0)
    };
    // Water budget: logged irrigation (filtered period) + rainfall (past 7 days via weather)
    const week7Ago = new Date(now); week7Ago.setDate(week7Ago.getDate() - 7);
    const loggedIrrigThisWeek = activities
        .filter(a => a.type === 'watering' && new Date(a.date) >= week7Ago)
        .reduce((sum, a) => sum + (parseFloat(a.data?.amount) || 0), 0);
    const loggedIrrigFiltered = Math.round(
        filtered.filter(a => a.type === 'watering').reduce((sum, a) => sum + (parseFloat(a.data?.amount) || 0), 0) * 100
    ) / 100;
    const rainThisWeek = weather ? (weather.rainfall || 0) : 0;
    const et0Target = weather ? (weather.et0Past7 || 1.25) : 1.25;
    const totalWaterThisWeek = Math.round((loggedIrrigThisWeek + rainThisWeek) * 100) / 100;
    const waterPct = Math.min(100, Math.round((totalWaterThisWeek / et0Target) * 100));
    const waterDeficit = Math.max(0, Math.round((et0Target - totalWaterThisWeek) * 100) / 100);
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const count = filtered.filter(a => { const d = new Date(a.date); return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear(); }).length;
        monthlyData.push({ month: month.toLocaleDateString('en', { month: 'short' }), count });
    }
    const recent = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    const breakdownItems = [
        { type: 'mowing', label: 'Mowing', count: stats.mowing },
        { type: 'fertilizer', label: 'Fertilizer', count: stats.fertilizer },
        { type: 'watering', label: 'Watering', count: stats.watering },
        { type: 'seeding', label: 'Seeding', count: stats.seeding },
        { type: 'aeration', label: 'Aeration', count: stats.aeration },
        { type: 'treatment', label: 'Treatments', count: stats.treatment },
        { type: 'maintenance', label: 'Maintenance', count: stats.maintenance }
    ];
    const maxBreakdown = Math.max(...breakdownItems.map(b => b.count)) || 1;
    const maxMonthly = Math.max(...monthlyData.map(d => d.count)) || 1;
    const profileIncomplete = !lawnProfile || !lawnProfile.specificGrass || !lawnProfile.zipCode;
    return (
        <div className="animate-fade-in">
            {profileIncomplete && onNavigate && (
                <div className="flex items-start gap-3 rounded-xl p-4 mb-4" style={{background:'var(--ys-green-600)'}}>
                    <span className="text-xl flex-shrink-0">👋</span>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm leading-snug">Welcome to Yardstick</div>
                        <div className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.85)'}}>Set up your lawn profile to get personalized recommendations</div>
                    </div>
                    <button
                        onClick={() => onNavigate('profile')}
                        className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg btn-press"
                        style={{background:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.35)'}}
                    >
                        Set Up →
                    </button>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-4">
                {[{key:'year',label:'This Year'},{key:'season',label:'Season'},{key:'all',label:'All Time'}].map(({key,label}) => (
                    <button key={key} onClick={() => onStatsViewChange(key)} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition btn-press ${statsView === key ? 'bg-[#367C2B] text-white shadow' : 'text-gray-600'}`}>{label}</button>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#367C2B]"><div className="text-2xl font-bold text-[#367C2B]">{stats.total}</div><div className="text-xs text-gray-500">Total</div></div>
                <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#367C2B]"><div className="text-2xl font-bold text-[#367C2B]">{stats.mowing}</div><div className="text-xs text-gray-500">Mows</div></div>
                <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#F97316]"><div className="text-2xl font-bold text-[#F97316]">{stats.fertilizer}</div><div className="text-xs text-gray-500">Feeds</div></div>
                <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#3B82F6]"><div className="text-2xl font-bold text-[#3B82F6]">{stats.totalHours.toFixed(1)}</div><div className="text-xs text-gray-500">Hours</div></div>
            </div>
            {/* Water Budget Card */}
            {weather && (
                <div className="bg-blue-50 rounded-xl p-4 shadow-md mb-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-blue-800">💧 Total Water — Last 7 Days</h3>
                        <span className="text-xs text-blue-400">{et0Target}" ET0 target</span>
                    </div>
                    <div className="space-y-2 mb-3">
                        {[
                            { label: '🌧️ Rainfall', value: rainThisWeek, color: '#60A5FA' },
                            { label: '💧 Irrigated', value: Math.round(loggedIrrigThisWeek * 100) / 100, color: '#2563EB' },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="flex items-center gap-2">
                                <span className="w-22 text-xs text-blue-700 font-medium flex-shrink-0" style={{width:'5.5rem'}}>{label}</span>
                                <div className="flex-1 bg-blue-100 rounded-full h-6 relative overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-500" style={{width:`${Math.min(100,(value/et0Target)*100)}%`, backgroundColor: color, minWidth: value > 0 ? '24px' : '0'}} />
                                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                                        <span className="text-xs font-bold" style={{color: value > 0 ? '#fff' : '#93C5FD'}}>{value > 0 ? value + '"' : 'none'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-blue-200 pt-2">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold text-blue-900" style={{width:'5.5rem'}}>Total</span>
                            <div className="flex-1 bg-blue-100 rounded-full h-7 relative overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-500" style={{width:`${waterPct}%`, backgroundColor: waterPct >= 100 ? '#367C2B' : waterPct >= 70 ? '#F59E0B' : '#EF4444', minWidth: totalWaterThisWeek > 0 ? '28px' : '0'}} />
                                <div className="absolute inset-0 flex items-center justify-end pr-2">
                                    <span className="text-xs font-bold text-white">{totalWaterThisWeek}" / {et0Target}"</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-blue-700">
                            {waterPct >= 100
                                ? '✅ Weekly water need covered — skip supplemental irrigation'
                                : `⚠️ ~${waterDeficit}" deficit — consider irrigating`}
                        </p>
                        {loggedIrrigThisWeek === 0 && <p className="text-xs text-blue-400 mt-1">💡 Log watering with an "Amount (inches)" to track irrigation here</p>}
                    </div>
                    {loggedIrrigFiltered > 0 && statsView !== 'all' && (
                        <div className="mt-2 pt-2 border-t border-blue-200 flex items-center justify-between">
                            <span className="text-xs text-blue-600">Total irrigated ({statsView === 'year' ? 'this year' : 'this season'})</span>
                            <span className="text-xs font-bold text-blue-800">{loggedIrrigFiltered}"</span>
                        </div>
                    )}
                </div>
            )}
            {stats.totalSpend > 0 && (
                <div className="bg-white rounded-xl px-4 py-3 shadow-md mb-4 flex items-center justify-between border-l-4 border-emerald-500">
                    <div><div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Season Spend</div><div className="text-xl font-extrabold text-gray-800">${stats.totalSpend.toFixed(2)}</div></div>
                    <div className="text-right text-xs text-gray-400"><div>{filtered.filter(a => a.cost > 0).length} logged costs</div><div className="font-semibold text-gray-600">${(stats.totalSpend / (filtered.filter(a => a.cost > 0).length || 1)).toFixed(2)} avg</div></div>
                </div>
            )}
            {!stats.totalSpend && (
                <div className="mb-4 px-3 py-2 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400 text-center">Add a <span className="font-semibold">Cost</span> when logging activities to track season spend</div>
            )}
            <div className="bg-white rounded-xl p-4 shadow-md mb-4">
                <h3 className="text-lg font-bold mb-3">Activity Breakdown</h3>
                <div className="space-y-2">
                    {breakdownItems.map(({ type, label, count }) => {
                        const color = (ACTIVITY_COLORS[type] || ACTIVITY_COLORS.mowing).hex;
                        return (
                            <div key={type} className="flex items-center gap-3">
                                <div className="w-20 text-xs text-gray-600 font-medium">{label}</div>
                                <div className="flex-1 bg-gray-100 rounded-full h-7 relative overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(count / maxBreakdown) * 100}%`, backgroundColor: color }} />
                                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                                        <span className="text-xs font-bold" style={{ color: count > 0 ? 'white' : '#9CA3AF' }}>{count}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md mb-4">
                <h3 className="text-lg font-bold mb-3">Monthly Trend</h3>
                <div className="flex items-end justify-between gap-1" style={{ height: '100px' }}>
                    {monthlyData.map((data, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                                <div className="w-full bg-[#367C2B] rounded-t transition-all duration-500 flex items-end justify-center pb-0.5" style={{ height: `${(data.count / maxMonthly) * 100}%`, minHeight: data.count > 0 ? '20px' : '0' }}>
                                    {data.count > 0 && <span className="text-xs font-bold text-white leading-none">{data.count}</span>}
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 font-medium">{data.month}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
                <h3 className="text-lg font-bold mb-3">🕒 Recent Activity</h3>
                {recent.length > 0 ? recent.map(activity => {
                    const colors = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.mowing;
                    const daysSince = Math.floor((new Date() - new Date(activity.date)) / (1000 * 60 * 60 * 24));
                    const timeAgo = daysSince === 0 ? 'Today' : daysSince === 1 ? 'Yesterday' : `${daysSince} days ago`;
                    return (
                        <div key={activity.id} className={`pb-3 mb-3 border-b last:border-0 cursor-pointer card-hover pl-3 border-l-2 ${colors.border}`} onClick={() => setExpandedRecentId(expandedRecentId === activity.id ? null : activity.id)}>
                            <div className="flex items-center gap-3">
                                <div className="text-2xl flex items-center">{ACTIVITY_TYPES[activity.type]?.imgSrc ? <img src={ACTIVITY_TYPES[activity.type].imgSrc} className="w-7 h-7 object-contain" alt="" /> : (ACTIVITY_TYPES[activity.type]?.icon || '📋')}</div>
                                <div className="flex-1"><div className={`font-semibold ${colors.text}`}>{ACTIVITY_TYPES[activity.type]?.name}</div><div className="text-sm text-gray-500">{timeAgo}</div></div>
                                <span className="text-gray-400 text-xs">{expandedRecentId === activity.id ? '▲' : '▼'}</span>
                            </div>
                            {expandedRecentId === activity.id && <ActivityDetails activity={activity} />}
                        </div>
                    );
                }) : (
                    <div className="text-center py-8 text-gray-500"><div className="text-4xl mb-2">📋</div><div className="text-sm">No activities yet</div></div>
                )}
            </div>
            {/* Tools shortcut */}
            <button onClick={() => onNavigate('tools')} className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3 card-hover btn-press mt-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:'var(--ys-green-100)'}}>🛠️</div>
                <div className="flex-1 min-w-0 text-left">
                    <div className="text-sm font-bold text-gray-800">Lawn Tools</div>
                    <div className="text-xs text-gray-400">Grass Identifier · Application Calculator</div>
                </div>
                <div className="text-xs font-bold flex-shrink-0" style={{color:'var(--ys-green-600)'}}>→</div>
            </button>
        </div>
    );
}
