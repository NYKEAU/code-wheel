const slices = document.querySelector('input[name="slices"]');
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin');

let caseSelected = document.getElementById('number');
/*console.log(document.querySelector("#number").textContent);*/

var lastDeg = 0;
var lastResult = 0;
var colors = [];

slices.addEventListener("change", () => {
    colors = [];

    for (let i = 0; i < slices.value; i++) {
        colors[i] = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    }

    let calcPerc = parseFloat(100 / colors.length);
    let charColors = '';

    for (let i = 0; i < colors.length; i++) {
        charColors += ((i == 0) ? '' : ', ') + colors[i] + ' ' + i * calcPerc + '%' + ' ' + (i + 1) * calcPerc + '%';
    }

    console.log(colors);

    wheel.style.backgroundImage = "conic-gradient(" + charColors + ")";
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countUpdate(result) {
    caseSelected.innerHTML = result;
    startConfetti();
    caseSelected.style.opacity = 1;
    await sleep(1500);
    stopConfetti();
}

async function spinWheel() {
    caseSelected.innerHTML = ' ';
    spinBtn.disabled = true;

    var deg = Math.random() * (3600 - 360) + 360;
    var degPart = 360 / slices.value;

    var nbrTours = Math.floor(deg / 360);
    var result = (deg / degPart) - (slices.value * nbrTours);

    //Récupération résultat final
    result = slices.value - result;
    result = result + lastResult;

    if (result > slices.value)
        result -= slices.value;

    console.log(result);
    console.log(colors[Math.floor(result)]);

    lastResult = result;

    //Degrés + affichage résultat
    deg = deg + lastDeg;

    console.log(deg);
    wheel.style.transform = 'rotate(' + deg + 'deg)';

    total = Math.floor(deg / degPart);

    lastDeg = deg;

    caseSelected.style.opacity = 0;
    await sleep(2500);
    spinBtn.disabled = false;
    countUpdate(Math.floor(result + 1));
}