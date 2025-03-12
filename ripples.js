let ripples = [];

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    
    // Attach mouse hover event listener to articles
    document.querySelectorAll('.features article').forEach((article) => {
        article.addEventListener('mouseenter', (event) => {
            let rect = article.getBoundingClientRect();
            let x = rect.left + rect.width / 2;
            let y = rect.top + rect.height / 2;
            ripples.push(new Ripple(x, y));
        });
    });
}

function draw() {
    clear();
    for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].expand();
        ripples[i].display();
        if (ripples[i].alpha <= 0) {
            ripples.splice(i, 1); // Remove completed ripples
        }
    }
}

// Ripple class
class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.alpha = 150;
    }

    expand() {
        this.radius += 2;
        this.alpha -= 2;
    }

    display() {
        noFill();
        stroke(0, 150, 136, this.alpha);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius * 2);
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}
