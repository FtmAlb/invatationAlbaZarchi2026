/* =========================
شخصی سازی نام مهمان (توسط لینک)
========================= */
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('name');
const nameDisplay = document.getElementById('guest-name-display');

if (guestName) {
    nameDisplay.innerHTML = guestName.replace(/\+/g, ' ') + " عزیز";
} else {
    nameDisplay.innerHTML = "مهمان عزیز";
}

/* =========================
سیستم ورود و آغاز انیمیشن سینمایی
========================= */
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-envelope');
const music = document.getElementById('bgMusic');

let invitationOpened = false;

openBtn.addEventListener('click', () => {
    if (music) {
        music.play().catch(e => console.log("Audio play failed:", e));
    }
    
    welcomeScreen.classList.add('fade-out');
    mainContent.classList.remove('locked');
    document.body.style.overflowY = 'auto';

    mainContent.classList.add('start-anim');
    invitationOpened = true;
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 1200); 
});

/* =========================
ارسال به گوگل شیت
========================= */
async function sendMessage() {

    const scriptURL = "https://script.google.com/macros/s/AKfycbzHNrK2eUkvC9uf586pM-MrJH9RzIAYOJ6vkdjepWQ9o15l4XTJlGT-EhV82YRJPFde/exec";

    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get("name");

    if (guestName) {
        guestName = decodeURIComponent(guestName.replace(/\+/g, " "));
    } else {
        guestName = document.getElementById('guestNameInput').value.trim();
    }

    const message = document.getElementById('messageInput').value.trim();

    if (!guestName) {
        alert("لطفاً نام خود را وارد کنید.");
        return;
    }

    if (!message) {
        alert("لطفاً یک یادگاری بنویسید 🌸");
        return;
    }

    const buttons = document.querySelectorAll(".submit-btn");
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
    });

    try {
        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: guestName,
                message: message
            })
        });

        alert("یادگاری شما با عشق ثبت شد 💌");
        document.getElementById("messageInput").value = "";
        document.getElementById("guestNameInput").value = "";

    } catch (error) {
        console.error(error);
        alert("خطا در ارسال. دوباره تلاش کنید.");

        buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = "1";
        });
    }
}

/* =========================
سایر انیمیشن‌ها 
========================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});
document.querySelectorAll(".story-text, .photo-card, .event-box, .countdown, .action-section, .footer-content").forEach((el) => observer.observe(el));

/* تایپ رویایی */
const textElement = document.getElementById("typewriter-text");
const originalHTML = textElement.innerHTML; 
textElement.innerHTML = ""; 
textElement.classList.add("typing-cursor");
let isTyping = false;
function typeWriter(element, htmlString, speed = 40) {
    let i = 0; let isTag = false;
    function type() {
        if (i < htmlString.length) {
            let char = htmlString.charAt(i);
            if (char === '<') isTag = true;
            element.innerHTML += char;
            i++;
            if (isTag) { if (char === '>') isTag = false; type(); } 
            else { setTimeout(type, speed); }
        } else { element.classList.remove("typing-cursor"); }
    }
    type();
}
const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping && invitationOpened) {
            isTyping = true;
            setTimeout(() => { typeWriter(textElement, originalHTML, 45); }, 800);
        }
    });
});
typeObserver.observe(textElement);

/* شمارش معکوس */
const targetDate = new Date("2026-06-08T19:00:00");
function updateFlip(id, value) {
    const el = document.getElementById(id);
    const formatted = String(value).padStart(2, "0");
    if (el.textContent !== formatted) {
        el.classList.remove("flip");
        void el.offsetWidth;
        el.classList.add("flip");
        el.textContent = formatted;
    }
}
setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) return;
    updateFlip("days", Math.floor(diff / (1000 * 60 * 60 * 24)));
    updateFlip("hours", Math.floor((diff / (1000 * 60 * 60)) % 24));
    updateFlip("minutes", Math.floor((diff / (1000 * 60)) % 60));
    updateFlip("seconds", Math.floor((diff / 1000) % 60));
}, 1000);

/* ذرات ستاره */
function createSparkle() {
    if(!invitationOpened) return; 
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    const size = Math.random() * 5 + 3; 
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";
    sparkle.style.top = "-20px";
    sparkle.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(sparkle);
    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 150;
    sparkle.animate([
        { transform: "translate(0, 0)", opacity: 0 },
        { opacity: 0.8, offset: 0.2 }, { opacity: 0.8, offset: 0.8 },
        { transform: `translate(${drift}px, ${window.innerHeight + 100}px)`, opacity: 0 }
    ], { duration: duration, easing: "ease-in-out" });
    setTimeout(() => { sparkle.remove(); }, duration);
}
setInterval(createSparkle, 300);

/* پودر جادویی موس */
function addPixieDust(e) {
    if(!invitationOpened) return;
    const dust = document.createElement("div");
    dust.classList.add("pixie-dust");
    let x = e.pageX || (e.touches && e.touches[0].pageX);
    let y = e.pageY || (e.touches && e.touches[0].pageY);
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    const size = Math.random() * 4 + 2; 
    dust.style.width = size + "px"; dust.style.height = size + "px";
    dust.style.left = (x + offsetX) + "px"; dust.style.top = (y + offsetY) + "px";
    document.body.appendChild(dust);
    setTimeout(() => { dust.remove(); }, 800);
}
document.addEventListener("mousemove", addPixieDust);
document.addEventListener("touchmove", (e) => { if(Math.random() > 0.5) addPixieDust(e); });