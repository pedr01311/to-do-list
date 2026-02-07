
    // Recupera tarefas
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    

    function salvar() {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function renderizar() {
        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        tarefas.forEach((texto, index) => {
            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = texto;

            // BOTÃO EDITAR
            const botaoEditar = document.createElement("button");
            botaoEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            botaoEditar.onclick = function(e) {
                e.stopPropagation();
                const novo = prompt("Editar tarefa:", texto);
                if (novo && novo.trim() !== "") {
                    tarefas[index] = novo;
                    salvar();
                    renderizar();
                }
            };

            // BOTÃO REMOVER
            const botaoRemover = document.createElement("button");
            botaoRemover.innerHTML = '<i class="fa-solid fa-x"></i>';
            botaoRemover.onclick = function(e) {
                e.stopPropagation();
                tarefas.splice(index, 1);
                salvar();
                renderizar();
            };

            li.appendChild(span);
            li.appendChild(botaoEditar);
            li.appendChild(botaoRemover);
            lista.appendChild(li);
        });
    }

    function adicionar() {
        const input = document.getElementById("texto");
        if (input.value.trim() === "") return;

        tarefas.push(input.value);
        input.value = "";
        salvar();
        renderizar();
    }
    
    // Permitir adicionar com ENTER
    document.getElementById("texto").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            adicionar();
        }
    });

    renderizar();
