import React, { useState } from 'react';

const BREVO_API_KEY = atob('eGtleXNpYi1hNDAwMjhlMWFjZWUxYjQ4NTY3YTRlMzM0Y2E5NTdhMGI3ZGU2OGQwZDU2MjM1MTIxNzEzNWVjMzFkNzUxYWFkLTUwNFVxZ1pUbjBNaUk5ODU=');
const BREVO_LIST_ID = 3;

const mapFirebaseError = (e) => {
    switch (e.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':         return 'Incorrect email or password.';
        case 'auth/user-not-found':         return 'No account found with that email.';
        case 'auth/email-already-in-use':   return 'An account with this email already exists. Try signing in.';
        case 'auth/weak-password':          return 'Password must be at least 6 characters.';
        case 'auth/invalid-email':          return 'Please enter a valid email address.';
        case 'auth/operation-not-allowed':  return 'Email sign-in is not available right now. Please try signing in with Google.';
        case 'auth/network-request-failed': return 'Network error — check your connection and try again.';
        case 'auth/too-many-requests':      return 'Too many attempts. Please wait a moment and try again.';
        case 'auth/user-disabled':          return 'This account has been disabled. Please contact support.';
        case 'auth/popup-blocked':          return 'Popup blocked by browser — please allow popups and try again.';
        case 'auth/unauthorized-domain':    return 'Sign-in is not authorized on this domain. Please contact support.';
        default:                            return e.message || 'Something went wrong. Please try again.';
    }
};

const addToBrevoList = async (email, firstName) => {
    try {
        await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
            body: JSON.stringify({
                email,
                attributes: { FIRSTNAME: firstName || '' },
                listIds: [BREVO_LIST_ID],
                updateEnabled: true
            })
        });
    } catch(e) {
        console.warn('Brevo signup failed:', e);
    }
};

export default function AuthModal({ onClose, onSuccess }) {
    const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const fb = window.__FIREBASE__;

    const handleGoogle = async () => {
        if (!fb.configured) { setError('Sign-in is unavailable right now. Please try again later.'); return; }
        setLoading(true); setError('');
        try {
            const provider = new fb.GoogleAuthProvider();
            const result = await fb.signInWithPopup(fb.auth, provider);
            const info = fb.getAdditionalUserInfo ? fb.getAdditionalUserInfo(result) : null;
            if (info?.isNewUser) {
                window.trackEvent('sign_up', { method: 'google' });
                const firstName = (result.user.displayName || '').split(' ')[0];
                addToBrevoList(result.user.email, firstName);
            } else {
                window.trackEvent('login', { method: 'google' });
            }
            onSuccess(result.user);
        } catch(e) {
            if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') return;
            setError(mapFirebaseError(e));
        } finally { setLoading(false); }
    };

    const handleEmail = async (e) => {
        e.preventDefault();
        if (!fb.configured) { setError('Sign-in is unavailable right now. Please try again later.'); return; }
        setLoading(true); setError('');
        try {
            let result;
            if (mode === 'signin') {
                result = await fb.signInWithEmailAndPassword(fb.auth, email, password);
                window.trackEvent('login', { method: 'email' });
            } else {
                result = await fb.createUserWithEmailAndPassword(fb.auth, email, password);
                window.trackEvent('sign_up', { method: 'email' });
                addToBrevoList(email, name.trim());
            }
            onSuccess(result.user);
        } catch(e) {
            setError(mapFirebaseError(e));
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-modal-bg" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                {/* Logo */}
                <div className="text-center mb-6">
                    <img src="yardstick-logo-light.svg" alt="Yardstick logo" className="h-auto mx-auto mb-4" style={{width:'200px'}} />
                    <div className="text-sm text-gray-500 mt-1">
                        {mode === 'signin' ? 'Sign in to sync your lawn data across devices' : 'Create a free account to save your data to the cloud'}
                    </div>
                </div>

                {/* Google button */}
                <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition mb-4 disabled:opacity-50"
                >
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Continue with Google
                </button>

                {mode === 'signup' && (
                    <div className="text-xs text-gray-500 text-center -mt-2 mb-4 px-1">
                        By signing up you'll receive lawn care tips &amp; yard notifications. We never sell your email or spam you.
                    </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-semibold">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Email/password form */}
                <form onSubmit={handleEmail} className="space-y-3">
                    {mode === 'signup' && (
                        <input
                            type="text" placeholder="First name"
                            value={name} onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#367C2B] focus:outline-none"
                        />
                    )}
                    <input
                        type="email" required placeholder="Email address"
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#367C2B] focus:outline-none"
                    />
                    <input
                        type="password" required placeholder="Password (min. 6 characters)"
                        value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#367C2B] focus:outline-none"
                    />
                    {error && <div className="text-xs text-red-600 font-medium">{error}</div>}
                    <button
                        type="submit" disabled={loading}
                        className="w-full py-3 bg-[#367C2B] text-white rounded-xl font-bold text-sm disabled:opacity-50"
                    >
                        {loading ? '...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                    {mode === 'signup' && (
                        <p className="text-xs text-gray-400 text-center leading-snug px-1">
                            By creating an account you agree to receive lawn care tips and yard notifications by email. We'll never sell your data or send spam.
                        </p>
                    )}
                </form>

                <div className="text-center mt-4">
                    <button
                        onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setName(''); }}
                        className="text-sm text-[#367C2B] font-semibold"
                    >
                        {mode === 'signin' ? "Don't have an account? Sign up free" : 'Already have an account? Sign in'}
                    </button>
                </div>

                <button onClick={onClose} className="w-full mt-3 py-2 text-xs text-gray-400 hover:text-gray-600">
                    Continue without an account →
                </button>
            </div>
        </div>
    );
}
