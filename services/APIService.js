import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// GET Functions

export async function getClientFunction() {
    const response = await axios.get(`${API_URL}/clientes`);
    return response.data;
}

export async function getProductFunction() {
    const response = await axios.get(`${API_URL}/produtos`);
    return response.data;
}

export async function getDriverFunction() {
    const response = await axios.get(`${API_URL}/motoristas`);
    return response.data;
}

export async function getMotorcycleFunction() {
    const response = await axios.get(`${API_URL}/motos`);
    return response.data;
}

export async function getVanFunction() {
    const response = await axios.get(`${API_URL}/vans`);
    return response.data;
}

// POST Functions

export async function postClientFunction(data) {
    const { cpf, nome, sobrenome, rua, bairro, numero, cidade } = data;
    const response = await axios.post(`${API_URL}/clientes`, {
        cpf, nome, sobrenome, rua, bairro, numero, cidade
    });
    return response.data;
}

export async function postProductFunction(data) {
    const { peso, data_validade, descricao } = data;
    const response = await axios.post(`${API_URL}/produtos`, {
        peso, data_validade, descricao
    });
    return response.data;
}

export async function postDriverFunction(data) {
    const { cnh, cpf, nome, tipo, tipo_cnh, telefone_um, telefone_dois, cnh_supervisionado } = data;
    const response = await axios.post(`${API_URL}/motoristas`, {
        cnh, cpf, nome, tipo, tipo_cnh, telefone_um, telefone_dois, cnh_supervisionado
    });
    return response.data;
}

export async function postMotorcycleFunction(data) {
    const { chassi, proprietario, placa, cep_carga } = data;
    const response = await axios.post(`${API_URL}/motos`, {
        chassi, proprietario, placa, cep_carga
    });
    return response.data;
}

export async function postVanFunction(data) {
    const { chassi, proprietario, placa, cap_passageiros } = data;
    const response = await axios.post(`${API_URL}/vans`, {
        chassi, proprietario, placa, cap_passageiros
    });
    return response.data;
}

// PUT Functions

export async function putClientFunction(data) {
    const { cpf, nome, sobrenome, rua, bairro, numero, cidade } = data;
    const response = await axios.put(`${API_URL}/clientes/${cpf}`, {
        cpf, nome, sobrenome, rua, bairro, numero, cidade, phonesList: []
    });
    return response.data;
}

export async function putProductFunction(data) {
    const { id_produto, peso, data_validade, descricao } = data;
    const response = await axios.put(`${API_URL}/produtos/${id_produto}`, {
        id_produto, peso, data_validade, descricao
    });
    return response.data;
}

export async function putDriverFunction(data) {
    const { cnh, cpf, nome, tipo, tipo_cnh, telefone_um, telefone_dois, cnh_supervisionado } = data;
    const response = await axios.put(`${API_URL}/motoristas/${cnh}`, {
        cnh, cpf, nome, tipo, tipo_cnh, telefone_um, telefone_dois, cnh_supervisionado
    });
    return response.data;
}

export async function putMotorcycleFunction(data) {
    const { chassi, proprietario, placa, cep_carga } = data;
    const response = await axios.put(`${API_URL}/motos/${chassi}`, {
        chassi, proprietario, placa, cep_carga
    });
    return response.data;
}

export async function putVanFunction(data) {
    const { chassi, proprietario, placa, cap_passageiros } = data;
    const response = await axios.put(`${API_URL}/vans/${chassi}`, {
        chassi, proprietario, placa, cap_passageiros
    });
    return response.data;
}

// DELETE Functions

export async function deleteClientFunction(cpf) {
    const response = await axios.delete(`${API_URL}/clientes/${cpf}`);
    console.log("Deletando cliente ID:", req.params.id);
    return response.data;
}