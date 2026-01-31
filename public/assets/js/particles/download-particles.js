/**
 * Download Section Particles - Hybrid Meteor & Floating Dust
 * Clean circles, alpha-fade trails, and regular clearRect to prevent residue
 */

const initDownloadParticles = () => {
    const canvas = document.getElementById('download-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    let particles = [];
    let frameCount = 0;

    const resize = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const METEOR_COUNT = 8;
    const DUST_COUNT = 40;

    class Particle {
        constructor(type) {
            this.type = type; // 'meteor' or 'dust'
            this.reset();
            this.x = Math.random() * w;
            this.y = Math.random() * h;
        }

        reset() {
            if (this.type === 'meteor') {
                const side = Math.random();
                if (side > 0.5) {
                    this.x = -50;
                    this.y = Math.random() * (h * 0.8);
                } else {
                    this.x = Math.random() * (w * 0.8);
                    this.y = -50;
                }
                this.vx = 0.8 + Math.random() * 1;
                this.vy = 0.4 + Math.random() * 0.6;
                this.opacity = 0.15 + Math.random() * 0.45; // 0.15 to 0.6
                this.size = 1.0 + Math.random() * 0.8;
            } else {
                // Floating Dust
                this.vx = (Math.random() - 0.5) * 0.15;
                this.vy = (Math.random() - 0.5) * 0.15;
                this.opacity = 0.05 + Math.random() * 0.15; // 0.05 to 0.2
                this.size = 0.4 + Math.random() * 0.8;
                this.phase = Math.random() * Math.PI * 2;
            }
            this.color = `rgba(255, 255, 255, ${this.opacity})`;
        }

        update(t) {
            if (this.type === 'meteor') {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x > w + 100 || this.y > h + 100) this.reset();
            } else {
                // Drift + tiny oscillation
                this.x += this.vx + Math.sin(t * 0.001 + this.phase) * 0.1;
                this.y += this.vy + Math.cos(t * 0.001 + this.phase) * 0.1;

                if (this.x < 0) this.x = w;
                if (this.x > w) this.x = 0;
                if (this.y < 0) this.y = h;
                if (this.y > h) this.y = 0;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Init
    for (let i = 0; i < METEOR_COUNT; i++) particles.push(new Particle('meteor'));
    for (let i = 0; i < DUST_COUNT; i++) particles.push(new Particle('dust'));

    const animate = (t) => {
        frameCount++;

        // 1. Alpha-fade for smooth trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.fillRect(0, 0, w, h);

        // 2. Periodic hard clear to prevent "ghost lines" accumulation
        // Clear every 300 frames (approx 5 seconds) to refresh the background
        if (frameCount % 300 === 0) {
            ctx.clearRect(0, 0, w, h);
        }

        for (const p of particles) {
            p.update(t);
            p.draw();
        }
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
};

document.addEventListener('DOMContentLoaded', initDownloadParticles);
