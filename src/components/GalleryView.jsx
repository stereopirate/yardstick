import React, { useState, useEffect } from 'react';
import { ACTIVITY_TYPES } from '../constants.js';

export default function GalleryView({ currentUser, onSignIn }) {
    const [photos, setPhotos]           = useState([]);
    const [loading, setLoading]         = useState(true);
    const [myPhotosOnly, setMyPhotosOnly] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting]       = useState(false);
    const fb = window.__FIREBASE__ || {};

    useEffect(() => {
        if (!fb.configured || !currentUser) { setLoading(false); return; }
        const { db, collection, getDocs, query, orderBy, limit } = fb;
        getDocs(query(collection(db, 'gallery'), orderBy('createdAt', 'desc'), limit(100)))
            .then(snap => {
                setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
                setLoading(false);
            })
            .catch(e => { console.error('Gallery load:', e); setLoading(false); });
    }, [currentUser]);

    const handleDelete = async (photo) => {
        if (!window.confirm('Remove this photo from the gallery?')) return;
        setDeleting(true);
        try {
            const { db, doc, deleteDoc } = fb;
            await deleteDoc(doc(db, 'gallery', photo.id));
            setPhotos(prev => prev.filter(p => p.id !== photo.id));
            if (selectedPhoto && selectedPhoto.id === photo.id) setSelectedPhoto(null);
        } catch(e) { console.error('Delete failed:', e); }
        setDeleting(false);
    };

    const displayed = myPhotosOnly && currentUser
        ? photos.filter(p => p.userId === currentUser.uid)
        : photos;

    if (!fb.configured) return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Lawn Gallery</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center mt-4">
                <div className="text-3xl mb-2">🔧</div>
                <div className="font-bold text-amber-800">Firebase not configured</div>
                <div className="text-sm text-amber-600 mt-1">The gallery requires Firebase Storage. See FIREBASE_SETUP.md.</div>
            </div>
        </div>
    );

    if (!currentUser) return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Lawn Gallery</h2>
            <p className="text-sm text-gray-500 mb-6">Share and browse lawn progress photos from the community</p>
            <div className="bg-[#EBF5E6] border border-[#C4E8BC] rounded-2xl p-6 text-center">
                <div className="text-5xl mb-3">📷</div>
                <div className="font-bold text-gray-800 text-lg mb-1">Sign in to access the gallery</div>
                <div className="text-sm text-gray-500 mb-4">Create an account to share your lawn photos and see how other yards are growing.</div>
                <button onClick={onSignIn}
                    className="ys-btn-primary px-6 py-3 text-sm font-bold rounded-xl">
                    Sign In / Create Account
                </button>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-1">Lawn Gallery</h2>
            <p className="text-sm text-gray-500 mb-4">Browse and share lawn progress photos</p>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-4">
                <button onClick={() => setMyPhotosOnly(false)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${!myPhotosOnly ? 'bg-[#367C2B] text-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                    Community
                </button>
                <button onClick={() => setMyPhotosOnly(true)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${myPhotosOnly ? 'bg-[#367C2B] text-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                    My Photos
                </button>
            </div>

            {loading && (
                <div className="text-center py-12 text-gray-400">
                    <div className="text-3xl mb-2">⏳</div>Loading photos…
                </div>
            )}

            {!loading && displayed.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-5xl mb-3">🌱</div>
                    <div className="font-semibold text-gray-600 text-lg">
                        {myPhotosOnly ? 'No photos shared yet' : 'Be the first to share!'}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                        Add a photo when logging an activity and check "Share to gallery."
                    </div>
                </div>
            )}

            {!loading && displayed.length > 0 && (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {displayed.map(photo => (
                        <button key={photo.id} onClick={() => setSelectedPhoto(photo)}
                            className="relative rounded-xl overflow-hidden bg-gray-100 card-hover"
                            style={{aspectRatio:'1'}}>
                            <img src={photo.photoUrl} alt={photo.activityType}
                                className="w-full h-full object-cover" loading="lazy" />
                            <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5"
                                style={{background:'linear-gradient(to top, rgba(0,0,0,0.65), transparent)'}}>
                                <div className="text-white text-xs font-semibold truncate">
                                    {ACTIVITY_TYPES[photo.activityType]
                                        ? ACTIVITY_TYPES[photo.activityType].icon + ' '
                                        : '📷 '}
                                    {photo.userName || 'User'}
                                </div>
                                <div className="text-white/70 text-xs">
                                    {photo.grassName ? photo.grassName + ' · ' : ''}{new Date(photo.date).toLocaleDateString()}
                                </div>
                            </div>
                            {photo.userId === currentUser.uid && (
                                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold text-[#367C2B]">✓</div>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
                    style={{background:'rgba(0,0,0,0.88)'}}>
                    <div className="w-full max-w-lg bg-white rounded-t-2xl md:rounded-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}>
                        <img src={selectedPhoto.photoUrl} alt={selectedPhoto.activityType}
                            className="w-full max-h-72 md:max-h-96 object-cover" />
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <div className="font-bold text-gray-800 flex items-center gap-2">
                                        {ACTIVITY_TYPES[selectedPhoto.activityType]
                                            ? ACTIVITY_TYPES[selectedPhoto.activityType].icon + ' ' + ACTIVITY_TYPES[selectedPhoto.activityType].name
                                            : selectedPhoto.activityType}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {selectedPhoto.userName} · {new Date(selectedPhoto.date).toLocaleDateString()}
                                    </div>
                                    {(selectedPhoto.grassName || selectedPhoto.zone || selectedPhoto.lawnSize) && (
                                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                                            {selectedPhoto.grassName && (
                                                <span className="text-xs bg-[#EBF5E6] text-[#367C2B] font-semibold px-2 py-0.5 rounded-full">
                                                    🌿 {selectedPhoto.grassName}
                                                </span>
                                            )}
                                            {selectedPhoto.zone && (
                                                <span className="text-xs bg-[#EBF5E6] text-[#367C2B] font-semibold px-2 py-0.5 rounded-full">
                                                    Zone {selectedPhoto.zone}
                                                </span>
                                            )}
                                            {selectedPhoto.lawnSize && (
                                                <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">
                                                    {Number(selectedPhoto.lawnSize).toLocaleString()} sq ft
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {selectedPhoto.userId === currentUser.uid && (
                                    <button onClick={() => handleDelete(selectedPhoto)} disabled={deleting}
                                        className="text-xs text-red-500 font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition">
                                        {deleting ? 'Removing…' : 'Remove'}
                                    </button>
                                )}
                            </div>
                            {selectedPhoto.caption && (
                                <p className="text-sm text-gray-600 mb-3">{selectedPhoto.caption}</p>
                            )}
                            <button onClick={() => setSelectedPhoto(null)}
                                className="w-full py-3 rounded-xl font-semibold text-sm bg-gray-100 text-gray-700">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
