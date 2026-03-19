import React from 'react';
import { GRASS_INFO } from '../constants.js';

export default function ToolsView({ onNavigate, lawnProfile }) {
    const grassName = lawnProfile && lawnProfile.specificGrass
        ? (GRASS_INFO[lawnProfile.specificGrass] && GRASS_INFO[lawnProfile.specificGrass].name) || lawnProfile.specificGrass
        : null;

    const TOOLS = [
        {
            key: 'grass-id',
            icon: '🌿',
            title: 'Grass Identifier',
            desc: 'Not sure what grass you have? Browse all 10 types with real photos, or take a 4-question quiz to narrow it down.',
            badge: null,
            cta: 'Identify My Grass',
            accent: '#2D6E22',
            bg: '#EBF5E6',
            detail: grassName ? `Currently set: ${grassName}` : 'Knowing your grass type is the #1 key to accurate recommendations.',
        },
        {
            key: 'calculator',
            icon: '🧮',
            title: 'Application Calculator',
            desc: 'Calculate exactly how much fertilizer, pre-emergent, or other treatment to apply based on your yard size.',
            badge: 'PRO',
            cta: 'Open Calculator',
            accent: '#1E4D18',
            bg: '#F0FAF0',
            detail: lawnProfile && lawnProfile.lawnSize ? `Your yard: ${Number(lawnProfile.lawnSize).toLocaleString()} sq ft` : 'Enter your yard size to get exact product amounts.',
        },
        {
            key: 'gallery',
            icon: '📸',
            title: 'Lawn Gallery',
            desc: 'Track your lawn\'s transformation over time with photos. Upload pictures when logging activities to build a visual timeline.',
            badge: null,
            cta: 'Open Gallery',
            accent: '#0369A1',
            bg: '#E0F2FE',
            detail: 'A picture is worth a thousand words — see your lawn\'s progress season by season.',
        },
        {
            key: 'schedules',
            icon: '🗓️',
            title: 'My Tasks',
            desc: 'Set up recurring lawn care tasks with custom intervals. Get overdue alerts and log completed tasks in one tap.',
            badge: 'PRO',
            cta: 'Manage Tasks',
            accent: '#7C3AED',
            bg: '#F5F3FF',
            detail: 'Never miss a mow, fertilizer application, or seasonal treatment again.',
        },
        {
            key: 'products',
            icon: '📖',
            title: 'Product Guide',
            desc: 'Browse and compare 75+ mowers, spreaders, trimmers, fertilizers, and seeds. Filter by brand, type, and your lawn\'s needs.',
            badge: 'PRO',
            cta: 'Browse Products',
            accent: '#B45309',
            bg: '#FEF3C7',
            detail: 'Unbiased comparisons based on university extension recommendations.',
        },
    ];

    return (
        <div className="animate-fade-in space-y-4">
            {/* Header */}
            <div className="rounded-2xl px-4 py-5" style={{background:'linear-gradient(135deg, var(--ys-green-800) 0%, var(--ys-green-700) 100%)'}}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:'rgba(255,255,255,0.15)'}}>🛠️</div>
                    <div>
                        <h2 className="text-xl font-bold text-white m-0" style={{fontFamily:'var(--ys-font-display)'}}>Lawn Tools</h2>
                        <p className="text-xs m-0" style={{color:'rgba(255,255,255,0.7)'}}>Everything you need in one place</p>
                    </div>
                </div>
            </div>

            {/* Tool cards */}
            {TOOLS.map(tool => (
                <button
                    key={tool.key}
                    onClick={() => onNavigate(tool.key)}
                    className="w-full rounded-2xl border text-left card-hover btn-press"
                    style={{background:'white', borderColor:'rgba(0,0,0,0.07)', boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}
                >
                    {/* Color top bar */}
                    <div style={{height:'5px', borderRadius:'16px 16px 0 0', background: `linear-gradient(90deg, ${tool.accent}, ${tool.accent}99)`}} />
                    <div className="p-5">
                        {/* Icon + title row */}
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{background:tool.bg}}>
                                {tool.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg font-bold text-gray-900" style={{fontFamily:'var(--ys-font-display)'}}>{tool.title}</span>
                                    {tool.badge && (
                                        <span className="text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{background:'var(--ys-gold-100)', color:'var(--ys-gold-500)', border:'1px solid var(--ys-gold-300)'}}>
                                            {tool.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed m-0">{tool.desc}</p>
                            </div>
                        </div>
                        {/* Detail / context line */}
                        <div className="mb-4 px-3 py-2.5 rounded-xl text-xs font-medium" style={{background:'var(--ys-canvas)', color:'var(--ys-soil-600)'}}>
                            💡 {tool.detail}
                        </div>
                        {/* CTA button */}
                        <div className="flex items-center justify-between py-2.5 px-4 rounded-xl" style={{background:tool.accent}}>
                            <span className="text-sm font-bold text-white">{tool.cta}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </div>
                    </div>
                </button>
            ))}

            {/* Research footnote */}
            <div className="rounded-xl border px-4 py-3 flex items-start gap-2.5" style={{background:'var(--ys-green-50)', borderColor:'var(--ys-green-200)'}}>
                <span className="text-base flex-shrink-0">🔬</span>
                <p className="text-xs text-gray-500 m-0 leading-relaxed">
                    All tools are grounded in data from <strong className="text-gray-700">25 university extension programs</strong>. No product promotions — just science.
                </p>
            </div>
        </div>
    );
}
