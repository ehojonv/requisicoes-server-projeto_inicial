import api from "./api.js";

const ui = {

    async renderizarPensamentos() {
        const listaPensamentos = document.querySelector("#lista-pensamentos");
        listaPensamentos.innerHTML = "";

        try {
            const pensamentos = await api.buscarPensamentos();
            if (pensamentos.length == 0) {
                document.querySelector("#lista-pensamentos-container p").style.display = "block";
            } else {
                document.querySelector("#lista-pensamentos-container p").style.display = "none";
                pensamentos.forEach(ui.adicionarPensamentoLista);
            }
        } catch {
            alert("Erro ao rendereizar elementos")
        }
    },

    adicionarPensamentoLista(pensamento) {
        const listaPensamentos = document.querySelector("#lista-pensamentos");

        const liPensamento = document.createElement("li");
        liPensamento.setAttribute("data-id", pensamento.id);
        liPensamento.classList.add("li-pensamento");

        const imgAspas = document.createElement("img");
        imgAspas.setAttribute("src", "assets/imagens/aspas-azuis.png");
        imgAspas.setAttribute("alt", "Aspas Azuis");
        imgAspas.classList.add("icone-aspas");

        const divPensamentoConteudo = document.createElement("div");
        divPensamentoConteudo.textContent = pensamento.conteudo;
        divPensamentoConteudo.classList.add("pensamento-conteudo");

        const divPensamentoAutoria = document.createElement("div");
        divPensamentoAutoria.textContent = pensamento.autoria;
        divPensamentoAutoria.classList.add("pensamento-autoria");

        const buttonEditarPensamento = document.createElement("button");
        buttonEditarPensamento.classList.add("botao-editar");
        buttonEditarPensamento.onclick = () => ui.preencherForm(pensamento.id);

        const imgEditar = document.createElement("img");
        imgEditar.setAttribute("src", "assets/imagens/icone-editar.png");
        imgEditar.setAttribute("alt", "Editar");
        buttonEditarPensamento.append(imgEditar);

        const buttonExcluirPensamento = document.createElement("button");
        buttonExcluirPensamento.classList.add("botao-excluir");
        buttonExcluirPensamento.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos()
            } catch (error) {
                alert("Erro ao excluir pensamento")
            }
        };

        const imgExcluir = document.createElement("img");
        imgExcluir.setAttribute("src", "assets/imagens/icone-excluir.png");
        imgExcluir.setAttribute("alt", "Excluir");
        buttonExcluirPensamento.append(imgExcluir);

        const divIcones = document.createElement("div");
        divIcones.classList.add("icones");
        divIcones.append(buttonEditarPensamento, buttonExcluirPensamento);

        liPensamento.append(imgAspas, divPensamentoConteudo, divPensamentoAutoria, divIcones);

        listaPensamentos.append(liPensamento);
    },

    limparFormulario() {
        document.querySelector("#pensamento-form").reset();
    },

    async preencherForm(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.querySelector("#pensamento-id").value = pensamento.id;
        document.querySelector("#pensamento-conteudo").value = pensamento.conteudo;
        document.querySelector("#pensamento-autoria").value = pensamento.autoria;
        document.querySelector("#pensamento-form").scrollIntoView(false);
    },
}

export default ui;