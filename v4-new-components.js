// ==================== V4.0 NEW COMPONENTS ====================
// INSERT THESE COMPONENTS AT LINE 1669 (BEFORE HistoryView)

// ==================== DASHBOARD COMPONENT ====================
const Dashboard = () => {
// Calculate stats based on current view (year/season/all)
const getFilteredActivities = () => {
const now = new Date();
if (statsView === ‘year’) {
return activities.filter(a => new Date(a.date).getFullYear() === now.getFullYear());
} else if (statsView === ‘season’) {
const year = now.getFullYear();
const seasonStart = new Date(year, 3, 1); // April 1
const seasonEnd = new Date(year, 9, 31); // October 31
return activities.filter(a => {
const date = new Date(a.date);
return date >= seasonStart && date <= seasonEnd;
});
}
return activities; // all
};

```
const filtered = getFilteredActivities();

// Calculate stats
const stats = {
    total: filtered.length,
    mowing: filtered.filter(a => a.type === 'mowing').length,
    fertilizer: filtered.filter(a => a.type === 'fertilizer').length,
    watering: filtered.filter(a => a.type === 'watering').length,
    seeding: filtered.filter(a => a.type === 'seeding').length,
    treatment: filtered.filter(a => a.type === 'treatment').length,
    general: filtered.filter(a => a.type === 'general').length,
    totalHours: filtered.reduce((sum, a) => sum + (parseFloat(a.data?.duration) || 0), 0) / 60
};

// Get monthly data for chart (last 6 months)
const monthlyData = [];
const now = new Date();
for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthActivities = filtered.filter(a => {
        const d = new Date(a.date);
        return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();
    });
    monthlyData.push({
        month: month.toLocaleDateString('en', { month: 'short' }),
        count: monthActivities.length
    });
}

// Recent activities (last 3)
const recent = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

return (
    <div className="pb-20">
        {/* Header */}
        <div className="mb-4">
            <button 
                onClick={() => setView(null)}
                className="text-[#367C2B] hover:text-[#2d6323] font-semibold flex items-center gap-2 mb-4"
            >
                ← Back to Home
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Dashboard</h2>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                {[
                    { key: 'year', label: 'This Year' },
                    { key: 'season', label: 'Season' },
                    { key: 'all', label: 'All Time' }
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setStatsView(key)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition ${
                            statsView === key
                                ? 'bg-[#367C2B] text-white shadow'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100">
                <div className="text-3xl font-bold text-[#367C2B]">{stats.total}</div>
                <div className="text-sm text-gray-600 mt-1">Activities</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100">
                <div className="text-3xl font-bold text-[#367C2B]">{stats.totalHours.toFixed(1)}</div>
                <div className="text-sm text-gray-600 mt-1">Hours</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100">
                <div className="text-3xl font-bold text-[#367C2B]">{stats.mowing}</div>
                <div className="text-sm text-gray-600 mt-1">Mowings</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100">
                <div className="text-3xl font-bold text-[#F97316]">{stats.fertilizer}</div>
                <div className="text-sm text-gray-600 mt-1">Fertilizer Apps</div>
            </div>
        </div>

        {/* Activity Breakdown */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Breakdown</h3>
            <div className="space-y-3">
                {[
                    { type: 'mowing', label: 'Mowing', color: '#367C2B', count: stats.mowing },
                    { type: 'fertilizer', label: 'Fertilizer', color: '#F97316', count: stats.fertilizer },
                    { type: 'watering', label: 'Watering', color: '#3B82F6', count: stats.watering },
                    { type: 'seeding', label: 'Seeding', color: '#92400E', count: stats.seeding },
                    { type: 'treatment', label: 'Treatment', color: '#DC2626', count: stats.treatment },
                    { type: 'general', label: 'General', color: '#6B7280', count: stats.general }
                ].map(({ type, label, color, count }) => {
                    const maxCount = Math.max(stats.mowing, stats.fertilizer, stats.watering, stats.seeding, stats.treatment, stats.general) || 1;
                    const width = (count / maxCount) * 100;
                    return (
                        <div key={type} className="flex items-center gap-3">
                            <div className="w-20 text-sm text-gray-600">{label}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${width}%`, backgroundColor: color }}
                                />
                                <div className="absolute inset-0 flex items-center justify-end pr-3">
                                    <span className="text-sm font-bold" style={{ color: count > 0 ? 'white' : '#6B7280' }}>
                                        {count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Trend</h3>
            <div className="flex items-end justify-between h-40 gap-2">
                {monthlyData.map((data, i) => {
                    const maxCount = Math.max(...monthlyData.map(d => d.count)) || 1;
                    const height = (data.count / maxCount) * 100;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                                <div 
                                    className="w-full bg-[#367C2B] rounded-t-lg transition-all duration-500 flex items-end justify-center pb-1"
                                    style={{ height: `${height}%`, minHeight: data.count > 0 ? '24px' : '0' }}
                                >
                                    {data.count > 0 && (
                                        <span className="text-xs font-bold text-white">{data.count}</span>
                                    )}
                                </div>
                            </div>
                            <div className="text-xs text-gray-600 font-medium">{data.month}</div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🕒 Recent Activity</h3>
            {recent.length > 0 ? (
                <div className="space-y-3">
                    {recent.map(activity => {
                        const daysSince = Math.floor((new Date() - new Date(activity.date)) / (1000 * 60 * 60 * 24));
                        const timeAgo = daysSince === 0 ? 'Today' : daysSince === 1 ? 'Yesterday' : `${daysSince} days ago`;
                        return (
                            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                                <img 
                                    src={ACTIVITY_TYPES[activity.type].icon} 
                                    alt="" 
                                    className="w-10 h-10 rounded-full flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900">{ACTIVITY_TYPES[activity.type].name}</div>
                                    <div className="text-sm text-gray-600">{timeAgo}</div>
                                    {activity.notes && (
                                        <div className="text-xs text-gray-500 mt-1 truncate">{activity.notes}</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📋</div>
                    <div>No activities yet</div>
                </div>
            )}
        </div>
    </div>
);
```

};

// ==================== LAWN PROFILE COMPONENT ====================
const LawnProfile = () => {
const [profileData, setProfileData] = useState(lawnProfile || {
lawnSize: ‘’,
location: ‘’,
grassSeason: ‘cool’,
grassVariety: ‘’,
soilType: ‘’,
sunExposure: ‘’,
zones: []
});

```
const saveLawnProfile = () => {
    localStorage.setItem('lawnProfile', JSON.stringify(profileData));
    setLawnProfile(profileData);
    alert('✅ Lawn profile saved!');
    setView(null);
};

return (
    <div className="pb-20">
        <div className="mb-4">
            <button 
                onClick={() => setView(null)}
                className="text-[#367C2B] hover:text-[#2d6323] font-semibold flex items-center gap-2"
            >
                ← Back to Home
            </button>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lawn Profile</h2>

        {/* Basic Information */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📏 Basic Information</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Lawn Size</label>
                    <input
                        type="number"
                        value={profileData.lawnSize}
                        onChange={(e) => setProfileData({...profileData, lawnSize: e.target.value})}
                        placeholder="5000"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#367C2B] focus:outline-none"
                    />
                    <div className="text-xs text-gray-500 mt-1">Square feet</div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        placeholder="Columbus, OH"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#367C2B] focus:outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Grass Type */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🌾 Grass Type</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setProfileData({...profileData, grassSeason: 'cool'})}
                            className={`py-3 px-4 rounded-lg border-2 font-semibold transition ${
                                profileData.grassSeason === 'cool'
                                    ? 'bg-[#367C2B] text-white border-[#367C2B]'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#367C2B]'
                            }`}
                        >
                            Cool Season
                        </button>
                        <button
                            onClick={() => setProfileData({...profileData, grassSeason: 'warm'})}
                            className={`py-3 px-4 rounded-lg border-2 font-semibold transition ${
                                profileData.grassSeason === 'warm'
                                    ? 'bg-[#367C2B] text-white border-[#367C2B]'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#367C2B]'
                            }`}
                        >
                            Warm Season
                        </button>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grass Variety</label>
                    <input
                        type="text"
                        value={profileData.grassVariety}
                        onChange={(e) => setProfileData({...profileData, grassVariety: e.target.value})}
                        placeholder="Kentucky Bluegrass Mix"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#367C2B] focus:outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Soil & Conditions */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🌍 Soil & Conditions</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                    <select
                        value={profileData.soilType}
                        onChange={(e) => setProfileData({...profileData, soilType: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#367C2B] focus:outline-none"
                    >
                        <option value="">Select soil type...</option>
                        <option value="clay">Clay</option>
                        <option value="sandy">Sandy</option>
                        <option value="loamy">Loamy</option>
                        <option value="silty">Silty</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sun Exposure</label>
                    <select
                        value={profileData.sunExposure}
                        onChange={(e) => setProfileData({...profileData, sunExposure: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#367C2B] focus:outline-none"
                    >
                        <option value="">Select sun exposure...</option>
                        <option value="full">Full Sun (6+ hours)</option>
                        <option value="partial">Partial Shade (3-6 hours)</option>
                        <option value="shade">Shade (&lt;3 hours)</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Save Button */}
        <button
            onClick={saveLawnProfile}
            className="w-full py-4 bg-[#367C2B] text-white rounded-xl font-bold text-lg hover:bg-[#2d6323] transition shadow-lg"
        >
            💾 Save Profile
        </button>
    </div>
);
```

};

// ==================== SETTINGS COMPONENT ====================
const Settings = () => {
const exportData = () => {
const data = {
activities: JSON.parse(localStorage.getItem(‘lawnCareActivities’) || ‘[]’),
equipment: JSON.parse(localStorage.getItem(‘lawnCareEquipment’) || ‘[]’),
profile: JSON.parse(localStorage.getItem(‘lawnProfile’) || ‘null’)
};

```
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yardstick-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
};

const resetData = () => {
    if (confirm('⚠️ This will delete ALL your data. Are you absolutely sure?')) {
        if (confirm('This cannot be undone! Proceed with deleting all activities, equipment, and profile data?')) {
            localStorage.removeItem('lawnCareActivities');
            localStorage.removeItem('lawnCareEquipment');
            localStorage.removeItem('lawnProfile');
            alert('✅ All data has been cleared');
            window.location.reload();
        }
    }
};

return (
    <div className="pb-20">
        <div className="mb-4">
            <button 
                onClick={() => setView(null)}
                className="text-[#367C2B] hover:text-[#2d6323] font-semibold flex items-center gap-2"
            >
                ← Back to Home
            </button>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Settings</h2>

        {/* Data Management */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💾 Data Management</h3>
            
            <button
                onClick={exportData}
                className="w-full py-3 px-4 bg-[#367C2B] text-white rounded-lg font-semibold hover:bg-[#2d6323] transition mb-3"
            >
                📥 Export Data (JSON)
            </button>
            
            <button
                onClick={resetData}
                className="w-full py-3 px-4 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
            >
                🗑️ Reset All Data
            </button>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">ℹ️ About</h3>
            <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Yardstick</strong> - Research-Backed Lawn Care</p>
                <p>Version 4.0 Beta</p>
                <p className="text-xs text-gray-500 mt-4">All data is stored locally in your browser. No account required.</p>
            </div>
        </div>
    </div>
);
```

};
