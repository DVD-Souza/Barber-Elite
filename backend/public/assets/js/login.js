document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos do DOM
    const btnLoginView = document.getElementById('btn-login-view');
    const btnRegisterView = document.getElementById('btn-register-view');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const pageTitle = document.querySelector('.auth-header h2');
    const pageSubtitle = document.querySelector('.auth-header p');

    // Função para alternar para tela de LOGIN
    btnLoginView.addEventListener('click', () => {
        // Atualiza botões
        btnLoginView.classList.add('active');
        btnRegisterView.classList.remove('active');
        
        // Troca formulários
        formRegister.classList.add('hidden');
        formLogin.classList.remove('hidden');

        // Atualiza textos
        pageTitle.textContent = "Bem-vindo de volta";
        pageSubtitle.textContent = "Acesse sua conta para agendar.";
    });

    // Função para alternar para tela de CADASTRO
    btnRegisterView.addEventListener('click', () => {
        // Atualiza botões
        btnRegisterView.classList.add('active');
        btnLoginView.classList.remove('active');
        
        // Troca formulários
        formLogin.classList.add('hidden');
        formRegister.classList.remove('hidden');

        // Atualiza textos
        pageTitle.textContent = "Criar conta";
        pageSubtitle.textContent = "Preencha os dados abaixo, é rápido.";
    });

    // Simulação de Login
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        // Aqui entraria a lógica de backend
        alert(`Tentando login com: ${email}\n\nRedirecionando para o sistema...`);
        window.location.href = "agendamento.html"; // Exemplo de redirecionamento
    });

    // Simulação de Cadastro com Validação
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pass = document.getElementById('reg-pass').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (pass.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (pass !== confirm) {
            alert("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        // Volta para a aba de login automaticamente
        btnLoginView.click();
    });
});