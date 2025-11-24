function initializeAdminReservas() {
    const selectAllCheckbox = document.getElementById('select-all');
    const rowCheckboxes = document.querySelectorAll('input[name="reserva-select"]');
    const bulkActionButtons = document.querySelectorAll('.bulk-actions button');
    const reservasBody = document.getElementById('reservas-body');

    // Função para verificar se há itens selecionados e habilitar/desabilitar botões
    function updateBulkActionsState() {
        const checkedCount = document.querySelectorAll('input[name="reserva-select"]:checked').length;
        
        bulkActionButtons.forEach(button => {
            if (checkedCount > 0) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        });
    }

    // 1. Seleção/Deseleção de Todos
    selectAllCheckbox.addEventListener('change', () => {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateBulkActionsState();
    });

    // 2. Seleção de Linhas Individuais
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Se algum não estiver checado, desmarca o "selecionar todos"
            if (!checkbox.checked) {
                selectAllCheckbox.checked = false;
            }
            // Se todos estiverem checados, marca o "selecionar todos"
            if (document.querySelectorAll('input[name="reserva-select"]:checked').length === rowCheckboxes.length) {
                selectAllCheckbox.checked = true;
            }
            updateBulkActionsState();
        });
    });

    // 3. Simulação de Ações em Massa
    document.getElementById('confirm-selected').addEventListener('click', () => {
        const selectedIds = Array.from(document.querySelectorAll('input[name="reserva-select"]:checked')).map(cb => cb.value);
        if (selectedIds.length > 0) {
            alert(`Confirmando reservas com IDs: ${selectedIds.join(', ')}`);
            // Lógica real: Envio de requisição à API
        }
    });

    document.getElementById('cancel-selected').addEventListener('click', () => {
        const selectedIds = Array.from(document.querySelectorAll('input[name="reserva-select"]:checked')).map(cb => cb.value);
        if (selectedIds.length > 0) {
            alert(`Cancelando reservas com IDs: ${selectedIds.join(', ')}`);
            // Lógica real: Envio de requisição à API
        }
    });

    document.getElementById('delete-selected').addEventListener('click', () => {
        const selectedIds = Array.from(document.querySelectorAll('input[name="reserva-select"]:checked')).map(cb => cb.value);
        if (selectedIds.length > 0 && confirm(`Tem certeza que deseja EXCLUIR ${selectedIds.length} reservas?`)) {
            alert(`Excluindo reservas com IDs: ${selectedIds.join(', ')}`);
            // Lógica real: Envio de requisição à API
        }
    });

    // 4. Simulação de Ações por Linha
    reservasBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const row = target.closest('tr');
            const id = row.getAttribute('data-id');

            if (target.classList.contains('view-details')) {
                alert(`Visualizando detalhes da reserva ID: ${id}`);
            } else if (target.classList.contains('action-cancel')) {
                if (confirm(`Confirma o cancelamento da reserva ID: ${id}?`)) {
                    alert(`Reserva ID: ${id} cancelada (simulação).`);
                    // Lógica real: atualizar status e recarregar a tabela.
                }
            } else if (target.classList.contains('action-confirm')) {
                alert(`Reserva ID: ${id} confirmada (simulação).`);
                 // Lógica real: atualizar status e recarregar a tabela.
            }
        }
    });

    // 5. Simulação de Filtros por Aba
    document.querySelectorAll('.status-tabs .tab-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.status-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const status = e.target.getAttribute('data-status');
            alert(`Filtrando por Status: ${status} (Simulação)`);
            // Lógica real: Requisitar dados da API com o filtro de status.
        });
    });

    // Inicializa o estado dos botões ao carregar
    updateBulkActionsState();
}

document.addEventListener('DOMContentLoaded', initializeAdminReservas);