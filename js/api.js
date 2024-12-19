const URL_BASE = "http://localhost:3000"

const api = {
    async buscarPensamentos() {
        try {
            const res = await axios.get(`${URL_BASE}/pensamentos`);
            return await res.data
        } catch (erro) {
            alert("Erro ao buscar pensamentos")
            throw erro;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const res = await axios.post(`${URL_BASE}/pensamentos`, pensamento);
            return await res.data;
        } catch (erro) {
            alert("Erro ao salvar pensamentos")
            throw erro;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const res = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return await res.data;
        } catch (erro) {
            alert("Erro ao buscar pensamentos")
            throw erro;
        }
    },

    async editarPensamento(pensamento) {
        try {
            const res = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento);
            return await res.data;
        } catch (erro) {
            alert("Erro ao editar pensamento")
            throw erro;
        }
    },

    async excluirPensamento(id) {
        try {
            const res = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
        } catch (erro) {
            throw erro;
        }
    }


}

export default api;