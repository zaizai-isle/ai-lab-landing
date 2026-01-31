/**
 * Antiy Particles
 * - Wave-based random field
 * - Mouse attractor
 * - GPU-light Canvas2D
 */

const canvas = document.getElementById("anti-particles");
const ctx = canvas.getContext("2d");

let w, h, particles = [];
let mouse = { x: null, y: null };

const CONFIG = {
    COUNT: 90,
    BASE_SPEED: 0.25,
    WAVE_AMPLITUDE: 18,
    WAVE_FREQUENCY: 0.002,
    MOUSE_FORCE: 0.08,
    SIZE: 1.2
};

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
    mouse.x = mouse.y = null;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * CONFIG.BASE_SPEED;
        this.vy = (Math.random() - 0.5) * CONFIG.BASE_SPEED;
        this.phase = Math.random() * Math.PI * 2;
    }

    update(t) {
        // wave field
        this.vy += Math.sin(t * CONFIG.WAVE_FREQUENCY + this.phase) * 0.002;

        // mouse attraction
        if (mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = CONFIG.MOUSE_FORCE / dist;
            this.vx += dx * force * 0.001;
            this.vy += dy * force * 0.001;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, CONFIG.SIZE, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fill();
    }
}

// init
for (let i = 0; i < CONFIG.COUNT; i++) {
    particles.push(new Particle());
}

function animate(t) {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
        p.update(t);
        p.draw();
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
