const canvas = document.getElementById("target")
const c = canvas.getContext("2d")
canvas.width = 900;
canvas.height = window.innerHeight;
    //Creation of Objects 
const gameObjectStorage = [];
const carStorage = [];
const logStorage = [];
var list_frog = [];

const frog_size_x = 70
const frog_size_y = canvas.height / 14

var range_color = ['rgb(2, 71, 181)',
    'rgb(193, 253, 111)',
    'rgb(172, 127, 203)',
    'rgb(203, 53, 175)',
    'rgb(226, 45, 44)'
]

var temp= -1
var direction= -1


var speed=0.4
carStorage.push(
    new Car(canvas.width-frog_size_x ,canvas.height -2 * frog_size_y, -speed*2,frog_size_x,frog_size_y),
    new Car(canvas.width+2*frog_size_x ,canvas.height -2 * frog_size_y, -speed*2,frog_size_x,frog_size_y),
    new Car(canvas.width+7*frog_size_x ,canvas.height -2 * frog_size_y, -speed*2,frog_size_x,frog_size_y),

    new Car(canvas.width/2 ,canvas.height -3 * frog_size_y, speed*2,frog_size_x*2,frog_size_y),
    new Car(2*frog_size_x ,canvas.height -3 * frog_size_y, speed*2,frog_size_x*2,frog_size_y),
    new Car(-4*frog_size_x ,canvas.height -3 * frog_size_y,speed*2,frog_size_x*2,frog_size_y),


    new Car(canvas.width-3*frog_size_x ,canvas.height -4 * frog_size_y, -speed*4,frog_size_x,frog_size_y),
    new Car(canvas.width ,canvas.height -4 * frog_size_y, -speed*4,frog_size_x,frog_size_y),
    new Car(canvas.width+4*frog_size_x ,canvas.height -4 * frog_size_y, -speed*4,frog_size_x,frog_size_y),

    new Car(canvas.width/2 ,canvas.height -5 * frog_size_y, speed*5,frog_size_x,frog_size_y),
    new Car(frog_size_x*2 ,canvas.height -5 * frog_size_y, speed*5,frog_size_x,frog_size_y),
    new Car(-2*frog_size_x ,canvas.height -5 * frog_size_y,speed*5,frog_size_x,frog_size_y),

    new Car(canvas.width/2 - frog_size_x ,canvas.height -6 * frog_size_y, -speed*6,frog_size_x*3,frog_size_y),
    new Car(-2*frog_size_x ,canvas.height -6 * frog_size_y, -speed*6,frog_size_x*3,frog_size_y),
   
)


logStorage.push(
    new Log(canvas.width-6*frog_size_x , canvas.height/2 - frog_size_y , -speed*2,frog_size_x*5,frog_size_y),
    new Log(canvas.width-0*frog_size_x , canvas.height/2 - 2*frog_size_y , speed*2,frog_size_x*5,frog_size_y),
    new Log(canvas.width-3*frog_size_x , canvas.height/2 - 3*frog_size_y , -speed*2,frog_size_x*5,frog_size_y),
    new Log(frog_size_x*2 , canvas.height/2 - 4*frog_size_y , speed*2,frog_size_x*5,frog_size_y),
    new Log(-2*frog_size_x , canvas.height/2 - 5*frog_size_y, -speed*6,frog_size_x*5,frog_size_y),
   
   
)

const water = new Background(0, 0, canvas.width, canvas.height / 2, 'white')
gameObjectStorage.push(water)

const grass = new Background(0, 0, canvas.width, frog_size_y - 20, 'red')
for (let i = 0; i < 6; i++) {
    const rectangle = new Rectangle(frog_size_x * 2.7 * i,
        0,
        (frog_size_x) - 20,
        frog_size_y * 2,
        'green')
    gameObjectStorage.push(rectangle)
}
const safe_zone = new Background(0, canvas.height / 2, canvas.width, frog_size_y, 'black')
const start_local = new Background(0, canvas.height - frog_size_y, canvas.width, frog_size_y, 'black')
var frog = new Frog(Math.floor(Math.random() * 14) * frog_size_x,
    canvas.height - frog_size_y,
    frog_size_x,
    frog_size_y,
    './img/frog.png')
   

gameObjectStorage.push(grass)
gameObjectStorage.push(start_local)
gameObjectStorage.push(safe_zone)

// gameObjectStorage.push(frog)

var live = 2

function updateScreen() {
    

    c.clearRect(0, 0, canvas.width, canvas.height);


   
    for (let i = 0; i < gameObjectStorage.length; i++) {
        setTimeout(gameObjectStorage[i].update(), 2000);
        gameObjectStorage[i].update()
        gameObjectStorage[i].draw();

    }
    
   
  
    for (let i = 0; i < logStorage.length; i++) {
        logStorage[i].update();
      
        logStorage[i].draw();
       
    }
    frog.update()
    frog.draw()
    for(let i = 0 ;i <list_frog.length;i++)
    {
        list_frog[i].draw()
    }
   
  
    for (let i = 0; i < carStorage.length; i++) {
        carStorage[i].update();
        carStorage[i].draw();
       
    }
    if(list_frog.length == 5 )
    {
        c.font = "50px"
        c.fillStyle="red"
        c.fillText("Congratulations, you have won! Your score is" + score, 20, canvas.height / 2 - 10)
        c.fillText("Press any button to continue", 20, canvas.height /2 +frog_size_y -10)
       
        window.cancelAnimationFrame(updateScreen)
        PressAnyKey()
       
    }
    
    if (live < 0 ) {
        c.font = "50px"
        c.fillStyle="red"
        c.fillText("You lose and the game is over", canvas.width / 4, canvas.height / 2 - 10)
        c.fillText("Press any button to reset", 20, canvas.height /2 +frog_size_y -10)
        console.log("Live <0")
        window.cancelAnimationFrame(updateScreen)
        PressAnyKey()


    }
    

    if( live >= 0 && list_frog.length <5) {
        c.font = "50px red"
        c.fillStyle="red"
        c.fillText("Your live: " + live + "    Your score: " + score, 20, canvas.height / 2 - 10)

        window.requestAnimationFrame(updateScreen);
    }
    

}


updateScreen()
function PressAnyKey() {
    window.addEventListener('keydown', function(e) {

        if (e) {
            location.reload()
                
        }
    })
}
if (live > 0) {
    Move()
}

function Move() {
    window.addEventListener('keydown', function(event) {

        {
           
            switch (event.code) {
                case "ArrowLeft":
                    frog.moveLeft();

                    break;
                case "ArrowUp":
                    frog.moveUp();
                    break;
                case "ArrowRight":
                    frog.moveRight();
                    break;
                case "ArrowDown":
                    frog.moveDown();
                    break;

            }
        }
    });
}
