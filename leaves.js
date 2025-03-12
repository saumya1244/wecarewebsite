let leaves = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); // Ensures it's behind content
    canvas.style('position', 'fixed'); // Keeps it in the background
    for (let i = 0; i < 20; i++) {
        leaves.push(new Leaf());
    }
}

function draw() {
    clear();
    for (let leaf of leaves) {
        leaf.update();
        leaf.display();
    }
}

class Leaf {
    constructor() {
        this.x = random(width);
        this.y = random(-200, height);
        this.size = random(15, 40);
        this.speed = random(1, 3);
        this.angle = random(TWO_PI);
        this.rotationSpeed = random(-0.02, 0.02);
        this.color = color(random(150, 255), random(100, 180), random(50, 100));
    }

    update() {
        this.y += this.speed;
        this.angle += this.rotationSpeed;
        if (this.y > height) {
            this.y = random(-100, -10);
            this.x = random(width);
        }
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill(this.color);
        noStroke();
        ellipse(0, 0, this.size, this.size * 0.6);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
