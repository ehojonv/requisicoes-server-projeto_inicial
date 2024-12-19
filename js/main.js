import api from "./api.js";
import ui from "./ui.js"

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formPensamento = document.querySelector("#pensamento-form");
    formPensamento.addEventListener("submit", manipularsubmitForm);

    const btnCancelar = document.querySelector("#botao-cancelar");
    btnCancelar.addEventListener("click", manipularCancelamento);
})

async function manipularsubmitForm(evento) {
    evento.preventDefault();

    const id = document.querySelector("#pensamento-id").value;
    const conteudo = document.querySelector("#pensamento-conteudo").value;
    const autoria = document.querySelector("#pensamento-autoria").value;

    try {
        if (id) {
            await api.editarPensamento({
                id,
                conteudo,
                autoria
            })
            document.querySelector("#pensamento-form").scrollIntoView(false);
        } else {
            await api.salvarPensamento({
                conteudo,
                autoria
            });
        }
        ui.renderizarPensamentos();
    } catch (error) {
        alert("Erro ao salvar pensamento");
    }
}

async function manipularCancelamento() {
    ui.limparFormulario();
}