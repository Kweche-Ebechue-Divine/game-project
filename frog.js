var count =0 
var score = 0
class Background {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.width, this.height, this.color)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        
        if (((this.x + this.w) < frog.x) &&
            (this.x > (frog.x + frog_size_x)) &&
            ((this.y + this.h) < frog.y) &&
            (this.y > (frog.y + frog_size_y))) {
            console.log('Hit');
        }
    }
}

class Frog {
    constructor(x, y, w, h) {
     
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        
        this.color = 'red'
       
    }
    moveUp() {

        if (this.y > this.h * 2) {
            this.y = this.y - this.h;
          
        }
        // Any successful stage moved results to 10 points
        score= score + 10
        
    }

    moveDown() {
        if (this.y + frog_size_y < canvas.height) {
            this.y = this.y + this.h;
          
        }

    }

    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - this.w;
            
        }

    }

    moveRight() {
        if (this.x + frog_size_x < canvas.width) {
            this.x = this.x + this.w;
            
        }

    }
    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.w, this.h)
        c.fillStyle = this.color
        c.fill()
 
    }
    update() {
     
            if(Math.round(this.y) ==  Math.round(this.h))
            {
                list_frog.push(
                    new Frog(this.x,this.y,frog_size_x,frog_size_y)
                )
                frog.x = canvas.width / 2
                frog.y = canvas.height - frog_size_y
            }
            
   
          
    }

}
class Rectangle {
    constructor(startX, startY, width, height) {
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;

    }
    update() {
        // Test for collision, this tests to see if this collides with frog

        if (((this.x + this.width) > frog.x) &&
            (this.x < (frog.x + frog.w)) &&
            ((this.y + this.height) > frog.y) &&
            (this.y < (frog.y + frog.h))) {

            frog.x = canvas.width / 2
            frog.y = canvas.height - frog_size_y

            live = live - 1

        }

        count = 0
    }

    draw() {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.fillStyle = 'green';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = 'green';
        c.stroke();
    }
}


class Car {
    constructor(startX, startY, speedX, size_x, size_y) {
        this.x = startX;
        this.y = startY + 1;
       
        this.speedX = speedX;
        this.size_x = size_x;
        this.size_y = size_y - 15;
       
        this.color = {
            red: Math.random() * 255,
            green: Math.random() * 255,
            blue: Math.random() * 255
        };
    }

    update() {


        if (((this.x + this.size_x) > frog.x) &&
            (this.x < (frog.x + frog.w)) &&
            ((this.y + this.size_y) > frog.y) &&
            (this.y < (frog.y + frog.h))) {

            console.log("hit")
                //Here the following is represented by 
                // frog.x = frog.x
                // frog.y = frog.y
            frog.x = canvas.width / 2
            frog.y = canvas.height - frog_size_y


            live = live - 1

        }

        
       
            if(this.x  + this.speedX <= -100 && this.speedX <0)
            {
                this.x=canvas.width
            }
            if(this.x >canvas.width && this.speedX >0)
            {
                this.x=-100
            }


        this.x = this.x + this.speedX
        
    }

    draw() {


        c.beginPath();
        c.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
        c.rect(this.x, this.y, this.size_x, this.size_y);

        c.fill();
   
    }
}

class Log {
    constructor(startX, startY, speedX, size_x, size_y) {
        this.x = startX;
        this.y = startY +1 ;
       this.check=0;
        
        this.speedX = speedX;
        this.size_x = size_x;
        this.size_y = size_y -4 ;
       
        this.color = {
            red: Math.random() * 255,
            green: Math.random() * 255,
            blue: Math.random() * 255
        };
    }

    update() {
   
        if(this.x + this.speedX <= -300 && this.speedX <0)
        {
            this.x=canvas.width
        }
        if(this.x >canvas.width && this.speedX >0)
        {
            this.x=-100
        }

        this.x = this.x + this.speedX
      
        this.check =0
     
        if (((this.x + this.size_x) > frog.x) &&
        (this.x < (frog.x + frog.w)) &&
        ((this.y + this.size_y) > frog.y) &&
        (this.y < (frog.y + frog.h)))
       {
          
        console.log("carry")
           this.check = 1
            frog.x = frog.x + this.speedX
           count= 1
       
         }

         
       
         else if ((frog.y < canvas.height/2  && this.check==0 && 
            Math.round(frog.y) == Math.round(this.y -1))  ){
                
              
                frog.x = canvas.width / 2 
                frog.y = canvas.height - frog_size_y
               
                live = live - 1
               
          
        }

     
    }

    draw() {


        c.beginPath();
        c.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
        c.rect(this.x, this.y, this.size_x, this.size_y);

        c.fill();
    }
}
