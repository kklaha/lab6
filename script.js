const basePrices = {
    basic: 1000,
    premium: 1500,
    vip: 2000
};
const optionPrice = 500;  
const propertyPrice = 1000; 

let quantityInput, resultDiv;
const serviceRadios = document.querySelectorAll('input[name="service"]');
const optionsContainer = document.getElementById("options-container");
const propertyContainer = document.getElementById("property-container");
const optionSelect = document.getElementById("option-select");
const extraPropertyCheckbox = document.getElementById("extra-property");
function calculate() {
    const quantity = Number(quantityInput.value) || 1;
    const selectedService = document.querySelector('input[name="service"]:checked').value;

    let total = basePrices[selectedService] * quantity;
    if (selectedService === "premium" && optionSelect.value === "option2") {
        total += optionPrice * quantity;
    }
    if (selectedService === "vip" && extraPropertyCheckbox.checked) {
        total += propertyPrice * quantity;
    }

    resultDiv.innerHTML = `Итого: <strong>${total.toLocaleString()} руб</strong>`;
}
function updateForm() {
    const selectedService = document.querySelector('input[name="service"]:checked').value;
    optionsContainer.classList.add("hidden");
    propertyContainer.classList.add("hidden");
    if (selectedService === "premium") {
        optionsContainer.classList.remove("hidden");
    } else if (selectedService === "vip") {
        propertyContainer.classList.remove("hidden");
    }
    calculate(); 
}
document.addEventListener("DOMContentLoaded", function () {
    quantityInput = document.getElementById("quantity");
    resultDiv = document.getElementById("result");
    quantityInput.addEventListener("input", calculate);

    serviceRadios.forEach(radio => {
        radio.addEventListener("change", updateForm);
    });

    optionSelect.addEventListener("change", calculate);
    extraPropertyCheckbox.addEventListener("change", calculate);
    updateForm();
});