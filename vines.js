let vines = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');

    // Create vines (left & right)
    vines.push(new Vine(50)); // Left side
    vines.push(new Vine(width - 50)); // Right side
}

function draw() {
    background(255, 255, 255, 0); // Transparent background instead of clear()

    for (let vine of vines) {
        vine.display();
    }
}

class Vine {
    constructor(startX) {
        this.points = [];
        this.leaves = [];
        this.xOffset = random(1000); // Start Perlin noise randomly

        for (let i = 0; i < height; i += 20) {
            let waveX = map(noise(this.xOffset + i * 0.01), 0, 1, -25, 25);
            let x = startX + waveX;
            let y = i;
            this.points.push({ x, y });

            // Add leaves every ~100px, alternate sides
            if (i % 100 === 0) {
                let side = (i / 100) % 2 === 0 ? -1 : 1; // Alternate left/right
                let offsetX = side * 15; // Adjust leaf closer to vine
                let offsetY = 10; // Slightly move it down for better attachment
                let angle = atan2(waveX, 20); // Rotate leaf based on vine direction
                this.leaves.push({ 
                    x: x + offsetX, 
                    y, 
                    angle: atan2(waveX, 20) + random(-PI / 6, PI / 6) // Add randomness 
                });
                
            }
        }
    }

    display() {
        stroke(34, 139, 34);
        strokeWeight(4);
        noFill();

        // Draw wavy vine
        beginShape();
        for (let p of this.points) {
            vertex(p.x, p.y);
        }
        endShape();

        // Draw leaves
        for (let leaf of this.leaves) {
            push();
            translate(leaf.x, leaf.y);
            rotate(leaf.angle);
            drawLeaf(0, 0, 25, 0); // Use (0,0) since translation already positions it
            pop();
        }
    }
}

// 🎨 Draw a more realistic diamond-shaped leaf
function drawLeaf(x, y, size, angle) {
    push();
    translate(x, y);
    rotate(angle + PI); // Flip leaves upside down

    fill(34, 139, 34);
    stroke(28, 100, 28);
    strokeWeight(2);

    beginShape();
    vertex(0, 0); // Tip of the leaf
    bezierVertex(-size * 0.7, size * 0.3, -size * 0.4, size * 0.9, 0, size); // Left side - sharper
    bezierVertex(size * 0.4, size * 0.9, size * 0.7, size * 0.3, 0, 0); // Right side - sharper
    endShape(CLOSE);

    pop();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
