let keyTimes = [];
const writingPad = document.getElementById('writingPad');
const scoreDisplay = document.getElementById('score');
const statusDisplay = document.getElementById('analysisStatus');

writingPad.addEventListener('keydown', (e) => {
    // Record the timestamp of each keystroke
    keyTimes.push(Date.now());
    
    statusDisplay.innerText = "Analyzing Biometrics...";

    if (keyTimes.length > 10) {
        calculateIntegrity();
    }
});

function calculateIntegrity() {
    // A simple logic: if typing speed varies (human), score goes up.
    // Real forensic logic would be more complex, but this works for our demo.
    let score = Math.min(keyTimes.length / 5, 100); 
    
    scoreDisplay.innerText = Math.floor(score) + "%";
    
    if (score > 80) {
        scoreDisplay.style.color = "#00b894"; // Emerald Green
        statusDisplay.innerText = "High Human Probability";
    }
}
