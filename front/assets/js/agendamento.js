document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo (simulando a resposta da API)
    const mockServices = [
        { id: 1, nome: "Corte Clássico", preco: 45.00, duracao: 45, tipo: 'Corte', tags: ['corte', '45min'], descricao: "Corte masculino à máquina ou tesoura, com finalização e lavagem. Ideal para o dia a dia." },
        { id: 2, nome: "Barba Terapêutica", preco: 35.00, duracao: 30, tipo: 'Barba', tags: ['barba', '30min'], descricao: "Modelagem de barba com toalha quente, óleos essenciais e pós-barba. Relaxe e cuide-se." },
        { id: 3, nome: "Combo Completo", preco: 70.00, duracao: 90, tipo: 'Combo', tags: ['corte', 'barba', 'combo'], descricao: "Corte e barba combinados com tratamento especial e massagem facial. O serviço premium." },
        { id: 4, nome: "Hidratação Capilar", preco: 25.00, duracao: 30, tipo: 'Tratamento', tags: ['tratamento', '30min'], descricao: "Tratamento profundo para fios ressecados e quebradiços. Reestrutura a fibra capilar." },
        { id: 5, nome: "Design de Sobrancelha", preco: 20.00, duracao: 15, tipo: 'Estética', tags: ['estetica', '15min'], descricao: "Modelagem simples das sobrancelhas, realçando o olhar." },
        { id: 6, nome: "Corte Infantil", preco: 30.00, duracao: 45, tipo: 'Corte', tags: ['corte', '45min'], descricao: "Corte kids (até 10 anos) com atenção e paciência especial." }
    ];

    const servicesList = document.getElementById('services-list');
    const modal = document.getElementById('service-modal');
    // const modalDetails = document.getElementById('modal-details'); // Não é mais usado
    const closeModal = document.querySelector('.close-button');
    const btnModalAgendarFinal = document.getElementById('modal-agendar-final');


    // Função para renderizar um card de serviço
    function renderCard(service) {
        const card = document.createElement('div');
        card.className = 'service-card';
        
        // Uso de backticks (` `) e ${} para facilitar a injeção do HTML
        card.innerHTML = `
            <div class="image-placeholder">[Imagem do Serviço]</div>
            <div class="service-details">
                <div class="service-title">${service.nome}</div>
                <div class="service-price">R$ ${service.preco.toFixed(2)}</div>
                <div class="service-duration">${service.duracao} min</div>
            </div>
            <div class="card-actions">
                <button class="btn btn-outline" data-id="${service.id}" onclick="showServiceDetails(${service.id})">Detalhes</button>
                <button class="btn btn-dark btn-agendar" data-id="${service.id}" onclick="startAppointmentFlow(${service.id})">Agendar</button>
            </div>
        `;
        servicesList.appendChild(card);
    }

    // Função global para mostrar os detalhes no modal (REVISADA)
    window.showServiceDetails = function(id) {
        const service = mockServices.find(s => s.id === id);
        if (service) {
            // 1. Injeta dados nas áreas principais do novo modal
            document.getElementById('modal-nome-servico').textContent = service.nome;
            document.getElementById('modal-categoria').textContent = service.tipo || 'Geral'; 
            
            // Injeta dados nas tags de preço e duração
            document.getElementById('info-nome').textContent = service.nome;
            document.getElementById('info-preco').textContent = `R$ ${service.preco.toFixed(2)}`;
            document.getElementById('info-duracao').textContent = ` | ${service.duracao} min`;
            
            // Injeta a descrição
            document.getElementById('info-descricao').innerHTML = service.descricao;

            // 2. Associa o ID do serviço ao botão de agendar no novo ID
            btnModalAgendarFinal.setAttribute('data-service-id', id);

            // 3. Renderiza serviços relacionados (simulação)
            const relatedContainer = document.getElementById('related-services-container');
            relatedContainer.innerHTML = ''; // Limpa o container
            
            // Simula 4 serviços relacionados (excluindo o atual)
            const related = mockServices.filter(s => s.id !== id).slice(0, 4);

            related.forEach(s => {
                const card = document.createElement('div');
                card.className = 'card-related';
                card.innerHTML = `
                    <div class="image-placeholder thumbnail" style="height: 60px;">[Img]</div>
                    <div style="font-size: 0.9rem; font-weight: bold; margin-top: 5px;">${s.nome}</div>
                    <button class="btn btn-dark" style="width: 100%; padding: 5px;" onclick="showServiceDetails(${s.id})">Ver</button>
                `;
                relatedContainer.appendChild(card);
            });

            // 4. Exibe o Modal
            modal.classList.remove('hidden');
        }
    }

    // Função global para iniciar o fluxo de agendamento (Simulação de Reserva)
    window.startAppointmentFlow = function(id) {
        const service = mockServices.find(s => s.id === id);
        if (service) {
            alert(`Iniciando agendamento para: ${service.nome} (${service.duracao} min). Agora o cliente deve selecionar a data/hora.`);
            // PRÓXIMO PASSO: Redirecionar para a tela de Seleção de Data/Hora
            // window.location.href = `selecao-horario.html?serviceId=${id}`;
        }
    }

    // Eventos do Modal
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Evento de agendar dentro do modal (usa o novo ID)
    btnModalAgendarFinal.addEventListener('click', function() {
        const id = this.getAttribute('data-service-id');
        modal.classList.add('hidden');
        startAppointmentFlow(parseInt(id));
    });

    // Renderiza todos os serviços ao carregar a página
    mockServices.forEach(renderCard);

    // Lógica simples de filtro por tag (exemplo)
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            alert(`Filtro por tag '${this.textContent}' ativado. A lista deve ser atualizada.`);
            // Lógica de filtragem real seria implementada aqui.
        });
    });
});