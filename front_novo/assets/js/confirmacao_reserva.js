// --- MOCK DATA para Simulação da Reserva ---
const RESERVATION_DATA = {
    service: { name: 'Corte Clássico Elite', duration: '45 min', price: 45.00 },
    professional: { name: 'João', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    date: '14/11/2025',
    time: '10:00',
    client: { name: 'André Almeida G. Neto', contact: 'andre.neto@email.com | (71) 99999-9999' },
    fees: 0.00
};

// --- Função de Inicialização para preencher a UI com os dados simulados ---
function initializeConfirmationPage() {
    const data = RESERVATION_DATA;

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
    // Implementação real: window.location.href = 'perfil/editar';
}

// 2. Ação de Voltar
function goBackToTimeSelection() {
    alert('Voltando para a Etapa 2: Data e Horário.');
    // Implementação real: window.history.back();
}

// 3. Ação de Confirmação Final
function confirmBooking() {
    const notes = document.getElementById('notes-input').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    const confirmButton = document.getElementById('confirm-button');
    
    if (!paymentMethod) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    // Desabilitar botão para evitar cliques duplicados
    confirmButton.disabled = true;
    confirmButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> FINALIZANDO...';

    // Simulação de chamada API para salvar a reserva
    console.log({
        ...RESERVATION_DATA,
        notes: notes,
        paymentMethod: paymentMethod.value
    });

    setTimeout(() => {
        // Sucesso na Confirmação
        alert(`Reserva confirmada com sucesso! Um e-mail será enviado para ${RESERVATION_DATA.client.contact.split(' | ')[0]}.\n\nMétodo de Pagamento: ${paymentMethod.nextElementSibling.nextElementSibling.textContent.trim()}`);
        
        // Implementação real: Redirecionar para uma tela de Sucesso/Dashboard
        // window.location.href = 'reserva-sucesso.html';

        // Reverte o botão para o estado original (simulação)
        confirmButton.disabled = false;
        confirmButton.innerHTML = '<i class="fas fa-lock"></i> CONFIRMAR RESERVA';
    }, 1500);
}

// Inicia a página ao carregar
document.addEventListener('DOMContentLoaded', initializeConfirmationPage);