// ─── Dashboard Component ─────────────────────────────────────────────────────
// Props:
//   activities        – array of activity objects
//   statsView         – 'year' | 'season' | 'all'
//   onStatsViewChange – function(key) called when user switches the time filter
// Globals used: ACTIVITY_TYPES, ACTIVITY_COLORS (constants.js), ActivityDetails (window)

(function () {
    const { useState } = React;
    const ActivityDetails = window.ActivityDetails;
    const HistoryView = window.HistoryView;

    window.Dashboard = ({ activities, statsView, onStatsViewChange, onDelete }) => {
        const [expandedRecentId, setExpandedRecentId] = useState(null);
        const now = new Date();

        const filtered = statsView === 'year'
            ? activities.filter(a => new Date(a.date).getFullYear() === now.getFullYear())
            : statsView === 'season'
                ? activities.filter(a => {
                    const year = now.getFullYear();
                    const d = new Date(a.date);
                    return d >= new Date(year, 3, 1) && d <= new Date(year, 9, 31);
                })
                : activities;

        const stats = {
            total:       filtered.length,
            mowing:      filtered.filter(a => a.type === 'mowing').length,
            fertilizer:  filtered.filter(a => a.type === 'fertilizer').length,
            watering:    filtered.filter(a => a.type === 'watering').length,
            seeding:     filtered.filter(a => a.type === 'seeding').length,
            trimming:    filtered.filter(a => a.type === 'trimming').length,
            aeration:    filtered.filter(a => a.type === 'aeration').length,
            treatment:   filtered.filter(a => a.type === 'treatment').length,
            maintenance: filtered.filter(a => a.type === 'maintenance').length,
            totalHours:  filtered.reduce((sum, a) => sum + (parseFloat(a.data?.duration) || 0), 0) / 60,
            totalSpend:  filtered.reduce((sum, a) => sum + (a.cost > 0 ? a.cost : 0), 0)
        };

        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
            const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const count = filtered.filter(a => {
                const d = new Date(a.date);
                return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();
            }).length;
            monthlyData.push({ month: month.toLocaleDateString('en', { month: 'short' }), count });
        }

        const recent = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

        const breakdownItems = [
            { type: 'mowing',      label: 'Mowing',      count: stats.mowing },
            { type: 'fertilizer',  label: 'Fertilizer',  count: stats.fertilizer },
            { type: 'watering',    label: 'Watering',    count: stats.watering },
            { type: 'seeding',     label: 'Seeding',     count: stats.seeding },
            { type: 'aeration',    label: 'Aeration',    count: stats.aeration },
            { type: 'treatment',   label: 'Treatments',  count: stats.treatment },
            { type: 'maintenance', label: 'Maintenance', count: stats.maintenance }
        ];
        const maxBreakdown = Math.max(...breakdownItems.map(b => b.count)) || 1;
        const maxMonthly   = Math.max(...monthlyData.map(d => d.count)) || 1;

        return (
            <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">📊 Lawn Stats</h2>

                {/* Time filter */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-4">
                    {[{key:'year',label:'This Year'},{key:'season',label:'Season'},{key:'all',label:'All Time'}].map(({key,label}) => (
                        <button
                            key={key}
                            onClick={() => onStatsViewChange(key)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition btn-press ${statsView === key ? 'bg-[#367C2B] text-white shadow' : 'text-gray-600'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-4 gap-2 mb-2">
                    <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#367C2B]"><div className="text-2xl font-bold text-[#367C2B]">{stats.total}</div><div className="text-xs text-gray-500">Total</div></div>
                    <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#367C2B]"><div className="text-2xl font-bold text-[#367C2B]">{stats.mowing}</div><div className="text-xs text-gray-500">Mows</div></div>
                    <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#F97316]"><div className="text-2xl font-bold text-[#F97316]">{stats.fertilizer}</div><div className="text-xs text-gray-500">Feeds</div></div>
                    <div className="bg-white rounded-xl p-3 shadow-md text-center border-t-2 border-[#3B82F6]"><div className="text-2xl font-bold text-[#3B82F6]">{stats.totalHours.toFixed(1)}</div><div className="text-xs text-gray-500">Hours</div></div>
                </div>

                {/* Season spend */}
                {stats.totalSpend > 0 && (
                    <div className="bg-white rounded-xl px-4 py-3 shadow-md mb-4 flex items-center justify-between border-l-4 border-emerald-500">
                        <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Season Spend</div>
                            <div className="text-xl font-extrabold text-gray-800">${stats.totalSpend.toFixed(2)}</div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                            <div>{filtered.filter(a => a.cost > 0).length} logged costs</div>
                            <div className="font-semibold text-gray-600">${(stats.totalSpend / (filtered.filter(a => a.cost > 0).length || 1)).toFixed(2)} avg</div>
                        </div>
                    </div>
                )}
                {!stats.totalSpend && (
                    <div className="mb-4 px-3 py-2 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400 text-center">
                        Add a <span className="font-semibold">Cost</span> when logging activities to track season spend
                    </div>
                )}

                {/* Activity breakdown */}
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

                {/* Monthly trend */}
                <div className="bg-white rounded-xl p-4 shadow-md mb-4">
                    <h3 className="text-lg font-bold mb-3">Monthly Trend</h3>
                    <div className="flex items-end justify-between gap-1" style={{ height: '100px' }}>
                        {monthlyData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                                    <div
                                        className="w-full bg-[#367C2B] rounded-t transition-all duration-500 flex items-end justify-center pb-0.5"
                                        style={{ height: `${(data.count / maxMonthly) * 100}%`, minHeight: data.count > 0 ? '20px' : '0' }}
                                    >
                                        {data.count > 0 && <span className="text-xs font-bold text-white leading-none">{data.count}</span>}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 font-medium">{data.month}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent activity */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <h3 className="text-lg font-bold mb-3">🕒 Recent Activity</h3>
                    {recent.length > 0 ? recent.map(activity => {
                        const colors = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.mowing;
                        const daysSince = Math.floor((new Date() - new Date(activity.date)) / (1000 * 60 * 60 * 24));
                        const timeAgo = daysSince === 0 ? 'Today' : daysSince === 1 ? 'Yesterday' : `${daysSince} days ago`;
                        return (
                            <div
                                key={activity.id}
                                className={`pb-3 mb-3 border-b last:border-0 cursor-pointer card-hover pl-3 border-l-2 ${colors.border}`}
                                onClick={() => setExpandedRecentId(expandedRecentId === activity.id ? null : activity.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{ACTIVITY_TYPES[activity.type]?.icon || '📋'}</div>
                                    <div className="flex-1">
                                        <div className={`font-semibold ${colors.text}`}>{ACTIVITY_TYPES[activity.type]?.name}</div>
                                        <div className="text-sm text-gray-500">{timeAgo}</div>
                                    </div>
                                    <span className="text-gray-400 text-xs">{expandedRecentId === activity.id ? '▲' : '▼'}</span>
                                </div>
                                {expandedRecentId === activity.id && <ActivityDetails activity={activity} />}
                            </div>
                        );
                    }) : (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">📋</div>
                            <div className="text-sm">No activities yet</div>
                        </div>
                    )}
                </div>

                {/* Activity History */}
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-3">📋 Activity History</h3>
                    <HistoryView activities={activities} onDelete={onDelete} />
                </div>
            </div>
        );
    };
})();
