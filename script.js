const b = document.getElementById("generate-btn").addEventListener("click", function() {
    document.getElementById("btn").style.opacity = "1";   
    const existingCanvas = document.querySelectorAll(".qr-canvas");
    existingCanvas.forEach(element => {
        element.remove();
    });
    const canvas = createFlipCard();
    canvas.classList.add("qr-canvas");
    generateQRCode(canvas);
});

function generateQRCode(canvas) {
    const text = document.getElementById('qr-text').value;
    const frontColor = document.getElementById('c1').value;
    const backgroundColor = document.getElementById('c2').value;

    if (!text) {
        alert('Please enter some text to generate QR Code.');
        return;
    }

    const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        type: 'svg',
        data: text,
        image: '2.png',
        imageOptions: {
            margin: 10,
            imageSize: 1
        },
        dotsOptions: {
            color: frontColor,
            type: 'rounded'
        },
        backgroundOptions: {
            color: backgroundColor
        }
    });

    qrCode.append(canvas);
    document.getElementById("btn").addEventListener("click", function() {
        qrCode.download({ name: "qr", extension: "svg" });
    });
    if (canvas.children.length > 0) {
        console.log('QR code generated successfully.');
    } else {
        console.error('Failed to generate QR code.');
    }
}

function createFlipCard() {
    const frontColor = document.getElementById('c1').value;
    const backgroundColor = document.getElementById('c2').value;
    const flipCard = document.createElement("div");
    flipCard.className = "flip-card qr-canvas";

    const flipCardInner = document.createElement("div");
    flipCardInner.className = "flip-card-inner qr-canvas";

    const flipCardBack = document.createElement("div");
    flipCardBack.className = "flip-card-back qr-canvas";

    const canvas = document.createElement("div"); 
    canvas.id = "canvas";
    canvas.width = 200;
    canvas.height = 200;

    flipCardBack.appendChild(canvas);

    const flipCardFront = document.createElement("div");
    flipCardFront.className = "flip-card-front qr-canvas";
    const p = document.createElement("p");
    p.textContent = "Tap to see result!";
    flipCardFront.appendChild(p);
    flipCardFront.style.background = `linear-gradient(120deg, ${frontColor}, ${backgroundColor})`;
    flipCardInner.appendChild(flipCardBack);
    flipCardInner.appendChild(flipCardFront);

    flipCard.appendChild(flipCardInner);

    const button = document.createElement("button");
    button.id = "btn";
    button.textContent = "Download";
    document.getElementById("c").appendChild(button);
    document.getElementById("c").appendChild(flipCard);

    flipCardFront.addEventListener("click", function() {
        flip(); 
    });

    return canvas;
}

const flip = () => {
    var x = document.querySelectorAll(".flip-card .flip-card-inner");
    x.forEach(y => {
        y.style.transform = "rotateY(180deg)";
    });
};



