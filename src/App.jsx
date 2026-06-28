import { useState, useEffect } from 'react'; 
import './App.css'; 
import Home from './paginas/Home.jsx';
import Cadastro from './paginas/Cadastro.jsx'; 
import Login from './paginas/Login.jsx'; 

function App() {
  const [tela, setTela] = useState('home'); 
  const [usuarioLogado, setUsuarioLogado] = useState(null); 

  const deveTerFundoDecorativo = () => {
    return tela==='home' || tela==='login' || tela==='cadastro';
  };

  return (
    <div className="app-container">
      <header className="cabecalho-etreal">
        <div className="cabecalho-linha-superior">
          <div className="logo-site" onClick={() => setTela('home')}>Ethereal</div>
          
          <div className="caixa-pesquisa">
            <input type="text" placeholder="pesquisar..." />
            <button className="btn-pesquisa-lupa">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          <div className="acoes-cabecalho">
            <button className="btn-nav-texto" onClick={() => setTela('login')}>login</button>
            <button className="btn-nav-texto" onClick={() => setTela('cadastro')}>cadastrar</button>
            <button className="btn-icone-sacola">
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
            <button className="btn-icone-perfil">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>

        <nav className="menu-categorias-horizontal">
          <button>Bases</button>
          <button>Pós</button>
          <button>Sombras</button>
          <button>Blushes</button>
          <button>Batons</button>
          <button>Iluminadores</button>
          <button>Delineadores</button>
        </nav>
      </header>

      <main className={`conteudo-principal-spa ${deveTerFundoDecorativo() ? 'fundo-decorativo-ethereal' : ''}`}>
        {tela === 'home' && <Home />}
        {tela === 'cadastro' && <Cadastro setTela={setTela} />}
        {tela === 'login' && <Login setTela={setTela} setUsuarioLogado={setUsuarioLogado} />}
      </main>
    </div>
  );
}

export default App;