import React from 'react';
import { GRASS_INFO, ZONE_INFO } from '../constants.js';

const getParentZone = (zone) => zone ? zone.replace(/[ab]$/, '') : zone;

export default function AccountPage({ activities, equipment, lawnProfile, store, currentUser, onSignOut, onSignIn, firebaseConfigured, userName, onUserNameChange, onNavigate }) {
    const EMAIL = 'yardsticklawncareapp@gmail.com';
    const fb = window.__FIREBASE__ || {};

    // ── Name field state ─────────────────────────────────────────────────────
    const resolvedName = userName || (currentUser?.displayName?.split(' ')[0]) || '';
    const [nameInput, setNameInput] = React.useState(resolvedName);
    const [nameEditing, setNameEditing] = React.useState(false);
    const saveName = () => { onUserNameChange(nameInput); setNameEditing(false); };

    // ── Share ────────────────────────────────────────────────────────────────
    const [shareCopied, setShareCopied] = React.useState(false);
    const handleShare = () => {
        const msg = '🌿 I\'ve been tracking my lawn care with Yardstick — it\'s free and research-backed! Check it out: https://yardstick.diy';
        navigator.clipboard.writeText(msg).then(() => {
            window.trackEvent('share', { method: 'clipboard', content_type: 'app_referral' });
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2500);
        });
    };

    // ── Data management ──────────────────────────────────────────────────────
    const [dataOpen, setDataOpen] = React.useState(false);
    const exportData = () => {
        const data = { activities, equipment, profile: lawnProfile };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `yardstick-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        window.trackEvent('data_exported', { activity_count: activities.length, equipment_count: equipment.length });
    };
    const resetData = () => {
        if (confirm('⚠️ Delete ALL data? This cannot be undone!')) {
            localStorage.removeItem('lawnCareActivities');
            localStorage.removeItem('lawnCareEquipment');
            localStorage.removeItem('lawnProfile');
            localStorage.removeItem('yardstick_display_name');
            window.location.reload();
        }
    };

    // ── Delete account ───────────────────────────────────────────────────────
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = React.useState('');
    const [deleteStatus, setDeleteStatus] = React.useState(null); // null | 'deleting' | 'error'
    const [deleteError, setDeleteError] = React.useState('');
    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'DELETE') return;
        setDeleteStatus('deleting');
        setDeleteError('');
        try {
            if (store.isCloud && currentUser) {
                const { db, collection, getDocs, deleteDoc, doc, deleteUser: fbDeleteUser } = fb;
                // Delete all Firestore subcollections
                const [actSnap, eqSnap] = await Promise.all([
                    getDocs(collection(db, 'users', currentUser.uid, 'activities')),
                    getDocs(collection(db, 'users', currentUser.uid, 'equipment')),
                ]);
                const deletions = [
                    ...actSnap.docs.map(d => deleteDoc(d.ref)),
                    ...eqSnap.docs.map(d => deleteDoc(d.ref)),
                    deleteDoc(doc(db, 'users', currentUser.uid, 'profile', 'data')),
                ];
                await Promise.all(deletions);
                // Delete Firebase Auth account
                await fbDeleteUser(currentUser);
            }
            // Clear local storage
            ['lawnCareActivities','lawnCareEquipment','lawnProfile',
             'yardstick_display_name','yardstick_pro_interest','yardstick_pro_interest_submitted',
             'yardstick_feedback'].forEach(k => localStorage.removeItem(k));
            window.trackEvent && window.trackEvent('account_deleted', {});
            window.location.reload();
        } catch (err) {
            console.error('Delete account error:', err);
            if (err.code === 'auth/requires-recent-login') {
                setDeleteError('For security, please sign out and sign back in before deleting your account.');
            } else {
                setDeleteError('Something went wrong. Please try again or contact support.');
            }
            setDeleteStatus('error');
        }
    };

    // ── Pro waitlist ─────────────────────────────────────────────────────────
    const [proEmail, setProEmail] = React.useState(currentUser?.email || '');
    const [proSubmitting, setProSubmitting] = React.useState(false);
    const [proSubmitted, setProSubmitted] = React.useState(() => !!localStorage.getItem('yardstick_pro_interest_submitted'));
    const [proError, setProError] = React.useState(null);
    const handleProSignup = async (e) => {
        e.preventDefault();
        if (!proEmail.trim()) return;
        setProSubmitting(true); setProError(null);
        const payload = { email: proEmail.trim(), userId: currentUser?.uid || null, userName: resolvedName || null, submittedAt: new Date().toISOString() };
        const saveToLocal = () => {
            const existing = JSON.parse(localStorage.getItem('yardstick_pro_interest') || '[]');
            existing.push(payload);
            localStorage.setItem('yardstick_pro_interest', JSON.stringify(existing));
        };
        try {
            if (firebaseConfigured && fb.configured) {
                try {
                    await fb.addDoc(fb.collection(fb.db, 'proInterest'), { ...payload, submittedAt: fb.serverTimestamp() });
                } catch (fbErr) {
                    saveToLocal(); // Firebase failed — keep the signup locally
                }
            } else {
                saveToLocal();
            }
            localStorage.setItem('yardstick_pro_interest_submitted', 'true');
            window.trackEvent('pro_interest_submitted', { signed_in: !!currentUser });
            setProSubmitted(true);
        } catch (err) {
            setProError('Could not submit — please try again.');
        } finally {
            setProSubmitting(false);
        }
    };

    // ── Yard + equipment summaries ────────────────────────────────────────────
    const hasProfile = lawnProfile && lawnProfile.specificGrass && lawnProfile.zone;
    const grassLabel = (lawnProfile?.specificGrass && GRASS_INFO[lawnProfile.specificGrass]?.name) || lawnProfile?.specificGrass || null;
    const zoneLabel = lawnProfile?.zone ? `Zone ${lawnProfile.zone.toUpperCase()}` : null;
    const zoneClimate = lawnProfile?.zone ? (ZONE_INFO[lawnProfile.zone] || ZONE_INFO[getParentZone(lawnProfile.zone)])?.climate : null;
    const sizeLabel = lawnProfile?.lawnSize || null;
    const activityCount = activities.length;
    const equipmentCount = equipment.length;

    return (
        <div className="space-y-4 animate-fade-in">
            <div>
                {resolvedName && <div className="text-sm text-gray-400 mb-0.5">Welcome back, {resolvedName}</div>}
                <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily:'var(--ys-font-display)'}}>My Account</h2>
            </div>

            {/* ── 1. Account Status ───────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {store.isCloud && currentUser ? (
                    <div className="p-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{background:'#e8f5e9'}}>
                            <div className="text-2xl">☁️</div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm" style={{color:'var(--ys-green-600)'}}>Cloud Sync Active</div>
                                <div className="text-xs text-gray-500 truncate">{currentUser.displayName || currentUser.email}</div>
                                <div className="text-xs text-gray-400 mt-0.5">Your data is backed up and synced across devices</div>
                            </div>
                        </div>
                        <button onClick={onSignOut} className="w-full py-2.5 px-4 bg-gray-100 text-gray-600 rounded-xl font-semibold text-sm">Sign Out</button>
                    </div>
                ) : (
                    <div className="p-4">
                        <div className="flex items-start gap-3 p-3 rounded-xl mb-4 bg-amber-50">
                            <div className="text-2xl mt-0.5">📱</div>
                            <div>
                                <div className="font-bold text-sm text-amber-800">Saved to this device only</div>
                                <div className="text-xs text-amber-700 mt-0.5">Your data lives in this browser. If you clear your cache or switch devices, it's gone.</div>
                            </div>
                        </div>
                        <div className="mb-3 space-y-1.5 text-xs text-gray-500">
                            {[
                                ['☁️', 'Sync across all your devices'],
                                ['🔒', 'Never lose your lawn history'],
                                ['📊', 'Access your data anywhere'],
                            ].map(([icon, text]) => (
                                <div key={text} className="flex items-center gap-2">
                                    <span>{icon}</span><span>{text}</span>
                                </div>
                            ))}
                        </div>
                        {firebaseConfigured ? (
                            <button onClick={onSignIn} className="ys-btn-primary w-full py-3 text-sm font-bold rounded-xl">
                                Create Free Account →
                            </button>
                        ) : (
                            <button onClick={onSignIn} className="ys-btn-primary w-full py-3 text-sm font-bold rounded-xl">
                                Sign In / Create Account →
                            </button>
                        )}
                        {firebaseConfigured && (
                            <button onClick={onSignIn} className="w-full mt-2 py-2 text-xs text-gray-400 font-semibold">
                                Already have an account? Sign in
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ── 2. Name & Personalization ───────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="font-bold text-gray-800 text-sm">Your Name</div>
                        <div className="text-xs text-gray-400 mt-0.5">Used to personalize your greetings</div>
                    </div>
                    {!nameEditing && (
                        <button onClick={() => setNameEditing(true)} className="text-xs font-bold px-3 py-1.5 rounded-lg btn-press" style={{color:'var(--ys-green-600)', background:'var(--ys-green-100)'}}>
                            {resolvedName ? 'Edit' : 'Add Name'}
                        </button>
                    )}
                </div>
                {nameEditing ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={nameInput}
                            onChange={e => setNameInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setNameEditing(false); }}
                            placeholder="e.g. Alex"
                            autoFocus
                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#367C2B]"
                        />
                        <button onClick={saveName} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white btn-press" style={{background:'var(--ys-green-600)'}}>Save</button>
                        <button onClick={() => setNameEditing(false)} className="px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 bg-gray-100 btn-press">✕</button>
                    </div>
                ) : (
                    <div className="px-3 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-600 font-medium">
                        {resolvedName || <span className="text-gray-400 italic">Not set</span>}
                    </div>
                )}
            </div>

            {/* ── 3. Yard Snapshot ────────────────────────────────────────── */}
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{border:'1px solid var(--ys-green-200)'}}>
                {hasProfile ? (
                    <div style={{background:'linear-gradient(135deg, #f0faf0 0%, #e8f5e9 100%)'}}>
                        <div className="px-4 pt-3 pb-3">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="text-xl font-bold leading-tight" style={{fontFamily:'var(--ys-font-display)', color:'var(--ys-green-800)'}}>{grassLabel}</div>
                                <button onClick={() => onNavigate('profile')} className="text-xs font-bold px-2.5 py-1 rounded-lg btn-press flex-shrink-0" style={{color:'var(--ys-green-700)', background:'rgba(255,255,255,0.75)'}}>
                                    Edit
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {zoneLabel && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white" style={{color:'var(--ys-green-700)', border:'1px solid var(--ys-green-200)'}}>{zoneLabel}{zoneClimate ? ` · ${zoneClimate}` : ''}</span>}
                                {sizeLabel && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white text-gray-600 border border-gray-200">{Number(sizeLabel).toLocaleString()} sq ft</span>}
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white" style={{color:'var(--ys-green-600)', border:'1px solid var(--ys-green-200)'}}>{activityCount} {activityCount === 1 ? 'activity' : 'activities'}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <div className="font-bold text-gray-800 text-sm">Your Yard</div>
                                <div className="text-xs text-gray-400 mt-0.5">Grass type &amp; care zone</div>
                            </div>
                            <button onClick={() => onNavigate('profile')} className="text-xs font-bold px-3 py-1.5 rounded-lg btn-press" style={{color:'var(--ys-green-600)', background:'var(--ys-green-100)'}}>
                                Set Up
                            </button>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                            <span className="text-xl">🌱</span>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-600">Add your grass type &amp; zone</div>
                                <div className="text-xs text-gray-400 mt-0.5">Unlock your personalized full-year care program</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── 4. Equipment Snapshot ───────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-gray-800 text-sm">Your Garage</div>
                    <button onClick={() => onNavigate('garage')} className="text-xs font-bold px-3 py-1.5 rounded-lg btn-press" style={{color:'var(--ys-green-600)', background:'var(--ys-green-100)'}}>
                        {equipmentCount > 0 ? 'Manage' : 'Add Equipment'}
                    </button>
                </div>
                {equipmentCount > 0 ? (
                    <div>
                        {equipment.slice(0, 3).map((item, i) => {
                            const cat = (item.category || item.type || '').toLowerCase();
                            const icon = cat.includes('mow') ? '🌿' : cat.includes('trim') ? '✂️' : cat.includes('spread') ? '🌱' : cat.includes('water') ? '💧' : '🔧';
                            return (
                                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                                    <span className="text-base w-6 text-center">{icon}</span>
                                    <span className="text-sm text-gray-700 font-medium truncate">{item.name || item.model || 'Equipment'}</span>
                                </div>
                            );
                        })}
                        {equipmentCount > 3 && <div className="text-xs text-gray-400 mt-2">+{equipmentCount - 3} more in your garage</div>}
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                        <span className="text-xl">🔧</span>
                        <div>
                            <div className="text-sm font-semibold text-gray-600">No equipment added yet</div>
                            <div className="text-xs text-gray-400 mt-0.5">Track your mowers, spreaders, and trimmers</div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── 5. Pro Version Card ─────────────────────────────────────── */}
            <div className="rounded-2xl overflow-hidden shadow-sm border" style={{borderColor:'var(--ys-gold-300)', background:'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'}}>
                <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'var(--ys-gold-500)'}}>
                            <span className="text-white text-lg">⭐</span>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 leading-tight" style={{fontFamily:'var(--ys-font-display)'}}>Yardstick Pro</div>
                            <div className="text-xs font-semibold mt-0.5" style={{color:'var(--ys-gold-500)'}}>Early Tester Access · All features unlocked</div>
                        </div>
                    </div>
                    <div className="space-y-1.5 mb-4">
                        {[
                            'Full Year Lawn Care Program — personalized monthly schedules by grass type & zone',
                            'Stats Dashboard — advanced analytics and activity trends',
                            'My Tasks — recurring reminders with due-date tracking',
                            'Product Guide — curated mower, spreader & fertilizer database',
                            'Priority access to upcoming AI recommendations',
                        ].map(f => (
                            <div key={f} className="flex items-start gap-2 text-xs text-gray-700">
                                <span className="mt-0.5 flex-shrink-0" style={{color:'var(--ys-gold-500)'}}>✦</span>
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold" style={{background:'var(--ys-gold-100)', color:'var(--ys-soil-800)'}}>
                        <span>✅</span>
                        <span>You're an early tester — all Pro features are unlocked for you.</span>
                    </div>
                </div>
            </div>

            {/* ── 6. Data Management (collapsible) ───────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setDataOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3.5 text-left btn-press">
                    <div className="flex items-center gap-2">
                        <span className="text-base">💾</span>
                        <span className="font-semibold text-gray-700 text-sm">Data Management</span>
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${dataOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {dataOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-gray-50 space-y-2">
                        <p className="text-xs text-gray-400 mb-3">Download a backup of your data or wipe the app to start fresh.</p>
                        <button onClick={exportData} className="w-full py-2.5 px-4 text-sm font-semibold rounded-xl text-white btn-press" style={{background:'var(--ys-green-600)'}}>📥 Export Data Backup</button>
                        <button onClick={resetData} className="w-full py-2.5 px-4 bg-red-50 text-red-600 rounded-xl font-semibold text-sm btn-press">🗑️ Reset All Data</button>
                    </div>
                )}
            </div>

            {/* ── 7. Delete Account ───────────────────────────────────────── */}
            {(store.isCloud && currentUser) && (
                <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                    <button onClick={() => { setDeleteOpen(o => !o); setDeleteConfirmText(''); setDeleteStatus(null); setDeleteError(''); }}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left btn-press">
                        <div className="flex items-center gap-2">
                            <span className="text-base">🗑️</span>
                            <span className="font-semibold text-red-600 text-sm">Delete Account</span>
                        </div>
                        <svg className={`w-4 h-4 text-red-300 transition-transform ${deleteOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {deleteOpen && (
                        <div className="px-4 pb-4 pt-1 border-t border-red-50 space-y-3">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                This will permanently delete your account and all your lawn care data — activities, equipment, and profile. <strong>This cannot be undone.</strong>
                            </p>
                            <div className="p-3 rounded-xl bg-red-50">
                                <p className="text-xs font-semibold text-red-700 mb-2">Type <span className="font-mono font-bold">DELETE</span> to confirm:</p>
                                <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={e => { setDeleteConfirmText(e.target.value); setDeleteStatus(null); setDeleteError(''); }}
                                    placeholder="DELETE"
                                    className="w-full border border-red-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 font-mono"
                                />
                            </div>
                            {deleteError && (
                                <p className="text-xs text-red-600 font-medium">{deleteError}</p>
                            )}
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirmText !== 'DELETE' || deleteStatus === 'deleting'}
                                className="w-full py-2.5 px-4 bg-red-600 text-white rounded-xl font-semibold text-sm btn-press disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {deleteStatus === 'deleting' ? 'Deleting…' : 'Permanently Delete My Account'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── 9. Share Yardstick ──────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-bold text-gray-800 text-sm">Share Yardstick</div>
                        <div className="text-xs text-gray-400 mt-0.5">Copy a link to share with friends</div>
                    </div>
                    <button
                        onClick={handleShare}
                        className="text-xs font-bold px-3 py-2 rounded-lg btn-press flex items-center gap-1.5"
                        style={{color: shareCopied ? 'white' : 'var(--ys-green-600)', background: shareCopied ? 'var(--ys-green-600)' : 'var(--ys-green-100)'}}
                    >
                        {shareCopied ? '✅ Copied!' : '🔗 Copy Link'}
                    </button>
                </div>
            </div>

            {/* ── 10. About ───────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <h3 className="text-sm font-bold text-gray-700 mb-2">About</h3>
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm text-gray-600 font-semibold">Yardstick V1 Beta</p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'var(--ys-green-100)', color:'var(--ys-green-600)', border:'1px solid var(--ys-green-200)'}}>Beta</span>
                </div>
                <p className="text-xs text-gray-500">Research-backed lawn care for DIY homeowners</p>
            </div>
        </div>
    );
}
