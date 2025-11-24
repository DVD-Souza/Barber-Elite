document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dados Mockados (Simulando API) ---
    const servicesData = [
        {
            id: 1,
            title: "Corte Clássico Elite",
            category: "cabelo",
            duration: "45 min",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=400",
            description: "Corte tradicional com tesoura e máquina, acabamento na navalha e lavagem inclusa.",
            popular: true
        },
        {
            id: 2,
            title: "Barba Terapêutica",
            category: "barba",
            duration: "30 min",
            price: 35.00,
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d6d4e85?auto=format&fit=crop&q=80&w=400",
            description: "Modelagem de barba com toalha quente, esfoliação e hidratação com óleos essenciais.",
            popular: true
        },
        {
            id: 3,
            title: "Combo: Cabelo & Barba",
            category: "combo",
            duration: "60 min",
            price: 70.00,
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400",
            description: "A experiência completa. Corte de cabelo e barba terapia com desconto especial.",
            popular: false
        },
        {
            id: 4,
            title: "Acabamento & Pezinho",
            category: "cabelo",
            duration: "15 min",
            price: 20.00,
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=400",
            description: "Manutenção rápida do contorno do corte e da barba. Ideal para manter o visual.",
            popular: false
        },
        {
            id: 5,
            title: "Camuflagem de Grisalhos",
            category: "tratamento",
            duration: "40 min",
            price: 55.00,
            image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=400",
            description: "Pigmentação suave para reduzir o aspecto grisalho de forma natural e discreta.",
            popular: false
        },
        {
            id: 6,
            title: "Hidratação Profunda",
            category: "tratamento",
            duration: "20 min",
            price: 30.00,
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400",
            description: "Tratamento capilar intensivo para restaurar a saúde e o brilho dos fios.",
            popular: false
        }
    ];

    const servicesGrid = document.getElementById('servicesGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const quickTags = document.querySelectorAll('.tag');

    // --- 2. Função de Renderização ---
    function renderServices(services) {
        servicesGrid.innerHTML = ''; // Limpa o grid

        if (services.length === 0) {
            servicesGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                    <p>Nenhum serviço encontrado com esses filtros.</p>
                </div>
            `;
            return;
        }

        services.forEach(service => {
            const badgeHtml = service.popular ? `<span class="badge"><i class="fas fa-fire"></i> Popular</span>` : '';

            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${service.image}" alt="${service.title}" loading="lazy">
                    ${badgeHtml}
                </div>
                <div class="card-content">
                    <h3 class="service-title">${service.title}</h3>
                    <div class="service-meta">
                        <span><i class="far fa-clock"></i> ${service.duration}</span>
                        <span style="text-transform: capitalize;"><i class="fas fa-tag"></i> ${service.category}</span>
                    </div>
                    <p class="service-desc">${service.description}</p>
                    <div class="card-footer">
                        <div class="price">R$ ${service.price.toFixed(2)}</div>
                        <div class="actions">
                            <button class="btn btn-outline" onclick="alert('Detalhes de: ${service.title}')">Detalhes</button>
                            <button class="btn btn-primary" onclick="window.location.href='reserva.html?id=${service.id}'">Agendar</button>
                        </div>
                    </div>
                </div>
            `;
            servicesGrid.appendChild(card);
        });
    }

    // --- 3. Lógica de Filtros ---
    function filterData() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;

        // Lógica para filtrar por tags (se houver classe 'active')
        const activeTag = document.querySelector('.tag.active').dataset.tag;

        const filtered = servicesData.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);

            let matchesCategory = true;
            if (activeTag !== 'all' && activeTag !== 'popular' && activeTag !== 'fast') {
                matchesCategory = item.category === activeTag;
            } else if (categoryValue !== 'all') {
                matchesCategory = item.category === categoryValue;
            }

            let matchesTagSpecial = true;
            if (activeTag === 'popular') matchesTagSpecial = item.popular;
            if (activeTag === 'fast') matchesTagSpecial = parseInt(item.duration) <= 30;

            return matchesSearch && matchesCategory && matchesTagSpecial;
        });

        renderServices(filtered);
    }

    // --- 4. Event Listeners ---
    searchInput.addEventListener('input', filterData);

    categoryFilter.addEventListener('change', () => {
        // Reseta as tags visuais se usar o dropdown
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
        document.querySelector('.tag[data-tag="all"]').classList.add('active');
        filterData();
    });

    quickTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            // Visual Toggle
            quickTags.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');

            // Reseta o dropdown visualmente
            categoryFilter.value = 'all';

            filterData();
        });
    });

    // Inicialização
    renderServices(servicesData);
});