// ─── ResearchSourcesPage Component ───────────────────────────────────────────
// No props required — all data comes from RESEARCH_SOURCES (constants.js).

window.ResearchSourcesPage = () => (
    <div>
        <h2 className="text-2xl font-bold mb-6">📚 Research Sources</h2>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-900">
                <strong>Evidence-Based Recommendations:</strong> All lawn care guidance is based on
                peer-reviewed research from {RESEARCH_SOURCES.length} university extension programs.
            </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow mb-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-3xl font-bold text-[#367C2B]">{RESEARCH_SOURCES.length}</div>
                    <div className="text-sm text-gray-600">Universities</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-3xl font-bold text-[#367C2B]">{RESEARCH_SOURCES.reduce((sum, s) => sum + s.count, 0)}</div>
                    <div className="text-sm text-gray-600">Publications</div>
                </div>
            </div>
        </div>
        <div className="space-y-4">
            {RESEARCH_SOURCES.map(source => (
                <div key={source.id} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-[#367C2B]">
                    <h3 className="text-lg font-bold text-gray-900">{source.name}</h3>
                    <p className="text-sm text-gray-600">{source.count} publications referenced</p>
                    {source.topics && <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700">{source.topics}</div>}
                    {source.features && <div className="mt-2 inline-block px-2 py-0.5 rounded-full text-xs font-bold" style={{background:'var(--ys-green-100)', color:'var(--ys-green-700)', border:'1px solid var(--ys-green-200)'}}>Used in: {source.features}</div>}
                    {source.url && (
                        <a href={source.url} target="_blank" rel="noopener noreferrer"
                            className="text-[#367C2B] font-semibold text-sm underline mt-3 inline-block">
                            Visit Extension Website →
                        </a>
                    )}
                </div>
            ))}
        </div>
    </div>
);
