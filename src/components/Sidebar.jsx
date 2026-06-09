import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-8 text-blue-400">Agência Rosas</h2>
      <nav className="flex-1 space-y-2">
        <Link to="/admin" className="block p-3 hover:bg-slate-800 rounded-lg transition">📊 Leads</Link>
        <Link to="/admin/rede" className="block p-3 hover:bg-slate-800 rounded-lg transition">🏢 Rede Hapvida</Link>
        <Link to="/admin/config" className="block p-3 hover:bg-slate-800 rounded-lg transition">⚙️ Configurações</Link>
      </nav>
      <button onClick={handleLogout} className="mt-auto p-3 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition">
        Sair
      </button>
    </div>
  );
}