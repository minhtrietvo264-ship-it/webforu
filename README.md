<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>The Day Of Us ❤️</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    
    <style>
        /* --- RESET & BASE STYLE --- */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }
        body, html {
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #fedac2, #fbc8d4, #e7bcf3);
            background-size: 400% 400%;
            transition: background 3s ease;
        }
        
        /* --- BACKGROUND EFFECTS --- */
        #canvas-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
        .bokeh {
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255,182,193,0.4) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            filter: blur(40px);
            z-index: 1;
            pointer-events: none;
            animation: floatBokeh 20s infinite alternate ease-in-out;
        }
        @keyframes floatBokeh {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(100px, 50px) scale(1.2); }
        }

        /* --- CONTROLS --- */
        .audio-control {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 100;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s;
        }
        .audio-control:active { transform: scale(0.9); }
        .audio-control svg { width: 24px; height: 24px; fill: #ff6584; }

        /* --- SCENE MANAGEMENT --- */
        .scene {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10;
            opacity: 0;
            transform: scale(0.95) blur(10px);
            pointer-events: none;
            transition: opacity 1.5s ease, transform 1.5s ease, filter 1.5s ease;
            padding: 20px;
            text-align: center;
        }
        .scene.active {
            opacity: 1;
            transform: scale(1) blur(0px);
            pointer-events: auto;
        }

        /* --- GLASSMORPHISM CARD --- */
        .card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 24px;
            padding: 40px 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
            max-width: 450px;
            width: 100%;
            animation: cardHeartbeat 4s infinite ease-in-out;
        }
        @keyframes cardHeartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.01); }
        }

        /* --- TYPOGRAPHY & BUTTONS --- */
        .cinematic-txt {
            font-size: 3.5rem;
            font-weight: 600;
            letter-spacing: 4px;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,105,180,0.4);
        }
        .question-txt {
            font-size: 1.6rem;
            font-weight: 600;
            color: #4a4a4a;
            margin-bottom: 35px;
            line-height: 1.5;
        }
        .handwriting {
            font-family: 'Great Vibes', cursive;
            font-size: 4.5rem;
            color: #ff477e;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
        
        .btn-container {
            position: relative;
            display: flex;
            justify-content: center;
            gap: 20px;
            width: 100%;
            height: 60px;
        }
        .btn {
            padding: 12px 35px;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            outline: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.05);
            transition: transform 0.2s, box-shadow 0.3s;
        }
        .btn-yes {
            background: linear-gradient(45deg, #ff6584, #ff8eaa);
            color: white;
        }
        .btn-yes:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(255, 101, 132, 0.4);
        }
        @keyframes gentlePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); box-shadow: 0 12px 30px rgba(255, 101, 132, 0.6); }
        }
        .btn-yes.pulse-invite {
            animation: gentlePulse 1.5s infinite ease-in-out;
        }
        .btn-no {
            background: #ffffff;
            color: #6c757d;
            position: absolute;
            transition: transform 0.1s ease-out;
            will-change: transform, top, left;
        }

        /* --- FORMS --- */
        .picker-group {
            margin-bottom: 25px;
            text-align: left;
        }
        label {
            display: block;
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 8px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        input[type="date"], input[type="time"] {
            width: 100%;
            padding: 12px 15px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.5);
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            color: #333;
            outline: none;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            transition: border 0.3s;
        }
        input:focus { border-color: #ff6584; }

        /* --- FOOTER --- */
        footer {
            position: fixed;
            bottom: 15px;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.7);
            z-index: 10;
            letter-spacing: 1px;
        }

        /* --- MOUSE TRAIL & PARTICLES --- */
        .heart-trail {
            position: fixed;
            pointer-events: none;
            color: #ff6584;
            font-size: 12px;
            z-index: 9999;
            animation: fadeUp 0.8s forwards linear;
        }
        @keyframes fadeUp {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -120%) scale(0.5); }
        }

        /* --- CAMERA SHAKE --- */
        .shake {
            animation: cameraShake 0.5s infinite;
        }
        @keyframes cameraShake {
            0%, 100% { transform: translate(0, 0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -1px); }
            60% { transform: translate(-1px, -2px); }
            80% { transform: translate(2px, 2px); }
        }
    </style>
