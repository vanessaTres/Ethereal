export default function Home({ produtos, categoriaSelecionada, busca }) {
  
  const exibirBannerInicial = !categoriaSelecionada && !busca

  return (
    <div className="tela-home">
      {exibirBannerInicial && (
        <div className="imagens-decorativas-home">
          <img src="/img/mulher2.png"/>
          <img src="/img/mulher1.jpg"/>
          <img src="/img/mulher3.png"/>
        </div>
      )}

      {!exibirBannerInicial && (
        <div className="container-catalogo">
          <h2 className="titulo-categoria">
            {categoriaSelecionada ? categoriaSelecionada : `Resultados para: "${busca}"`}
          </h2>
          
          <div className="grade-produtos">
            {produtos.map(produto => (
              <div key={produto.id} className="card-produto">
                <div className="produto-imagem-box">
                  <img src={`/Img/${produto.imagem_url}`} alt={produto.nome} />
                </div>
                <h3 className="produto-nome">{produto.nome}</h3>
                <p className="produto-preco">R$ {parseFloat(produto.preco).toFixed(2).replace('.', ',')}</p>
              </div>
            ))}
            {produtos.length === 0 && <p className="aviso-vazio">Nenhum produto encontrado nessa categoria.</p>}
          </div>
        </div>
      )}

    </div>
  )
}