import { useState } from 'react'

export function Login({ aoLogar }) {
  const [senha, setSenha] = useState('')

const validarAcesso = (e) => {
  e.preventDefault();
  const senhaCorreta = import.meta.env.VITE_SENHA;

  if (senha === senhaCorreta) {
    aoLogar(true);
  } else {
    alert('Acesso negado!');
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md border-t-4 border-t-blue-600">
        <div className="text-center mb-10">
          <div className="bg-blue-600/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
            <span className="text-4xl">🛠️</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Repair Track</h2>
          <p className="text-slate-400 mt-2 font-medium italic">Painel do Engenheiro Luiz</p>
        </div>

        <form onSubmit={validarAcesso} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Senha de Segurança</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-4 bg-slate-950 border border-slate-700 rounded-2xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-800"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 hover:shadow-blue-900/20"
          >
            Acessar Bancada
          </button>
        </form>

        <p className="text-center text-slate-700 text-[10px] mt-10 uppercase tracking-tighter">
          Security Layer v2.0 • Authorized Personnel Only
        </p>
      </div>
    </div>
  )
} 