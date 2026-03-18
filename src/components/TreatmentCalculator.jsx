import React from 'react';
import { GRASS_INFO, TREATMENT_CATEGORIES, TREATMENT_PRODUCTS } from '../constants.js';
import { ProFeatureNotice } from './ActivityForm.jsx';

export default function TreatmentCalculator({ lawnProfile, onNavigate, proGated, onUnlock }) {
    const profileSize = lawnProfile && lawnProfile.lawnSize ? String(lawnProfile.lawnSize) : '';
    const profileGrass = lawnProfile && lawnProfile.specificGrass ? lawnProfile.specificGrass : null;
    const grassInfo = profileGrass && GRASS_INFO[profileGrass] ? GRASS_INFO[profileGrass] : null;
    const categories = Object.keys(TREATMENT_CATEGORIES);
    const [category, setCategory] = React.useState('preemergent');
    const [productId, setProductId] = React.useState('');
    const [area, setArea] = React.useState(profileSize);
    const [customRate, setCustomRate] = React.useState('');
    const [customUnit, setCustomUnit] = React.useState('oz');
    const [customPer, setCustomPer] = React.useState('1000');

    const products = TREATMENT_PRODUCTS[category] || [];
    const selectedProduct = products.find(p => p.id === productId) || null;
    const hasKnownRate = selectedProduct && selectedProduct.rateValue;
    const showCustom = !!productId && !hasKnownRate;

    // Grass compatibility checks
    const grassWarning = (() => {
        if (!profileGrass || !selectedProduct || !selectedProduct.grassWarning) return null;
        const { types, message } = selectedProduct.grassWarning;
        return types.includes(profileGrass) ? message : null;
    })();
    const grassCaution = (() => {
        if (!profileGrass || !selectedProduct || !selectedProduct.grassCaution) return null;
        const { types, message } = selectedProduct.grassCaution;
        return types.includes(profileGrass) ? message : null;
    })();

    const areaNum = parseFloat(area) || 0;

    const calcResult = () => {
        if (areaNum <= 0) return null;
        if (hasKnownRate) {
            const per = selectedProduct.ratePer || 1000;
            const qty = Math.round((areaNum / per) * selectedProduct.rateValue * 100) / 100;
            const qtyMax = selectedProduct.rateMax ? Math.round((areaNum / per) * selectedProduct.rateMax * 100) / 100 : null;
            return { qty, qtyMax, unit: selectedProduct.rateUnit };
        }
        if (showCustom && customRate) {
            const rate = parseFloat(customRate);
            const per = parseFloat(customPer) || 1000;
            if (!isNaN(rate) && rate > 0 && per > 0) {
                const qty = Math.round((areaNum / per) * rate * 100) / 100;
                return { qty, qtyMax: null, unit: customUnit };
            }
        }
        return null;
    };

    const result = calcResult();
    const fmt = (n) => n % 1 === 0 ? String(n) : parseFloat(n.toFixed(2)).toString();
    const resultText = result ? (result.qtyMax ? `${fmt(result.qty)}–${fmt(result.qtyMax)} ${result.unit}` : `${fmt(result.qty)} ${result.unit}`) : null;

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
                <h2 style={{fontFamily:'var(--ys-font-display)'}} className="text-2xl font-bold text-gray-900">Treatment Calculator</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'var(--ys-gold-100)', color:'var(--ys-gold-500)', border:'1px solid var(--ys-gold-300)'}}>PRO</span>
            </div>
            <p className="text-sm text-gray-500 mb-5">Calculate exactly how much product you need based on your grass type and yard size.</p>

            {proGated ? <ProFeatureNotice featureName="Treatment Calculator" onUnlock={onUnlock} onViewPricing={onNavigate ? () => onNavigate('proSignup') : null} /> : (<React.Fragment>

            {/* Grass type context strip */}
            <div className="mb-5 flex items-center gap-2 flex-wrap">
                {grassInfo ? (
                    <React.Fragment>
                        <span className="text-xs text-gray-400">Grass type:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{background:'var(--ys-green-100)', color:'var(--ys-green-700)', border:'1px solid var(--ys-green-200)'}}>
                            🌿 {grassInfo.name}
                            {grassInfo.season && <span className="font-normal opacity-70">· {grassInfo.season}</span>}
                        </span>
                    </React.Fragment>
                ) : (
                    <div className="text-xs text-gray-400">
                        💡 <button type="button" onClick={() => onNavigate && onNavigate('profile')}
                            className="font-semibold underline" style={{color:'var(--ys-green-600)'}}>Set your grass type in My Yard</button>
                        {' '}to get compatibility checks
                    </div>
                )}
            </div>

            {/* Category selector */}
            <div className="mb-5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Treatment Type</label>
                <div className="grid grid-cols-3 gap-2">
                    {categories.map(key => {
                        const cat = TREATMENT_CATEGORIES[key];
                        const active = category === key;
                        return (
                            <button key={key} type="button"
                                onClick={() => { setCategory(key); setProductId(''); setCustomRate(''); }}
                                className={`p-2.5 rounded-xl border-2 text-center transition btn-press ${active ? 'text-white' : 'border-gray-200 bg-white text-gray-700'}`}
                                style={active ? {background:'var(--ys-green-600)', borderColor:'var(--ys-green-600)'} : {}}>
                                <div className="text-xl">{cat.icon}</div>
                                <div className="text-xs font-semibold leading-tight mt-0.5">{cat.label}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Research basis note for fungicide/insecticide */}
            {(category === 'fungicide' || category === 'insecticide') && (
                <div className="mb-5 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
                    <strong>📚 Research basis:</strong> Rates informed by University of Kentucky's Chemical Control of Turfgrass Diseases guide and University of Missouri Extension IPM publications. Always follow product label directions.
                </div>
            )}

            {/* Product selector */}
            <div className="mb-5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Product</label>
                <select value={productId} onChange={e => { setProductId(e.target.value); setCustomRate(''); }}
                    className="w-full px-4 py-3 border-2 rounded-xl text-sm">
                    <option value="">Select a product…</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                {selectedProduct && selectedProduct.activeIngredient && (
                    <div className="mt-1.5 text-xs text-gray-400">{selectedProduct.activeIngredient} · {selectedProduct.rate}</div>
                )}
            </div>

            {/* Grass compatibility warning/caution — shown after product is selected */}
            {grassWarning && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 animate-fade-in">
                    <strong>⚠️ Grass Compatibility Warning:</strong> {grassWarning}
                </div>
            )}
            {!grassWarning && grassCaution && (
                <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 animate-fade-in">
                    <strong>⚠️ Caution:</strong> {grassCaution}
                </div>
            )}

            {/* Yard area */}
            <div className="mb-5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                    Yard Area (sq ft)
                    {profileSize && <span className="ml-1 font-normal" style={{color:'var(--ys-green-600)'}}>← from your profile</span>}
                </label>
                <input type="number" value={area} onChange={e => setArea(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full px-4 py-3 border-2 rounded-xl text-sm" />
                {!profileSize && (
                    <div className="mt-1.5 text-xs text-gray-400">
                        💡 Save your yard size in{' '}
                        <button type="button" onClick={() => onNavigate && onNavigate('profile')}
                            className="font-semibold underline" style={{color:'var(--ys-green-600)'}}>My Yard</button>
                        {' '}to pre-fill this automatically
                    </div>
                )}
            </div>

            {/* Custom rate entry for products without a known rate */}
            {showCustom && (
                <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-fade-in">
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Enter Label Rate</div>
                    <p className="text-xs text-amber-700 mb-3">This product's rate varies — enter the rate from your label below.</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <input type="number" value={customRate} onChange={e => setCustomRate(e.target.value)}
                            placeholder="Rate" className="w-20 px-3 py-2 border rounded-lg text-sm" />
                        <select value={customUnit} onChange={e => setCustomUnit(e.target.value)}
                            className="px-2 py-2 border rounded-lg text-sm">
                            <option value="oz">oz</option>
                            <option value="fl oz">fl oz</option>
                            <option value="lbs">lbs</option>
                            <option value="cups">cups</option>
                        </select>
                        <span className="text-xs text-gray-500">per</span>
                        <input type="number" value={customPer} onChange={e => setCustomPer(e.target.value)}
                            placeholder="1000" className="w-20 px-2 py-2 border rounded-lg text-sm" />
                        <span className="text-xs text-gray-500">sq ft</span>
                    </div>
                </div>
            )}

            {/* Result */}
            {result && (
                <div className="p-5 rounded-2xl border-2 text-center animate-scale-in"
                    style={{background:'var(--ys-green-100)', borderColor:'rgba(54,124,43,0.3)'}}>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                        For {Number(areaNum).toLocaleString()} sq ft, you need
                    </div>
                    <div className="text-5xl font-extrabold my-2" style={{fontFamily:'var(--ys-font-display)', color:'var(--ys-green-600)'}}>
                        {resultText}
                    </div>
                    {selectedProduct && selectedProduct.rateMax && (
                        <div className="text-xs text-gray-500 mt-1">Typical range per label</div>
                    )}
                    {selectedProduct && selectedProduct.notes && (
                        <div className="mt-2 text-xs italic text-gray-500">{selectedProduct.notes}</div>
                    )}
                    {selectedProduct && selectedProduct.timing && (
                        <div className="mt-2 text-xs text-gray-500">⏱ Timing: {selectedProduct.timing}</div>
                    )}
                </div>
            )}
            {!result && productId && areaNum > 0 && !showCustom && (
                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 text-center text-sm text-gray-500">
                    Check the product label for the exact application rate.
                </div>
            )}
            {!productId && (
                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-center text-sm text-gray-400">
                    Select a product and enter your yard area to see how much you need.
                </div>
            )}
            </React.Fragment>)}
        </div>
    );
}
