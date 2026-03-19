import React from 'react';
import { ACTIVITY_TYPES, TREATMENT_CATEGORIES } from '../constants.js';

export default function ActivityDetails({ activity }) {
    const activityType = ACTIVITY_TYPES[activity.type];
    if (!activityType || !activity.data) return null;
    const fields = activityType.fields || [];
    const details = fields.filter(f => activity.data[f.name]).map(f => {
        let value = activity.data[f.name];
        if (f.name === 'category' && TREATMENT_CATEGORIES[value]) {
            value = TREATMENT_CATEGORIES[value].icon + ' ' + TREATMENT_CATEGORIES[value].label;
        }
        return { label: f.label, value };
    });
    if (details.length === 0 && !activity.notes) return null;
    return (
        <div className="mt-3 pt-3 border-t border-gray-200">
            {details.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {details.map(d => (
                        <div key={d.label}>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">{d.label}</div>
                            <div className="text-sm font-medium text-gray-800">{d.value}</div>
                        </div>
                    ))}
                </div>
            )}
            {activity.cost > 0 && (
                <div className="mt-2 flex items-center gap-1.5">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Cost</div>
                    <div className="text-sm font-semibold text-gray-800">${parseFloat(activity.cost).toFixed(2)}</div>
                </div>
            )}
            {activity.notes && (
                <div className="mt-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Notes</div>
                    <div className="text-sm text-gray-700">{activity.notes}</div>
                </div>
            )}
        </div>
    );
}
