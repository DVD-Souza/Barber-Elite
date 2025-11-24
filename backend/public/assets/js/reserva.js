// --- MOCK DATA para o Resumo ---
const MOCK_DATA = {
    service: { name: 'Corte Clássico Elite', duration: '45 min', price: 'R$ 45,00' },
    professional: { name: 'João' },
    date: '14/11/2025',
    time: '10:00'
};

// --- Funções de Atualização de UI ---

// 1. Alternar a seleção de Profissional
const proOptions = document.querySelectorAll('.pro-option');
proOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove 'active' de todos
        proOptions.forEach(o => {
            o.classList.remove('active');
            o.setAttribute('aria-checked', 'false');
        });
        
        // Adiciona 'active' ao clicado
        this.classList.add('active');
        this.setAttribute('aria-checked', 'true');
        
        // Atualiza o Resumo
        const proName = this.querySelector('.pro-name').textContent;
        document.getElementById('summary-pro').textContent = proName;
    });
});

// 2. Alternar a seleção de Horário
function selectTime(slot) {
    // Remove 'selected-slot' de todos os horários
    document.querySelectorAll('.time-slot').forEach(s => {
        s.classList.remove('selected-slot');
    });
    
    // Adiciona 'selected-slot' ao clicado
    slot.classList.add('selected-slot');
    
    // Atualiza o Resumo
    document.getElementById('summary-time').textContent = slot.textContent;
}

// 3. Simular a troca de serviço (botão 'Alterar')
function editService() {
    alert('Redirecionando para a Etapa 1: Seleção de Serviço (Catálogo).');
    // Implementação real: window.location.href = 'catalogo.html';
}

// 4. Lógica de Continuação
function continueBooking() {
    // Validações básicas antes de prosseguir
    const selectedPro = document.querySelector('.pro-option.active');
    const selectedTime = document.querySelector('.time-slot.selected-slot');
    const selectedDay = document.querySelector('.day-cell.selected');

    if (!selectedPro || !selectedTime || !selectedDay) {
        alert('Por favor, selecione um profissional, uma data e um horário.');
        return;
    }

    // Simulação de navegação (prossegue para Etapa 3: Confirmação)
    const btnText = document.querySelector('.mobile-sticky-cta-footer .btn-primary').textContent;
    const allBtns = document.querySelectorAll('.btn-primary');

    allBtns.forEach(btn => {
        btn.textContent = 'Aguarde...';
        btn.disabled = true;
    });

    setTimeout(() => {
        // Neste ponto, os dados seriam salvos na sessão ou no estado da aplicação.
        alert('Reserva simulada com sucesso! Prosseguindo para a Confirmação.');
        
        // Implementação real: window.location.href = 'pagina-confirmacao-reserva.html';
        
        allBtns.forEach(btn => {
            btn.textContent = btnText;
            btn.disabled = false;
        });
        
        // Simular o reset para permitir novo clique no exemplo
        // Neste ambiente, apenas alertamos para evitar redirecionamento real.
    }, 1000);
}

// 5. Lógica de Voltar
function goBack() {
    alert('Redirecionando para a página anterior (Detalhe do Serviço).');
    // Implementação real: window.history.back();
}

// Inicializa a data do calendário e resumo
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona a classe 'selected' ao dia 9 (para o exemplo)
    const initialDay = document.getElementById('selected-day');
    if (initialDay) {
        initialDay.click();
        document.getElementById('summary-date').textContent = '09/11/2025';
    }
    
    // Simula a seleção inicial de horário
    const initialTime = document.querySelector('.time-slot.selected-slot');
    if(initialTime) {
        document.getElementById('summary-time').textContent = initialTime.textContent;
    }
});