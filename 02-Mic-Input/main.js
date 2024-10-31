/*
    
*/

const PI2 = Math.PI * 2;
var halfCanvas = {
    x: 0,
    y: 0,
}

class App {
    constructor(params = {}) {
        this.initCanvas();
        this.initRAF();

        this.initMicInteraction();

        this.updateCanvasSize();
    }


    initCanvas() {
        this.canvas = document.getElementById("lienzo");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;

        window.addEventListener("resize", this.updateCanvasSize.bind(this));
    }

    updateCanvasSize() {
        console.log('updateCanvasSize');

        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;

        halfCanvas.x = this.canvas.width / 2;
        halfCanvas.y = this.canvas.height / 2;

        this.attractorPoint = { x: halfCanvas.x, y: halfCanvas.y };

        if (this.render) {
            this.render.options.width = this.canvas.width;
            this.render.options.height = this.canvas.height;
        }
    }

    initMicInteraction() {
        const canvas = this.canvas;
        const ctx = this.ctx;

        // Check if the browser supports audio input
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const analyser = audioContext.createAnalyser();
                    analyser.fftSize = 256; // Size of the FFT. Higher values give more frequency bars.

                    const source = audioContext.createMediaStreamSource(stream);
                    source.connect(analyser);

                    const bufferLength = analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);

                    function draw() {
                        analyser.getByteFrequencyData(dataArray);

                        // Clear canvas
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Set bar properties
                        const barWidth = (canvas.width / bufferLength) * 2.5;
                        let barHeight;
                        let x = 0;

                        for (let i = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i];

                            // Set color for each bar
                            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
                            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                            // Move to the next bar position
                            x += barWidth + 1;
                        }

                        // Call draw again to animate
                        requestAnimationFrame(draw);
                    }

                    draw(); // Start the animation loop
                })
                .catch(error => {
                    console.error("Microphone access was denied or not available:", error);
                });
        } else {
            alert("getUserMedia not supported on your browser!");
        }
    }




    initRAF() {
        frame();
    }
}


function frame() {
    // console.log("custom animation frame interval");

    requestAnimationFrame(frame);
}





// Inicializar nuestro código
var myApp;

window.onload = function () {
    myApp = new App();
};