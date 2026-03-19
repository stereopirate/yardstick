import { useCallback } from 'react';

const useDataStore = (currentUser) => {
    const fb = window.__FIREBASE__ || {};
    const isCloud = fb.configured && !!currentUser;

    // ── READ ──────────────────────────────────────────────────────────────
    const loadAll = useCallback(async () => {
        if (!isCloud) {
            return {
                activities: JSON.parse(localStorage.getItem('lawnCareActivities') || '[]'),
                equipment:  JSON.parse(localStorage.getItem('lawnCareEquipment')  || '[]'),
                profile:    JSON.parse(localStorage.getItem('lawnProfile')         || 'null'),
            };
        }
        const uid = currentUser.uid;
        const { db, collection, getDocs, doc, getDoc } = fb;
        try {
            const [actSnap, eqSnap, profSnap] = await Promise.all([
                getDocs(collection(db, 'users', uid, 'activities')),
                getDocs(collection(db, 'users', uid, 'equipment')),
                getDoc(doc(db, 'users', uid, 'profile', 'data')),
            ]);
            return {
                activities: actSnap.docs.map(d => ({ id: d.id, ...d.data() })),
                equipment:  eqSnap.docs.map(d => ({ id: d.id, ...d.data() })),
                profile:    profSnap.exists() ? profSnap.data() : null,
            };
        } catch (e) {
            console.error('Firestore loadAll failed:', e);
            return { activities: [], equipment: [], profile: null };
        }
    }, [isCloud, currentUser]);

    // ── WRITE activities ──────────────────────────────────────────────────
    const saveActivity = useCallback(async (activity) => {
        if (!isCloud) {
            // Strip photo fields — photos require a signed-in account and Firebase Storage
            const { photoUrl: _photoUrl, ...localActivity } = activity;
            const stored = JSON.parse(localStorage.getItem('lawnCareActivities') || '[]');
            const updated = [...stored, localActivity];
            localStorage.setItem('lawnCareActivities', JSON.stringify(updated));
            return localActivity;
        }
        const { db, collection, addDoc, serverTimestamp } = fb;
        const ref = await addDoc(
            collection(db, 'users', currentUser.uid, 'activities'),
            { ...activity, createdAt: serverTimestamp() }
        );
        return { ...activity, id: ref.id };
    }, [isCloud, currentUser]);

    const deleteActivity = useCallback(async (id) => {
        if (!isCloud) {
            const stored = JSON.parse(localStorage.getItem('lawnCareActivities') || '[]');
            localStorage.setItem('lawnCareActivities', JSON.stringify(stored.filter(a => a.id !== id)));
            return;
        }
        const { db, doc, deleteDoc } = fb;
        await deleteDoc(doc(db, 'users', currentUser.uid, 'activities', String(id)));
    }, [isCloud, currentUser]);

    // ── WRITE equipment ───────────────────────────────────────────────────
    const saveEquipment = useCallback(async (item) => {
        if (!isCloud) {
            const stored = JSON.parse(localStorage.getItem('lawnCareEquipment') || '[]');
            const updated = [...stored, item];
            localStorage.setItem('lawnCareEquipment', JSON.stringify(updated));
            return item;
        }
        const { db, collection, addDoc, serverTimestamp } = fb;
        const ref = await addDoc(
            collection(db, 'users', currentUser.uid, 'equipment'),
            { ...item, createdAt: serverTimestamp() }
        );
        return { ...item, id: ref.id };
    }, [isCloud, currentUser]);

    const deleteEquipment = useCallback(async (id) => {
        if (!isCloud) {
            const stored = JSON.parse(localStorage.getItem('lawnCareEquipment') || '[]');
            localStorage.setItem('lawnCareEquipment', JSON.stringify(stored.filter(e => e.id !== id)));
            return;
        }
        const { db, doc, deleteDoc } = fb;
        await deleteDoc(doc(db, 'users', currentUser.uid, 'equipment', String(id)));
    }, [isCloud, currentUser]);

    // ── UPDATE equipment (for maintenance logging) ────────────────────────
    const updateEquipment = useCallback(async (id, updates) => {
        if (!isCloud) {
            const stored = JSON.parse(localStorage.getItem('lawnCareEquipment') || '[]');
            localStorage.setItem('lawnCareEquipment', JSON.stringify(
                stored.map(e => e.id === id ? { ...e, ...updates } : e)
            ));
            return;
        }
        const { db, doc, setDoc } = fb;
        await setDoc(doc(db, 'users', currentUser.uid, 'equipment', String(id)), updates, { merge: true });
    }, [isCloud, currentUser]);

    // ── WRITE profile ─────────────────────────────────────────────────────
    const saveProfile = useCallback(async (profile) => {
        localStorage.setItem('lawnProfile', JSON.stringify(profile)); // always cache locally
        if (!isCloud) return;
        const { db, doc, setDoc } = fb;
        await setDoc(doc(db, 'users', currentUser.uid, 'profile', 'data'), profile);
    }, [isCloud, currentUser]);

    return { loadAll, saveActivity, deleteActivity, saveEquipment, deleteEquipment, updateEquipment, saveProfile, isCloud };
};

export default useDataStore;
