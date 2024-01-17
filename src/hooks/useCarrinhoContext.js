import { useContext, useEffect, useMemo } from 'react'
import { CarrinhoContext } from '../context/CarrinhoContext'

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal,
  } = useContext(CarrinhoContext)

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

  function removerProdutoCarrinho(id) {
    const produto = carrinho.filter(itemCarrinho => itemCarrinho.id !== id)
    setCarrinho(produto)
  }

  const { totalTemp, quantidadeTemp } = useMemo(() => {
    return carrinho.reduce(
      (acumulador, produto) => ({
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
        totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
      }),
      {
        quantidadeTemp: 0,
        totalTemp: 0,
      }
    )
  }, [carrinho])

  useEffect(() => {
    setQuantidade(quantidadeTemp)
    setValorTotal(totalTemp)
  })

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    valorTotal,
    quantidade,
  }
}
