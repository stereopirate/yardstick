import React from 'react';

export default function PricingView({ onSignIn, onClose }) {
    const FREE_FEATURES = [
        'Activity logging (all types)',
        'Lawn activity history',
        'Equipment tracker (My Garage)',
        'Local weather & soil temp',
        "Today's advisory alerts",
        'Frost & pre-emergent alerts',
        'Mobile-first PWA — works offline',
    ];
    const BETA_FEATURES = [
        ['📅', 'Full Year Lawn Care Program', 'Personalized monthly schedule for your grass & zone'],
        ['🧮', 'Treatment Calculator', 'Exact product amounts for your yard size'],
        ['🗓️', 'My Tasks', 'Recurring reminders with due-date tracking'],
        ['📊', 'Advanced Stats & Dashboard', 'Monthly breakdowns, streaks & activity trends'],
        ['📖', 'Product Guide', 'Curated mower, spreader & fertilizer database'],
        ['☁️', 'Cloud Sync', 'Access your data on any device'],
    ];
    return (
        <div className="animate-fade-in space-y-4">
            <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3" style={{background:'var(--ys-gold-100)', color:'var(--ys-gold-500)', border:'1px solid var(--ys-gold-300)'}}>
                    🌱 Beta — everything free while we build
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1" style={{fontFamily:'var(--ys-font-display)'}}>Free during beta</h2>
                <p className="text-sm text-gray-500">All features are unlocked for beta testers. Pricing will be announced when we launch.</p>
            </div>
            {/* Free tier — always available */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-1">
                    <div className="text-lg font-bold text-gray-800">Always Free</div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background:'var(--ys-green-100)', color:'var(--ys-green-700)'}}>No account needed</span>
                </div>
                <div className="text-xs text-gray-400 mb-4">Use the core tracker without signing up</div>
                <ul className="space-y-2 mb-5">
                    {FREE_FEATURES.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-bold flex-shrink-0" style={{color:'var(--ys-green-600)'}}>✓</span>{f}
                        </li>
                    ))}
                </ul>
                {onClose && <button onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 btn-press">Continue without account</button>}
            </div>
            {/* Pro tier — free during beta */}
            <div className="rounded-2xl border-2 shadow-sm p-5 relative overflow-hidden" style={{borderColor:'var(--ys-gold-500)', background:'linear-gradient(160deg, #fffbeb 0%, #fff 100%)'}}>
                <div className="absolute top-3 right-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{background:'var(--ys-gold-500)'}}>FREE IN BETA</span>
                </div>
                <div className="flex items-center gap-2 mb-0.5 pr-28">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:'var(--ys-gold-500)'}}>PRO</span>
                    <div className="text-lg font-bold text-gray-800">Features</div>
                </div>
                <div className="text-xs text-gray-400 mb-4">Unlocked free with a Yardstick account — pricing TBD at launch</div>
                <div className="space-y-3 mb-5">
                    {BETA_FEATURES.map(([icon, title, desc]) => (
                        <div key={title} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm" style={{background:'var(--ys-gold-100)'}}>
                                {icon}
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-bold text-gray-800">{title}</div>
                                <div className="text-xs text-gray-500">{desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={onSignIn} className="w-full py-3 rounded-xl text-sm font-bold text-white btn-press" style={{background:'var(--ys-green-600)', boxShadow:'0 4px 16px rgba(54,124,43,0.28)'}}>
                    Create Free Account — Unlock All Features →
                </button>
            </div>
            {/* Beta footer */}
            <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                <div className="text-xs text-gray-500">💌 Join the Pro waitlist to get notified on pricing &amp; launch —{' '}
                    <button onClick={onClose} className="font-semibold underline btn-press" style={{color:'var(--ys-green-600)', background:'none', border:'none', padding:0, cursor:'pointer'}}>
                        find it in the app menu
                    </button>.
                </div>
            </div>
        </div>
    );
}
