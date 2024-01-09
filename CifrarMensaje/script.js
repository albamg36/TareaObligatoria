function cifrarMensaje() {
    const inputElement = document.getElementById("inputText");
    const outputElement = document.getElementById("outputText");

    if (!inputElement.value) {
        alert("Por favor, introduce un mensaje.");
        return;
    }

    const mensajeOriginal = inputElement.value.toUpperCase();
    let mensajeCifrado = "";

    for (let i = 0; i < mensajeOriginal.length; i++) {
        let char = mensajeOriginal[i];

        if (char === " ") {
            mensajeCifrado += char;
        } else if (char === "Z") {
            mensajeCifrado += "A";
        } else if (/[A-Y]/.test(char)) {
            mensajeCifrado += String.fromCharCode(char.charCodeAt(0) + 1);
        } else if (/[0-8]/.test(char)) {
            mensajeCifrado += String.fromCharCode(char.charCodeAt(0) + 1);
        } else if (char === "9") {
            mensajeCifrado += "0";
        }
    }

    outputElement.textContent = mensajeCifrado;
    outputElement.parentElement.style.display = "block";
}
