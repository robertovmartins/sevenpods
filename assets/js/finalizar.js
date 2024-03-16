function criarMensagemWhatsApp() {
  var nome = document.getElementById('nome').value;
  var contato = document.getElementById('phone').value;
  var rua = document.getElementById('rua').value;
  var numero = document.getElementById('numero').value;
  var bairro = document.getElementById('bairro').value;
  var complemento = document.getElementById('complemento').value;
  var resumoPedido = sessionStorage.getItem("resumoPedido");
  var endereco = "Rua " + rua + ', ' + numero + "\n" + "Bairro: " + bairro + "\n" + complemento;
  var mensagemErro = document.getElementById("mensagem-erro");
  var formaEntrega = document.getElementsByName("forma-entrega");
  var formaPagamento = document.getElementsByName("forma-pagamento");

  var pagamento;

  if (formaPagamento[0].checked) {
    pagamento = "Forma de pagamento: PIX";
    console.log(formaPagamento[0].checked);
  }
  else {
    pagamento = "Forma de pagamento: Dinheiro";
    console.log(formaPagamento[0].checked);
  }

  if (formaEntrega[0].checked == true) {
    if (nome === "" || rua === "" || contato === "" || numero === "" || bairro === "" || complemento === "") {
      mensagemErro.textContent = "Por favor, preencha todos os campos de texto.";
      return;
    }
  }
  if (formaEntrega[0].checked == false) {
    if (nome === "" || contato === "") {
      mensagemErro.textContent = "Por favor, preencha todos os campos de texto.";
      return;
    }
  }
  mensagemErro.textContent = "";

  if (resumoPedido) {
    var meuPedido = "---------------Meu pedido---------------\n\n";
    var contatoPedido = "Contato: " + contato + "\n------------------------------------------\n" + pagamento + "\n------------------------------------------";
    var enderecoFormatado = endereco + "\n------------------------------------------\n\n";
    var pedidoComInfo;
    if (formaEntrega[0].checked == false) {
      pedidoComInfo = meuPedido + "Nome: " + nome + "\n" + contatoPedido + "\nRetirada" + "\n------------------------------------------\n" + resumoPedido;
      console.log(pedidoComInfo);
    }
    else {
      pedidoComInfo = meuPedido + "Nome: " + nome + "\n" + contatoPedido + "\nEntrega" + "\n" +"Endereço: " + enderecoFormatado + resumoPedido;
      console.log(pedidoComInfo);
    }
    // Cria a mensagem para enviar pelo WhatsApp
    var mensagem = pedidoComInfo.replace(/\n/g, "%0A");

    // Abre o WhatsApp com a mensagem preenchida
    var urlWhatsApp = "https://wa.me/5531999445687?text=" + mensagem;
    window.open(urlWhatsApp, "_blank");
  }
}

function goToHome() {
  window.location.href = "home.html";
}

function crc16ccitt(pData) {
  let wCrc = 0xffff;
  for (let i = 0; i < pData.length; i++) {
    wCrc ^= pData.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      wCrc = wCrc & 0x8000 ? (wCrc << 1) ^ 0x1021 : wCrc << 1;
    }
  }
  return wCrc & 0xffff;
}

function gerarQRCode() {
  const casas = sessionStorage.getItem('casas');
  const valor = parseFloat(sessionStorage.getItem('total'));
  const qrc = `00020126360014BR.GOV.BCB.PIX0114+5531999445687520400005303986540${casas}${valor}5802BR5915Roberto Barbosa6011Sete Lagoas62070503***6304`;

  const crc = crc16ccitt(qrc).toString(16).toUpperCase();
  const resultado = qrc + crc;

  document.getElementById("texto").innerHTML = "";
  const resultadoElement = document.getElementById("texto");
  resultadoElement.textContent = resultado;
  resultadoElement.addEventListener("click", function () {
    copiarParaAreaDeTransferencia(resultado);
  });

  // Função para copiar o texto para a área de transferência
  function copiarParaAreaDeTransferencia(texto) {
    const areaDeTransferencia = document.createElement("textarea");
    areaDeTransferencia.value = texto;
    document.body.appendChild(areaDeTransferencia);
    areaDeTransferencia.select();
    document.execCommand("copy");
    document.body.removeChild(areaDeTransferencia);
  }

  const comprovante = document.getElementById("comprovante");
  document.createElement("p");
  comprovante.textContent = "Lembre-se que para confirmar o pedido e necessário enviar o comprovante do pix e clicar no botão de 'Confirmar pedido'.";

  const qrcodeContainer = document.getElementById('qrcode');
  qrcodeContainer.innerHTML = '';

  // Crie um novo QR Code
  const qrcode = new QRCode(qrcodeContainer, {
    text: resultado,
    width: 400,
    height: 400,
  });
}
function goToCart() {
  window.location.href = 'cart.html';
}

function toggleEndereco() {
  var formaEntrega = document.getElementsByName("forma-entrega");
  var endereco = document.getElementById("endereco");
  var endereco2 = document.getElementById("endereco2");
  if (formaEntrega[0].checked) {
    endereco.style.display = "grid";
    endereco2.style.display = "grid";
  } else {
    endereco.style.display = "none";
    endereco2.style.display = "none";
  }
}

function togglePagamento() {
  var formaPagamento = document.getElementsByName("forma-pagamento");
  if (formaPagamento[0].checked) {
    gerarQRCode();
  } else {
    comprovante.innerHTML = "";
    qrcode.innerHTML = "";
    texto.innerHTML = "";
  }
}