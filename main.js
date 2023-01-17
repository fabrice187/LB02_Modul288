const currencies = {
    USD: "United States Dollar",
    EUR: "Euro",
    GBP: "British Pound"
};

// Umrechnungsraten als JSON file mit API
let rates;
fetch("https://api.exchangerate-api.com/v4/latest/CHF")
    .then(response => response.json())
    .then(data => {
        rates = data.rates;
        // Anzeigen der "from" und "to" Auswahloptionen in der Dropdownliste
        let options = "";
        for (const rate in rates) {
            options += `<option value="${rate}">${rate}</option>`;
        }
        document.getElementById("from").innerHTML = options;
        document.getElementById("to").innerHTML = options;
    });
// Funktion zum Währungen tauschen
function switchCurrencies() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    document.getElementById("from").value = to;
    document.getElementById("to").value = from;
}
// Funktion, des Umrechnens
function convert() {
    // Währungen auswählen Funktion
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    // Amount(Betrag) ausgeben
    let amount = document.getElementById("amount").value;
    // Betrag umrechnen
    let result = (amount * rates[to] / rates[from]);
    result = roundResult(result)
    // Resultat anzeigen
    document.getElementById("result").value = result;

}
// Funktion zum Resultat auf zwei Dezimalstellen runden
function roundResult(result) {
    return result.toFixed(2);
}
// Mit diesem Code erzeuge ich eine Funktion, die es nur erlaubt, Zahlen und einen Punkt in das Amountfeld zu schreiben.
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}