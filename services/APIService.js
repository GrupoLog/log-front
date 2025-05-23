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

export async function getDriverById(id) {
    const response = await axios.get(`${API_URL}/motoristas/${id}`);
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

export async function getVehiclesFunction() {
    const response = await axios.get(`${API_URL}/veiculos`);
    return response.data;
}

export async function getVehicleById(id) {
    const response = await axios.get(`${API_URL}/veiculos/${id}`);
    return response.data;
}

export async function getTripFunction() {
    const response = await axios.get(`${API_URL}/viagens`);
    return response.data;
}

export async function getTripById(id) {
    const response = await axios.get(`${API_URL}/viagens/${id}`);
    return response.data;
}

export async function getAvailableYearsFunction() {
  const response = await axios.get(`${API_URL}/viagens`);
  const viagens = response.data;

  const anos = Array.from(
    new Set(
      viagens.map(v => new Date(v.data_viagem).getFullYear())
    )
  );
  return anos.sort((a, b) => b - a);
}

export async function getTripsCountByTypeFunction(year) {
    const response = await axios.get(`${API_URL}/viagens/contar_por_tipo?ano=${year}`);
    return response.data;
}

export async function getRevenueByPaymentMethodFunction() {
    const response = await axios.get(`${API_URL}/solicitacoes/receita_por_forma_pagamento`);
    return response.data;
}

export async function getMostUsedVehiclesFunction() {
    const response = await axios.get(`${API_URL}/veiculos/veiculos_mais_utilizados`);
    return response.data;
}

export async function getTotalRevenueFunction() {
    const response = await axios.get(`${API_URL}/solicitacoes/revenue-total`);
    return response.data;
}

export async function getMonthlyServicesCountFunction() {
    const response = await axios.get(`${API_URL}/servicos/contar_servicos_mensais`);
    return response.data;
}

export async function getMonthlyRequestsCountFunction() {
    const response = await axios.get(`${API_URL}/solicitacoes/solicitacoes_por_mes`);
    return response.data;
}

export async function getMonthlyRevenueByTypeFunction() {
    const response = await axios.get(`${API_URL}/servicos/receita_por_tipo`);
    return response.data;
}

export async function getPaymentMethodsFunction() { 
    const response = await axios.get(`${API_URL}/servicos/distribuicao_pagamento`);
    return response.data;
}

export async function getTopClientsFunction() {
    const response = await axios.get(`${API_URL}/solicitacoes/top_clientes`);
    return response.data;
}

export async function getTotalRequestsFunction() {
    const response = await axios.get(`${API_URL}/solicitacoes/total_solicitacoes_func`);
    return response.data;
}

export async function getMediumTicketFunction() {
    const response = await axios.get(`${API_URL}/solicitacoes/ticket_medio`);
    return response.data;
}

export async function getPendingPercentualFunction() {
    const response = await axios.get(`${API_URL}/solicitacoes/percentual_pendentes`);
    return response.data;
}

export async function getTripsCountByDriverFunction() {
    const response = await axios.get(`${API_URL}/motoristas/viagens-por-motorista`);
    return response.data;
}

export async function getDriversCountByTypeFunction() {
    const response = await axios.get(`${API_URL}/motoristas/total-por-tipo`);
    return response.data;
}

export async function getTotalTripsFunction() {
    const response = await axios.get(`${API_URL}/viagens/total-viagens`);
    return response.data;
}

export async function getMostFrequentDestinationFunction() {
    const response = await axios.get(`${API_URL}/motoristas/destino-motorista`);
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
    const { chassi, proprietario, placa, cap_carga } = data;
    const response = await axios.post(`${API_URL}/motos`, {
        chassi, proprietario, placa, cap_carga
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

export async function postTripFunction(data) {
    const { origem, destino, data_viagem, hora_viagem, veiculo_chassi, motoristas_cnh } = data;
    const response = await axios.post(`${API_URL}/viagens`, {
        origem, destino, data_viagem, hora_viagem, veiculo_chassi, motoristas_cnh
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