</head>
<body>

    <canvas id="canvas-bg"></canvas>
    <div class="bokeh" style="top: 10%; left: 10%;"></div>
    <div class="bokeh" style="bottom: 15%; right: 10%; animation-delay: -5s;"></div>

    <!-- Audio Mute/Unmute -->
    <div class="audio-control" id="audioToggle">
        <svg id="icon-mute" viewBox="0 0 24 24" style="display:none;"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM4.34 2.93L2.93 4.34 7.29 8.7H3v6.6h4.4l5.6 5.6v-8.15l4.73 4.73c-.68.43-1.43.75-2.23.93v2.02c1.34-.27 2.57-.92 3.59-1.83l2.22 2.22 1.41-1.41L4.34 2.93zM13 5.4L10.86 7.54 13 9.68V5.4zm4.5 6.6c0 .88-.18 1.71-.49 2.48l1.46 1.46c.65-1.19 1.03-2.54 1.03-3.94 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z"/></svg>
        <svg id="icon-audio" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
    </div>
    
    <!-- Nhạc nền định dạng MP3 (Thay link nhạc của bạn tại đây nếu muốn) -->
    <audio id="bgMusic" loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto"></audio>

    <!-- SCENE 1: THE DAY OF US -->
    <div class="scene" id="scene1">
        <h1 class="cinematic-txt">THE DAY OF US</h1>
    </div>

    <!-- SCENE 2: THE QUESTION -->
    <div class="scene" id="scene2">
        <div class="card">
            <h2 class="question-txt">CAN YOU SPEND A LITTLE TIME GOING ON A DATE WITH ME?</h2>
            <div class="btn-container" id="btnContainer">
                <button class="btn btn-yes" id="btnYes">❤️ YES</button>
                <button class="btn btn-no" id="btnNo">💔 NO</button>
            </div>
        </div>
    </div>

    <!-- SCENE 3: DATE TIME PICKER -->
    <div class="scene" id="scene3">
        <div class="card">
            <h2 class="question-txt" style="margin-bottom:25px;">Choose our date 💕</h2>
            <div class="picker-group">
                <label>Select Date</label>
                <input type="date" id="dateInput">
            </div>
            <div class="picker-group">
                <label>Select Time</label>
                <input type="time" id="timeInput">
            </div>
            <button class="btn btn-yes" id="btnConfirm" style="width:100%; margin-top:10px;">💖 Confirm</button>
        </div>
    </div>

    <!-- SCENE 4 & 5: WAITING & SUCCESS -->
    <div class="scene" id="scene4">
        <h1 class="cinematic-txt" id="successTxt1" style="font-size:2.5rem; transition: opacity 1s;">LOOKING FORWARD TO THIS MEETING ❤️</h1>
        <h1 class="handwriting" id="successTxt2" style="display:none; opacity:0; transition: opacity 1s;">Have a good day, bae !!!</h1>
    </div>

    <footer>Made with ❤️ just for you.</footer>

    <!-- CSS RIPPLE EFFECT -->
    <style>
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        @keyframes rippleEffect {
            to { transform: scale(4); opacity: 0; }
        }
    </style>

    /* --- JAVASCRIPT LOGIC --- */
    <script>
        const canvas = document.getElementById('canvas-bg');
        const ctx = canvas.getContext('2d');
        const bgMusic = document.getElementById('bgMusic');
        const audioToggle = document.getElementById('audioToggle');
        
        let assets = { leaves: [], upwardHearts: [], fireworks: [] };
        let isMuted = true; // Ban đầu tắt tiếng để trình duyệt cho phép tự chạy hiệu ứng
        
        // Tự động điều chỉnh kích thước Canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Cấu hình lá rơi & hạt tim bốc lên
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

        // Khởi tạo các mảng hạt hiệu ứng nền
        for(let i=0; i<config.leafCount; i++) assets.leaves.push(new AutumnLeaf());
        for(let i=0; i<config.heartCount; i++) assets.upwardHearts.push(new UpwardHeart());

        // Vòng lặp vẽ đồ họa chính (60fps)
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            assets.leaves.forEach(l => { l.update(); l.draw(); });
            assets.upwardHearts.forEach(h => { h.update(); h.draw(); });
            
            // Xử lý Pháo hoa ở phân cảnh cuối
            if (assets.fireworks.length > 0) {
                assets.fireworks.forEach((f, idx) => {
                    f.update();
                    f.draw();
                    if (f.alpha <= 0) assets.fireworks.splice(idx, 1);
                });
            }
            
            requestAnimationFrame(animate);
        }
        animate();

        // --- MOUSE TRAIL EFFECT ---
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

        // --- AUDIO CONTROL ---
        audioToggle.addEventListener('click', () => {
            if (isMuted) {
                bgMusic.play().catch(err => console.log("Audio play blocked"));
                document.getElementById('icon-audio').style.display = 'block';
                document.getElementById('icon-mute').style.display = 'none';
            } else {
                bgMusic.pause();
                document.getElementById('icon-audio').style.display = 'none';
                document.getElementById('icon-mute').style.display = 'block';
            }
            isMuted = !isMuted;
        });

        // --- RIPPLE BUTTON EFFECT ---
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

        // --- SCENE 1 TIMING ---
        document.getElementById('scene1').classList.add('active');
        setTimeout(() => {
            document.getElementById('scene1').classList.remove('active');
            setTimeout(() => {
                document.getElementById('scene2').classList.add('active');
                startInactivityTimer();
            }, 1500);
        }, 3000);

        // --- BUTTON NO (ESCAPE INTERACTION) ---
        const btnNo = document.getElementById('btnNo');
        const container = document.getElementById('btnContainer');

        function moveNoButton() {
            const containerRect = container.getBoundingClientRect();
            const btnRect = btnNo.getBoundingClientRect();

            // Tính toán khoảng chạy ngẫu nhiên an toàn trong vùng nhìn thấy của màn hình
            const maxX = window.innerWidth - btnRect.width - 20;
            const maxY = window.innerHeight - btnRect.height - 20;

            const randomX = Math.max(10, Math.random() * maxX) - containerRect.left;
            const randomY = Math.max(10, Math.random() * maxY) - containerRect.top;

            const randomRotate = Math.random() * 40 - 20; // Xoay nhẹ khi trốn

            btnNo.style.left = `${randomX}px`;
            btnNo.style.top = `${randomY}px`;
            btnNo.style.transform = `rotate(${randomRotate}deg)`;
        }

        btnNo.addEventListener('mouseenter', moveNoButton);
        btnNo.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        });

        // --- INACTIVITY TIMER (GENTLE PULSE) ---
        let idleTimer;
        const btnYes = document.getElementById('btnYes');
        function startInactivityTimer() {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                btnYes.classList.add('pulse-invite');
            }, 6000); // 6 giây không tương tác sẽ kích hoạt nhịp đập mời gọi
        }
        window.addEventListener('mousemove', () => {
            btnYes.classList.remove('pulse-invite');
            startInactivityTimer();
        });

        // --- TRANSITION SCENE 2 TO 3 ---
        btnYes.addEventListener('click', () => {
            clearTimeout(idleTimer);
            document.getElementById('scene2').classList.remove('active');
            setTimeout(() => {
                document.getElementById('scene3').classList.add('active');
                // Chuyển màu nền sang sắc tối lãng mạn hơn của buổi chiều muộn
                document.body.style.background = "linear-gradient(135deg, #fbc8d4, #e7bcf3, #9b86eb)";
            }, 1500);
        });

        // --- DATA SUBMISSION (SCENE 4) ---
        document.getElementById('btnConfirm').addEventListener('click', () => {
            const date = document.getElementById('dateInput').value;
            const time = document.getElementById('timeInput').value;

            if(!date || !time) {
                alert("Please pick a beautiful date and time for us! 💕");
                return;
            }

            document.getElementById('scene3').classList.remove('active');
            setTimeout(() => {
                document.getElementById('scene4').classList.add('active');
                document.body.style.background = "linear-gradient(135deg, #231942, #5e548e, #9f86c0)";
                sendData(date, time);
            }, 1500);
        });

        function sendData(date, time) {
            const payload = {
                date: date,
                time: time,
                browser: navigator.userAgent,
                device: window.innerWidth < 768 ? "Mobile" : "Desktop",
                submittedAt: new Date().toISOString()
            };

            // Gửi dữ liệu về API Backend của bạn qua phương thức POST (JSON)
            fetch('/api/date', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if(!res.ok) throw new Error("Backend unavailable");
                proceedToFinalScene();
            })
            .catch(err => {
                console.warn("Backend lỗi hoặc chưa cấu hình. Hệ thống tự động sao lưu dữ liệu tại LocalStorage máy khách:", payload);
                localStorage.setItem('saved_date_appointment', JSON.stringify(payload));
                proceedToFinalScene();
            });
        }

        // --- FINAL SCENE ANIMATIONS & FIREWORKS ---
        function proceedToFinalScene() {
            setTimeout(() => {
                const s1 = document.getElementById('successTxt1');
                const s2 = document.getElementById('successTxt2');
                s1.style.opacity = '0';
                
                setTimeout(() => {
                    s1.style.display = 'none';
                    s2.style.display = 'block';
                    setTimeout(() => { s2.style.opacity = '1'; }, 50);
                    
                    // Kích hoạt hiệu ứng máy quay rung động nhẹ cao trào
                    document.body.classList.add('shake');
                    startFireworks();
                    
                    // Đẩy cao trào nhạc nền nếu đang phát
                    if(!isMuted) bgMusic.volume = 1.0; 

                    setTimeout(() => {
                        document.body.classList.remove('shake');
                    }, 10000);
                }, 1000);
            }, 3000);
        }

        // --- FIREWORKS COMPONENT ---
        class FireworkParticle {
            constructor(x, y, color) {
                this.x = x; this.y = y; this.color = color;
                this.radius = Math.random() * 3 + 1;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 6 + 2;
                this.friction = 0.95;
                this.gravity = 0.1;
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.01;
            }
            update() {
                this.speed *= this.friction;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed + this.gravity;
                this.alpha -= this.decay;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                // thỉnh thoảng tạo hạt pháo hình trái tim
                if(Math.random() > 0.5) {
                    ctx.font = `${this.radius * 4}px Arial`;
                    ctx.fillText('❤️', this.x, this.y);
                } else {
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        let fireworkInterval;
        function startFireworks() {
            fireworkInterval = setInterval(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * (canvas.height * 0.6);
                const color = config.colors[Math.floor(Math.random() * config.colors.length)];
                
                for (let i = 0; i < 40; i++) {
                    assets.fireworks.push(new FireworkParticle(x, y, color));
                }
            }, 400);

            // Dừng tạo loạt pháo hoa mới sau 10 giây để giải phóng tài nguyên
            setTimeout(() => { clearInterval(fireworkInterval); }, 10000);
        }
    </script>
</body>
</html>
