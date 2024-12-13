let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

// Particle class to define individual particles
class Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
    color: string;
    lifetime: number;

    constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string, lifetime: number) {
        this.x = x; // Initial X position
        this.y = y; // Initial Y position
        this.dx = dx; // Horizontal velocity
        this.dy = dy; // Vertical velocity
        this.radius = radius; // Particle radius
        this.color = color; // Particle color
        this.lifetime = lifetime; // Remaining lifetime (frames)
    }

    // Draw the particle on the canvas
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Update particle position and decrease lifetime
    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.lifetime--;
    }
}

// ParticleSystem class to manage multiple particles
class ParticleSystem {

    particles: Particle[];

    constructor() {
        this.particles = []; // Array of particles
    }

    // Add a new particle to the system
    addParticle(x: number, y: number) {
        const radius = Math.random() * 3 + 2; // Random radius
        const dx = (Math.random() - 0.5) * 2; // Random horizontal velocity
        const dy = (Math.random() - 0.5) * 2; // Random vertical velocity
        const color = `rgba(255, ${Math.random() * 255}, ${Math.random() * 255}, 1)`; // Random color
        const lifetime = 100; // Lifetime in frames
        this.particles.push(new Particle(x, y, dx, dy, radius, color, lifetime));
    }

    // Update and render all particles
    run(ctx: CanvasRenderingContext2D) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            if (particle.lifetime <= 0) {
                // Remove particle if its lifetime is over
                this.particles.splice(i, 1);
            } else {
                particle.draw(ctx);
            }
        }
    }
}

// Particle system instance
const particleSystem = new ParticleSystem();

function init() {
    requestAnimationFrame(update);

    const canvasElem = document.querySelector("canvas");
    if (canvasElem)
    canvas = canvasElem;

    const context = canvas.getContext("2d");
    if (context)
    ctx = context;

    resize();
}

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

let t = 0;

function update() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < 5; i++) {
        particleSystem.addParticle(innerWidth/2 + 400*Math.cos(t/100), innerHeight/2 + 200*Math.sin(t/50));
    }

    particleSystem.run(ctx); // Update and render particles

    t++;
    requestAnimationFrame(update);
}

window.addEventListener("load", init);
window.addEventListener("resize", resize);
