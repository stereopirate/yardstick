import React, { useState, useRef } from 'react';

export default function GrassIdentifierView({ lawnProfile, onSaveProfile, onNavigate }) {

    // ── Grass data ──────────────────────────────────────────────────────────
    const GRASSES_DATA = [
        { key:'bermuda', name:'Bermudagrass', sci:'Cynodon dactylon', season:'warm', regions:['Southeast','South','Southwest','Transition Zone'], zones:'6b–10', prevalence:'very-common', prevLabel:'Most common warm-season grass', bladeWidth:'Fine to medium (1–2mm)', texture:'Dense, wiry, carpet-like', color:'Medium to dark green', dormancy:'Tan/straw in winter (dormant below 50°F)', growth:'Aggressive spreading via stolons & rhizomes', shade:'Full sun — 6+ hrs required', drought:'Excellent', traffic:'Excellent', identifyBy:['Very fine, wiry blades — thinner than a pencil lead','Aggressive surface runners (stolons) visible on pavement edges','Feathery seed heads shaped like tiny bird feet','Turns straw-brown in winter, greens up fast in spring','Dense, tightly knit mat that chokes out weeds'], lookAlikes:['Zoysiagrass (softer, slower spreading)'], states:'TX, GA, AL, SC, NC, AZ, CA (warm areas)', soilPH:'6.0–7.0', mowHt:'0.5–1.5"', sources:['NC State Extension','UGA Extension','Texas A&M AgriLife'], accent:'#2D6E22' },
        { key:'zoysia', name:'Zoysiagrass', sci:'Zoysia japonica', season:'warm', regions:['Southeast','Transition Zone','Mid-Atlantic'], zones:'5b–10', prevalence:'common', prevLabel:'Common in Southeast & Mid-Atlantic', bladeWidth:'Fine to medium (2–4mm)', texture:'Stiff, dense, cushion-like', color:'Medium green', dormancy:'Turns golden-tan; last to green up in spring', growth:'Slow-spreading stolons & rhizomes', shade:'Moderate (3–4 hrs sun)', drought:'Good', traffic:'Good', identifyBy:['Stiff, almost scratchy blades — stiffer than Bermuda','Very dense, cushion-like feel underfoot','Slow to spread — defined, sharp lawn edges','Stays green longer into fall than Bermuda','Rare seed heads — mostly vegetative spread'], lookAlikes:['Bermudagrass (finer & more aggressive)'], states:'VA, MD, NC, TN, GA, TX, KS, MO', soilPH:'6.0–6.5', mowHt:'0.5–2"', sources:['NC State Extension','Clemson Extension','Kansas State Extension'], accent:'#1E5C16' },
        { key:'st-augustine', name:'St. Augustinegrass', sci:'Stenotaphrum secundatum', season:'warm', regions:['Gulf Coast','Florida','Coastal Southeast','Southern California'], zones:'8–10', prevalence:'very-common', prevLabel:'Dominant grass in FL & Gulf Coast', bladeWidth:'Very wide (8–10mm) — broadest of all lawn grasses', texture:'Coarse, flat, boat-shaped blade tip', color:'Dark blue-green', dormancy:'Tan only in hard freezes; stays green above Zone 9', growth:'Fast above-ground stolons', shade:'Best shade tolerance of warm-season grasses', drought:'Moderate — needs regular water', traffic:'Poor', identifyBy:['Wide, flat blades — clearly broader than any other lawn grass','Rounded or boat-shaped blade tip (not pointed)','Dark blue-green color — darker than most lawns','Large, visible stolons with prominent nodes','Only vegetative spread — no commercial seed exists'], lookAlikes:['Centipedegrass (much narrower blades)'], states:'FL, TX Gulf Coast, LA, MS, AL, Southern CA', soilPH:'6.0–7.5', mowHt:'2.5–4"', sources:['UF IFAS','Texas A&M AgriLife','LSU AgCenter'], accent:'#1A5C14' },
        { key:'centipede', name:'Centipedegrass', sci:'Eremochloa ophiuroides', season:'warm', regions:['Southeast','Coastal Plain'], zones:'7–9', prevalence:'regional', prevLabel:'Common in Southeast Coastal Plain', bladeWidth:'Medium (3–4mm)', texture:'Compact, low-growing, short blades', color:'Distinctly light apple-green', dormancy:'Turns tan/brown in winter', growth:'Slow-spreading stolons', shade:'Moderate', drought:'Moderate — drought sensitive', traffic:'Poor', identifyBy:['Distinctly lighter, apple-green color vs. any other grass','Short compact blades — naturally low-growing, minimal mowing','Short seed heads that resemble centipede legs','Sensitive to over-fertilizing — yellows with too much nitrogen','Often appears neglected but is naturally low-input'], lookAlikes:['St. Augustinegrass (much wider blades)'], states:'GA, SC, NC, FL panhandle, AL, MS', soilPH:'5.0–6.0', mowHt:'1–2"', sources:['Clemson Extension','NC State Extension','UGA Extension'], accent:'#4A7C30' },
        { key:'bahia', name:'Bahiagrass', sci:'Paspalum notatum', season:'warm', regions:['Florida','Gulf Coast'], zones:'7–11', prevalence:'regional', prevLabel:'Common in FL roadsides & low-maint. lawns', bladeWidth:'Medium (4–6mm)', texture:'Coarse, open growth habit', color:'Medium green, sometimes yellowish', dormancy:'Turns brown in winter in most zones', growth:'Deep roots, stolons and seed', shade:'Low', drought:'Excellent — very deep root system', traffic:'Moderate', identifyBy:['Prominent Y-shaped or V-shaped seed heads throughout the season','Coarser, open texture with a somewhat stemmy look','Tough to mow — dulls mower blades quickly','Very deep roots — drought-tough but bumpy underfoot','Common in FL pastures, roadsides, low-maintenance yards'], lookAlikes:['St. Augustinegrass (wider, denser blades)'], states:'FL (very common), coastal GA, AL, MS', soilPH:'5.5–6.5', mowHt:'2.5–4"', sources:['UF IFAS','Texas A&M AgriLife'], accent:'#5A7C28' },
        { key:'buffalograss', name:'Buffalograss', sci:'Bouteloua dactyloides', season:'warm', regions:['Great Plains','High Plains','Southwest'], zones:'3–9', prevalence:'regional', prevLabel:'Native Great Plains — drought lawns', bladeWidth:'Very fine (1–2mm)', texture:'Fine, curly, blue-green, short mat', color:'Blue-green to gray-green', dormancy:'Straw-tan from fall through late spring', growth:'Native grass; slow-spreading stolons', shade:'Poor', drought:'Outstanding — native dryland grass', traffic:'Moderate', identifyBy:['Rarely grows over 4–5 inches even completely unmowed','Curly, fine blades with a blue-green or grayish hue','Very long dormant season — tan from fall through May','Distinctly different look from non-native lawn grasses','Female plants have bur-like seed heads near the base'], lookAlikes:['Bermudagrass (darker green, more aggressive)'], states:'KS, OK, NE, TX High Plains, CO, WY', soilPH:'6.5–8.0', mowHt:'2–4"', sources:['Kansas State Extension','Oklahoma State Extension','Texas A&M AgriLife'], accent:'#4A6840' },
        { key:'tall-fescue', name:'Tall Fescue', sci:'Festuca arundinacea', season:'cool', regions:['Transition Zone','Pacific Northwest','Mid-Atlantic','Midwest'], zones:'4–7', prevalence:'very-common', prevLabel:'Most widely planted cool-season grass', bladeWidth:'Medium to coarse (3–6mm)', texture:'Upright, clumping bunch-type', color:'Dark green — darkest cool-season grass', dormancy:'Stays green in winter; may stress in Zone 7 summers', growth:'Bunch-type — does not spread; fills via overseeding', shade:'Good (3–4 hrs sun)', drought:'Good — deep roots', traffic:'Good', identifyBy:['Wide, flat blades with a prominent center midrib','Coarser texture — rougher than bluegrass or ryegrass','Bunchy, clumping growth — does not spread to fill bare spots','Shiny, waxy underside on the blade','Stays green through mild winters without going dormant'], lookAlikes:['Perennial Ryegrass (finer, glossier)','Kentucky Bluegrass (finer, boat-tip)'], states:'NC, VA, MD, KY, TN, OH, PA, OR, WA', soilPH:'5.5–7.0', mowHt:'3–4"', sources:['NC State Extension','Rutgers Extension','Oregon State Extension'], accent:'#1E5C30' },
        { key:'kentucky-bluegrass', name:'Kentucky Bluegrass', sci:'Poa pratensis', season:'cool', regions:['Northern US','Upper Midwest','Mountain West','Pacific Northwest'], zones:'2–6', prevalence:'very-common', prevLabel:'The classic Northern lawn grass', bladeWidth:'Fine to medium (2–4mm)', texture:'Soft, velvety, spreading sod', color:'Dark blue-green', dormancy:'Goes dormant straw-brown in summer drought and heat', growth:'Spreads via underground rhizomes — self-repairs bare spots', shade:'Low — needs full sun', drought:'Poor — goes dormant under heat/drought', traffic:'Good — self-repairs via rhizomes', identifyBy:['Boat-shaped blade tip — like the bow of a canoe (the key ID feature)','Prominent double mid-vein running lengthwise down the blade center','Soft, velvety feel underfoot','Blue-green color — noticeably cooler tone than fescue','Spreads to fill bare spots on its own via underground rhizomes'], lookAlikes:['Annual Bluegrass / Poa annua (lighter green, weedy)','Fine Fescue (hair-thin blades)'], states:'MN, WI, MI, OH, PA, IA, CO, WA, OR', soilPH:'6.0–7.0', mowHt:'2.5–3.5"', sources:['U of MN Extension','Penn State Extension','Colorado State Extension'], accent:'#1E3C5C' },
        { key:'perennial-ryegrass', name:'Perennial Ryegrass', sci:'Lolium perenne', season:'cool', regions:['Pacific Northwest','Northern US','Transition Zone (overseeding)'], zones:'3–6', prevalence:'common', prevLabel:'Common in mixes & Pacific NW lawns', bladeWidth:'Fine to medium (2–4mm)', texture:'Fine, glossy, upright — premium look', color:'Bright, shiny green', dormancy:'Green through cool seasons; thins in hot summers', growth:'Bunch-type — fast germination, no spreading', shade:'Moderate', drought:'Poor', traffic:'Excellent — most wear-resistant cool-season grass', identifyBy:['Very shiny, glossy underside — reflects light clearly','Fine blades with a sharp-pointed tip','Bright, almost luminous green color','Fastest germinating lawn grass — sprouts in 5–7 days','Often mixed with bluegrass — creates uneven clumpy texture zones'], lookAlikes:['Tall Fescue (coarser, less glossy)','Kentucky Bluegrass (boat-tip, not glossy)'], states:'OR, WA, CA (cool areas), blends nationwide', soilPH:'6.0–7.0', mowHt:'1.5–2.5"', sources:['Oregon State Extension','Rutgers Extension','U of MN Extension'], accent:'#1E5C2C' },
        { key:'fine-fescue', name:'Fine Fescue', sci:'Festuca spp.', season:'cool', regions:['Northern US','New England','Shaded areas','Pacific Northwest'], zones:'2–6', prevalence:'common', prevLabel:'Common in shade mixes & low-input lawns', bladeWidth:'Very fine — hair-like (0.5–1.5mm)', texture:'Needle-like, wispy, soft-bristle', color:'Medium to blue-green', dormancy:'Can go semi-dormant in summer heat', growth:'Bunch or creeping depending on species', shade:'Best shade tolerance of all cool-season grasses', drought:'Good for a cool-season grass', traffic:'Poor', identifyBy:['Hair-thin, needle-like blades — finest texture of all lawn grasses','Blades often folded or rolled, not flat like other grasses','Wispy, flowing, almost ornamental appearance','Usually found in shaded areas where other grasses fail','Slow growth — very infrequent mowing needed'], lookAlikes:['Perennial Ryegrass (flat, wider blades)','Kentucky Bluegrass (boat-tip, wider)'], states:'ME, VT, NH, MA, MN, WI — shade areas everywhere', soilPH:'5.5–6.5', mowHt:'2.5–3.5"', sources:['U of MN Extension','Penn State Extension','Rutgers Extension'], accent:'#2E5C38' },
    ];

    const QUIZ_STEPS = [
        { id:'winter', q:'What does your lawn do in winter?', icon:'🌡️', opts:[
            { l:'Turns tan or straw-brown', h:'Goes fully dormant', warm:4, cool:0 },
            { l:'Stays green (or mostly green)', h:'Barely slows down in cool weather', warm:0, cool:4 },
            { l:'Not sure — new to this yard', h:'', warm:1, cool:1 }
        ]},
        { id:'texture', q:'Touch a blade — how does it feel?', icon:'🖐️', opts:[
            { l:'Hair-thin / needle-like', h:'Almost like soft bristles', boost:['fine-fescue','buffalograss'] },
            { l:'Fine and wiry', h:'Thin but not hair-thin', boost:['bermuda','zoysia','kentucky-bluegrass','perennial-ryegrass'] },
            { l:'Medium — typical grass width', h:'', boost:['zoysia','centipede','tall-fescue','kentucky-bluegrass'] },
            { l:'Wide / coarse — clearly broad', h:'', boost:['st-augustine','bahia','tall-fescue'] }
        ]},
        { id:'spread', q:'Does your lawn fill bare spots on its own?', icon:'🔀', opts:[
            { l:'Yes — very aggressively', h:'Visible surface runners on hard surfaces', boost:['bermuda','st-augustine'] },
            { l:'Yes — slowly over a season', h:'Self-repairs but takes time', boost:['zoysia','kentucky-bluegrass','centipede'] },
            { l:'No — bare spots stay bare', h:'Needs reseeding to fill in', boost:['tall-fescue','perennial-ryegrass','fine-fescue','buffalograss'] }
        ]},
        { id:'location', q:'Which best describes your location?', icon:'📍', opts:[
            { l:'Deep South / Gulf Coast', h:'FL, Gulf TX, LA, MS, AL', boost:['st-augustine','bermuda','centipede','bahia','zoysia'] },
            { l:'South / Transition Zone', h:'VA, NC, TN, KY, TX, OK', boost:['bermuda','zoysia','tall-fescue','centipede'] },
            { l:'Midwest / Northern US', h:'OH, PA, MN, WI, MI, CO', boost:['kentucky-bluegrass','tall-fescue','perennial-ryegrass','fine-fescue'] },
            { l:'Great Plains / Pacific West', h:'KS, NE, OR, WA, CA', boost:['buffalograss','perennial-ryegrass','tall-fescue','kentucky-bluegrass'] }
        ]}
    ];

    // ── State ──────────────────────────────────────────────────────────────
    const [mode, setMode] = useState('browse');
    const [season, setSeason] = useState('all');
    const [selected, setSelected] = useState(null);
    const [hlKey, setHlKey] = useState(null);

    // ── Static close-up photos from Wikimedia Commons ──────────────────────
    const fp = (file, caption) => ({ url: `https://commons.wikimedia.org/wiki/Special:FilePath/${file.replace(/ /g, '_')}?width=640`, caption });
    const photoMap = {
        'bermuda': [
            fp("Starr-070206-4111-Cynodon_dactylon-lawn_and_ant_bait_stick-Olowalu-Maui_(24585842010).jpg", "Bermudagrass lawn · Wikimedia Commons"),
            fp("Cynodon dactylon (6170169591).jpg",                                                          "Bermudagrass stolons · Wikimedia Commons"),
            fp("Cynodon dactylon (6170702310).jpg",                                                          "Bermudagrass close-up · Wikimedia Commons"),
            fp("Starr-010206-0228-Cynodon dactylon-seed head and habit-Kanaha Beach-Maui (24235528280).jpg", "Bermudagrass seed heads · Wikimedia Commons"),
        ],
        'zoysia': [
            fp("Zoysia_japonica_'Compadre'_kz1.jpg",                                                "Zoysiagrass · Wikimedia Commons"),
            fp("Gardenology.org-IMG 1973 rbgs11jan.jpg",                                            "Zoysiagrass blades · Wikimedia Commons"),
            fp("Gardenology.org-IMG 1979 rbgs11jan.jpg",                                            "Zoysiagrass detail · Wikimedia Commons"),
            fp("University of Georgia, Research and Education Garden grass 3.JPG",                   "Zoysiagrass lawn · Wikimedia Commons"),
        ],
        'st-augustine': [
            fp("Starr_061017-1219_Stenotaphrum_secundatum.jpg",          "St. Augustinegrass · Wikimedia Commons"),
            fp("Starr 061017-1239 Stenotaphrum secundatum.jpg",          "St. Augustinegrass blades · Wikimedia Commons"),
            fp("Starr 080314-3564 Stenotaphrum secundatum.jpg",          "St. Augustinegrass stolons · Wikimedia Commons"),
            fp("Stenotaphrum secundatum habit1 (7417614108).jpg",        "St. Augustinegrass habit · Wikimedia Commons"),
        ],
        'centipede': [
            fp("Eremochloa_ophiuroides_being_pollinated_by_a_honey_bee_02.jpg", "Centipedegrass · Wikimedia Commons"),
            fp("Centipede_Grass.JPG",                                            "Centipedegrass lawn · Wikimedia Commons"),
        ],
        'bahia': [
            fp("Paspalum_notatum_leaf1_(7391319106).jpg",           "Bahiagrass leaf · Wikimedia Commons"),
            fp("Paspalum notatum collar1 (7391329848).jpg",         "Bahiagrass collar detail · Wikimedia Commons"),
            fp("Paspalum notatum flowerhead3 (7391328586).jpg",     "Bahiagrass Y-shaped seed head · Wikimedia Commons"),
            fp("Paspalum notatum habit1 (7391322684).jpg",          "Bahiagrass habit · Wikimedia Commons"),
        ],
        'buffalograss': [
            fp("Buchloe_dactyloides_-_Botanical_Garden,_University_of_Frankfurt_-_DSC02546.JPG",     "Buffalograss · Wikimedia Commons"),
            fp("Buchloe dactyloides - Botanischer Garten, Dresden, Germany - DSC08764.JPG",          "Buffalograss plant · Wikimedia Commons"),
            fp("Buchloe dactyloides, Gaserans 01.jpg",                                               "Buffalograss habit · Wikimedia Commons"),
            fp("Bouteloua dactyloides 'Cody' kz1.jpg",                                              "Buffalograss 'Cody' cultivar · Wikimedia Commons"),
        ],
        'tall-fescue': [
            fp("Festuca_arundinacea_collar1_(7325848178).jpg",                            "Tall Fescue collar detail · Wikimedia Commons"),
            fp("Festuca arundinacea collar2 (7325847352).jpg",                            "Tall Fescue collar close-up · Wikimedia Commons"),
            fp("Festuca arundinacea flowerhead1 (7325811876).jpg",                        "Tall Fescue seed head · Wikimedia Commons"),
            fp("Festuca arundinacea - Berlin Botanical Garden - IMG 8538.JPG",            "Tall Fescue plant · Wikimedia Commons"),
        ],
        'kentucky-bluegrass': [
            fp("Poa_pratensis1.JPG",                                                                          "Kentucky Bluegrass · Wikimedia Commons"),
            fp("Starr-090504-7317-Poa pratensis-leaves-Science City-Maui (24327459373).jpg",                  "Kentucky Bluegrass leaves · Wikimedia Commons"),
            fp("Starr-090504-7157-Poa pratensis-seedhead-Science City-Maui (24836064722).jpg",                "Kentucky Bluegrass seed head · Wikimedia Commons"),
            fp("Veldbeemdgras Poa pratensis.jpg",                                                             "Kentucky Bluegrass lawn · Wikimedia Commons"),
        ],
        'perennial-ryegrass': [
            fp("Lolium_perenne_showing_ligule_and_ribbed_leaf.JPG",              "Perennial Ryegrass ligule & leaf · Wikimedia Commons"),
            fp("Lolium perenne ligule1 (7185125013).jpg",                        "Perennial Ryegrass ligule detail · Wikimedia Commons"),
            fp("Lolium perenne plant2 (7185124265).jpg",                         "Perennial Ryegrass plant · Wikimedia Commons"),
            fp("Lolium perenne L. (Perennial Ryegrass) - cultivated 2.jpg",     "Perennial Ryegrass cultivated · Wikimedia Commons"),
        ],
        'fine-fescue': [
            fp("Festuca_rubra_grass.JPG",                                                        "Fine Fescue · Wikimedia Commons"),
            fp("Festuca rubra.JPG",                                                              "Fine Fescue plant · Wikimedia Commons"),
            fp("Poales - Festuca rubra - 1.jpg",                                                "Fine Fescue detail · Wikimedia Commons"),
            fp("Gewoon roodzwenkgras tongetje (Festuca rubra var. commutata ligula).jpg",       "Fine Fescue ligule detail · Wikimedia Commons"),
        ],
    };

    // ── Computed ───────────────────────────────────────────────────────────
    const filtered = GRASSES_DATA.filter(g => season === 'all' || g.season === season);
    const currentGrassKey = lawnProfile && lawnProfile.specificGrass;

    // ── Handlers ───────────────────────────────────────────────────────────
    const handleSelect = (grass) => { setSelected(grass); };
    const handleQuizResult = (grass) => { setHlKey(grass.key); setSelected(grass); setMode('browse'); };
    const handleSaveGrass = async (grassKey) => {
        const existing = localStorage.getItem('lawnProfile');
        const merged = Object.assign({}, existing ? JSON.parse(existing) : {}, { specificGrass: grassKey });
        localStorage.setItem('lawnProfile', JSON.stringify(merged));
        if (onSaveProfile) { await onSaveProfile(merged); }
        setHlKey(grassKey);
    };

    // ── Sub-components ─────────────────────────────────────────────────────
    const PrevalBadge = ({ level }) => {
        const m = {
            'very-common': ['Very Common','#1E4D18','#D4E8C2'],
            common: ['Common','#2D6E22','#E0EED4'],
            regional: ['Regional','#6B4510','#F0DCC0'],
        };
        const [l, c, bg] = m[level] || m.common;
        return <span style={{background:bg, color:c, fontSize:10, fontFamily:"var(--ys-font-body)", fontWeight:700, padding:'2px 8px', borderRadius:20, textTransform:'uppercase', letterSpacing:'0.08em', border:`1px solid ${c}30`, display:'inline-block'}}>{l}</span>;
    };

    const PhotoGallery = ({ grassKey }) => {
        const [idx, setIdx] = useState(0);
        const [imgErrors, setImgErrors] = useState({});
        const touchStartX = useRef(null);
        const photos = photoMap[grassKey] || [];
        const valid = photos.filter((_, i) => !imgErrors[i]);

        if (!valid.length) return (
            <div style={{minHeight:140, background:'var(--ys-canvas)', borderRadius:12, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, padding:16, textAlign:'center'}}>
                <span style={{fontSize:28}}>📷</span>
                <span style={{fontFamily:'var(--ys-font-body)', fontWeight:700, fontSize:13, color:'var(--ys-soil-600)'}}>No photo available</span>
                <span style={{fontFamily:'var(--ys-font-body)', fontSize:12, color:'var(--ys-stone-light)', lineHeight:1.4}}>Search Wikimedia Commons or your university extension for photos of this grass.</span>
            </div>
        );

        const safeIdx = Math.min(idx, valid.length - 1);
        const photo = valid[safeIdx];
        const origIdx = photos.indexOf(photo);

        const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
        const handleTouchEnd = (e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) setIdx(i => dx < 0 ? (i+1)%valid.length : (i-1+valid.length)%valid.length);
            touchStartX.current = null;
        };

        return (
            <div>
                <div
                    style={{position:'relative', borderRadius:12, overflow:'hidden', background:'var(--ys-canvas)', userSelect:'none'}}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <img src={photo.url} alt={photo.caption || 'Grass photo'}
                        style={{width:'100%', height:200, objectFit:'cover', display:'block'}}
                        onError={() => setImgErrors(e => ({...e, [origIdx]:true}))} />
                    {valid.length > 1 && (<>
                        <button onClick={() => setIdx(i => (i-1+valid.length)%valid.length)} style={{position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', border:'none', borderRadius:8, color:'white', width:30, height:30, cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center'}}>‹</button>
                        <button onClick={() => setIdx(i => (i+1)%valid.length)} style={{position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', border:'none', borderRadius:8, color:'white', width:30, height:30, cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center'}}>›</button>
                        <div style={{position:'absolute', bottom:8, left:0, right:0, display:'flex', justifyContent:'center', gap:5}}>
                            {valid.map((_,i) => <div key={i} onClick={() => setIdx(i)} style={{width:7, height:7, borderRadius:'50%', background: i===safeIdx ? 'white' : 'rgba(255,255,255,0.5)', cursor:'pointer', transition:'background 0.2s'}} />)}
                        </div>
                        <div style={{position:'absolute', top:8, right:8, background:'rgba(0,0,0,0.45)', borderRadius:6, padding:'2px 8px'}}>
                            <span style={{fontFamily:'var(--ys-font-body)', fontSize:10, color:'white'}}>{safeIdx+1}/{valid.length}</span>
                        </div>
                    </>)}
                </div>
                {photo.caption && (
                    <span style={{display:'block', marginTop:5, fontFamily:'var(--ys-font-body)', fontSize:11, color:'var(--ys-soil-600)', lineHeight:1.4}}>
                        {photo.caption} · <span style={{color:'var(--ys-stone-light)'}}>Wikimedia Commons · CC</span>
                    </span>
                )}
            </div>
        );
    };

    const GrassDetailPanel = ({ grass, onClose }) => {
        const [tab, setTab] = useState('photos');
        const isCurrent = currentGrassKey === grass.key;
        const TABS = [['photos','📷 Photos'],['id','🔍 How to ID'],['traits','📋 Traits'],['regions','📍 Regions']];
        return (
            <div style={{background:'var(--ys-cream)', borderRadius:20, overflow:'hidden', border:'2px solid #D4CEC8', boxShadow:'0 8px 40px rgba(0,0,0,0.14)', marginBottom:16}}>
                {/* Header */}
                <div style={{background:grass.accent, padding:'16px 48px 14px 16px', position:'relative'}}>
                    <button onClick={onClose} style={{position:'absolute', top:12, right:12, background:'rgba(255,255,255,0.2)', border:'none', borderRadius:8, color:'white', width:28, height:28, cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center'}}>✕</button>
                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:10, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:3}}>{grass.season==='warm' ? '☀️ Warm Season' : '❄️ Cool Season'} · Zones {grass.zones}</span>
                    <span style={{display:'block', fontFamily:'var(--ys-font-display)', fontWeight:700, fontSize:22, color:'white', lineHeight:1.1, marginBottom:3}}>{grass.name}</span>
                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:11, color:'rgba(255,255,255,0.75)', fontStyle:'italic'}}>{grass.sci} · {grass.prevLabel}</span>
                </div>
                {/* Save CTA */}
                {!isCurrent ? (
                    <button onClick={() => handleSaveGrass(grass.key)} className="w-full flex items-center gap-3 px-4 py-3 btn-press" style={{background:'var(--ys-yellow)', border:'none', cursor:'pointer', borderBottom:'1px solid rgba(0,0,0,0.08)'}}>
                        <span style={{fontSize:16}}>🌱</span>
                        <span style={{fontFamily:'var(--ys-font-body)', fontWeight:700, fontSize:13, color:'var(--ys-soil-800)', flex:1, textAlign:'left'}}>This is my grass — save to my profile</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E1A14" strokeWidth={2.5} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                ) : (
                    <div className="flex items-center gap-3 px-4 py-2.5" style={{background:'var(--ys-green-100)', borderBottom:'1px solid rgba(0,0,0,0.06)'}}>
                        <span style={{fontSize:14}}>✅</span>
                        <span style={{fontFamily:'var(--ys-font-body)', fontWeight:600, fontSize:13, color:'var(--ys-green-700)'}}>This is currently set as your grass type</span>
                    </div>
                )}
                {/* Tabs */}
                <div style={{display:'flex', borderBottom:'1px solid #D4CEC8', background:'var(--ys-canvas)'}}>
                    {TABS.map(([k,l]) => (
                        <button key={k} onClick={() => setTab(k)} style={{flex:1, padding:'9px 2px', fontFamily:'var(--ys-font-body)', fontWeight:600, fontSize:11, color: tab===k ? grass.accent : 'var(--ys-soil-600)', background:'none', border:'none', borderBottom: tab===k ? `2px solid ${grass.accent}` : '2px solid transparent', cursor:'pointer', transition:'color 0.15s'}}>{l}</button>
                    ))}
                </div>
                {/* Tab content */}
                <div style={{padding:16, maxHeight:440, overflowY:'auto'}}>
                    {tab === 'photos' && <PhotoGallery grassKey={grass.key} />}
                    {tab === 'id' && (
                        <div>
                            <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:10, color:'var(--ys-stone-light)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Key identification features</span>
                            {grass.identifyBy.map((tip, i) => (
                                <div key={i} style={{display:'flex', gap:10, marginBottom:8, padding:'8px 10px', background: i===0 ? `${grass.accent}12` : 'white', borderRadius:10, border:`1px solid ${i===0 ? grass.accent+'30' : '#E8E4DC'}`}}>
                                    <span style={{fontFamily:'var(--ys-font-body)', fontSize:11, color:grass.accent, fontWeight:700, minWidth:18, flexShrink:0}}>{i===0 ? '★' : `${i}.`}</span>
                                    <span style={{fontFamily:'var(--ys-font-body)', fontSize:13, color:'var(--ys-soil-800)', lineHeight:1.45}}>{tip}</span>
                                </div>
                            ))}
                            {grass.lookAlikes.length > 0 && (
                                <div style={{marginTop:10, padding:'10px 12px', background:'#FFF8E8', borderRadius:10, border:'1px solid rgba(245,200,66,0.4)'}}>
                                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontWeight:700, fontSize:11, color:'#8B6000', marginBottom:4}}>⚠️ Common look-alikes</span>
                                    {grass.lookAlikes.map((l, i) => <span key={i} style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:12, color:'#6B5000'}}>{l}</span>)}
                                </div>
                            )}
                        </div>
                    )}
                    {tab === 'traits' && (
                        <div style={{display:'flex', flexDirection:'column', gap:7}}>
                            {[['📏','Blade width',grass.bladeWidth],['🖐️','Texture',grass.texture],['🎨','Color',grass.color],['🌡️','Winter dormancy',grass.dormancy],['🔀','How it spreads',grass.growth],['🌳','Shade tolerance',grass.shade],['💧','Drought tolerance',grass.drought],['👟','Traffic tolerance',grass.traffic],['🧪','Ideal soil pH',grass.soilPH],['✂️','Mow height',grass.mowHt]].map(([icon,label,val]) => (
                                <div key={label} style={{display:'flex', gap:10, padding:'8px 10px', background:'white', borderRadius:10, border:'1px solid #E8E4DC'}}>
                                    <span style={{fontSize:14, width:20, flexShrink:0, textAlign:'center', marginTop:2}}>{icon}</span>
                                    <div>
                                        <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:10, color:'var(--ys-stone-light)', textTransform:'uppercase', letterSpacing:'0.1em'}}>{label}</span>
                                        <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:13, color:'var(--ys-soil-800)', lineHeight:1.3, marginTop:1}}>{val}</span>
                                    </div>
                                </div>
                            ))}
                            <div style={{padding:'10px 12px', background:'var(--ys-green-50)', borderRadius:10, border:'1px solid var(--ys-green-200)'}}>
                                <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontWeight:700, fontSize:11, color:'var(--ys-green-800)', marginBottom:4}}>🔬 Research sources</span>
                                {grass.sources.map((s,i) => <span key={i} style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:12, color:'var(--ys-green-600)'}}>{s}</span>)}
                            </div>
                        </div>
                    )}
                    {tab === 'regions' && (
                        <div>
                            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginBottom:12}}>
                                {grass.regions.map(r => <span key={r} style={{background:`${grass.accent}18`, color:grass.accent, fontFamily:'var(--ys-font-body)', fontWeight:600, fontSize:12, padding:'4px 10px', borderRadius:20, border:`1px solid ${grass.accent}40`}}>{r}</span>)}
                            </div>
                            {[['USDA Hardiness Zones','Zones '+grass.zones],['Common states',grass.states]].map(([label,val]) => (
                                <div key={label} style={{padding:'10px 12px', background:'white', borderRadius:10, border:'1px solid #E8E4DC', marginBottom:8}}>
                                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:10, color:'var(--ys-stone-light)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4}}>{label}</span>
                                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:13, color:'var(--ys-soil-800)'}}>{val}</span>
                                </div>
                            ))}
                            <div style={{padding:'10px 12px', background:'#FFF8E8', borderRadius:10, border:'1px solid rgba(245,200,66,0.4)'}}>
                                <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontWeight:700, fontSize:12, color:'#8B6000', marginBottom:5}}>Still unsure? Free expert ID</span>
                                <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:12, color:'#6B5000', lineHeight:1.4}}>Your cooperative extension office can ID a grass sample for free. Search <strong>"cooperative extension [your county]"</strong>.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const GrassCard = ({ grass }) => {
        const thumb = (photoMap[grass.key] || [])[0];
        const isCurrent = currentGrassKey === grass.key;
        return (
            <button onClick={() => handleSelect(grass)} className="card-hover btn-press" style={{background: hlKey===grass.key ? '#F0F8E8' : 'white', border:`2px solid ${hlKey===grass.key ? grass.accent : isCurrent ? grass.accent+'60' : 'rgba(0,0,0,0.07)'}`, borderRadius:16, padding:0, textAlign:'left', cursor:'pointer', overflow:'hidden', width:'100%', boxShadow: hlKey===grass.key ? `0 4px 16px ${grass.accent}30` : '0 1px 4px rgba(0,0,0,0.06)', transition:'all 0.18s', display:'block'}}>
                <div style={{height:3, background: grass.season==='warm' ? 'linear-gradient(90deg,#F59E0B,#E8A020)' : 'linear-gradient(90deg,#3B82F6,#60A5FA)'}} />
                <div style={{height:80, background:'var(--ys-canvas)', position:'relative', overflow:'hidden'}}>
                    {thumb ? (
                        <img src={thumb.url} alt={grass.name} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} onError={e => { e.target.style.display='none'; }} />
                    ) : (
                        <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3}}>
                            <span style={{fontSize:20}}>📷</span>
                            <span style={{fontFamily:'var(--ys-font-body)', fontSize:9, color:'var(--ys-stone-light)'}}>No photo</span>
                        </div>
                    )}
                    {isCurrent && <div style={{position:'absolute', top:5, right:5, background:'var(--ys-green-600)', borderRadius:6, padding:'1px 6px'}}><span style={{fontFamily:'var(--ys-font-body)', fontSize:9, fontWeight:700, color:'white'}}>MY GRASS</span></div>}
                </div>
                <div style={{padding:'8px 10px 10px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:4, marginBottom:4}}>
                        <span style={{fontFamily:'var(--ys-font-display)', fontWeight:700, fontSize:13, color:'var(--ys-soil-800)', lineHeight:1.2, display:'block'}}>{grass.name}</span>
                        <span style={{fontSize:12, flexShrink:0}}>{grass.season==='warm' ? '☀️' : '❄️'}</span>
                    </div>
                    <div style={{marginBottom:5}}><PrevalBadge level={grass.prevalence} /></div>
                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:9, color:'var(--ys-stone-light)', fontStyle:'italic', marginBottom:3}}>{grass.sci}</span>
                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:11, color:'var(--ys-soil-600)'}}>{grass.texture}</span>
                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:9, color:grass.accent, marginTop:3, textTransform:'uppercase', letterSpacing:'0.08em'}}>Zones {grass.zones}</span>
                </div>
            </button>
        );
    };

    const QuizPanel = () => {
        const [step, setStep] = useState(0);
        const [answers, setAnswers] = useState({});
        const [results, setResults] = useState(null);
        const pick = (opt) => {
            const next = {...answers, [QUIZ_STEPS[step].id]: opt};
            setAnswers(next);
            if (step < QUIZ_STEPS.length - 1) { setTimeout(() => setStep(s => s+1), 200); }
            else {
                const scores = {};
                GRASSES_DATA.forEach(g => { scores[g.key] = 0; });
                Object.values(next).forEach(o => {
                    if (o.warm !== undefined) {
                        GRASSES_DATA.filter(g => g.season==='warm').forEach(g => { scores[g.key] += o.warm; });
                        GRASSES_DATA.filter(g => g.season==='cool').forEach(g => { scores[g.key] += o.cool; });
                    }
                    (o.boost || []).forEach(k => { scores[k] = (scores[k]||0) + 3; });
                });
                setResults(GRASSES_DATA.map(g => ({g, s:scores[g.key]})).sort((a,b) => b.s - a.s).slice(0,3));
            }
        };
        if (results) return (
            <div>
                <h3 style={{fontFamily:'var(--ys-font-display)', fontWeight:700, fontSize:18, color:'var(--ys-soil-800)', marginBottom:4}}>Your most likely matches</h3>
                <p style={{fontFamily:'var(--ys-font-body)', fontSize:12, color:'var(--ys-soil-600)', marginBottom:14}}>Tap a result to see photos and full identification details</p>
                {results.map(({g},i) => (
                    <button key={g.key} onClick={() => handleQuizResult(g)} style={{display:'flex', alignItems:'center', gap:12, width:'100%', background: i===0 ? '#F0F8E8' : 'white', border:`2px solid ${i===0 ? g.accent : 'rgba(0,0,0,0.08)'}`, borderRadius:12, padding:'10px 12px', marginBottom:8, cursor:'pointer', textAlign:'left'}} className="btn-press">
                        <div style={{width:32, height:32, borderRadius:8, background:g.accent, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'var(--ys-font-display)', fontWeight:900, fontSize:14, flexShrink:0}}>{i+1}</div>
                        <div style={{flex:1}}>
                            <span style={{display:'block', fontFamily:'var(--ys-font-display)', fontWeight:700, fontSize:14, color:'var(--ys-soil-800)'}}>{g.name}</span>
                            <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:10, color:'var(--ys-stone-light)', fontStyle:'italic'}}>{g.sci}</span>
                        </div>
                        <span>{g.season==='warm' ? '☀️' : '❄️'}</span>
                    </button>
                ))}
                <button onClick={() => {setStep(0); setAnswers({}); setResults(null);}} style={{width:'100%', padding:'9px', background:'none', border:'1px solid #D4CEC8', borderRadius:10, fontFamily:'var(--ys-font-body)', fontWeight:600, fontSize:12, color:'var(--ys-soil-600)', cursor:'pointer', marginTop:4}} className="btn-press">↩ Retake quiz</button>
            </div>
        );
        const q = QUIZ_STEPS[step];
        return (
            <div>
                <div style={{display:'flex', gap:4, marginBottom:14}}>
                    {QUIZ_STEPS.map((_,i) => <div key={i} style={{flex:1, height:3, borderRadius:2, background: i<=step ? 'var(--ys-green-600)' : '#D4CEC8', transition:'background 0.3s'}} />)}
                </div>
                <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:10, color:'var(--ys-stone-light)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:5}}>Question {step+1} of {QUIZ_STEPS.length}</span>
                <h3 style={{fontFamily:'var(--ys-font-display)', fontWeight:700, fontSize:16, color:'var(--ys-soil-800)', marginBottom:12, lineHeight:1.3}}>{q.icon} {q.q}</h3>
                <div style={{display:'flex', flexDirection:'column', gap:8}}>
                    {q.opts.map((opt,i) => (
                        <button key={i} onClick={() => pick(opt)} style={{padding:'11px 14px', background:'white', border:'2px solid #E8E4DC', borderRadius:12, textAlign:'left', cursor:'pointer', transition:'border-color 0.15s'}} className="btn-press"
                            onMouseEnter={e => e.currentTarget.style.borderColor='var(--ys-green-600)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor='#E8E4DC'}>
                            <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontWeight:600, fontSize:13, color:'var(--ys-soil-800)'}}>{opt.l}</span>
                            {opt.h && <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:11, color:'var(--ys-soil-600)', marginTop:2}}>{opt.h}</span>}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <div className="animate-fade-in" style={{fontFamily:'var(--ys-font-body)'}}>
            <div className="flex items-center gap-2 mb-1">
                <h2 style={{fontFamily:'var(--ys-font-display)'}} className="text-2xl font-bold text-gray-900 m-0">Grass Identifier</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Browse all 10 grass types with real photos, or take the quiz to narrow it down.</p>

            {/* Mode toggle */}
            <div className="flex gap-2 mb-4">
                {[['browse','🔍 Browse All Grasses'],['quiz','❓ Help Me Identify']].map(([k,l]) => (
                    <button key={k} onClick={() => setMode(k)} className="btn-press" style={{flex:1, padding:'10px 8px', borderRadius:12, border:`2px solid ${mode===k ? 'var(--ys-green-600)' : '#D4CEC8'}`, background: mode===k ? 'var(--ys-green-600)' : 'white', color: mode===k ? 'white' : 'var(--ys-soil-800)', fontFamily:'var(--ys-font-body)', fontWeight:700, fontSize:13, cursor:'pointer', transition:'all 0.18s'}}>{l}</button>
                ))}
            </div>

            {/* Quiz mode */}
            {mode === 'quiz' && (
                <div style={{background:'white', borderRadius:16, padding:16, border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', marginBottom:12}}>
                    <QuizPanel />
                </div>
            )}

            {/* Browse mode */}
            {mode === 'browse' && (
                <>
                    {/* Season filter */}
                    <div className="flex gap-2 mb-4">
                        {[['all','All Grasses'],['warm','☀️ Warm Season'],['cool','❄️ Cool Season']].map(([k,l]) => (
                            <button key={k} onClick={() => setSeason(k)} className="btn-press" style={{flex:1, padding:'7px 4px', borderRadius:10, border:`1.5px solid ${season===k ? 'var(--ys-green-600)' : '#D4CEC8'}`, background: season===k ? 'var(--ys-green-600)' : 'white', color: season===k ? 'white' : 'var(--ys-soil-600)', fontFamily:'var(--ys-font-body)', fontWeight:600, fontSize:11, cursor:'pointer'}}>{l}</button>
                        ))}
                    </div>

                    {/* Detail panel */}
                    {selected && <GrassDetailPanel grass={selected} onClose={() => { setSelected(null); setHlKey(null); }} />}

                    <span style={{display:'block', fontFamily:'var(--ys-font-body)', fontSize:11, color:'var(--ys-stone-light)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em'}}>
                        {filtered.length} grass types · tap for photos & details
                    </span>

                    {/* Grid */}
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                        {filtered.map(g => <GrassCard key={g.key} grass={g} />)}
                    </div>
                </>
            )}

            {/* Footer */}
            <div className="mt-4 rounded-xl border px-4 py-3 flex items-start gap-2.5" style={{background:'var(--ys-green-50)', borderColor:'var(--ys-green-200)'}}>
                <span className="text-base flex-shrink-0">🔬</span>
                <p className="text-xs text-gray-500 m-0 leading-relaxed">
                    Still unsure? Your local cooperative extension office can identify a grass sample for free. Search <strong>"cooperative extension [your county]"</strong>.
                </p>
            </div>
        </div>
    );
}
