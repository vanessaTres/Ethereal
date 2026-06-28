import { useState, useEffect } from 'react'
import './App.css'
import Home from './paginas/Home'
import Cadastro from './paginas/Cadastro'
import Login from './paginas/Login'

function App() {
  const [tela, setTela] = useState('home') 
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  const [produtos, setProdutos] = useState([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
  const [inputBusca, setInputBusca] = useState('') // O que o usuário digita
  const [buscaConfirmada, setBuscaConfirmada] = useState('') // O que roda ao dar Enter

 
  useEffect(() => {
    let url = 'http://localhost:3000/produtos'
    if (categoriaSelecionada) {
      url = `http://localhost:3000/produtos?categoria=${categoriaSelecionada}`
    } else if (buscaConfirmada) {
      url = `http://localhost:3000/produtos?busca=${buscaConfirmada}`
    }

    fetch(url)
      .then(res => res.json())
      .then(dados => setProdutos(dados))
  }, [categoriaSelecionada, buscaConfirmada])


  const trocarTela = (pagina) => {
    setTela(pagina)
  }


  const lidarKeyDownPesquisa = (e) => {
    if (e.key === 'Enter') {
      setCategoriaSelecionada('')
      setBuscaConfirmada(inputBusca)
      setTela('home') 
    }
  }

  const renderizarTela = () => {
    if (tela === 'login') {
      return <Login navegar={trocarTela} setUsuarioLogado={setUsuarioLogado} />
    }
    if (tela === 'cadastro') {
      return <Cadastro navegar={trocarTela} />
    }
    return (
      <Home 
        produtos={produtos} 
        categoriaSelecionada={categoriaSelecionada} 
        busca={buscaConfirmada} 
      />
    )
  }

  return (
    <div className="app-container">
      <header className="cabecalho-etreal">
        <div className="cabecalho-linha-superior">
          <h1 className="logo-site" onClick={() => { setCategoriaSelecionada(''); setBuscaConfirmada(''); setInputBusca(''); trocarTela('home'); }}>
            Ethereal
          </h1>
          <div className="caixa-pesquisa">
            <input 
              type="text" 
              placeholder="" 
              value={inputBusca}
              onChange={(e) => setInputBusca(e.target.value)}
              onKeyDown={lidarKeyDownPesquisa}
            />
            <button className="btn-pesquisa-lupa">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
          <div className="acoes-cabecalho">
            {usuarioLogado ? (
              <span className="boas-vindas">Olá, {usuarioLogado.nome.split(' ')[0]}</span>
            ) : (
              <>
                <button className="btn-nav-texto" onClick={() => trocarTela('login')}>login</button>
                <button className="btn-nav-texto" onClick={() => trocarTela('cadastro')}>cadastrar</button>
              </>
            )}
            
            <button className="btn-icone-sacola">
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
            
            <button className="btn-icone-perfil">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>

        </div>
        <nav className="menu-categorias-horizontal">
          {['Bases', 'Pós', 'Sombras', 'Blushes', 'Batons', 'Iluminadores', 'Delineadores'].map(cat => (
            <button 
              key={cat}
              className={categoriaSelecionada === cat ? 'item-cat-ativo' : ''}
              onClick={() => { setCategoriaSelecionada(cat); setBuscaConfirmada(''); setInputBusca(''); trocarTela('home'); }}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>
      <main className="conteudo-principal-spa">
        {renderizarTela()}
      </main>

    </div>
  )
}

export default App