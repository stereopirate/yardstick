import React, { useState } from 'react';
import { ACTIVITY_COLORS, ACTIVITY_TYPES } from '../constants.js';
import ActivityDetails from './ActivityDetails.jsx';

export default function HistoryView({ activities, onDelete }) {
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
                                className={`bg-white rounded-xl shadow-md p-4 cursor-pointer card-hover border-l-4 ${colors.border}`}
                                onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="text-3xl flex items-center">{ACTIVITY_TYPES[activity.type]?.imgSrc ? <img src={ACTIVITY_TYPES[activity.type].imgSrc} className="w-8 h-8 object-contain" alt="" /> : (ACTIVITY_TYPES[activity.type]?.icon || '📋')}</div>
                                        <div>
                                            <h3 className={`text-lg font-bold ${colors.text}`}>{ACTIVITY_TYPES[activity.type]?.name || activity.type}</h3>
                                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                                {new Date(activity.date).toLocaleDateString()}
                                                {activity.photoUrl && <span className="text-xs text-gray-400" title="Has photo">📷</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {activity.photoUrl && (
                                            <img src={activity.photoUrl} alt="Activity photo"
                                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                                                style={{cursor:'pointer'}}
                                                onClick={e => { e.stopPropagation(); setExpandedId(expandedId === activity.id ? null : activity.id); }}
                                            />
                                        )}
                                        <span className="text-gray-400 text-sm">{expandedId === activity.id ? '▲' : '▼'}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }}
                                            className="text-red-500 hover:text-red-700 btn-press text-sm"
                                        >Delete</button>
                                    </div>
                                </div>
                                {expandedId === activity.id && (
                                    <div>
                                        {activity.photoUrl && (
                                            <div className="mt-3 rounded-xl overflow-hidden" style={{maxHeight:'260px'}}>
                                                <img src={activity.photoUrl} alt="Activity photo"
                                                    className="w-full object-cover rounded-xl"
                                                    style={{maxHeight:'260px'}} />
                                            </div>
                                        )}
                                        <ActivityDetails activity={activity} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
