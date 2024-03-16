document.addEventListener("DOMContentLoaded", function () {
  var carrinho = sessionStorage.getItem("carrinho");
  var quantidadeProdutos = 0;

  if (carrinho) {
    var produtos = JSON.parse(carrinho);

    produtos.forEach(function (produto) {
      quantidadeProdutos += produto.quantidade;
      var cartCounter = document.getElementById("cart-counter");

      cartCounter.textContent = quantidadeProdutos;
    });
  }
  sessionStorage.setItem("quantidadeProdutos", quantidadeProdutos.toString());
});

function criarMarcaDiv(marca, productsDiv) {
  var marcaDiv = document.createElement("div");
  marcaDiv.classList.add("marca");

  var marcaTitle = document.createElement("h1");
  marcaTitle.textContent = "Pods " + marca;
  marcaDiv.appendChild(marcaTitle);

  productsDiv.appendChild(marcaDiv);

  return marcaDiv;
}

function exibirProdutos() {
  var productsDiv = document.querySelector(".products");
  productsDiv.innerHTML = "";

  var marcas = ["Elfbar", "Nikbar", "Ignite", "Oxbar", "NovaMarca"];

  marcas.forEach(function (marca) {
    var produtosDaMarca = produtos.filter(function (produto) {
      return produto.marca === marca && produto.disponivel === true;
    });

    if (produtosDaMarca.length > 0) {
      var marcaDiv = criarMarcaDiv(marca, productsDiv);
      var gridDiv = document.createElement("div");
      gridDiv.classList.add("grid");
      marcaDiv.appendChild(gridDiv);

      produtosDaMarca.forEach(function (produto) {
        var productContainer = criarProdutoContainer(produto);
        gridDiv.appendChild(productContainer);
      });
    }
  });
}

function goToCart() {
  window.location.href = "cart.html";
}

document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function () {
    this.classList.add("clicked");
    setTimeout(function () {
      searchButton.classList.remove("clicked");
    }, 50);

    pesquisar();
  });

  var siteSearch = document.getElementById("site-search");
  siteSearch.addEventListener("input", function () {
    pesquisarLive();
  });

  exibirProdutos();
});

function pesquisar() {
  var searchTerm = document.getElementById("site-search").value.toLowerCase();
  if (searchTerm.trim() === "") {
    exibirProdutos();
    return;
  }

  var productsDiv = document.querySelector(".products");
  productsDiv.innerHTML = "";

  var filteredProdutos = produtos.filter(function (produto) {
    var title = produto.title.toLowerCase();
    var description = produto.description.toLowerCase();

    return title.includes(searchTerm) || description.includes(searchTerm);
  });

  var gridDiv = document.createElement("div");
  gridDiv.classList.add("grid");
  productsDiv.appendChild(gridDiv);

  if (filteredProdutos.length === 0) {
    productsDiv.classList.add("no-results");

    var noResultsMsg = document.createElement("p");
    noResultsMsg.textContent = "Nenhum produto encontrado.";
    productsDiv.appendChild(noResultsMsg);
  } else {
    productsDiv.classList.remove("no-results");

    filteredProdutos.forEach(function (produto) {
      var productContainer = criarProdutoContainer(produto);
      gridDiv.appendChild(productContainer);
    });
  }

  var footer = document.querySelector("footer");
  footer.style.display = "none";
}

function pesquisarLive() {
  var searchTerm = document.getElementById("site-search").value.toLowerCase();
  if (searchTerm.trim() === "") {
    exibirProdutos();
    return;
  }

  var productsDiv = document.querySelector(".products");
  productsDiv.innerHTML = "";

  var filteredProdutos = produtos.filter(function (produto) {
    var title = produto.title.toLowerCase();
    var description = produto.description.toLowerCase();

    return title.includes(searchTerm) || description.includes(searchTerm);
  });

  var gridDiv = document.createElement("div");
  gridDiv.classList.add("grid");
  productsDiv.appendChild(gridDiv);

  if (filteredProdutos.length === 0) {
    productsDiv.classList.add("no-results");

    var noResultsMsg = document.createElement("p");
    noResultsMsg.textContent = "Nenhum produto encontrado.";
    productsDiv.appendChild(noResultsMsg);
  } else {
    productsDiv.classList.remove("no-results");

    filteredProdutos.forEach(function (produto) {
      var productContainer = criarProdutoContainer(produto);
      gridDiv.appendChild(productContainer);
    });
  }

  var footer = document.querySelector("footer");
  footer.style.display = "none";
}

function redirecionarParaDetalhes(id) {
  var url = "detail.html?id=" + id;
  window.location.href = url;
}

function criarProdutoContainer(produto) {
  var productContainer = document.createElement("div");
  productContainer.classList.add("product-principal");
  productContainer.dataset.productId = produto.id;

  var image = document.createElement("img");
  image.src = produto.image;
  image.alt = "Imagem do Produto";
  productContainer.appendChild(image);

  var title = document.createElement("h2");
  var originalTitle = produto.title;
  var truncatedTitle = originalTitle;
  title.textContent = truncatedTitle;
  productContainer.appendChild(title);

  var increasedPrice = produto.price * 1.3;

  var increasedPriceContainer = document.createElement("div");
  increasedPriceContainer.classList.add("increased-price");

  var discountLine = document.createElement("span");
  discountLine.textContent = "R$ " + produto.price.toFixed(2);
  discountLine.classList.add("discount-line");
  increasedPriceContainer.appendChild(discountLine);

  var originalPrice = document.createElement("s");
  originalPrice.textContent = "R$ " + increasedPrice.toFixed(2);
  originalPrice.classList.add("original-price");
  increasedPriceContainer.appendChild(originalPrice);

  productContainer.appendChild(increasedPriceContainer);

  productContainer.addEventListener("click", function () {
    redirecionarParaDetalhes(this.dataset.productId);
  });

  return productContainer;
}

