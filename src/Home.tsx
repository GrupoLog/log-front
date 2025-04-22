import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Bem-vindo ao Sistema</h1>
        <p className="text-gray-500">Escolha uma das opções abaixo:</p>

        <div className="grid grid-cols-2 gap-4">
          <Link to="/produtos">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow">
              Produtos
            </button>
          </Link>

          <Link to="/clientes">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow">
              Clientes
            </button>
          </Link>

          <Link to="/telefone">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-xl shadow">
              Telefone
            </button>
          </Link>

          <Link to="/veiculo">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow">
              Veículo
            </button>
          </Link>

          <Link to="/solicitacoes">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow">
              Solicitacoes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
