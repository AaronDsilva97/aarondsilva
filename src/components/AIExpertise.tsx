export default function AIExpertise() {
  const aiCapabilities = [
    {
      name: 'RAG Pipelines',
      tech: 'Pinecone, Neo4j, LangChain',
      icon: '🔍',
      description: '4+ production RAG systems for healthcare'
    },
    {
      name: 'Graph Databases',
      tech: 'Neo4j',
      icon: '🕸️',
      description: 'Complex medical relationships & knowledge graphs'
    },
    {
      name: 'LLM Integration',
      tech: 'Claude, Gemini',
      icon: '🤖',
      description: 'Custom healthcare models with HIPAA compliance'
    },
    {
      name: 'Embeddings Pipeline',
      tech: 'Python, LangChain',
      icon: '🧬',
      description: 'Semantic search & secure vector storage'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🤖</span>
          <h3 className="font-semibold text-slate-900 dark:text-white">AI & RAG Engineering</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          AI-ready healthcare applications with compliance
        </p>
      </div>

      <div className="space-y-3 flex-1">
        {aiCapabilities.map((capability, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">{capability.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {capability.name}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 font-mono">
                    {capability.tech}
                  </div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {capability.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700/30">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">Focus:</span> Making healthcare apps AI-ready while maintaining security & compliance
        </div>
      </div>
    </div>
  );
}
