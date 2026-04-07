// ─── HistoryView Component ───────────────────────────────────────────────────
// Props:
//   activities  – array of activity objects
//   onDelete    – function(id) called when user deletes an activity
// Globals used: ACTIVITY_TYPES, ACTIVITY_COLORS (constants.js), ActivityDetails (window)

(function () {
    const { useState } = React;
    const ActivityDetails = window.ActivityDetails;

    window.HistoryView = ({ activities, onDelete }) => {
        const sorted = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date));
        const [expandedId, setExpandedId] = useState(null);

        return (
            <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Activity History</h2>
                {sorted.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">No activities yet</div>
                ) : (
                    <div className="space-y-3">
                        {sorted.map(activity => {
                            const colors = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.mowing;
                            return (
                                <div
                                    key={activity.id}
                                    className={`rounded-xl shadow-md p-4 cursor-pointer card-hover border-l-4 ${colors.border}`} style={{background:'var(--ys-cream)'}}
                                    onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3 items-center">
                                            <div className="text-3xl">{ACTIVITY_TYPES[activity.type]?.icon || '📋'}</div>
                                            <div>
                                                <h3 className={`text-lg font-bold ${colors.text}`}>{ACTIVITY_TYPES[activity.type]?.name || activity.type}</h3>
                                                <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 text-sm">{expandedId === activity.id ? '▲' : '▼'}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }}
                                                className="text-red-500 hover:text-red-700 btn-press text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    {expandedId === activity.id && <ActivityDetails activity={activity} />}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };
})();
