import React from 'react';

export default function ProSignupView({ currentUser, onClose, onSignIn }) {
    const PRO_FEATURES = [
        ['📅', 'Full Year Lawn Care Program', 'Personalized monthly schedules by grass type & zone'],
        ['🧮', 'Treatment Calculator', 'Calculate exact product amounts for your yard size'],
        ['🗓️', 'My Tasks', 'Recurring reminders with due-date tracking'],
        ['📊', 'Advanced Stats & Dashboard', 'Monthly breakdowns, streaks & activity trends'],
        ['📖', 'Product Guide', 'Curated mower, spreader & fertilizer database'],
        ['☁️', 'Cloud Sync', 'Access your data on any device, never lose history'],
    ];

    return (
        <div className="space-y-5 animate-fade-in">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{background:'var(--ys-gold-500)'}}>PRO</span>
                    <span className="text-xs font-semibold" style={{color:'var(--ys-gold-500)'}}>Early Member Access</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight" style={{fontFamily:'var(--ys-font-display)'}}>Yardstick Pro — free for early members</h2>
                <p className="text-sm text-gray-500 mt-1">All Pro features are included free while we're in early access. Create an account to get started.</p>
            </div>

            {/* Feature list */}
            <div className="rounded-2xl overflow-hidden border" style={{borderColor:'var(--ys-gold-300)', background:'linear-gradient(135deg, #fffbeb 0%, #fef3c7 60%, #fff 100%)'}}>
                <div className="px-4 pt-4 pb-3">
                    <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{color:'var(--ys-gold-500)'}}>What's included in Pro</div>
                    <div className="text-xs text-gray-500 mb-3">All Pro features are <strong>free for early members</strong></div>
                    <div className="space-y-3">
                        {PRO_FEATURES.map(([icon, title, desc]) => (
                            <div key={title} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base" style={{background:'var(--ys-gold-100)'}}>
                                    {icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold text-gray-800">{title}</div>
                                    <div className="text-xs text-gray-500">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            {currentUser ? (
                <div className="rounded-2xl border p-4 flex items-center gap-3" style={{background:'var(--ys-green-100)', borderColor:'var(--ys-green-200)'}}>
                    <span className="text-xl flex-shrink-0">✅</span>
                    <div>
                        <div className="text-sm font-bold text-gray-800">You have full Pro access</div>
                        <div className="text-xs text-gray-500 mt-0.5">You're an early member — all Pro features are unlocked for you.</div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2.5">
                    <button
                        onClick={onSignIn}
                        className="w-full py-3 rounded-xl text-sm font-bold text-white btn-press"
                        style={{background:'var(--ys-green-600)', boxShadow:'0 4px 16px rgba(54,124,43,0.28)'}}>
                        Create Free Account →
                    </button>
                    <div className="text-center text-xs text-gray-400">
                        Already have an account? <button onClick={onSignIn} className="font-bold btn-press" style={{color:'var(--ys-green-600)', background:'none', border:'none', cursor:'pointer'}}>Sign in →</button>
                    </div>
                </div>
            )}
        </div>
    );
}
