document.addEventListener('DOMContentLoaded', () => {
    const serviceCardsContainer = document.querySelector('.service-cards-container');
    const serviceFormSection = document.getElementById('service-form-section');
    const newServiceBtn = document.getElementById('new-service-btn');
    const newServiceLink = document.getElementById('new-service-link');
    const cancelFormBtn = document.querySelector('.cancel-form-btn');
    const saveFormBtn = document.querySelector('.save-form-btn');
    const serviceForm = document.getElementById('service-details-form');

    // 1. Inicialmente, oculta a seção de formulário
    serviceFormSection.style.display = 'none';

    // --- Função Auxiliar: Limpar e Esconder Formulário ---
    const resetForm = () => {
        serviceForm.reset();
        serviceFormSection.querySelector('#form-title').textContent = 'Detalhes do Serviço';
        saveFormBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Serviço';
        serviceForm.dataset.editingId = '';
        serviceFormSection.style.display = 'none';
    };

    // --- Abrir Formulário no Modo 'Novo Serviço' ---
    const openNewServiceForm = () => {
        resetForm();
        serviceFormSection.style.display = 'block';
        serviceFormSection.scrollIntoView({ behavior: 'smooth' });
    };

    newServiceBtn.addEventListener('click', openNewServiceForm);
    newServiceLink.addEventListener('click', (e) => {
        e.preventDefault();
        openNewServiceForm();
    });

    // --- Cancelar Edição/Criação ---
    cancelFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetForm();
    });

    // --- Manipulação de Ações (Editar/Duplicar) nos Cards ---
    serviceCardsContainer.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        const duplicateBtn = e.target.closest('.duplicate-btn');

        if (editBtn) {
            const card = editBtn.closest('.service-card');
            const serviceId = card.dataset.serviceId;
            const serviceName = card.querySelector('.service-title').textContent;

            // Simulação de preenchimento (Em produção, viria de um FETCH API)
            resetForm();
            document.getElementById('service-name').value = serviceName;
            document.getElementById('duration').value = card.querySelector('p:nth-child(1)').textContent.replace(/[^\d]/g, '');
            document.getElementById('price').value = '50.00';

            // Atualiza o estado para Edição
            serviceFormSection.querySelector('#form-title').textContent = `Editar Serviço: ${serviceName}`;
            saveFormBtn.innerHTML = '<i class="fas fa-save"></i> Atualizar Serviço';
            serviceForm.dataset.editingId = serviceId;

            serviceFormSection.style.display = 'block';
            serviceFormSection.scrollIntoView({ behavior: 'smooth' });

        } else if (duplicateBtn) {
            const card = duplicateBtn.closest('.service-card');
            const serviceName = card.querySelector('.service-title').textContent;

            // Abre o formulário no modo Novo, pré-preenchido
            openNewServiceForm();
            document.getElementById('service-name').value = `Cópia de ${serviceName}`;
            // ... (copiar outros campos)
            alert(`Serviço "${serviceName}" duplicado. Edite os detalhes e salve.`);
        }
    });

    // --- Manipulação do Envio do Formulário ---
    serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const serviceId = serviceForm.dataset.editingId;
        const serviceName = document.getElementById('service-name').value;
        const action = serviceId ? 'atualizado' : 'criado';

        // Simulação de envio de dados
        console.log(`Enviando dados para a API... ID: ${serviceId || 'NOVO'}`);

        alert(`Sucesso! Serviço "${serviceName}" foi ${action} com sucesso.`);

        // Após o sucesso da API, reseta o formulário
        resetForm();
    });
});