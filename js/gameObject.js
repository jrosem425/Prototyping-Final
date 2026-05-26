function GameObject(x, y, w, h, color)
{
    // set up player starting point

    //set up x

    if (x==undefined)
    {
        this.x = canvas.width/2;
        
    }

    else{
        this.x = x;
    }

    //set up y

    if (y==undefined)
    {
        this.y = canvas.height/2;
        
    }

    else{
        this.y = y;
    }


    //set up width

    if (w==undefined)
    {
        this.width = 100;
        
    }

    else{
        this.width = w;
    }


     //set up height

    if (h==undefined)
    {
        this.height = 100;
        
    }

    else{
        this.height = h;
    }


    //set up color

    if (color==undefined)
    {
        this.color = "black";
        
    }

    else{
        this.color = color;
    }


    //set up bounding box

    this.left = function()
    {
        return {x:this.x - this.width/2, y:this.y}
    }

    this.right = function()
    {
        return {x:this.x + this.width/2, y:this.y}
    }

    this.top = function()
    {
        return {x:this.x, y: this.y - this.height/2}
    }

    this.bottom = function()
    {
        return {x:this.x, y: this.y + this.height/2}  
    }

    this.prevX=this.x;
    this.canJump = false;


    //set up player velocity

    this.vx = 0;
    this.vy = 0;





    this.drawCirc = function()
    {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
            // context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.closePath();
            context.fill();
        context.restore();

    }
    this.drawRect = function()
    {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
            context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
           
        context.restore();
    }



    this.drawDebug = function()
    {
        var size = 10;
        context.save();
            context.fillRect(this.x-size/2, this.y-size/2,size,size);
            context.fillRect(this.left().x-size/2,this.left().y-size/2,size,size);
            context.fillRect(this.right().x-size/2,this.right().y-size/2,size,size);
            context.fillRect(this.top().x-size/2,this.top().y-size/2,size,size);
            context.fillRect(this.bottom().x-size/2,this.bottom().y-size/2,size,size);



        context.restore();

    }





    this.move = function()
    {
        this.x += this.vx;
        this.y += this.vy;
    }


    this.collisionCheck = function(obj)
    {
        if(
            this.left() < obj.right() &&
            this.right() > obj.left() &&
            this.top() < obj.bottom() &&
            this.bottom() > obj.top() 
          )

          {
                return true;
          }
        return false;
    }


}