// --- Função principal para gerenciar as Tabs e Filtragem ---
function initializeReservationFilter() {
    const tabs = document.querySelectorAll('.tab-button');
    const reservationCards = document.querySelectorAll('.reservation-card');
    const emptyState = document.getElementById('empty-state');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetStatus = tab.getAttribute('data-tab');

            // 1. Atualiza o estado da Tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. Filtra os Cards
            let visibleCount = 0;
            reservationCards.forEach(card => {
                const cardStatus = card.getAttribute('data-status');
                
                if (targetStatus === 'todas' || cardStatus === targetStatus) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // 3. Exibe/Oculta o Estado Vazio
            if (visibleCount === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
        });
    });

    // Inicia com a tab 'futuras' ativa
    document.querySelector('.tab-button[data-tab="futuras"]').click();
}

// --- Funções de Ação Simuladas ---
function viewDetails(id) {
    alert(`Visualizando detalhes da reserva ID: #${id}`);
    // Implementação real: Redirecionar para a página de Detalhes da Reserva.
}

function reschedule(id) {
    alert(`Iniciando fluxo de reagendamento para reserva ID: #${id}`);
    // Implementação real: Redirecionar para a Etapa 2 (Data e Hora) com os dados pré-preenchidos.
}

function cancelReservation(id) {
    if (confirm(`Tem certeza que deseja cancelar a reserva ID: #${id}? Este processo é irreversível (sujeito à política de 2h).`)) {
        alert(`Reserva ID: #${id} cancelada com sucesso.`);
        // Implementação real: Enviar requisição API e recarregar a lista.
    }
}

function confirmPayment(id) {
    alert(`Confirmando pagamento para reserva ID: #${id}.`);
    // Implementação real: Enviar requisição API e atualizar o status do card.
}

function rebook(id) {
    alert(`Agendando novamente a reserva ID: #${id} (redirecionando para o serviço).`);
    // Implementação real: Redirecionar para a página de Detalhe do Serviço.
}

// Inicia o script ao carregar a página
document.addEventListener('DOMContentLoaded', initializeReservationFilter);