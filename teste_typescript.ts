interface Categoria {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  IdCategoria: Categoria;
}

const categorias: Categoria[] = [
  { id: 1, nome: "Categoria A" },
  { id: 2, nome: "Categoria B" },
  { id: 3, nome: "Categoria C" },
];

const produtos: Produto[] = [
    {id: 1, nome: "Produto A", preco: 10.99, quantidade: 5, IdCategoria: {id: 1, nome: "Categoria A"}},
    {id: 2, nome: "Produto B", preco: 15.49, quantidade: 3, IdCategoria: {id: 2, nome: "Categoria B"}},
    {id: 3, nome: "Produto C", preco: 7.99, quantidade: 10, IdCategoria: {id: 1, nome: "Categoria A"}},
    {id: 4, nome: "Produto D", preco: 12.99, quantidade: 2, IdCategoria: {id: 3, nome: "Categoria C"}},
]

function calcularValorTotalEstoque(lista: Produto[]): number {
  return lista.reduce((total, produto) => {
    return total + produto.preco * produto.quantidade;
  }, 0);
}

const valorTotal = calcularValorTotalEstoque(produtos);
console.log(`O valor total do estoque é: R$ ${valorTotal.toFixed(2)}`);

//------------------------------------------------------------------------------------------------------------------------------------------------------

function buscarProdutosPorTexto(
  lista: Produto[],
  termoBusca: string,
  listaCategorias: Categoria[] = categorias
): Produto[] {
  const termo: string = termoBusca.trim().toLowerCase();

  if (termo === "") {
    return lista;
  }

  return lista.filter((produto: Produto): boolean => {
    const nomeCorresponde: boolean = produto.nome.toLowerCase().includes(termo);

    const categoria: Categoria | undefined = listaCategorias.find(
      (c: Categoria) => c.id === produto.IdCategoria.id
    );

    const categoriaCorresponde: boolean = categoria
      ? categoria.nome.toLowerCase().includes(termo)
      : false;

    return nomeCorresponde || categoriaCorresponde;
  });
}

console.log(buscarProdutosPorTexto(produtos, "Produto A")); 
console.log(buscarProdutosPorTexto(produtos, "Categoria B"));


//------------------------------------------------------------------------------------------------------------------------------------------------------

interface ProdutoCadastro {
  nome: string;
  preco: number;
  quantidade: number;
  idCategoria: Categoria;
}

interface ErrosProduto {
  nome?: string;
  preco?: string;
  quantidade?: string;
}

interface ResultadoValidacao {
  valido: boolean;
  erros: ErrosProduto;
}

function validarCadastroProduto(dados: ProdutoCadastro): ResultadoValidacao {
  const erros: ErrosProduto = {};

  if (!dados.nome || dados.nome.trim().length < 3) {
    erros.nome = "O nome deve ter no mínimo 3 caracteres.";
  }

  if (dados.preco <= 0) {
    erros.preco = "O preço deve ser maior que zero.";
  }

  if (dados.quantidade < 0) {
    erros.quantidade = "A quantidade não pode ser negativa.";
  }

  const valido: boolean = Object.keys(erros).length === 0;

  return { valido, erros };
}

const categoriaExemplo: Categoria = categorias[0];

const produtoValido: ProdutoCadastro = {
  nome: "Produto Novo",
  preco: 29.9,
  quantidade: 8,
  idCategoria: categoriaExemplo,
};

const produtoInvalido: ProdutoCadastro = {
  nome: "Ab",
  preco: 0,
  quantidade: -3,
  idCategoria: categoriaExemplo,
};

console.log("Cadastro válido:", validarCadastroProduto(produtoValido));
console.log("Cadastro inválido:", validarCadastroProduto(produtoInvalido));

