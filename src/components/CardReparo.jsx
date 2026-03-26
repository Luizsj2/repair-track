export function CardReparo({ item, alternarStatus, iniciarEdicao, removerReparo, aprovarOrcamento, formatarData, formatarZap }) {
  return (
    <div className={`bg-slate-900 border-l-4 rounded-xl p-6 border border-slate-800 border-l-${item.concluido ? 'emerald-500' : item.etapa === 'Orcamento' ? 'blue-500' : 'purple-500'} transition-all shadow-xl hover:bg-slate-900/80`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-4 gap-4">
        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{item.equipamento}</h3>
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${item.etapa === 'Orcamento' ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' : 'bg-purple-900/30 text-purple-400 border border-purple-800/50'}`}>
            {item.etapa === 'Orcamento' ? '📋 Orçamento' : '🔧 Serviço'}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${item.concluido ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' : 'bg-slate-800 text-slate-300'}`}>
            {item.concluido ? '✅ Concluído' : '⏳ Na Bancada'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-300 mb-5">
        <p><strong className="text-slate-500 uppercase text-[10px] block">👤 Cliente</strong> {item.cliente} {item.contato && <span className="text-slate-400 ml-1">({item.contato})</span>}</p>
        <p><strong className="text-slate-500 uppercase text-[10px] block">📅 Previsão</strong> {formatarData(item.previsaoConclusao)}</p>
        <p><strong className="text-slate-500 uppercase text-[10px] block">❓ Defeito</strong> {item.problema || 'Não informado'}</p>
        <p className="md:col-span-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
          <strong className="text-slate-500 uppercase text-[10px] block mb-1">📝 Observações / Estado</strong> 
          {item.observacoes || 'Sem observações registradas.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        {item.etapa === 'Orcamento' && !item.concluido && (
          <button onClick={() => aprovarOrcamento(item.id)} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95">👍 Aprovar</button>
        )}
        <button onClick={() => alternarStatus(item.id)} className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/30 px-5 py-2 rounded-lg font-bold text-sm transition-all">
          {item.concluido ? '⏪ Reabrir' : '✅ Finalizar'}
        </button>
        <button onClick={() => iniciarEdicao(item)} disabled={item.concluido} className="bg-slate-800 hover:bg-slate-700 text-yellow-500 px-5 py-2 rounded-lg font-bold text-sm disabled:opacity-20 transition-all">✏️ Editar</button>
        {item.contato && (
          <a href={`https://wa.me/55${formatarZap(item.contato)}?text=Olá ${item.cliente}, aqui é o Eng. Luiz!`} target="_blank" rel="noreferrer" className="bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/30 px-5 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2">💬 Zap</a>
        )}
        <button onClick={() => removerReparo(item.id)} className="bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30 px-5 py-2 rounded-lg font-bold text-sm ml-auto transition-all">🗑️ Excluir</button>
      </div>
    </div>
  )
}