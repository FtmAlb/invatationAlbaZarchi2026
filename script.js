


/* =========================
ظاهر شدن عناصر هنگام اسکرول
========================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(
".story-text,.photo-card,.event-box,.countdown,.location-section"
).forEach((el) => observer.observe(el));



/* =========================
شمارش معکوس
========================= */


const targetDate =
new Date("2026-06-08T19:00:00");

function updateFlip(id,value){

    const el =
    document.getElementById(id);

    const formatted =
    String(value).padStart(2,"0");

    if(el.textContent !== formatted){

        el.classList.remove("flip");

        void el.offsetWidth;

        el.classList.add("flip");

        el.textContent = formatted;
    }
}

setInterval(()=>{

    const now = new Date();

    const diff =
    targetDate - now;

    if(diff <= 0) return;

    const days =
    Math.floor(diff /
    (1000*60*60*24));

    const hours =
    Math.floor(
    (diff/(1000*60*60)) % 24);

    const minutes =
    Math.floor(
    (diff/(1000*60)) % 60);

    const seconds =
    Math.floor(
    (diff/1000) % 60);

    updateFlip("days",days);
    updateFlip("hours",hours);
    updateFlip("minutes",minutes);
    updateFlip("seconds",seconds);

},1000);


/* =========================
گلبرگ صورتی
========================= */

function createPetal() {

    const petal = document.createElement("div");

    petal.classList.add("petal");

    petal.innerHTML = "";

    petal.style.left =
        Math.random() * window.innerWidth + "px";

    petal.style.top = "-50px";

    petal.style.fontSize =
        (16 + Math.random() * 10) + "px";

    document.body.appendChild(petal);

    const duration =
        7000 + Math.random() * 3000;

    const drift =
        (Math.random() - 0.5) * 150;

    petal.animate(
        [
            {
                transform: "translate(0,0) rotate(0deg)",
                opacity: 0
            },
            {
                opacity: 0.9
            },
            {
                transform:
                    "translate(" +
                    drift +
                    "px," +
                    (window.innerHeight + 100) +
                    "px) rotate(720deg)",

                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "linear"
        }
    );

    setTimeout(() => {

        petal.remove();

    }, duration);

}

setInterval(createPetal, 1800);



/* =========================
موزیک پس زمینه
========================= */

window.addEventListener("load", () => {

    const music =
        document.getElementById("bgMusic");

    if (!music) return;

    music.play().catch(() => {

        document.addEventListener(
            "click",
            () => music.play(),
            { once: true }
        );

    });

});
