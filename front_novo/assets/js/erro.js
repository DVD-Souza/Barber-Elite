document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidade do botão Voltar
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Usa o histórico do navegador para voltar para a página anterior
            window.history.back();
        });
    }

    // 2. Funcionalidade do botão Recarregar
    const reloadButton = document.getElementById('reload-button');
    if (reloadButton) {
        reloadButton.addEventListener('click', () => {
            // Recarrega a página atual
            window.location.reload();
        });
    }
    
    // 3. Atualizar o ano no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // 4. Exemplo de lógica para carregar diferentes tipos de erro
    // (Em um ambiente real, o backend ou o router definiria isso)
    const urlParams = new URLSearchParams(window.location.search);
    const errorCode = urlParams.get('code') || '404'; // Pega o parâmetro 'code' da URL
    
    const errorTitle = document.getElementById('error-title');
    const errorMessage = document.getElementById('error-message');
    const errorCodeDisplay = document.getElementById('error-code');

    const errors = {
        '404': {
            title: 'Página Não Encontrada',
            message: 'Ops! Parece que o corte que você procurava não está no nosso menu, ou você digitou o endereço errado.',
        },
        '403': {
            title: 'Acesso Negado',
            message: 'Você não tem permissão (403 Forbidden) para acessar esta seção. Tente fazer login novamente ou contate o suporte.',
        },
        '500': {
            title: 'Erro Interno do Servidor',
            message: 'Desculpe, nosso barbeiro virtual tropeçou. Um erro inesperado ocorreu. Tente novamente mais tarde.',
        }
    };

    const currentError = errors[errorCode] || errors['404'];
    
    if (errorCodeDisplay) {
        errorCodeDisplay.textContent = errorCode;
    }
    if (errorTitle) {
        errorTitle.textContent = currentError.title;
    }
    if (errorMessage) {
        errorMessage.textContent = currentError.message;
    }
});