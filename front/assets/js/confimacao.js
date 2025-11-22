document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SIMULAÇÃO DE DADOS (Vindos da tela anterior) ---
    // Num app real, isso viria do localStorage ou State
    const reservationData = {
        serviceName: "Corte Clássico",
        duration: "45 min",
        price: 45.00,
        professional: "João", // Ou 'Qualquer'
        date: "25/11/2025",
        time: "14:30"
    };

    // Preenche o HTML com os dados
    document.getElementById('conf-service-name').textContent = reservationData.serviceName;
    document.getElementById('conf-duration').textContent = reservationData.duration;
    document.getElementById('conf-price').textContent = `R$ ${reservationData.price.toFixed(2)}`;
    
    document.getElementById('conf-pro-name').textContent = reservationData.professional;
    document.getElementById('conf-date-time').textContent = `${reservationData.date} às ${reservationData.time}`;

    // Atualiza Totais
    document.getElementById('conf-subtotal').textContent = `R$ ${reservationData.price.toFixed(2)}`;
    document.getElementById('conf-total').textContent = `R$ ${reservationData.price.toFixed(2)}`;

    // --- 2. LÓGICA DE PAGAMENTO (Visual) ---
    // O CSS já faz o trabalho visual (:has e input:checked).
    // Aqui poderiamos adicionar lógica extra se necessário.
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(opt => {
        opt.addEventListener('change', (e) => {
            console.log("Método de pagamento escolhido:", e.target.value);
            // Se fosse cartão, aqui poderia abrir o form de cartão.
        });
    });

    // --- 3. BOTÃO CONFIRMAR ---
    const btnConfirm = document.getElementById('btn-confirm-reservation');
    
    btnConfirm.addEventListener('click', () => {
        // Validação simples
        const terms = document.getElementById('terms').checked;
        if(!terms) {
            alert("Por favor, aceite os termos da reserva.");
            return;
        }

        // Feedback de carregamento
        btnConfirm.textContent = "Processando...";
        btnConfirm.disabled = true;

        setTimeout(() => {
            // SUCESSO!
            // Aqui seria a chamada real para a API salvar a reserva e disparar o e-mail [cite: 34, 43]
            
            alert(`Reserva Confirmada com Sucesso!\n\nEnviamos um e-mail de confirmação para andre@exemplo.com.\n\nServiço: ${reservationData.serviceName}\nHorário: ${reservationData.time}`);
            
            // Redireciona para "Meus Agendamentos" ou Home
            window.location.href = 'index.html'; 
        }, 1500);
    });

});