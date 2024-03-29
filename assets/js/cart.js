document.addEventListener("DOMContentLoaded", function () {
  var carrinho = sessionStorage.getItem("carrinho");
  var quantidadeProdutos = 0;

  if (carrinho) {
    var produtos = JSON.parse(carrinho);
    renderizarProdutos(produtos);
    atualizarQtdProd();
  }
  else {
    exibirCarrinhoVazio();
    atualizarQtdProd();
  }
});

function atualizarQtdProd() {
  var carrinho = sessionStorage.getItem("carrinho");
  var quantidadeProdutos = 0;

  if (carrinho) {
    var produtos = JSON.parse(carrinho);

    produtos.forEach(function (produto) {
      quantidadeProdutos += produto.quantidade;
    });
  }

  // Atualizar a quantidade no sessionStorage
  sessionStorage.setItem("quantidadeProdutos", quantidadeProdutos.toString());
}

function renderizarProdutos(produtos) {
  var cartItems = document.getElementById("cart-items");
  var totalElement = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  totalElement.textContent = "";

  var total = 0;

  produtos.forEach(function (produto, index) {
    var divProduto = document.createElement("div");
    divProduto.classList.add("product");

    var divDetalhes = document.createElement("div");
    divDetalhes.classList.add("product-details");

    var divImagem = document.createElement("div");
    divImagem.classList.add("product-image");

    var img = document.createElement("img");
    img.src = produto.image;
    img.alt = "Imagem do Produto";
    divImagem.appendChild(img);

    var divTitulo = document.createElement("div");
    divTitulo.classList.add("product-title");

    var title = document.createElement("h2");
    var truncatedTitle = produto.title.length > 20 ? produto.title.slice(0, 20) + '' : produto.title;
    title.textContent = truncatedTitle;
    divTitulo.appendChild(title);

    var divDescricao = document.createElement("div");
    divDescricao.classList.add("product-description");

    var description = document.createElement("h3");
    var descriptionText = produto.description ? produto.description : "";
    description.textContent = cortarTexto(descriptionText, 28);
    divDescricao.appendChild(description);

    var obs = document.createElement("h5");
    var obsText = produto.obs ? produto.obs : "";
    obs.textContent = "Obs: " + cortarTexto(obsText, 32);
    divDescricao.appendChild(obs);

    var container = document.createElement("div");
    container.classList.add("product-quantity");

    var price = document.createElement("h4");
    price.textContent = "R$ " + produto.price.toFixed(2);
    container.appendChild(price);

    var divQuantidade = document.createElement("div");
    divQuantidade.classList.add("quantidade");

    var decrementButton = document.createElement("button");
    if (produto.quantidade > 1) {
      decrementButton.innerHTML = '<i class="fas fa-minus"></i>';
    } else {
      decrementButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    }
    decrementButton.addEventListener("click", function () {
      diminuirQuantidade(index);
    });
    divQuantidade.appendChild(decrementButton);

    var quantidadeText = document.createElement("span");
    quantidadeText.textContent = produto.quantidade;
    divQuantidade.appendChild(quantidadeText);

    var incrementButton = document.createElement("button");
    incrementButton.innerHTML = '<i class="fas fa-plus"></i>';
    incrementButton.addEventListener("click", function () {
      aumentarQuantidade(index);
    });
    divQuantidade.appendChild(incrementButton);

    container.appendChild(divQuantidade);

    divDetalhes.appendChild(divTitulo);
    divDetalhes.appendChild(divDescricao);
    divDetalhes.appendChild(container);
    divProduto.appendChild(divDetalhes);
    divProduto.appendChild(divImagem);

    cartItems.appendChild(divProduto);

    total += produto.price * produto.quantidade;
  });

  var totalDiv = document.createElement("div");
totalDiv.setAttribute("id", "total-div"); 
var totalText = document.createElement("h3");
totalText.textContent = "Total";
totalDiv.appendChild(totalText);
var totalValue = document.createElement("h4");
totalValue.textContent = "R$ " + total.toFixed(2);
totalDiv.appendChild(totalValue);
totalElement.appendChild(totalDiv);

  var finalizarCompraButton = document.createElement("button");
  finalizarCompraButton.textContent = "Finalizar Pedido";
  finalizarCompraButton.addEventListener("click", finalizarCompra);
  totalElement.appendChild(finalizarCompraButton);

  if (produtos.length === 0) {
    exibirCarrinhoVazio();
  }
}


function cortarTexto(texto, limite) {
  if (texto.length <= limite) {
    return texto;
  } else {
    var textoCortado = texto.slice(0, limite);
    return textoCortado.trim() + "...";
  }
}

