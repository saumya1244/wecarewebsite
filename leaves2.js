let leaves = [];

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    
    for (let i = 0; i < 10; i++) {
        leaves.push(new Leaf(random(width), random(height)));
    }
}

function draw() {
    clear();
    for (let leaf of leaves) {
        leaf.move();
        leaf.display();
    }
}

class Leaf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(10, 30);
        this.angle = random(TWO_PI);
        this.speed = random(0.5, 1.5);
    }

    move() {
        this.x += sin(this.angle) * 1.5;
        this.y += this.speed;
        this.angle += random(-0.05, 0.05);
        if (this.y > height) {
            this.y = 0;
            this.x = random(width);
        }
    }

    display() {
        fill(50, 150, 50, 150);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size * 1.5);
    }
}
