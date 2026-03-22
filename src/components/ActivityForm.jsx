import React, { useState } from 'react';
import { ACTIVITY_TYPES, TREATMENT_CATEGORIES, TREATMENT_PRODUCTS, PRODUCT_DATABASE } from '../constants.js';

const ProFeatureNotice = ({ onUnlock, onViewPricing, featureName }) => (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white text-center shadow-sm animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3" style={{background:'var(--ys-gold-500)', color:'#fff'}}>PRO</div>
        <h3 className="font-bold text-gray-800 mb-1 text-lg" style={{fontFamily:'var(--ys-font-display)'}}>
            {featureName || 'Pro Feature'}
        </h3>
        <p className="text-sm text-gray-500 mb-1">This is a Pro feature — <strong>free for early members</strong>.</p>
        <p className="text-xs text-gray-400 mb-5">Create a free account to unlock your Full Year Program, Treatment Calculator, Advanced Stats &amp; more.</p>
        <div className="space-y-2.5">
            <button onClick={onUnlock}
                className="w-full px-6 py-3 rounded-xl font-bold text-sm text-white btn-press"
                style={{background:'var(--ys-green-600)', boxShadow:'0 4px 16px rgba(54,124,43,0.28)'}}>
                Create Free Account →
            </button>
        </div>
    </div>
);

export { ProFeatureNotice };

