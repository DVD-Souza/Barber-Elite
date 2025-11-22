document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. RECUPERA DADOS DO SERVIÇO (Simulação) ---
    // Num cenário real, leríamos de URL params ou LocalStorage
    const mockService = {
        name: "Corte Clássico",
        price: 45.00,
        duration: 45
    };

    // Preenche o resumo inicial
    document.getElementById('summary-service-name').textContent = mockService.name;
    document.getElementById('summary-service-price').textContent = `R$ ${mockService.price.toFixed(2)} • ${mockService.duration} min`;
    document.getElementById('final-service').textContent = mockService.name;
    document.getElementById('final-price').textContent = `R$ ${mockService.price.toFixed(2)}`;

    // --- 2. LÓGICA DE CALENDÁRIO ---
    const calendarDays = document.getElementById('calendar-days');
    const monthDisplay = document.getElementById('current-month-display');
    const selectedDateText = document.getElementById('selected-date-text');
    
    let currentDate = new Date();
    let selectedDay = null;

    function renderCalendar(date) {
        calendarDays.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();

        // Nome do mês
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        monthDisplay.textContent = `${monthNames[month]} ${year}`;

        // Primeiro dia do mês e total de dias
        const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Domingo
        const lastDay = new Date(year, month + 1, 0).getDate();

        // Dias em branco antes do dia 1
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }

        // Preencher dias
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = i;

            // Verifica se é hoje
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }

            // Simula dias indisponíveis (ex: domingos ou passado)
            if (i < today.getDate() && month === today.getMonth()) {
                dayDiv.classList.add('disabled');
            } else {
                // Evento de clique
                dayDiv.addEventListener('click', () => selectDate(dayDiv, i, month, year));
            }

            calendarDays.appendChild(dayDiv);
        }
    }

    function selectDate(element, day, month, year) {
        // Remove seleção anterior
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        
        // Adiciona nova seleção
        element.classList.add('selected');
        selectedDay = `${day}/${month + 1}/${year}`;
        
        // Atualiza textos
        selectedDateText.textContent = selectedDay;
        updateFinalSummary();
        
        // Reseta horário selecionado ao mudar o dia
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('selected'));
        selectedTime = null;
        checkContinueButton();
    }

    renderCalendar(currentDate);

    // --- 3. SELEÇÃO DE PROFISSIONAL ---
    window.selectProfessional = function(card, name) {
        document.querySelectorAll('.pro-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        document.getElementById('final-pro').textContent = name;
    };

    // --- 4. SELEÇÃO DE HORÁRIO ---
    let selectedTime = null;

    window.selectTime = function(btn) {
        if (btn.classList.contains('disabled')) return;

        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedTime = btn.textContent;
        
        updateFinalSummary();
        checkContinueButton();
    };

    // --- 5. ATUALIZAÇÕES E FINALIZAÇÃO ---
    function updateFinalSummary() {
        const datetimeSpan = document.getElementById('final-datetime');
        if (selectedDay && selectedTime) {
            datetimeSpan.textContent = `${selectedDay} às ${selectedTime}`;
            datetimeSpan.style.color = "var(--primary-color)";
            datetimeSpan.style.fontWeight = "bold";
        } else if (selectedDay) {
            datetimeSpan.textContent = `${selectedDay} - Selecione a hora`;
        } else {
            datetimeSpan.textContent = "Selecione dia e hora";
        }
    }

    function checkContinueButton() {
        const btn = document.getElementById('btn-continue');
        if (selectedDay && selectedTime) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    }

    window.goToConfirmation = function() {
        // Aqui você salvaria os dados no localStorage e iria para a tela 3
        alert(`Reserva simulada!\nServiço: ${mockService.name}\nDia: ${selectedDay}\nHora: ${selectedTime}\nProfissional: ${document.getElementById('final-pro').textContent}`);
        // window.location.href = 'confirmacao.html';
    };
});