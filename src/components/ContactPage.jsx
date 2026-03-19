import React, { useState } from 'react';

export default function ContactPage({ currentUser, firebaseConfigured }) {
    const EMAIL = 'yardsticklawncareapp@gmail.com';
    const TYPES = [
        { key: 'bug',      icon: '🐛', label: 'Bug Report'      },
        { key: 'feature',  icon: '💡', label: 'Feature Request'  },
        { key: 'feedback', icon: '💬', label: 'General Feedback' },
        { key: 'question', icon: '❓', label: 'Question'         },
    ];

    const [type,        setType]        = useState('bug');
    const [title,       setTitle]       = useState('');
    const [description, setDescription] = useState('');
    const [steps,       setSteps]       = useState('');
    const [email,       setEmail]       = useState(currentUser?.email || '');
    const [submitting,  setSubmitting]  = useState(false);
    const [submitted,   setSubmitted]   = useState(false);
    const [error,       setError]       = useState(null);

    const reset = () => {
        setType('bug'); setTitle(''); setDescription('');
        setSteps(''); setPriority('medium');
        setEmail(currentUser?.email || '');
        setSubmitted(false); setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        setSubmitting(true);
        setError(null);
        const payload = {
            type,
            title:             title.trim(),
            description:       description.trim(),
            stepsToReproduce:  steps.trim()  || null,
            contactEmail:      email.trim()  || null,
            userId:            currentUser?.uid          || null,
            userDisplayName:   currentUser?.displayName  || null,
            appVersion:        '9.0',
            userAgent:         navigator.userAgent,
            status:            'new',
        };
        try {
            const fb = window.__FIREBASE__ || {};
            if (firebaseConfigured && fb.configured) {
                await fb.addDoc(fb.collection(fb.db, 'feedback'), {
                    ...payload,
                    submittedAt: fb.serverTimestamp(),
                });
            } else {
                // localStorage fallback when Firebase is not available
                const existing = JSON.parse(localStorage.getItem('yardstick_feedback') || '[]');
                existing.push({ ...payload, submittedAt: new Date().toISOString() });
                localStorage.setItem('yardstick_feedback', JSON.stringify(existing));
            }
            window.trackEvent('feedback_submitted', { feedback_type: type });
            setSubmitted(true);
        } catch (err) {
            console.error('Feedback submission error:', err);
            setError('Submission failed — please email us directly.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Help &amp; Feedback</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Thank you!</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                        Your feedback has been logged. Every submission helps us make Yardstick better.
                    </p>
                    <button
                        onClick={reset}
                        className="mt-6 bg-[#367C2B] text-white font-bold px-6 py-2.5 rounded-xl btn-press text-sm"
                    >
                        Submit Another
                    </button>
                </div>
            </div>
        );
    }

    const titlePlaceholder =
        type === 'bug'     ? 'e.g. Activity form doesn\'t save notes' :
        type === 'feature' ? 'e.g. Add a calendar view for schedules'  :
                             'Brief summary…';
    const descPlaceholder =
        type === 'bug'     ? 'What happened? What did you expect to happen?' :
        type === 'feature' ? 'How would this work? Why would it be useful?'  :
                             'Share your thoughts…';

    return (
        <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800">Help &amp; Feedback</h2>

            <div className="bg-[#367C2B]/5 border border-[#367C2B]/20 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                Yardstick is in <strong>beta</strong> — every submission is logged and reviewed.
                Use this form to report bugs, request features, or share any thoughts.
            </div>

            {/* ── Pro early-access card ── */}
            <div className="rounded-xl overflow-hidden border" style={{borderColor:'var(--ys-gold-300)', background:'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'}}>
                <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'var(--ys-gold-500)'}}>
                        <span className="text-white text-lg">🌟</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm leading-tight" style={{fontFamily:'var(--ys-font-display)'}}>Yardstick Pro — Early Tester Access</div>
                        <div className="text-xs mt-0.5" style={{color:'var(--ys-gold-500)'}}>You have early access to all Pro features. Thanks for testing!</div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">

                {/* ── Type ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Type</div>
                    <div className="grid grid-cols-2 gap-2">
                        {TYPES.map(t => (
                            <button
                                key={t.key} type="button"
                                onClick={() => setType(t.key)}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-sm font-semibold transition btn-press ${
                                    type === t.key
                                        ? 'border-[#367C2B] bg-[#367C2B]/5 text-[#367C2B]'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                <span>{t.icon}</span><span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Title ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                        {type === 'bug' ? 'What went wrong?' : type === 'feature' ? "What's the idea?" : 'Title'}
                        <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <input
                        type="text" required
                        value={title} onChange={e => setTitle(e.target.value)}
                        placeholder={titlePlaceholder}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#367C2B] text-gray-800"
                    />
                </div>

                {/* ── Description ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                        Details<span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <textarea
                        required rows={4}
                        value={description} onChange={e => setDescription(e.target.value)}
                        placeholder={descPlaceholder}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#367C2B] text-gray-800 resize-none"
                    />
                </div>

                {/* ── Steps to reproduce (bugs only) ── */}
                {type === 'bug' && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                            Steps to Reproduce <span className="text-gray-300 font-normal normal-case">(optional)</span>
                        </label>
                        <textarea
                            rows={3}
                            value={steps} onChange={e => setSteps(e.target.value)}
                            placeholder={"1. Go to…\n2. Tap…\n3. See error"}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#367C2B] text-gray-800 resize-none"
                        />
                    </div>
                )}


                {/* ── Contact email ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                        Your Email <span className="text-gray-300 font-normal normal-case">(optional — for follow-up)</span>
                    </label>
                    <input
                        type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#367C2B] text-gray-800"
                    />
                </div>

                {/* ── Error ── */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                        {error}{' '}
                        <a href={`mailto:${EMAIL}`} className="font-bold underline">Email us directly</a>
                    </div>
                )}

                {/* ── Submit ── */}
                <button
                    type="submit"
                    disabled={submitting || !title.trim() || !description.trim()}
                    className="w-full bg-[#367C2B] text-white font-bold py-3.5 rounded-xl btn-press transition disabled:opacity-40 text-sm"
                >
                    {submitting ? 'Submitting…' : 'Submit Feedback'}
                </button>

                <div className="text-center pb-2">
                    <div className="text-xs text-gray-400 mb-1">Prefer email?</div>
                    <a
                        href={`mailto:${EMAIL}?subject=Yardstick%3A%20Feedback`}
                        className="text-sm font-semibold text-[#367C2B] hover:underline"
                    >
                        {EMAIL}
                    </a>
                </div>

            </form>
        </div>
    );
}
