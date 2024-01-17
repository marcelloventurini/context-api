import { useContext } from 'react'
import { CarrinhoContext } from '../context/CarrinhoContext'

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext)

  function mudarQuantidade(id, quantidade) {
    return carrinho.map(itemCarrinho => {
      if (itemCarrinho.id === id) itemCarrinho.quantidade += quantidade
      return itemCarrinho
    })
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      itemDoCarrinho => itemDoCarrinho.id === novoProduto.id
    )

    if (!temOProduto) {
      novoProduto.quantidade = 1
      return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto])
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)

    setCarrinho([...carrinhoAtualizado])
  }

  function removerProduto(id) {
    const produto = carrinho.find(item => item.id === id)
    const ultimoItem = produto.quantidade === 1

    if (ultimoItem) {
      return setCarrinho(carrinhoAnterior =>
        carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id !== id)
      )
    }

    const carrinhoAtualizado = mudarQuantidade(id, -1)

    setCarrinho([...carrinhoAtualizado])
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  }
}
