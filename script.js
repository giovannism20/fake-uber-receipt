function parseValue(value) {
    return parseFloat(value.replace(',', '.'));
}

function formatValue(value) {
    return value.toFixed(2).replace('.', ',');
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateReceipt() {
    // Gerar UUID aleatório para a corrida
    const tripUUID = generateUUID();

    // Obter valores do formulário
    const date = document.getElementById('date').value;
    const passengerName = document.getElementById('passengerName').value;
    const tripPeriod = document.getElementById('tripPeriod').value;
    const tripPrice = parseValue(document.getElementById('tripPrice').value);
    const fee = parseValue(document.getElementById('fee').value);
    const fixedCost = parseValue(document.getElementById('fixedCost').value);
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentDateTime = document.getElementById('paymentDateTime').value;
    const driverName = document.getElementById('driverName').value;
    const tripType = document.getElementById('tripType').value;
    const distance = document.getElementById('distance').value;
    const duration = document.getElementById('duration').value;
    const startTime = document.getElementById('startTime').value;
    const startAddress = document.getElementById('startAddress').value;
    const endTime = document.getElementById('endTime').value;
    const endAddress = document.getElementById('endAddress').value;

    // Calcular valores
    const subtotal = tripPrice + fee;
    const total = subtotal + fixedCost;

    // Definir mensagem do período
    let periodMessage = '';
    if (tripPeriod === 'manhã') {
        periodMessage = 'hoje de manhã';
    } else if (tripPeriod === 'tarde') {
        periodMessage = 'hoje à tarde';
    } else {
        periodMessage = 'hoje à noite';
    }

    // Atualizar recibo
    document.getElementById('displayDate').textContent = date;
    document.getElementById('displayTitle').textContent = `Obrigado por escolher a Uber, ${passengerName}`;
    document.getElementById('displaySubtitle').textContent = `Esperamos que você tenha gostado da viagem ${periodMessage}.`;
    document.getElementById('displayTotal').textContent = `R$ ${formatValue(total)}`;
    document.getElementById('displayTripPrice').textContent = `R$ ${formatValue(tripPrice)}`;
    document.getElementById('displayFee').textContent = `R$ ${formatValue(fee)}`;
    document.getElementById('displaySubtotal').textContent = `R$ ${formatValue(subtotal)}`;
    document.getElementById('displayFixedCost').textContent = `R$ ${formatValue(fixedCost)}`;

    // Atualizar ícone de pagamento
    const paymentIcon = document.getElementById('displayPaymentIcon');
    if (paymentMethod.toUpperCase() === 'PIX') {
        paymentIcon.innerHTML = '<img src="public/pix.png" alt="PIX">';
    } else {
        paymentIcon.textContent = paymentMethod;
    }

    document.getElementById('displayPaymentMethod').textContent = paymentMethod;
    document.getElementById('displayPaymentDateTime').textContent = paymentDateTime;
    document.getElementById('displayPaymentAmount').textContent = `R$ ${formatValue(total)}`;
    document.getElementById('displayDriverName').textContent = `Você viajou com ${driverName}`;
    document.getElementById('displayTripInfo').innerHTML = `<span>${tripType}</span> ${distance} Quilômetros | ${duration} <br> minutes`;
    document.getElementById('displayStartTime').textContent = `${startTime} |`;
    document.getElementById('displayStartAddress').textContent = startAddress;
    document.getElementById('displayEndTime').textContent = `${endTime} |`;
    document.getElementById('displayEndAddress').textContent = endAddress;

    // Atualizar o link com o UUID gerado
    const tripLink = document.querySelector('.link-section a');
    tripLink.href = `https://riders.uber.com/trips/${tripUUID}`;
}

// Gerar recibo ao carregar a página
window.onload = generateReceipt;
