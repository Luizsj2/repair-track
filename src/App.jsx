import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { CardReparo } from './components/CardReparo'
import { Login } from './components/Login'

// 1. O estado inicial fica FORA da função ou no topo, para o React conhecer ele antes de tudo
const estadoInicialForm = {
  cliente: '', contato: '', equipamento: '', problema: '', pecas: '', 
  custoPecas: '', valorCobrado: '', observacoes: '', estadoProduto: '', 
  previsaoConclusao: '', etapa: 'Orcamento' 
}

function App() {
  // 2. TODOS OS HOOKS DEVEM FICAR NO TOPO (Sempre na mesma ordem)
  const [logado, setLogado] = useState(false)
  const [formData, setFormData] = useState(estadoInicialForm)
  const [editandoId, setEditandoId] = useState(null)
  const [termoBusca, setTermoBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('Todos')
  const [reparos, setReparos] = useState(() => JSON.parse(localStorage.getItem('reparos-v2') || '[]'))

  // O useEffect também é um hook e fica aqui em cima
  useEffect(() => {
    localStorage.setItem('reparos-v2', JSON.stringify(reparos))
  }, [reparos])

  // 3. O "PORTEIRO" (SÓ DEPOIS DOS HOOKS)
  if (!logado) {
    return <Login aoLogar={setLogado} />
  }

  // 4. FUNÇÕES DE LÓGICA
  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.equipamento || !formData.cliente) return alert("Preencha o básico!")
    if (editandoId) {
      setReparos(reparos.map(r => r.id === editandoId ? { ...r, ...formData } : r))
      setEditandoId(null)
    } else {
      setReparos([{ id: Date.now(), ...formData, concluido: false, dataEntrada: new Date().toLocaleDateString() }, ...reparos])
    }
    setFormData(estadoInicialForm)
  }

  const aprovarOrcamento = (id) => setReparos(reparos.map(i => i.id === id ? {...i, etapa: 'Aprovado'} : i))
  const alternarStatus = (id) => setReparos(reparos.map(i => i.id === id ? {...i, concluido: !i.concluido} : i))
  const removerReparo = (id) => confirm("Excluir?") && setReparos(reparos.filter(i => i.id !== id))
  const iniciarEdicao = (r) => { setFormData(r); setEditandoId(r.id); window.scrollTo({top: 0, behavior: 'smooth'}) }

  const lucroRealizado = reparos.filter(r => r.concluido).reduce((acc, r) => acc + (Number(r.valorCobrado || 0) - Number(r.custoPecas || 0)), 0)
  const lucroEstimado = reparos.filter(r => !r.concluido && r.etapa === 'Aprovado').reduce((acc, r) => acc + (Number(r.valorCobrado || 0) - Number(r.custoPecas || 0)), 0)

  const reparosFiltrados = reparos.filter(i => 
    (i.equipamento?.toLowerCase().includes(termoBusca.toLowerCase()) || i.cliente?.toLowerCase().includes(termoBusca.toLowerCase())) &&
    (filtroStatus === 'Todos' ? true : filtroStatus === 'Pendentes' ? !i.concluido : i.concluido)
  )

  // 5. O RETORNO VISUAL (O SITE EM SI)
  return (
    <div className="max-w-6xl mx-auto p-5 min-h-screen bg-slate-950 text-slate-200">
      <Header lucroEstimado={lucroEstimado} lucroRealizado={lucroRealizado} aoSair={setLogado}/>

      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 border-t-4 border-t-blue-600 mb-10 shadow-2xl">
        <h3 className="text-2xl text-white font-semibold mb-6 flex items-center gap-2">
          {editandoId ? '✏️ Editando Registro' : '📌 Registro na Bancada'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Cliente</label>
           <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} placeholder="Nome do Cliente" className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>
           
           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">WhatsApp</label>
           <input type="text" name="contato" value={formData.contato} onChange={handleChange} placeholder="75 9..." className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>
           
           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Equipamento</label>
           <input type="text" name="equipamento" value={formData.equipamento} onChange={handleChange} placeholder="Ex: TV Philips" className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>
           
           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Defeito</label>
           <input type="text" name="problema" value={formData.problema} onChange={handleChange} placeholder="O que o cliente relatou?" className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>
           
           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Custo Peças R$</label>
           <input type="number" name="custoPecas" value={formData.custoPecas} onChange={handleChange} placeholder="0.00" className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>
           
           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Valor Cobrado R$</label>
           <input type="number" name="valorCobrado" value={formData.valorCobrado} onChange={handleChange} placeholder="0.00" className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>

           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Previsão</label>
           <input type="date" name="previsaoConclusao" value={formData.previsaoConclusao} onChange={handleChange} className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>

           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Tipo de Entrada</label>
           <select name="etapa" value={formData.etapa} onChange={handleChange} className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500">
              <option value="Orcamento">📋 Orçamento</option>
              <option value="Aprovado">🔧 Serviço Aprovado</option>
           </select></div>

           <div className="flex flex-col"><label className="text-xs text-slate-500 mb-1 ml-1">Estado / Obs</label>
           <input type="text" name="observacoes" value={formData.observacoes} onChange={handleChange} placeholder="Ex: Riscado, faltando parafusos..." className="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-blue-500" /></div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-8 shadow-lg transition-all text-lg">
          {editandoId ? '💾 Salvar Alterações' : '📥 Registrar Entrada'}
        </button>
        {editandoId && <button onClick={() => setEditandoId(null)} className="w-full mt-2 text-slate-500 hover:text-white transition-all">Cancelar Edição</button>}
      </form>

      <div className="mb-8">
        <input type="text" placeholder="🔍 Buscar cliente ou aparelho..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500 shadow-md" />
      </div>

      <div className="space-y-6 pb-20">
        {reparosFiltrados.map(item => (
          <CardReparo 
            key={item.id} 
            item={item} 
            alternarStatus={alternarStatus} 
            iniciarEdicao={iniciarEdicao} 
            removerReparo={removerReparo}
            aprovarOrcamento={aprovarOrcamento}
            formatarData={(d) => d ? new Date(d).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '---'}
            formatarZap={(n) => n.replace(/\D/g, '')}
          />
        ))}
      </div>

      <footer className="text-center mt-16 pt-8 border-t border-slate-800 text-slate-600 text-sm pb-10">
        Sistema Desenvolvido por Luiz Henrique S - Repair Track v2.0
      </footer>
    </div>
  )
}

export default App