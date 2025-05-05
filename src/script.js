function alterarQuantidade(valor) {
    const input = document.getElementById('quantidade');
    let atual = parseInt(input.value);
    if (atual + valor >= 1) {
      input.value = atual + valor;
    }

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const container = document.getElementById("catalogo");
  
    produtos.forEach((produto, index) => {
      const card = document.createElement("div");
      card.className = "col-md-3 mb-4";
      card.innerHTML = `
        <div class="card h-100" style="cursor: pointer;">
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
            <p class="card-text text-muted">${produto.categoria}</p>
          </div>
        </div>
      `;
  
      card.addEventListener("click", () => {
        localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
        window.location.href = "produto.html";
      });
  
      container.appendChild(card);
    });

    //Formulario Cadastro 

  }
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recarregar a página

    // Captura os valores
    const nomeProduto = document.getElementById("nomeProduto").value.trim();
    const categoria = document.getElementById("categoria").value;
    const fornecedor = document.getElementById("fornecedor").value;
    const preco = document.getElementById("preco").value;
    const frete = document.getElementById("frete").value;
    const descricao = document.getElementById("descricao").value.trim();

    // Validação simples
    if (!nomeProduto || categoria === "Selecione" || fornecedor === "Selecione" || !preco || !frete || !descricao) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Criando objeto do produto
    const produto = {
      nome: nomeProduto,
      categoria,
      fornecedor,
      preco: parseFloat(preco),
      frete: parseFloat(frete),
      descricao,
    };

    console.log("Produto cadastrado:", produto); // Apenas para testes no console

    // Exemplo de armazenamento local (opcional)
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Limpar o formulário
    this.reset();

    alert("Produto cadastrado com sucesso!");
  });
