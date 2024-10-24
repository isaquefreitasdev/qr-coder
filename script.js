const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");
const qrCodeInput = document.querySelector("#qr-form input");
const qrCodeIMG = document.querySelector("#qr-code img");

function generateQrCode() {
    const qrCodeInputValue = qrCodeInput.value;
    if (!qrCodeInputValue) {
        return;
    }
    qrCodeBtn.innerText = "Gerando Código em Instantes...";
    
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;
    
    fetch(qrCodeURL)
        .then(response => response.blob())
        .then(blob => {
            const blobURL = URL.createObjectURL(blob);
            
            qrCodeIMG.src = blobURL;
            qrCodeIMG.addEventListener("load", () => {
                container.classList.add("active");
                qrCodeBtn.innerText = "QR CODE GERADO!";

                const downloadLink = document.createElement("a");
                downloadLink.href = blobURL;
                downloadLink.download = "qrcode.png"; // Nome do arquivo que será baixado
                downloadLink.click();

                // Revogar a URL temporária após o download
                URL.revokeObjectURL(blobURL);
            });
        });
}

qrCodeBtn.addEventListener("click", () => {
    generateQrCode();
});

qrCodeInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        generateQrCode();
    }
});

// Mover keyup para o input
qrCodeInput.addEventListener("keyup", () => {
    if (!qrCodeInput.value) {
        container.classList.remove("active");
        qrCodeBtn.innerText = "Gerar QRCODE";
    }
});
