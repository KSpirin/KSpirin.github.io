document.body.classList.add('booting');

const bootScreen = document.getElementById('boot-screen');
const bootCenter = document.getElementById('boot-center');
const bootLogsContainer = document.getElementById('boot-logs');

const bootLogs = [
    "Mounting file systems... [ OK ]",
    "Loading display drivers... [ OK ]",
    "Establishing secure connection... [ OK ]",
    "Booting Workspace...",
    "Welcome."
];
let logIndex = 0;

setTimeout(() => {
    bootCenter.style.display = 'none';
    bootLogsContainer.style.display = 'block';
    runBootSequence();
}, 700);

function runBootSequence() {
    if (logIndex < bootLogs.length) {
        const p = document.createElement('p');
        p.className = 'boot-log-line';
        p.textContent = bootLogs[logIndex];

        if (bootLogs[logIndex].includes('[ OK ]') || bootLogs[logIndex] === "Welcome.") {
            p.classList.add('success');
        }

        bootLogsContainer.appendChild(p);
        logIndex++;
        setTimeout(runBootSequence, Math.random() * 90 + 30);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            bootScreen.style.visibility = 'hidden';
            document.body.classList.remove('booting');
            typeWriter();
        }, 500);
    }
}

let totalSeconds = 0;
function updateUptime() {
    totalSeconds++;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    const pad = (num) => num.toString().padStart(2, '0');

    document.getElementById('uptime-counter').textContent =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
setInterval(updateUptime, 1000);

const footerText = document.getElementById('footer-text');
const finalHTML = footerText.getAttribute('data-html');
const rawText = footerText.innerText;
let isScrambled = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isScrambled) {
            isScrambled = true;
            runScrambleEffect();
        }
    });
});

observer.observe(footerText);

function runScrambleEffect() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    let iterations = 0;
    const interval = setInterval(() => {
        footerText.innerText = rawText
            .split("")
            .map((letter, index) => {
                if (index < iterations) return rawText[index];
                return letters[Math.floor(Math.random() * 43)];
            })
            .join("");

        if (iterations >= rawText.length) {
            clearInterval(interval);
            footerText.innerHTML = finalHTML;
        }
        iterations += 1 / 3;
    }, 15);
}


const typeText = "Hello, World!";
const typeSpeed = 100;
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < typeText.length) {
        document.getElementById("typewriter").innerHTML += typeText.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, typeSpeed);
    } else {
        document.getElementById("typewriter").innerHTML += '<span class="cursor">_</span>';
    }
}

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
        });
    });
});