const InlineCalculator = ({ product }) => {
    const profileSize = (() => {
        try { const p = JSON.parse(localStorage.getItem('lawnProfile') || '{}'); return p.lawnSize ? String(p.lawnSize) : ''; } catch(e) { return ''; }
    })();
    const [area, setArea] = useState(profileSize);
    const [open, setOpen] = useState(false);

    if (!product || !product.rateValue) return null;

    const areaNum = parseFloat(area) || 0;
    const result = areaNum > 0 ? (() => {
        const per = product.ratePer || 1000;
        const qty = Math.round((areaNum / per) * product.rateValue * 100) / 100;
        const qtyMax = product.rateMax ? Math.round((areaNum / per) * product.rateMax * 100) / 100 : null;
        return { qty, qtyMax, unit: product.rateUnit };
    })() : null;

    const fmt = (n) => n % 1 === 0 ? String(n) : parseFloat(n.toFixed(2)).toString();
    const resultText = result ? (result.qtyMax ? `${fmt(result.qty)}–${fmt(result.qtyMax)} ${result.unit}` : `${fmt(result.qty)} ${result.unit}`) : null;

    return (
        <div className="mt-3">
            {!open ? (
                <button type="button" onClick={() => setOpen(true)}
                    className="w-full py-2 px-3 rounded-lg text-sm font-semibold border flex items-center justify-center gap-2 btn-press"
                    style={{color:'var(--ys-green-600)', background:'var(--ys-green-100)', borderColor:'rgba(54,124,43,0.25)'}}>
                    <span>🧮</span> Calculate how much you need
                </button>
            ) : (
                <div className="p-3 rounded-xl border" style={{background:'var(--ys-green-100)', borderColor:'rgba(54,124,43,0.25)'}}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-bold uppercase tracking-wide" style={{color:'var(--ys-green-800)'}}>Amount Calculator</div>
                        <button type="button" onClick={() => setOpen(false)} className="text-gray-400 text-sm leading-none w-6 h-6 flex items-center justify-center">✕</button>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">Rate: <span className="font-semibold text-gray-700">{product.rate}</span></div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Yard Area (sq ft)</label>
                    <input type="number" value={area} onChange={e => setArea(e.target.value)}
                        placeholder="e.g. 5000" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    {result ? (
                        <div className="mt-3 p-3 bg-white rounded-xl border text-center" style={{borderColor:'rgba(54,124,43,0.2)'}}>
                            <div className="text-xs text-gray-400 mb-0.5">You need approximately</div>
                            <div className="text-3xl font-extrabold" style={{fontFamily:'var(--ys-font-display)', color:'var(--ys-green-600)'}}>{resultText}</div>
                            {product.rateMax && <div className="text-xs text-gray-400 mt-0.5">Based on the {product.rate} range</div>}
                        </div>
                    ) : (
                        <div className="mt-2 text-xs text-center text-gray-400">Enter your yard area above</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function ActivityForm({ selectedActivityType, onSubmit, onCancel, currentUser }) {
    const activityType = ACTIVITY_TYPES[selectedActivityType];
    const isPhotoLog = selectedActivityType === 'photo';
    const [localFormData, setLocalFormData] = useState({ date: new Date().toISOString().split('T')[0], notes: '', data: {} });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [shareToGallery, setShareToGallery] = useState(false);
    const [photoError, setPhotoError] = useState(null);
    const fb = window.__FIREBASE__ || {};
    const canUploadPhoto = fb.configured && !!currentUser;

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLocalFormData(prev => ({ ...prev, photoFile: file }));
        const url = URL.createObjectURL(file);
        setPhotoPreview(url);
    };

    const clearPhoto = () => {
        setLocalFormData(prev => ({ ...prev, photoFile: null }));
        if (photoPreview) URL.revokeObjectURL(photoPreview);
        setPhotoPreview(null);
        setShareToGallery(false);
    };

    const renderPhotoSection = (required) => (
        <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
                📷 Photo {required
                    ? <span className="text-red-600 ml-1">*</span>
                    : <span className="text-xs font-normal text-gray-400">(Optional)</span>
                }
            </label>
            {!canUploadPhoto ? (
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-dashed border-gray-200 rounded-xl">
                    <span className="text-gray-400 text-sm">Sign in to attach photos to activities</span>
                </div>
            ) : !localFormData.photoFile ? (
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl cursor-pointer transition-colors hover:border-[#367C2B] bg-gray-50"
                    style={{minHeight: required ? '140px' : '96px'}}>
                    <span className="text-3xl mb-1">📸</span>
                    <span className="text-sm text-gray-500 font-medium">Tap to add photo</span>
                    <span className="text-xs text-gray-400 mt-0.5">Camera or library</span>
                    <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
                </label>
            ) : (
                <div>
                    <div className="relative rounded-xl overflow-hidden mb-2" style={{maxHeight: required ? '280px' : '220px'}}>
                        <img src={photoPreview} alt="Preview" className="w-full object-cover rounded-xl" style={{maxHeight: required ? '280px' : '220px'}} />
                        <button type="button" onClick={clearPhoto}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md"
                            style={{background:'rgba(0,0,0,0.55)', color:'white', border:'none', cursor:'pointer'}}>
                            ✕
                        </button>
                    </div>
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input type="checkbox" checked={shareToGallery}
                            onChange={e => setShareToGallery(e.target.checked)}
                            className="w-4 h-4 rounded accent-[#367C2B]" />
                        <span className="text-sm text-gray-700">Share this photo in the community gallery</span>
                    </label>
                </div>
            )}
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl flex items-center">{activityType.imgSrc ? <img src={activityType.imgSrc} className="w-10 h-10 object-contain" alt="" /> : activityType.icon}</span>{activityType.name}
            </h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (isPhotoLog && !localFormData.photoFile) {
                    setPhotoError('Please add a photo before saving.');
                    return;
                }
                setPhotoError(null);
                onSubmit({ ...localFormData, shareToGallery });
            }} className="bg-white rounded-lg shadow-lg p-6">
                {isPhotoLog && renderPhotoSection(true)}
                {photoError && <p className="text-red-600 text-sm mb-3 font-medium">{photoError}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Date</label>
                    <input type="date" required value={localFormData.date}
                        onChange={(e) => setLocalFormData({...localFormData, date: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg" />
                </div>
                {activityType.fields.map(field => (
                    <div key={field.name} className="mb-4">
                        <label className="block text-sm font-semibold mb-2">{field.label}{field.required && <span className="text-red-600 ml-1">*</span>}</label>
                        {field.type === 'treatment-category' ? (
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(TREATMENT_CATEGORIES).map(([key, cat]) => (
                                    <button key={key} type="button"
                                        onClick={() => setLocalFormData({...localFormData, data: {...localFormData.data, category: key, product: ''}})}
                                        className={`p-3 rounded-lg border-2 ${localFormData.data.category === key ? 'bg-[#367C2B] text-white' : 'bg-white'}`}>
                                        <div className="text-xl">{cat.icon}</div>
                                        <div className="text-sm">{cat.label}</div>
                                    </button>
                                ))}
                            </div>
                        ) : field.type === 'treatment-product' ? (
                            localFormData.data.category ? (
                                <div>
                                    <select
                                        value={localFormData.data._productGuide || ''}
                                        onChange={(e) => {
                                            const selectedName = e.target.value;
                                            const sp = (TREATMENT_PRODUCTS[localFormData.data.category] || []).find(p => p.name === selectedName);
                                            const isOther = sp && sp.notes === 'Custom product';
                                            setLocalFormData({...localFormData, data: {
                                                ...localFormData.data,
                                                _productGuide: selectedName,
                                                product: isOther ? '' : (selectedName || ''),
                                                activeIngredient: isOther ? '' : (sp ? sp.activeIngredient || '' : ''),
                                                rate: isOther ? '' : (sp ? sp.rate || '' : ''),
                                            }});
                                        }}
                                        className="w-full px-4 py-2 border rounded-lg" required={field.required}>
                                        <option value="">Select a product…</option>
                                        {(TREATMENT_PRODUCTS[localFormData.data.category] || []).map(p => (
                                            <option key={p.id} value={p.name}>{p.name}</option>
                                        ))}
                                    </select>
                                    {(() => {
                                        const sp = (TREATMENT_PRODUCTS[localFormData.data.category] || []).find(p => p.name === localFormData.data._productGuide);
                                        if (!sp) return null;
                                        if (sp.notes === 'Custom product') {
                                            return (
                                                <div className="mt-3 space-y-3 p-3 bg-amber-50 border border-amber-200 rounded-lg animate-fade-in">
                                                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Enter Product Details</div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Product Name</label>
                                                        <input type="text" placeholder="e.g. Prodiamine 65 WDG"
                                                            value={localFormData.data.product || ''}
                                                            onChange={e => setLocalFormData({...localFormData, data: {...localFormData.data, product: e.target.value}})}
                                                            className="w-full px-3 py-2 border rounded-lg text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Active Ingredient</label>
                                                        <input type="text" placeholder="e.g. Prodiamine 65%"
                                                            value={localFormData.data.activeIngredient || ''}
                                                            onChange={e => setLocalFormData({...localFormData, data: {...localFormData.data, activeIngredient: e.target.value}})}
                                                            className="w-full px-3 py-2 border rounded-lg text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Application Rate</label>
                                                        <input type="text" placeholder="e.g. 0.5 oz per 1,000 sq ft"
                                                            value={localFormData.data.rate || ''}
                                                            onChange={e => setLocalFormData({...localFormData, data: {...localFormData.data, rate: e.target.value}})}
                                                            className="w-full px-3 py-2 border rounded-lg text-sm" />
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return (
                                            <React.Fragment>
                                                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                    <div className="text-xs font-bold text-blue-800 uppercase mb-2">Product Details</div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {sp.activeIngredient && <div><div className="text-xs text-gray-500">Active Ingredient</div><div className="text-xs font-semibold text-gray-800">{sp.activeIngredient}</div></div>}
                                                        {sp.rate && <div><div className="text-xs text-gray-500">Application Rate</div><div className="text-xs font-semibold text-gray-800">{sp.rate}</div></div>}
                                                        {sp.timing && <div><div className="text-xs text-gray-500">Timing</div><div className="text-xs font-semibold text-gray-800">{sp.timing}</div></div>}
                                                        {sp.target && <div><div className="text-xs text-gray-500">Target</div><div className="text-xs font-semibold text-gray-800">{sp.target}</div></div>}
                                                    </div>
                                                    {sp.notes && <div className="mt-2 text-xs text-gray-600 italic">{sp.notes}</div>}
                                                </div>
                                                <InlineCalculator product={sp} />
                                            </React.Fragment>
                                        );
                                    })()}
                                </div>
                            ) : <div className="p-4 bg-yellow-50 border rounded">Select a treatment type first</div>
                        ) : field.type === 'product-select' ? (() => {
                            let products = field.productTypes
                                ? field.productTypes.reduce((acc, pt) => acc.concat(PRODUCT_DATABASE[pt] || []), [])
                                : (PRODUCT_DATABASE[field.productType] || []);
                            if (field.filterBy && localFormData.data[field.filterBy]) {
                                const filterVal = localFormData.data[field.filterBy];
                                products = products.filter(p => p[field.filterProp] === filterVal || p.id.includes('-other'));
                            }
                            const getLabel = (p) => {
                                if (p.brand === 'Other') return p.name;
                                let label = `${p.brand} – ${p.name}`;
                                if (p.deck) label += ` (${p.deck})`;
                                if (p.npk) label += ` · ${p.npk}`;
                                if (p.variety) label += ` · ${p.variety}`;
                                return label;
                            };
                            return (
                                <select
                                    value={localFormData.data[field.name] || ''}
                                    onChange={(e) => {
                                        const selectedName = e.target.value;
                                        const sp = products.find(p => p.name === selectedName);
                                        const updates = { [field.name]: selectedName };
                                        if (field.autofill && sp) {
                                            Object.entries(field.autofill).forEach(([formKey, productKey]) => {
                                                updates[formKey] = sp[productKey] || '';
                                            });
                                        }
                                        setLocalFormData({...localFormData, data: {...localFormData.data, ...updates}});
                                    }}
                                    className="w-full px-4 py-2 border rounded-lg">
                                    <option value="">Select...</option>
                                    {products.map(p => <option key={p.id} value={p.name}>{getLabel(p)}</option>)}
                                </select>
                            );
                        })()
                        : field.type === 'select' ? (
                            <select onChange={(e) => setLocalFormData({...localFormData, data: {...localFormData.data, [field.name]: e.target.value}})}
                                className="w-full px-4 py-2 border rounded-lg">
                                <option value="">Select...</option>
                                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        ) : (
                            <input type={field.type} placeholder={field.placeholder}
                                value={localFormData.data[field.name] || ''}
                                onChange={(e) => setLocalFormData({...localFormData, data: {...localFormData.data, [field.name]: e.target.value}})}
                                className="w-full px-4 py-2 border rounded-lg" />
                        )}
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Notes (Optional)</label>
                    <textarea value={localFormData.notes} onChange={(e) => setLocalFormData({...localFormData, notes: e.target.value})} rows="3" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                {/* ── Photo Upload ── */}
                {!isPhotoLog && renderPhotoSection(false)}
                {/* PREMIUM_FEATURE: cost tracking — available to all users now; gated to premium subscribers in a future release */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Cost <span className="text-xs font-normal text-gray-400">(Optional — track product &amp; service spend)</span></label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                        <input type="number" min="0" step="0.01" placeholder="0.00"
                            value={localFormData.cost || ''}
                            onChange={(e) => setLocalFormData({...localFormData, cost: e.target.value})}
                            className="w-full pl-7 pr-4 py-2 border rounded-lg" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="flex-1 px-6 py-3 bg-[#367C2B] text-white rounded-lg font-semibold">Save Activity</button>
                    <button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-200 rounded-lg">Cancel</button>
                </div>
            </form>
        </div>
    );
}
