// Função para trocar a imagem principal ao clicar nas miniaturas
function changeImage(thumbnail, imageUrl) {
    // Atualiza a imagem principal com fade effect
    const mainImage = document.getElementById('mainImage');
    mainImage.style.opacity = '0.5';

    setTimeout(() => {
        mainImage.src = imageUrl;
        mainImage.style.opacity = '1';
    }, 200);

    // Atualiza classe ativa nos botões
    document.querySelectorAll('.thumb-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Função para alternar favorito
function toggleFavorite(btn) {
    const icon = btn.querySelector('i');

    if (icon.classList.contains('far')) { // Está vazio
        icon.classList.remove('far');
        icon.classList.add('fas'); // Fica preenchido
        icon.style.color = '#e94560';
        // Animação simples
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '#e94560';
    }
}

// Função de Agendamento
function startBooking() {
    // Simulação de feedback visual
    const btns = document.querySelectorAll('.btn-primary');
    btns.forEach(btn => {
        const originalText = btn.innerText;
        btn.innerText = 'Redirecionando...';
        btn.style.backgroundColor = '#28a745'; // Verde sucesso

        setTimeout(() => {
            // Aqui você redirecionaria para a página de agendamento (ex: checkout ou seleção de horário)
            alert('Redirecionando para a seleção de horários...');
            // window.location.href = 'reserva.html?service=corte-classico';
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
        }, 800);
    });
}

// Inicialização (Opcional: Pode carregar dados dinâmicos aqui se necessário)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de detalhes carregada com sucesso.');
});