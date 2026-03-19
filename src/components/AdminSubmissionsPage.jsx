import React, { useState, useEffect } from 'react';

export const ADMIN_EMAIL = 'yardsticklawncareapp@gmail.com';

export default function AdminSubmissionsPage({ currentUser, firebaseConfigured }) {
    const fb = window.__FIREBASE__ || {};

    const TYPE_META = {
        bug:      { label: 'Bug',      icon: '🐛', color: '#EF4444', bg: '#FEF2F2' },
        feature:  { label: 'Feature',  icon: '💡', color: '#F97316', bg: '#FFF7ED' },
        feedback: { label: 'Feedback', icon: '💬', color: '#3B82F6', bg: '#EFF6FF' },
        question: { label: 'Question', icon: '❓', color: '#8B5CF6', bg: '#F5F3FF' },
    };
    const STATUS_META = {
        new:         { label: 'New',         dot: '#EF4444' },
        'in-review': { label: 'In Review',   dot: '#F97316' },
        resolved:    { label: 'Resolved',    dot: '#22C55E' },
        closed:      { label: 'Closed',      dot: '#6B7280' },
    };
    const STATUS_ORDER = ['new', 'in-review', 'resolved', 'closed'];

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState(null);
    const [filter, setFilter]           = useState('all');
    const [expanded, setExpanded]       = useState(null);
    const [updating, setUpdating]       = useState(null);

    const loadSubmissions = async () => {
        setLoading(true);
        setError(null);
        try {
            if (firebaseConfigured && fb.configured) {
                const q = fb.query(
                    fb.collection(fb.db, 'feedback'),
                    fb.orderBy('submittedAt', 'desc'),
                    fb.limit(200)
                );
                const snap = await fb.getDocs(q);
                setSubmissions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            } else {
                const local = JSON.parse(localStorage.getItem('yardstick_feedback') || '[]');
                setSubmissions([...local].reverse().map((s, i) => ({ id: String(i), ...s })));
            }
        } catch (e) {
            console.error('AdminSubmissionsPage fetch error:', e);
            const code = e.code || '';
            if (code === 'permission-denied') {
                setError('Failed to load submissions: permission-denied. Firestore security rules are blocking admin reads on the "feedback" collection. Update rules in the Firebase Console to allow reads when request.auth.token.email == ADMIN_EMAIL.');
            } else if (code === 'failed-precondition') {
                setError('Failed to load submissions: failed-precondition. A Firestore index may be missing. Check the browser console for the index creation link.');
            } else {
                setError(`Failed to load submissions${code ? ` (${code})` : ''}. See browser console for details.`);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadSubmissions(); }, []);

    const updateStatus = async (submission, newStatus) => {
        setUpdating(submission.id);
        try {
            if (firebaseConfigured && fb.configured) {
                await fb.updateDoc(fb.doc(fb.db, 'feedback', submission.id), { status: newStatus });
            } else {
                const local = JSON.parse(localStorage.getItem('yardstick_feedback') || '[]');
                const idx = local.findIndex((_, i) => String(i) === submission.id);
                if (idx !== -1) {
                    local[idx].status = newStatus;
                    localStorage.setItem('yardstick_feedback', JSON.stringify(local));
                }
            }
            setSubmissions(prev => prev.map(s => s.id === submission.id ? { ...s, status: newStatus } : s));
        } catch (e) {
            console.error('Status update error:', e);
        } finally {
            setUpdating(null);
        }
    };

    const filtered = filter === 'all' ? submissions : submissions.filter(s => s.type === filter);
    const counts = submissions.reduce((acc, s) => { acc[s.type] = (acc[s.type] || 0) + 1; return acc; }, {});
    const newCount = submissions.filter(s => s.status === 'new').length;

    const fmtDate = (val) => {
        if (!val) return '—';
        const d = val.toDate ? val.toDate() : new Date(val);
        return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    };

    if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        return (
            <div className="text-center py-20 text-gray-400 text-sm">
                <div className="text-4xl mb-3">🔒</div>
                <div>Admin access only.</div>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Submissions</h2>
                <div className="flex items-center gap-2">
                    {newCount > 0 && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'#FEF2F2', color:'#EF4444', border:'1px solid #FECACA'}}>
                            {newCount} new
                        </span>
                    )}
                    <button
                        onClick={loadSubmissions}
                        disabled={loading}
                        className="text-xs font-semibold text-[#367C2B] hover:underline disabled:opacity-40"
                    >
                        {loading ? 'Loading…' : '↻ Refresh'}
                    </button>
                </div>
            </div>

            {/* ── Filter tabs ── */}
            <div className="flex gap-1.5 flex-wrap">
                {[['all', 'All', submissions.length], ...Object.keys(TYPE_META).map(k => [k, TYPE_META[k].label, counts[k] || 0])].map(([key, label, count]) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition btn-press"
                        style={filter === key
                            ? { borderColor: '#367C2B', background: 'rgba(54,124,43,0.08)', color: '#367C2B' }
                            : { borderColor: '#E5E7EB', background: '#fff', color: '#6B7280' }
                        }
                    >
                        {key !== 'all' && <span>{TYPE_META[key].icon}</span>}
                        {label}
                        {count > 0 && <span className="ml-0.5 opacity-70">({count})</span>}
                    </button>
                ))}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
            )}

            {loading && (
                <div className="text-center py-16 text-gray-400 text-sm">Loading submissions…</div>
            )}

            {!loading && filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400 text-sm">No submissions yet.</div>
            )}

            {/* ── Submission cards ── */}
            <div className="space-y-2">
                {filtered.map(s => {
                    const tm = TYPE_META[s.type] || TYPE_META.feedback;
                    const sm = STATUS_META[s.status] || STATUS_META.new;
                    const isOpen = expanded === s.id;
                    const isUpdating = updating === s.id;

                    return (
                        <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            {/* ── Card header ── */}
                            <button
                                className="w-full text-left p-4 flex items-start gap-3"
                                onClick={() => setExpanded(isOpen ? null : s.id)}
                            >
                                <span className="text-xl flex-shrink-0 mt-0.5">{tm.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{background: tm.bg, color: tm.color}}>{tm.label}</span>
                                        <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background: sm.dot}} />
                                            {sm.label}
                                        </span>
                                    </div>
                                    <div className="font-semibold text-gray-800 text-sm leading-snug truncate">{s.title}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{fmtDate(s.submittedAt)}{s.userDisplayName ? ` · ${s.userDisplayName}` : s.contactEmail ? ` · ${s.contactEmail}` : ''}</div>
                                </div>
                                <span className="text-gray-300 flex-shrink-0 text-sm mt-0.5">{isOpen ? '▲' : '▼'}</span>
                            </button>

                            {/* ── Expanded details ── */}
                            {isOpen && (
                                <div className="px-4 pb-4 space-y-3 border-t border-gray-50">
                                    <div className="pt-3">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</div>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{s.description}</p>
                                    </div>
                                    {s.stepsToReproduce && (
                                        <div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Steps to Reproduce</div>
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{s.stepsToReproduce}</p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        {s.contactEmail && (
                                            <div>
                                                <div className="font-bold text-gray-400 uppercase tracking-wider mb-0.5">Contact Email</div>
                                                <a href={`mailto:${s.contactEmail}`} className="text-[#367C2B] font-semibold hover:underline">{s.contactEmail}</a>
                                            </div>
                                        )}
                                        {s.userId && (
                                            <div>
                                                <div className="font-bold text-gray-400 uppercase tracking-wider mb-0.5">User ID</div>
                                                <span className="text-gray-600 font-mono break-all">{s.userId}</span>
                                            </div>
                                        )}
                                        {s.appVersion && (
                                            <div>
                                                <div className="font-bold text-gray-400 uppercase tracking-wider mb-0.5">App Version</div>
                                                <span className="text-gray-600">v{s.appVersion}</span>
                                            </div>
                                        )}
                                        {s.userAgent && (
                                            <div className="col-span-2">
                                                <div className="font-bold text-gray-400 uppercase tracking-wider mb-0.5">User Agent</div>
                                                <span className="text-gray-500 break-all">{s.userAgent}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* ── Status update ── */}
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Update Status</div>
                                        <div className="flex gap-2 flex-wrap">
                                            {STATUS_ORDER.map(st => {
                                                const stm = STATUS_META[st];
                                                const active = s.status === st;
                                                return (
                                                    <button
                                                        key={st}
                                                        disabled={active || isUpdating}
                                                        onClick={() => updateStatus(s, st)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition btn-press disabled:opacity-50"
                                                        style={active
                                                            ? { borderColor: stm.dot, background: stm.dot + '15', color: stm.dot }
                                                            : { borderColor: '#E5E7EB', background: '#fff', color: '#6B7280' }
                                                        }
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full" style={{background: stm.dot}} />
                                                        {stm.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
