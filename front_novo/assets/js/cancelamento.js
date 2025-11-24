// Data da reserva simulada (para lógica de alerta de 2 horas)
const RESERVATION_TIME = new Date('2025-11-25T10:00:00'); // 25/Nov, 10:00

function initializeCancellationPage() {
    const otherReasonRadio = document.getElementById('other-reason-radio');
    const otherReasonInput = document.getElementById('other-reason-input');
    const otherReasonText = document.getElementById('other_reason_text');
    const acceptTermsCheckbox = document.getElementById('accept-terms');
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
    const cancelForm = document.getElementById('cancel-form');

    // 1. Lógica do campo "Outro Motivo"
    document.querySelectorAll('input[name="cancel_reason"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (otherReasonRadio.checked) {
                otherReasonInput.style.display = 'block';
                otherReasonText.setAttribute('required', 'required');
            } else {
                otherReasonInput.style.display = 'none';
                otherReasonText.removeAttribute('required');
            }
        });
    });

    // 2. Lógica de Habilitação do Botão (Aceite dos Termos)
    function checkFormValidity() {
        const isReasonSelected = document.querySelector('input[name="cancel_reason"]:checked');
        const isTermsAccepted = acceptTermsCheckbox.checked;

        if (isReasonSelected && isTermsAccepted) {
            confirmCancelBtn.removeAttribute('disabled');
        } else {
            confirmCancelBtn.setAttribute('disabled', 'disabled');
        }
    }

    // Inicializa o botão como desabilitado e anexa listeners
    confirmCancelBtn.setAttribute('disabled', 'disabled');
    document.querySelectorAll('input[name="cancel_reason"]').forEach(radio => radio.addEventListener('change', checkFormValidity));
    acceptTermsCheckbox.addEventListener('change', checkFormValidity);

    // 3. Simulação da Política de 2 Horas
    function checkCancellationPolicy() {
        const now = new Date();
        const diffInMs = RESERVATION_TIME.getTime() - now.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60); // Convertendo milissegundos para horas
        const fineWarningBlock = document.querySelector('.fine-warning');

        // Regra: Não permitir cancelamento se a diferença for menor que 2 horas
        if (diffInHours < 2 && diffInHours > 0) {
            fineWarningBlock.style.display = 'flex';
            // Em um sistema real, aqui você bloquearia o cancelamento ou forçaria o contato com o suporte.
            // Por enquanto, apenas exibimos o alerta.
        } else {
            fineWarningBlock.style.display = 'none';
        }
    }
    checkCancellationPolicy();


    // 4. Lógica de Submissão
    cancelForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (confirmCancelBtn.hasAttribute('disabled')) {
            alert("Por favor, selecione um motivo e aceite a política de cancelamento.");
            return;
        }

        const reason = document.querySelector('input[name="cancel_reason"]:checked').value;
        const finalReason = reason === 'outro_motivo' ? otherReasonText.value : reason;
        const comments = document.getElementById('comments').value;

        alert(`Confirmação de Cancelamento Enviada!\nReserva: #BR2024-0156\nMotivo: ${finalReason}\nComentários: ${comments}`);

        // Implementação real: Enviar dados via API, mostrar tela de sucesso e redirecionar para 'Minhas Reservas'.
        // window.location.href = 'minhas-reservas.html'; 
    });
}

// Funções de Ações Alternativas
function reagendar() {
    alert("Redirecionando para a tela de Reagendamento...");
    // window.location.href = 'pagina-de-reserva.html?reagendar=true&id=0156';
}

function falarComSuporte() {
    alert("Iniciando chat ou exibindo informações de contato do suporte...");
}


// Inicia o script
document.addEventListener('DOMContentLoaded', initializeCancellationPage);