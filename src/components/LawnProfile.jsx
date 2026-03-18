import React, { useState, useEffect } from 'react';
import { GRASS_INFO, ZONE_INFO, GRASS_KEY_MAP, MONTH_NAMES, SOIL_TYPES } from '../constants.js';
import { grassPrograms } from '../grass-programs.js';
import CitationBadge from './CitationBadge.jsx';
import { ForecastImpactCard, WaterDeficitCard, getTaskWeatherStatus, getSoilTestAge, getSoilPHStatus } from './WeatherSnapshot.jsx';

const LawnProfile = ({ profileFormData, profileEditing, lawnProfile, weather, zipLookupLoading, zipLookupError, onZipLookup, onSave, onEditToggle, onNavigate }) => {
    const [localForm, setLocalForm] = useState({...profileFormData});
    useEffect(() => {
        setLocalForm(prev => ({...prev, zone: profileFormData.zone, lat: profileFormData.lat, lon: profileFormData.lon, zipCode: profileFormData.zipCode}));
    }, [profileFormData.zone]);
    const save = async () => {
        const toSave = {...localForm};
        // Archive previous soil test to history when a new test date is entered
        const prevTest = lawnProfile && lawnProfile.soilTest;
        const prevDate = lawnProfile && lawnProfile.soilTestDate;
        const newDate = toSave.soilTestDate;
        if (prevTest && prevTest.pH && newDate && prevDate && newDate !== prevDate) {
            const prevEntry = { ...prevTest, date: prevDate };
            const existingHistory = lawnProfile.soilTestHistory || [];
            // Avoid duplicating the same date
            const alreadyArchived = existingHistory.some(h => h.date === prevDate);
            if (!alreadyArchived) {
                toSave.soilTestHistory = [prevEntry, ...existingHistory].slice(0, 10); // keep last 10
            }
        }
        await onSave(toSave);
    };
    const grassInfo = GRASS_INFO[localForm.specificGrass];
    const zoneInfo = ZONE_INFO[localForm.zone];

    const getParentZone = (zone) => zone ? zone.replace(/[ab]$/, '') : zone;

    const getCurrentMonthTasks = () => {
        if (!localForm.specificGrass || !localForm.zone) return null;
        const programKey = GRASS_KEY_MAP[localForm.specificGrass] + '_zone' + getParentZone(localForm.zone);
        const program = grassPrograms[programKey];
        if (!program || !program.schedule) return null;
        const currentMonth = MONTH_NAMES[new Date().getMonth()];
        return program.schedule.find(s => {
            if (s.month === currentMonth) return true;
            if (s.month && s.month.includes('-')) {
                const parts = s.month.split('-');
                const startIdx = MONTH_NAMES.indexOf(parts[0].trim()), endIdx = MONTH_NAMES.indexOf(parts[1].trim()), curIdx = MONTH_NAMES.indexOf(currentMonth);
                if (startIdx >= 0 && endIdx >= 0 && curIdx >= startIdx && curIdx <= endIdx) return true;
            }
            return false;
        });
    };
    const currentTasks = getCurrentMonthTasks();

    if (profileEditing) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-6">Lawn Profile</h2>
                <div className="bg-white rounded-lg shadow p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Lawn Size (sq ft)</label>
                        <input type="number" value={localForm.lawnSize} onChange={(e) => setLocalForm({...localForm, lawnSize: e.target.value})} placeholder="5000" className="w-full px-4 py-3 border-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Find Zone by Zip Code</label>
                        <div className="flex gap-2">
                            <input type="text" inputMode="numeric" maxLength={5} value={localForm.zipCode || ''} onChange={(e) => setLocalForm({...localForm, zipCode: e.target.value})}
                                onKeyDown={(e) => { if (e.key === 'Enter') onZipLookup(localForm.zipCode); }} placeholder="e.g. 43201" className="flex-1 px-4 py-3 border-2 rounded-lg" />
                            <button type="button" onClick={() => onZipLookup(localForm.zipCode)} disabled={zipLookupLoading}
                                className="px-4 py-3 bg-[#367C2B] text-white rounded-lg font-semibold text-sm disabled:opacity-60 whitespace-nowrap">
                                {zipLookupLoading ? 'Looking up...' : 'Look Up'}
                            </button>
                        </div>
                        {zipLookupError && <div className="mt-1 text-xs text-red-600">{zipLookupError}</div>}
                        {localForm.zone && ZONE_INFO[localForm.zone] && !zipLookupError && <div className="mt-1 text-xs text-[#367C2B] font-medium">Zone {localForm.zone.toUpperCase()} detected — {ZONE_INFO[localForm.zone].temp}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">USDA Climate Zone <span className="font-normal text-gray-500">(or select manually)</span></label>
                        <select value={localForm.zone} onChange={(e) => setLocalForm({...localForm, zone: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg">
                            <option value="">Select...</option>
                            <optgroup label="Zone 4 — Northern Cold (-30 to -20°F)"><option value="4a">Zone 4a (-30 to -25°F)</option><option value="4b">Zone 4b (-25 to -20°F)</option></optgroup>
                            <optgroup label="Zone 5 — Northern (-20 to -10°F)"><option value="5a">Zone 5a (-20 to -15°F)</option><option value="5b">Zone 5b (-15 to -10°F)</option></optgroup>
                            <optgroup label="Zone 6 — Moderate (-10 to 0°F)"><option value="6a">Zone 6a (-10 to -5°F)</option><option value="6b">Zone 6b (-5 to 0°F)</option></optgroup>
                            <optgroup label="Zone 7 — Transition Zone (0 to 10°F)"><option value="7a">Zone 7a (0 to 5°F)</option><option value="7b">Zone 7b (5 to 10°F)</option></optgroup>
                            <optgroup label="Zone 8 — Southern (10 to 20°F)"><option value="8a">Zone 8a (10 to 15°F)</option><option value="8b">Zone 8b (15 to 20°F)</option></optgroup>
                            <optgroup label="Zone 9 — Deep South / Gulf (20 to 30°F)"><option value="9a">Zone 9a (20 to 25°F)</option><option value="9b">Zone 9b (25 to 30°F)</option></optgroup>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Grass Type</label>
                        <select value={localForm.specificGrass} onChange={(e) => setLocalForm({...localForm, specificGrass: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg">
                            <option value="">Select...</option>
                            <optgroup label="Cool Season"><option value="tall-fescue">Tall Fescue</option><option value="kentucky-bluegrass">Kentucky Bluegrass</option><option value="perennial-ryegrass">Perennial Ryegrass</option><option value="fine-fescue">Fine Fescue</option></optgroup>
                            <optgroup label="Warm Season"><option value="bermuda">Bermudagrass</option><option value="zoysia">Zoysiagrass</option><option value="st-augustine">St. Augustinegrass</option><option value="centipede">Centipedegrass</option><option value="bahia">Bahiagrass</option></optgroup>
                            <optgroup label="Native / Low-Input"><option value="buffalograss">Buffalograss</option></optgroup>
                            <optgroup label="Blends / Mixed Seed"><option value="sun-shade-mix">Sun &amp; Shade Mix</option><option value="dense-shade-mix">Dense Shade Mix</option><option value="tall-fescue-blend">Tall Fescue Blend</option></optgroup>
                        </select>
                        {grassInfo && grassInfo.blendBrands && (
                            <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <div className="text-xs font-bold text-blue-800 mb-2">🏷️ Common brand examples for this blend:</div>
                                <ul className="space-y-1">
                                    {grassInfo.blendBrands.map((b, i) => (
                                        <li key={i} className="text-xs text-blue-700"><span className="font-semibold">{b.brand} — {b.product}</span><span className="text-blue-500"> ({b.note})</span></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-2">Soil Type</label>
                            <select value={localForm.soilType || ''} onChange={(e) => setLocalForm({...localForm, soilType: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg text-sm">
                                <option value="">Select...</option>
                                <option value="sandy">Sandy</option>
                                <option value="sandy-loam">Sandy Loam</option>
                                <option value="loam">Loam (Ideal)</option>
                                <option value="silt">Silt</option>
                                <option value="clay-loam">Clay Loam</option>
                                <option value="clay">Clay</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Sun Exposure</label>
                            <select value={localForm.sunExposure || ''} onChange={(e) => setLocalForm({...localForm, sunExposure: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg text-sm">
                                <option value="">Select...</option>
                                <option value="full-sun">Full Sun (6+ hrs)</option>
                                <option value="part-shade">Part Shade (3–6 hrs)</option>
                                <option value="heavy-shade">Heavy Shade (&lt;3 hrs)</option>
                            </select>
                        </div>
                    </div>
                    {localForm.soilType && SOIL_TYPES[localForm.soilType] && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-800">
                            <span className="font-semibold">{SOIL_TYPES[localForm.soilType].name}:</span> {SOIL_TYPES[localForm.soilType].description} — {SOIL_TYPES[localForm.soilType].wateringNote}
                        </div>
                    )}
                    {/* ── Soil Test Section ── */}
                    <div className="border-2 border-dashed border-amber-300 rounded-xl p-4 bg-amber-50">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">🧪</span>
                            <div className="text-sm font-bold text-amber-800">Soil Test Results</div>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-semibold">Optional</span>
                        </div>
                        <p className="text-xs text-amber-700 mb-3">A soil test unlocks precise fertilizer &amp; pH recommendations. Most state extension labs cost $15–20. <a href="https://www.nrcs.usda.gov/conservation-basics/conservation-by-state" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Find your state lab →</a></p>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-amber-800 mb-1">Soil pH</label>
                                    <input type="number" step="0.1" min="4.0" max="9.0"
                                        value={(localForm.soilTest && localForm.soilTest.pH) || ''}
                                        onChange={(e) => setLocalForm({...localForm, soilTest: {...(localForm.soilTest||{}), pH: e.target.value}})}
                                        placeholder="e.g. 6.5"
                                        className="w-full px-3 py-2 border-2 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-amber-800 mb-1">Test Date</label>
                                    <input type="date"
                                        value={localForm.soilTestDate || ''}
                                        onChange={(e) => setLocalForm({...localForm, soilTestDate: e.target.value})}
                                        className="w-full px-3 py-2 border-2 rounded-lg text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-amber-800 mb-1">Nutrient Levels <span className="font-normal text-amber-600">(from your report)</span></label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['nitrogen', 'phosphorus', 'potassium'].map(nutrient => (
                                        <div key={nutrient}>
                                            <div className="text-xs text-amber-700 mb-1">{nutrient === 'nitrogen' ? 'Nitrogen (N)' : nutrient === 'phosphorus' ? 'Phosphorus (P)' : 'Potassium (K)'}</div>
                                            <select
                                                value={(localForm.soilTest && localForm.soilTest[nutrient]) || ''}
                                                onChange={(e) => setLocalForm({...localForm, soilTest: {...(localForm.soilTest||{}), [nutrient]: e.target.value}})}
                                                className="w-full px-2 py-2 border-2 rounded-lg text-xs">
                                                <option value="">–</option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-amber-800 mb-1">Lab Notes <span className="font-normal text-amber-600">(optional)</span></label>
                                <textarea
                                    value={(localForm.soilTest && localForm.soilTest.notes) || ''}
                                    onChange={(e) => setLocalForm({...localForm, soilTest: {...(localForm.soilTest||{}), notes: e.target.value}})}
                                    placeholder="e.g. Apply 40 lbs lime per 1000 sq ft..."
                                    rows={2}
                                    className="w-full px-3 py-2 border-2 rounded-lg text-sm resize-none" />
                            </div>
                        </div>
                    </div>
                    <button onClick={save} className="w-full py-4 bg-[#367C2B] text-white rounded-xl font-bold text-lg">💾 Save Profile</button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">My Yard</h2>
                <button onClick={() => onEditToggle(true)} className="px-4 py-2 text-sm font-semibold text-[#367C2B] border-2 border-[#367C2B] rounded-lg hover:bg-[#367C2B]/10">Edit Profile</button>
            </div>
            <div className="bg-gradient-to-r from-[#367C2B] to-[#4a9c3a] rounded-xl p-5 text-white shadow-lg">
                <div className="text-lg font-bold">{grassInfo ? grassInfo.name : localForm.specificGrass}</div>
                <div className="text-sm opacity-90 mt-1">
                    {grassInfo && <span>{grassInfo.season}</span>}
                    {zoneInfo && <span> · Zone {localForm.zone} ({zoneInfo.climate}) <CitationBadge sources={[{ name: 'USDA Plant Hardiness Zone Map', url: 'https://planthardiness.ars.usda.gov/', topic: 'Official zone classifications' }]} label="USDA Zone" /></span>}
                    {localForm.lawnSize && <span> · {Number(localForm.lawnSize).toLocaleString()} sq ft</span>}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {localForm.soilType && SOIL_TYPES[localForm.soilType] && (
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">🪨 {SOIL_TYPES[localForm.soilType].name} Soil</span>
                    )}
                    {localForm.sunExposure && (
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                            {localForm.sunExposure === 'full-sun' ? '☀️ Full Sun' : localForm.sunExposure === 'part-shade' ? '⛅ Part Shade' : '🌑 Heavy Shade'}
                        </span>
                    )}
                </div>
                {grassInfo && <div className="mt-2 text-sm opacity-90 italic">"{grassInfo.bestFeature}"</div>}
            </div>
            {(() => {
                const zoneNote = grassInfo && grassInfo.zoneNotes && (grassInfo.zoneNotes[localForm.zone] || grassInfo.zoneNotes[getParentZone(localForm.zone)]);
                if (!zoneNote) return null;
                const noteLower = zoneNote.toLowerCase();
                const colorClass = noteLower.includes('not recommended') || noteLower.includes('not viable') ? 'bg-red-50 border-red-500' : noteLower.includes('challenging') || noteLower.includes('difficult') || noteLower.includes('marginal') ? 'bg-yellow-50 border-yellow-500' : 'bg-[#e8f5e9] border-[#367C2B]';
                return (
                    <div className={`rounded-xl p-4 border-l-4 ${colorClass}`}>
                        <div className="font-bold text-sm mb-1">Zone {localForm.zone} Compatibility <CitationBadge sources={grassInfo.sources} label="Zone adaptation" /></div>
                        <div className="text-sm text-gray-700">{zoneNote}</div>
                    </div>
                );
            })()}
            {grassInfo && (
                <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="text-sm font-bold text-[#367C2B] uppercase mb-3">Quick Reference <CitationBadge sources={grassInfo.sources} label="Grass care specs" /></h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center"><div className="text-xs text-gray-500 mb-1">Mow Height</div><div className="text-sm font-bold text-gray-800">{grassInfo.mowHeight}</div><div className="text-xs text-gray-400 mt-1">Summer: {grassInfo.mowHeightSummer}</div></div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center"><div className="text-xs text-gray-500 mb-1">Water / Week</div><div className="text-sm font-bold text-gray-800">{grassInfo.waterPerWeek}</div></div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center"><div className="text-xs text-gray-500 mb-1">Sun Needs</div><div className="text-sm font-bold text-gray-800">{grassInfo.sunNeeds}</div></div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center"><div className="text-xs text-gray-500 mb-1">Fertilizer / Year</div><div className="text-sm font-bold text-gray-800">{grassInfo.fertPerYear}</div></div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center"><div className="text-xs text-gray-500 mb-1">Ideal Soil pH</div><div className="text-sm font-bold text-gray-800">{grassInfo.idealSoilPH}</div></div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center"><div className="text-xs text-gray-500 mb-1">Peak Growth</div><div className="text-sm font-bold text-gray-800">{grassInfo.peakGrowth}</div></div>
                        {grassInfo.idealSoilTemp && <div className="bg-gray-50 rounded-lg p-3 text-center col-span-2"><div className="text-xs text-gray-500 mb-1">Ideal Soil Temp</div><div className="text-sm font-bold text-gray-800">{grassInfo.idealSoilTemp}</div></div>}
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg"><div className="text-xs text-blue-600 font-semibold mb-1">Dormancy</div><div className="text-sm text-gray-700">{grassInfo.dormancy}</div></div>
                </div>
            )}
            {currentTasks && weather && <ForecastImpactCard tasks={currentTasks.tasks} weather={weather} lawnProfile={lawnProfile} />}
            {currentTasks && (
                <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="text-sm font-bold text-[#367C2B] uppercase mb-1">This Month's Tasks <CitationBadge sources={grassInfo ? grassInfo.sources : null} label="Monthly program" /></h3>
                    <div className="text-xs text-gray-500 mb-3">{currentTasks.month}{currentTasks.importance ? ` — ${currentTasks.importance}` : ''}</div>
                    <ul className="space-y-3">
                        {currentTasks.tasks.map((task, i) => {
                            const ws = getTaskWeatherStatus(task, weather, lawnProfile);
                            const badgeStyle = ws ? ws.status === 'go' ? 'bg-[#e8f5e9] text-[#367C2B]' : ws.status === 'caution' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700' : null;
                            const badgeLabel = ws ? ws.status === 'go' ? '✓ Good timing' : ws.status === 'caution' ? '⚠ Note' : '✕ Hold' : null;
                            return (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-[#367C2B] mt-0.5 font-bold shrink-0">·</span>
                                    <div className="flex-1"><span>{task}</span>{ws && <span className={`ml-2 text-xs font-semibold px-1.5 py-0.5 rounded ${badgeStyle}`}>{badgeLabel}</span>}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            {grassInfo && weather && <WaterDeficitCard grassInfo={grassInfo} weather={weather} />}
            {/* ── Soil Test Card ── */}
            {(() => {
                const st = lawnProfile && lawnProfile.soilTest;
                const testAge = getSoilTestAge(lawnProfile && lawnProfile.soilTestDate);
                const hasSoilData = st && st.pH;
                const phStatus = hasSoilData ? getSoilPHStatus(st.pH, lawnProfile.specificGrass) : null;
                const grassIdealPH = grassInfo ? grassInfo.idealSoilPH : '6.0–7.0';
                const isStale = testAge !== null && testAge >= 2;
                const nutrientColors = { low: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', high: 'bg-green-100 text-green-700' };
                return (
                    <div className="bg-white rounded-xl shadow-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-amber-700 uppercase flex items-center gap-1.5">
                                🧪 Soil Test Data
                                <CitationBadge sources={[{name:'Penn State Extension',url:'https://extension.psu.edu/soil-testing',topic:'Soil testing & pH management'},{name:'Clemson Extension',url:'https://www.clemson.edu/extension/agents/horticulture/soil-testing.html',topic:'Soil nutrient management'}]} label="Soil testing guidance" />
                            </h3>
                            <button onClick={() => onEditToggle(true)} className="text-xs text-amber-700 underline font-semibold">{hasSoilData ? 'Update' : 'Add Results'}</button>
                        </div>
                        {!hasSoilData ? (
                            <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
                                <div className="text-sm font-semibold text-amber-800 mb-1">No soil test on record</div>
                                <p className="text-xs text-amber-700 mb-2">A soil test is the single most important step before fertilizing. It tells you exactly what your lawn needs — and what it doesn't.</p>
                                <div className="text-xs text-amber-600 font-semibold mb-2">💡 Ideal pH for {grassInfo ? grassInfo.name : 'your grass'}: {grassIdealPH}</div>
                                <a href="https://www.nrcs.usda.gov/conservation-basics/conservation-by-state" target="_blank" rel="noopener noreferrer" className="text-xs underline text-amber-700 font-semibold">Find your state extension lab →</a>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {isStale && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 font-semibold">
                                        ⚠️ Test is {testAge} year{testAge > 1 ? 's' : ''} old — consider retesting
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-gray-500 mb-1">Soil pH</div>
                                        <div className="text-xl font-extrabold text-gray-800">{st.pH}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">Ideal: {grassIdealPH}</div>
                                    </div>
                                    {phStatus && (
                                        <div className={`flex-1 rounded-lg p-3 text-center ${phStatus.color === 'green' ? 'bg-green-50' : phStatus.color === 'orange' ? 'bg-orange-50' : 'bg-amber-50'}`}>
                                            <div className={`text-xs font-bold mb-1 ${phStatus.color === 'green' ? 'text-green-700' : phStatus.color === 'orange' ? 'text-orange-700' : 'text-amber-700'}`}>{phStatus.label}</div>
                                            {phStatus.action
                                                ? <div className={`text-xs ${phStatus.color === 'green' ? 'text-green-600' : phStatus.color === 'orange' ? 'text-orange-600' : 'text-amber-600'}`}>{phStatus.action}</div>
                                                : <div className="text-xs text-green-600">No amendment needed</div>}
                                        </div>
                                    )}
                                </div>
                                {(st.nitrogen || st.phosphorus || st.potassium) && (
                                    <div>
                                        <div className="text-xs text-gray-500 font-semibold mb-1.5">Nutrient Levels</div>
                                        <div className="flex gap-2">
                                            {['nitrogen','phosphorus','potassium'].map(n => st[n] ? (
                                                <div key={n} className={`flex-1 rounded-lg px-2 py-2 text-center text-xs font-bold ${nutrientColors[st[n]] || 'bg-gray-100 text-gray-600'}`}>
                                                    <div className="font-extrabold text-base">{n === 'nitrogen' ? 'N' : n === 'phosphorus' ? 'P' : 'K'}</div>
                                                    <div className="capitalize">{st[n]}</div>
                                                </div>
                                            ) : null)}
                                        </div>
                                    </div>
                                )}
                                {st.notes && (
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="text-xs text-gray-500 font-semibold mb-1">Lab Notes</div>
                                        <div className="text-xs text-gray-700 leading-snug">{st.notes}</div>
                                    </div>
                                )}
                                {lawnProfile.soilTestDate && (
                                    <div className="text-xs text-gray-400 text-right">Tested: {new Date(lawnProfile.soilTestDate).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</div>
                                )}
                                {/* ── Soil Test History ── */}
                                {lawnProfile.soilTestHistory && lawnProfile.soilTestHistory.length > 0 && (
                                    <div className="border-t border-gray-100 pt-3 mt-1">
                                        <div className="text-xs text-gray-500 font-semibold mb-2">📈 Test History</div>
                                        <div className="space-y-2">
                                            {lawnProfile.soilTestHistory.map((h, i) => (
                                                <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-3 text-xs">
                                                    <div className="text-gray-400 whitespace-nowrap">{h.date ? new Date(h.date).toLocaleDateString('en-US', {month:'short', year:'numeric'}) : 'Unknown date'}</div>
                                                    {h.pH && <div className="font-bold text-gray-700">pH {h.pH}</div>}
                                                    <div className="flex gap-1 ml-auto">
                                                        {['nitrogen','phosphorus','potassium'].map(n => h[n] ? (
                                                            <span key={n} className={`px-1.5 py-0.5 rounded font-bold ${nutrientColors[h[n]] || 'bg-gray-100 text-gray-600'}`}>{n === 'nitrogen' ? 'N' : n === 'phosphorus' ? 'P' : 'K'}: {h[n]}</span>
                                                        ) : null)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })()}
            <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="text-sm font-bold text-[#367C2B] uppercase mb-2">Lawn Care Program</h3>
                <p className="text-sm text-gray-600 mb-3">View your full personalized year-round care schedule with monthly tasks, treatments, and timing.</p>
                <button onClick={() => onNavigate('gameplan')} className="w-full py-3 px-4 bg-[#367C2B] text-white rounded-xl font-bold text-sm hover:bg-[#2d6323] btn-press">
                    📅 Go to Lawn Care Program →
                </button>
            </div>
            {grassInfo && grassInfo.keyTips && (
                <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="text-sm font-bold text-[#367C2B] uppercase mb-3">Key Tips <CitationBadge sources={grassInfo.sources} label="Care tips" /></h3>
                    <ul className="space-y-2">{grassInfo.keyTips.map((tip, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-[#367C2B] mt-0.5">💡</span><span>{tip}</span></li>)}</ul>
                </div>
            )}
            {grassInfo && grassInfo.commonIssues && (
                <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="text-sm font-bold text-orange-600 uppercase mb-3">Watch Out For <CitationBadge sources={grassInfo.sources} label="Common issues" /></h3>
                    <ul className="space-y-2">{grassInfo.commonIssues.map((issue, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-orange-500 mt-0.5">⚠️</span><span>{issue}</span></li>)}</ul>
                </div>
            )}
            {grassInfo && grassInfo.blendBrands && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="text-sm font-bold text-blue-800 uppercase mb-3">🏷️ Common Brand Examples</h3>
                    <p className="text-xs text-blue-600 mb-3">These retail products typically contain this blend type. Use as a reference when buying seed for overseeding.</p>
                    <ul className="space-y-2">
                        {grassInfo.blendBrands.map((b, i) => (
                            <li key={i} className="bg-white rounded-lg p-2 border border-blue-100">
                                <div className="text-sm font-semibold text-gray-800">{b.brand} — {b.product}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{b.note}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {grassInfo && grassInfo.sources && grassInfo.sources.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">📚 Research Sources</div>
                    <div className="space-y-1">
                        {grassInfo.sources.map((s, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                                <span className="text-[#367C2B] mt-0.5">·</span>
                                {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#367C2B] hover:text-[#2d6323] underline font-semibold">{s.name}</a> : <span className="text-gray-600 font-semibold">{s.name}</span>}
                                {s.topic && <span className="text-gray-400">— {s.topic}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LawnProfile;
