const svg=document.getElementById("svg-canvas");

window.addEventListener("resize", resizeSVG);

function resizeSVG(){
    let bbox = svg.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);

    console.log(`0 0 ${bbox.width} ${bbox.height}`);
}

class Particle {
    constructor(xPos, yPos, radius) {
      
      this.x = xPos;
      this.y = yPos;
      this.r = radius;

      //how fast the particles travel (from initial position to destinations)
      this.animDuration = randomNum(4,6);

      //allow us to add animate later
      this.svgElement;
  
      // Create target x and y positions
      this.targetX = randomNum(0, width);
      this.targetY = randomNum(0, height); 
  }
    
    //create circle elements
    drawParticle() {
      this.svgElement = makeCircle(this.x, this.y, this.r);
      svg.appendChild(this.svgElement);
  
      this.addAnimateX();
      this.addAnimateY();
    }

    //create animate elements (For CX)
    addAnimateX() {
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  
      //animate cx of the circles
      animElement.setAttribute('attributeName', 'cx');
  
      //animate cx to tragetx (move from cx to targetx)
      animElement.setAttribute('values', `${this.x}; ${this.targetX};`);
  
      //how long (in seconds) will take from one value to another
      animElement.setAttribute('dur', `${this.animDuration}`);
  
      //define how many times we want the animation repeat
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
    }
  
    //similar to CX animation, this one is for CY animation
    addAnimateY() {
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName', 'cy');
      animElement.setAttribute('values', `${this.y}; ${this.targetY};`);
      animElement.setAttribute('dur', `${this.animDuration}`);
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);

    }

  }
  
  // A random number between a specified range
function randomNum(lower, upper) {
    let num = lower + Math.random()*(upper-lower);
    return num;
  }
  
  // This function creates a random color circle SVG element

  function makeCircle(x, y, radius, r, g, b) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    let C = makeRGB(r,g,b);

    circle.setAttribute("x", x);
    circle.setAttribute("y", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", C);
    return circle;
  }

  //create random colors
  function makeRGB(redInputValue, blueInputValue, greenInputValue){

    let redOutputValue = redInputValue ?? Math.round(Math.random() * 200);
    let blueOutputValue = blueInputValue ?? Math.round(Math.random() * 200);
    let greenOutputValue = greenInputValue ?? Math.round(Math.random() * 200);

    return 'rgb(' + redOutputValue + ', ' + blueOutputValue + ', ' + greenOutputValue +')';
  }

  function createParticlesArray(num) {
    let particleInstances = [];
  
    for (let i = 0; i < num; i++) {
      // Initial position of particles in the middle of the SVG canvas
      let particleX = width/2;
      let particleY = height/2;
      let particleSize = randomNum(width * 0.02, width * 0.01);
  
      // Push or add to the end of the particleInstances array
      particleInstances.push(new Particle(particleX, particleY, particleSize));
    }
  
    return particleInstances;
  }
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  let particles = createParticlesArray(50);

  for (let particle of particles) {
    particle.drawParticle();
  }