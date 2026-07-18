const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
const bgMusic = document.getElementById('bgMusic');
const audioToggle = document.getElementById('audioToggle');

let assets = { leaves: [], upwardHearts: [], fireworks: [] };
let isMuted = true;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const config = {
    leafCount: 15,
    heartCount: 8,
    colors: ['#ffb6c1', '#ffc0cb', '#e8c4ec', '#fbc8d4']
};

class AutumnLeaf {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 12 + 8;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 2 - 1;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.angle += this.spin;
        if (this.y > canvas.height + 20) this.reset();
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = 'rgba(254, 180, 196, 0.6)';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size/2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

class UpwardHeart {
    constructor() { this.reset(); this.y = canvas.height + Math.random() * 100; }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.wobble = Math.random() * 1 - 0.5;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.count = 0;
    }
    update() {
        this.y -= this.speedY;
        this.count += this.wobbleSpeed;
        this.x += Math.sin(this.count) * 0.5;
        if (this.y < -20) this.reset();
    }
    draw() {
        ctx.save();
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = 'rgba(255, 105, 180, 0.4)';
        ctx.fillText('❤️', this.x, this.y);
        ctx.restore();
    }
}

for(let i=0; i<config.leafCount; i++) assets.leaves.push(new AutumnLeaf());
for(let i=0; i<config.heartCount; i++) assets.upwardHearts.push(new UpwardHeart());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    assets.leaves.forEach(l => { l.update(); l.draw(); });
    assets.upwardHearts.forEach(h => { h.update(); h.draw(); });
    if (assets.fireworks.length > 0) {
        assets.fireworks.forEach((f, idx) => {
            f.update(); f.draw();
            if (f.alpha <= 0) assets.fireworks.splice(idx, 1);
        });
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        const trail = document.createElement('div');
        trail.className = 'heart-trail';
        trail.innerHTML = '❤️';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 800);
    }
});

audioToggle.addEventListener('click', () => {
    if (isMuted) {
        bgMusic.play().catch(err => console.log("Blocked"));
        document.getElementById('icon-audio').style.display = 'block';
        document.getElementById('icon-mute').style.display = 'none';
    } else {
        bgMusic.pause();
        document.getElementById('icon-audio').style.display = 'none';
        document.getElementById('icon-mute').style.display = 'block';
    }
    isMuted = !isMuted;
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        let ripples = document.createElement('span');
        ripples.className = 'ripple';
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);
        setTimeout(() => ripples.remove(), 600);
    });
});

document.getElementById('scene1').classList.add('active');
setTimeout(() => {
    document.getElementById('scene1').classList.remove('active');
    setTimeout(() => { document.getElementById('scene2').classList.add('active'); startInactivityTimer(); }, 1500);
}, 3000);

const btnNo = document.getElementById('btnNo');
const container = document.getElementById('btnContainer');

function moveNoButton() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;
    const randomX = Math.max(10, Math.random() * maxX) - containerRect.left;
    const randomY = Math.max(10, Math.random() * maxY) - containerRect.top;
    const randomRotate = Math.random() * 40 - 20;
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.transform = `rotate(${randomRotate}deg)`;
}
btnNo.addEventListener('mouseenter', moveNoButton);
btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });

let idleTimer;
const btnYes = document.getElementById('btnYes');
function startInactivityTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { btnYes.classList.add('pulse-invite'); }, 6000);
}
window.addEventListener('mousemove', () => { btnYes.classList.remove('pulse-invite'); startInactivityTimer(); });

btnYes.addEventListener('click', () => {
    clearTimeout(idleTimer);
    document.getElementById('scene2').classList.remove('active');
    setTimeout(() => {
        document.getElementById('scene3').classList.add('active');
        document.body.style.background = "linear-gradient(135deg, #fbc8d4, #e7bcf3, #9b86eb)";
    }, 1500);
});

document.getElementById('btnConfirm').addEventListener('click', () => {
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;
    if(!date || !time) { alert("Please pick a beautiful date and time for us! 💕"); return; }
    document.getElementById('scene3').classList.remove('active');
    setTimeout(() => {
        document.body.style.background = "linear-gradient(135deg, #231942, #5e548e, #9f86c0)";
        document.getElementById('scene4').classList.add('active');
        sendData(date, time);
    }, 1500);
});

// --- HÀM GỬI DỮ LIỆU QUA EMAIL (WEB3FORMS) ---
function sendData(date, time) {
    const WEB3FORMS_ACCESS_KEY = "d5e55c2b-ca4f-45d1-a3a7-a6bdd17267b5"; 

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "❤️ BẠN CÓ LỊCH HẸN HÒ MỚI TỪ WEBSITE! ❤️");
    formData.append("Ngày hẹn", date);
    formData.append("Giờ hẹn", time);
    formData.append("Thiết bị", window.innerWidth < 768 ? "Điện thoại" : "Máy tính");
    formData.append("Trình duyệt", navigator.userAgent);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            proceedToFinalScene();
        } else {
            throw new Error("Web3Forms error");
        }
    })
    .catch(error => {
        console.warn("Fallback LocalStorage:", error);
        localStorage.setItem('date_appointment', JSON.stringify({date, time}));
        proceedToFinalScene();
    });
}

function proceedToFinalScene() {
    setTimeout(() => {
        const s1 = document.getElementById('successTxt1');
        const s2 = document.getElementById('successTxt2');
        s1.style.opacity = '0';
        setTimeout(() => {
            s1.style.display = 'none';
            s2.style.display = 'block';
            setTimeout(() => { s2.style.opacity = '1'; }, 50);
            document.body.classList.add('shake');
            startFireworks();
            if(!isMuted) bgMusic.volume = 1.0;
            setTimeout(() => { document.body.classList.remove('shake'); }, 10000);
        }, 1000);
    }, 3000);
}

class FireworkParticle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 6 + 2;
        this.friction = 0.95; this.gravity = 0.1; this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
    }
    update() { this.speed *= this.friction; this.x += Math.cos(this.angle) * this.speed; this.y += Math.sin(this.angle) * this.speed + this.gravity; this.alpha -= this.decay; }
    draw() {
        ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = this.color; ctx.beginPath();
        if(Math.random() > 0.5) { ctx.font = `${this.radius * 4}px Arial`; ctx.fillText('❤️', this.x, this.y); } 
        else { ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
    }
}

let fireworkInterval;
function startFireworks() {
    fireworkInterval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.6);
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        for (let i = 0; i < 40; i++) { assets.fireworks.push(new FireworkParticle(x, y, color)); }
    }, 400);
    setTimeout(() => { clearInterval(fireworkInterval); }, 10000);
}