function atualizarBotaoDiminuir(index, decrementButton) {
  var carrinho = sessionStorage.getItem("carrinho");
  var produtos;

  if (carrinho) {
    produtos = JSON.parse(carrinho);

    if (index >= 0 && index < produtos.length) {
      if (produtos[index].quantidade === 1) {
        decrementButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      } else {
        decrementButton.innerHTML = '<i class="fas fa-minus"></i>';
      }
    }
  }
}

function exibirCarrinhoVazio() {
  var cartItems = document.getElementById("cart-items");
  var totalElement = document.getElementById("cart-total");
  cartItems.innerHTML = ""; // Limpa o conteúdo anterior

  var emptyCartMsg = document.createElement("p");
  emptyCartMsg.textContent = "Seu carrinho está vazio.";
  cartItems.appendChild(emptyCartMsg);

  totalElement.textContent = "";

}


function adicionarAoCarrinho(id, nome, preco, imagem, descricao, obs) {
  var carrinho = sessionStorage.getItem("carrinho");
  var produtos;

  if (carrinho) {
    produtos = JSON.parse(carrinho);
  } else {
    produtos = [];
  }

  var item = {
    id: id,
    title: nome,
    price: preco,
    quantidade: 1,
    image: imagem,
    description: descricao,
    obs: obs,
  };
  produtos.push(item);

  sessionStorage.setItem("carrinho", JSON.stringify(produtos));

  renderizarProdutos(produtos);
}

function removerDoCarrinho(index) {
  var carrinho = sessionStorage.getItem("carrinho");
  var produtos;

  if (carrinho) {
    produtos = JSON.parse(carrinho);
    atualizarQtdProd();

    if (index >= 0 && index < produtos.length) {
      produtos.splice(index, 1);
      sessionStorage.setItem("carrinho", JSON.stringify(produtos));
      renderizarProdutos(produtos);
    }
  }
}

function aumentarQuantidade(index) {
  var carrinho = sessionStorage.getItem("carrinho");
  var produtos;
  if (carrinho) {
    produtos = JSON.parse(carrinho);

    if (index >= 0 && index < produtos.length) {
      produtos[index].quantidade++;
      sessionStorage.setItem("carrinho", JSON.stringify(produtos));
      renderizarProdutos(produtos);
      atualizarQtdProd();
    }
  }
}

function diminuirQuantidade(index) {
  var carrinho = sessionStorage.getItem("carrinho");
  var produtos;
  if (carrinho) {
    produtos = JSON.parse(carrinho);

    if (index >= 0 && index < produtos.length) {
      if (produtos[index].quantidade > 1) {
        produtos[index].quantidade--;
        sessionStorage.setItem("carrinho", JSON.stringify(produtos));
        renderizarProdutos(produtos);
        atualizarQtdProd();
      } else {
        produtos.splice(index, 1);
        sessionStorage.setItem("carrinho", JSON.stringify(produtos));
        renderizarProdutos(produtos);
        atualizarQtdProd();
      }
    }
  }
}

function quebrarTexto(texto, limite) {
  if (texto.length <= limite) {
    return texto;
  } else {
    var partes = [];
    var startIndex = 0;

    while (startIndex < texto.length) {
      var endIndex = startIndex + limite;
      if (endIndex > texto.length) {
        endIndex = texto.length;
      }
      partes.push(texto.slice(startIndex, endIndex));
      startIndex = endIndex;
    }

    return partes.join("\n");
  }
}

function finalizarCompra() {
  var carrinho = sessionStorage.getItem("carrinho");
  var produtos = JSON.parse(carrinho);

  // Criação da lista de resumo do pedido
  var resumoPedido = "";
  var total = 0; // Variável para armazenar o total do pedido

  produtos.forEach(function (produto) {
    resumoPedido += " " + produto.quantidade + "x " + produto.title + "\n\n";
    total += produto.price * produto.quantidade; // Calcula o total do pedido
  });
  resumoPedido += "------------------------------------------\n";
  resumoPedido += "Valor total do pedido: R$" + total.toFixed(2) + "\n"; // Adiciona a linha do total ao resumo do pedido

  function countDigitsWithDecimal(total) {
    const totalString = total.toString();
    return totalString.length;
  }
  // Armazena o resumo do pedido no sessionStorage
  sessionStorage.setItem("casas", countDigitsWithDecimal(total));
  sessionStorage.setItem("resumoPedido", resumoPedido);
  sessionStorage.setItem("total", total.toFixed(2));
  // Redireciona para a página finalizar.html
  window.location.href = "finalizar.html";
}

function goToHome() {
  window.location.href = "index.html";
}
