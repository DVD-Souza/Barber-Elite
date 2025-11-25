// --- DADOS DO CLIENTE E TAXAS (Mock ou obtidos via Token/API) ---
// Estes dados são mantidos como mock, pois não vieram da página anterior.
// Em um app real, o nome e contato viriam dos dados do usuário logado.
const CLIENT_INFO = {
    name: 'André Almeida G. Neto', 
    contact: 'andre.neto@email.com | (71) 99999-9999',
    // Mock de dados que seriam buscados ou calculados
    defaultPrice: 45.00, 
    defaultDuration: '45 min',
    fees: 0.00,
    professionalAvatar: 'https://randomuser.me/api/portraits/men/32.jpg'
};

let CURRENT_BOOKING = null; // Variável global para armazenar os dados finais

// --- Função de Inicialização para preencher a UI com os dados reais ---
function initializeConfirmationPage() {
    // 1. Tenta carregar dados da reserva da sessionStorage
    const storedData = sessionStorage.getItem('currentBooking');
    
    if (!storedData) {
        // Redireciona se os dados da reserva não forem encontrados
        alert("Erro: Dados da reserva não encontrados. Voltando para seleção de horário.");
        // Assumindo que a página anterior é 'reserva.html' ou similar
        window.location.href = 'reserva.html'; 
        return;
    }
    
    const bookingDataFromSession = JSON.parse(storedData);
    
    // 2. Compila os dados finais para renderização
    CURRENT_BOOKING = {
        // Dados vindos da sessão
        service: { 
            name: bookingDataFromSession.service, 
            duration: CLIENT_INFO.defaultDuration, 
            price: CLIENT_INFO.defaultPrice 
        },
        professional: { 
            name: bookingDataFromSession.professional, 
            avatar: CLIENT_INFO.professionalAvatar 
        },
        date: bookingDataFromSession.date,
        time: bookingDataFromSession.time,
        // Dados do cliente/taxas (mock por enquanto)
        client: CLIENT_INFO,
        fees: CLIENT_INFO.fees
    };
    
    const data = CURRENT_BOOKING;

    // Seção 1: Detalhes do Agendamento
    document.getElementById('service-name').textContent = data.service.name;
    document.getElementById('service-duration').textContent = data.service.duration;
    document.getElementById('service-price').textContent = `R$ ${data.service.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('pro-name').textContent = data.professional.name;
    document.getElementById('pro-avatar').src = data.professional.avatar;
    document.getElementById('res-date').textContent = data.date;
    document.getElementById('res-time').textContent = data.time;

    // Seção 2: Dados do Cliente
    document.getElementById('client-name-display').textContent = data.client.name;
    document.getElementById('client-contact-display').textContent = data.client.contact;
    
    // Seção 5: Pagamento e Total
    const subtotal = data.service.price;
    const fee = data.fees;
    const total = subtotal + fee;
    
    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('service-fee').textContent = `R$ ${fee.toFixed(2).replace('.', ',')}`;
    document.getElementById('total-price').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// 1. Ação de Editar Dados do Cliente
function editClientInfo() {
    alert('Simulando redirecionamento para a página de edição de dados do perfil.');
}

// 2. Ação de Voltar
function goBackToTimeSelection() {
    // Apaga os dados temporários da sessão antes de voltar
    sessionStorage.removeItem('currentBooking');
    alert('Voltando para a Etapa 2: Data e Horário.');
    window.history.back();
}

// 3. Ação de Confirmação Final (Chamada à API)
async function confirmBooking() {
    const dataToSend = {
        // IDs reais seriam usados aqui
        serviceId: 'MOCK_SERVICE_ID', 
        professionalId: 'MOCK_PROFESSIONAL_ID', 
        // Dados coletados e formatados
        date: CURRENT_BOOKING.date,
        time: CURRENT_BOOKING.time,
        notes: document.getElementById('notes-input').value,
        paymentMethod: document.querySelector('input[name="payment-method"]:checked')?.value
    };
    
    const confirmButton = document.getElementById('confirm-button');
    
    if (!dataToSend.paymentMethod) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    // Desabilitar botão para evitar cliques duplicados
    confirmButton.disabled = true;
    confirmButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> FINALIZANDO...';

    try {
        // A rota /bookings foi configurada no server.js para receber o POST
        const response = await apiPost('/bookings', dataToSend); 
        
        // Sucesso na Confirmação
        alert(`Reserva confirmada com sucesso! (ID: ${response.bookingId})`);
        
        // Limpa os dados temporários após a confirmação
        sessionStorage.removeItem('currentBooking');

        // Implementação real: Redirecionar para uma tela de Sucesso/Dashboard
        // window.location.href = 'reserva-sucesso.html';

    } catch (error) {
        console.error("Erro ao confirmar:", error);
        alert(error.message || "Falha ao finalizar a reserva. Tente novamente.");
    } finally {
        // Reverte o botão para o estado original (se não houver redirecionamento)
        confirmButton.disabled = false;
        confirmButton.innerHTML = '<i class="fas fa-lock"></i> CONFIRMAR RESERVA';
    }
}

// Inicia a página ao carregar
document.addEventListener('DOMContentLoaded', initializeConfirmationPage);