document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("procedimento-form");
    const listaProcedimentos = document.getElementById("lista-procedimentos");
    const totalSpan = document.getElementById("total");
    const descricaoSelect = document.getElementById("descricao");
    const valorSelect = document.getElementById("valor");

    let total = 0;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const descricao = descricaoSelect.value;
        const valor = parseFloat(valorSelect.value);

        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, valor })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            adicionarProcedimento(descricao, valor);
            atualizarTotal(valor);
        })
        .catch(error => console.error('Erro:', error));

        form.reset();
    });

    function adicionarProcedimento(descricao, valor) {
        const li = document.createElement("li");
        li.textContent = `${descricao} - R$ ${valor.toFixed(2)}`;
        listaProcedimentos.appendChild(li);
    }

    function atualizarTotal(valor) {
        total += valor;
        totalSpan.textContent = total.toFixed(2);
    }
});
