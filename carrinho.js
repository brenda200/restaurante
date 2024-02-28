document.addEventListener('DOMContentLoaded', function() {
    atualizarCarrinho();
});

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    listaCarrinho.innerHTML = '';
    let carrinhoItens = localStorage.getItem('carrinhoItens');
    let total = 0;
    if (carrinhoItens) {
        carrinhoItens = JSON.parse(carrinhoItens);
        carrinhoItens.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            `;
            listaCarrinho.appendChild(listItem);
            total += item.preco;
        });
    }
    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function limparCarrinho() {
    localStorage.removeItem('carrinhoItens');
    atualizarCarrinho();
}

function enviarPedidoParaWhatsApp() {
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var endereco = document.getElementById("endereco").value;

    let carrinhoItens = localStorage.getItem('carrinhoItens');
    let total = 0; // Inicializando o total
    let mensagemPedido = "Olá! Gostaria de fazer o seguinte pedido:\n";

    if (carrinhoItens) {
        carrinhoItens = JSON.parse(carrinhoItens);
        carrinhoItens.forEach(item => {
            mensagemPedido += `${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
            total += item.preco; // Adicionando o preço do item ao total
        });
    }

    mensagemPedido += `\nTotal da Venda: R$ ${total.toFixed(2)}`; // Incluindo o total na mensagem

    mensagemPedido += `\n\nInformações do Cliente:\nNome: ${nome}\nTelefone: ${telefone}\nEndereço: ${endereco}`;

    mensagemPedido = encodeURIComponent(mensagemPedido);

    window.open(`https://wa.me/559191323091/?text=${mensagemPedido}`, '_blank');

}
