import React from 'react';
import { ACTIVITY_TYPES } from '../constants.js';

export default function ActivitySelector({ onSelectType, onCancel, currentUser }) {
    const fb = window.__FIREBASE__ || {};
    const canPhoto = fb.configured && !!currentUser;
    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Select Activity Type</h2>
            <div className="grid grid-cols-2 gap-3">
                {Object.entries(ACTIVITY_TYPES)
                    .filter(([key]) => key !== 'photo' || canPhoto)
                    .map(([key, type]) => {
                        return (
                            <button key={key} onClick={() => onSelectType(key)}
                                className="border-2 p-4 rounded-xl shadow-md card-hover btn-press"
                                style={{background:'var(--ys-green-100)', borderColor:'var(--ys-green-200)'}}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ys-green-600)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--ys-green-200)'}>
                                <div className="text-4xl mb-2 flex items-center justify-center">{type.imgSrc ? <img src={type.imgSrc} className="w-10 h-10 object-contain" alt="" /> : type.icon}</div>
                                <div className="text-base font-bold text-[#367C2B]">{type.name}</div>
                            </button>
                        );
                    })}
            </div>
            <button onClick={onCancel} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg btn-press">Cancel</button>
        </div>
    );
}
