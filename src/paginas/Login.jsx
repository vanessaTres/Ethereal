import { useState } from 'react'

export default function Login({ navegar, setUsuarioLogado }) {
  const [identificador, setIdentificador] = useState('') 
  const [senha, setSenha] = useState('')

  function realizarLogin(e) {
    e.preventDefault()

    fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: identificador, senha: senha })
    })
    .then(resposta => resposta.json())
    .then(dados => {
      if (dados.error) {
        alert(dados.error)
      } else {
        alert(dados.mensagem)
        setUsuarioLogado(dados.usuario)
        navegar('home') 
      }
    })
  }

  return (
    <div className="tela-formulario">
      <div className="caixa-form">
        <h2>Login</h2>
        
        <form onSubmit={realizarLogin}>
          <input 
            type="text" 
            placeholder="email ou cpf" 
            required 
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="senha" 
            required 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          
          <button type="submit" className="btn-enviar-form">logar</button>
        </form>
      </div>
    </div>
  )
}