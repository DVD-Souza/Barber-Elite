document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    function switchForm(targetForm) {
        // Remove 'active' de todos os botões e 'hidden' de todos os forms
        tabLogin.classList.remove('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('hidden');
        formRegister.classList.add('hidden');

        // Adiciona 'active' ao botão correto e remove 'hidden' do form correto
        if (targetForm === 'login') {
            tabLogin.classList.add('active');
            formLogin.classList.remove('hidden');
        } else if (targetForm === 'register') {
            tabRegister.classList.add('active');
            formRegister.classList.remove('hidden');
        }
    }

    // Event Listeners para os botões de aba
    tabLogin.addEventListener('click', () => switchForm('login'));
    tabRegister.addEventListener('click', () => switchForm('register'));

    // Adiciona validação simples de senha no Front-End
    document.getElementById('register-form').addEventListener('submit', function(event) {
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password.length < 8) {
            alert("A senha deve ter no mínimo 8 caracteres.");
            event.preventDefault(); // Impede o envio do formulário
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas digitadas não são iguais.");
            event.preventDefault(); // Impede o envio do formulário
            return;
        }
        
        // Se tudo estiver OK, o formulário seria enviado para a API (BackEnd) aqui.
        alert("Cadastro simulado com sucesso! Redirecionando para login.");
        event.preventDefault();
        switchForm('login'); // Redireciona para o login após cadastro simulado
    });

    // Login Form (Apenas simulação)
    document.getElementById('login-form').addEventListener('submit', function(event) {
        alert("Login simulado com sucesso! Redirecionando para o Agendamento...");
        event.preventDefault();
        window.location.href = 'agendamento.html';
    });
});