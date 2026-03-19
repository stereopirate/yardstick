import React, { useState } from 'react';

export default function CitationBadge({ sources, label }) {
    const [open, setOpen] = useState(false);
    if (!sources || sources.length === 0) return null;
    return (
        <span style={{position: 'relative', display: 'inline-block', verticalAlign: 'middle'}}>
            <button
                className="cite-btn"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}
                aria-label={`Sources for ${label || 'this claim'}`}
            >i</button>
            {open && (
                <React.Fragment>
                    <div className="cite-overlay" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }} />
                    <div className="cite-popup" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
                            <div style={{fontSize: 11, fontWeight: 700, color: '#367C2B', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                                {label ? `Source: ${label}` : 'Sources'}
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setOpen(false); }} style={{background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#999', padding: '0 0 0 8px', lineHeight: 1}}>×</button>
                        </div>
                        {sources.map((s, i) => (
                            <div key={i} style={{marginBottom: i < sources.length - 1 ? 8 : 0}}>
                                {s.url ? (
                                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{fontSize: 13}}>
                                        {s.name || s.institution}
                                    </a>
                                ) : (
                                    <span style={{fontSize: 13, fontWeight: 600, color: '#333'}}>{s.name || s.institution}</span>
                                )}
                                {(s.topic || s.title) && (
                                    <div style={{fontSize: 11, color: '#666', marginTop: 1}}>{s.topic || s.title}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            )}
        </span>
    );
}
