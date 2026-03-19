import React from 'react';

export default function SyncBanner({ isCloud, currentUser, userName, onSignOut, firebaseConfigured }) {
    if (!firebaseConfigured) return null; // Hide if Firebase not set up yet

    if (isCloud && currentUser) {
        const name = userName || currentUser.displayName || currentUser.email || 'Account';
        return (
            <div className="bg-[#e8f5e9] border-b border-[#367C2B]/20 px-4 py-2">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="cloud-badge">☁️ Cloud Sync On</span>
                        <span className="text-xs text-gray-600 truncate max-w-[140px]">{name}</span>
                    </div>
                    <button onClick={onSignOut} className="text-xs font-semibold text-gray-500 hover:text-gray-700 underline">
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
