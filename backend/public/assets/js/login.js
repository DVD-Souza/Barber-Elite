document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos do DOM
    const btnLoginView = document.getElementById('btn-login-view');
    const btnRegisterView = document.getElementById('btn-register-view');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const pageTitle = document.querySelector('.auth-header h2');
    const pageSubtitle = document.querySelector('.auth-header p');

    // --- Lógica de Alternância de Telas (UI) ---

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

    // --- Lógica de Integração com Backend ---

    // 1. LOGIN
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btnSubmit = formLogin.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerText;

        try {
            // Feedback visual de carregamento
            btnSubmit.innerText = "Autenticando...";
            btnSubmit.disabled = true;

            // CORREÇÃO: Removido o prefixo '/api' duplicado
            // A rota correta agora é "/auth/login" pois o api.js adiciona "/api"
            const data = await apiPost("/auth/login", { email, password });

            // Sucesso: Salva o token
            localStorage.setItem("token", data.token);
            
            // (Opcional) Salvar dados do usuário se o backend retornar
            // localStorage.setItem("user", JSON.stringify(data.user));

            // Redireciona para o painel principal
            window.location.href = "index.html"; 

        } catch (error) {
            console.error("Erro no login:", error);
            alert(error.message || "Falha ao fazer login. Verifique suas credenciais.");
        } finally {
            // Restaura o botão
            btnSubmit.innerText = originalText;
            btnSubmit.disabled = false;
        }
    });

    // 2. CADASTRO (REGISTRO)
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        // const phone = document.getElementById('reg-phone').value; // Backend atual não espera 'phone'
        const password = document.getElementById('reg-pass').value;
        const confirm = document.getElementById('reg-confirm').value;
        const btnSubmit = formRegister.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerText;

        // Validação Básica no Frontend
        if (password.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (password !== confirm) {
            alert("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        try {
            // Feedback visual
            btnSubmit.innerText = "Criando conta...";
            btnSubmit.disabled = true;

            // CORREÇÃO: Removido o prefixo '/api' duplicado
            // A rota correta agora é "/auth/register"
            await apiPost("/auth/register", { name, email, password });

            alert("Cadastro realizado com sucesso! Faça login para continuar.");
            
            // Limpa o formulário
            formRegister.reset();

            // Volta para a aba de login automaticamente
            btnLoginView.click();

        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert(error.message || "Erro ao criar conta. Tente novamente.");
        } finally {
            // Restaura o botão
            btnSubmit.innerText = originalText;
            btnSubmit.disabled = false;
        }
    });
});