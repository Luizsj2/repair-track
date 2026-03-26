import fotoPerfil from '../assets/perfil.jpg'

export function Header({ lucroEstimado, lucroRealizado, aoSair }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-800 pb-6 gap-6 bg-slate-900 p-6 rounded-2xl shadow-xl">
      <div className="flex items-center gap-5">
        <img 
          src={fotoPerfil} 
          alt="Eng. Luiz" 
          className="w-20 h-20 rounded-full object-cover border-4 border-slate-700 shadow-lg" 
        />
        <div>
         <h1 className="text-3xl font-bold text-white tracking-tight">🛠️ Sistema de Bancada</h1>
  
           <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
              <p className="text-blue-400 text-lg font-medium">
              Eng. Luiz - Soluções em Eletrônica
              </p>
    
             <button 
                onClick={() => aoSair(false)} 
                className="bg-red-600/27 hover:bg-red-600/55 text-red-400 border border-red-600/30 text-[10px] px-3 py-1 rounded-md font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer w-fit">
                Encerrar Sessão
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full md:flex md:gap-4 md:w-auto">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-end flex-1 flex-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lucro Estimado</span>
          <strong className="text-lg md:text-3xl text-orange-400 mt-2">R$ {lucroEstimado.toFixed(2)}</strong>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-end flex-1 flex-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lucro Realizado</span>
          <strong className="text-lg md:text-3xl text-orange-400 mt-2">R$ {lucroRealizado.toFixed(2)}</strong>
        </div>
      </div>
    </header>
  )
}