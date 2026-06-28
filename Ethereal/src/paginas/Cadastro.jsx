import { useState } from 'react'

export default function Cadastro({ navegar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [cpf, setCpf] = useState('')

  function realizarCadastro(e) {
    e.preventDefault()

    fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, cpf })
    })
    .then(resposta => resposta.json())
    .then(dados => {
      if (dados.error) {
        alert(dados.error)
      } else {
        alert(dados.mensagem)
        navegar('login') 
      }
    })
  }

  return (
    <div className="tela-formulario">
      <div className="caixa-form">
        <h2>Cadastro</h2>
        
        <form onSubmit={realizarCadastro}>
          <input 
            type="text" 
            placeholder="nome" 
            required 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="senha" 
            required 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="cpf" 
            required 
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          
          <button type="submit" className="btn-enviar-form">cadastrar</button>
        </form>
      </div>
    </div>
  )
}