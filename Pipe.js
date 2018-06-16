function Pipe()
{
    var spacing = random(150,height/2)// a random scapcing between 70 to height /2 is selected
    var centry= random(spacing,height-spacing)
    this.top= centry-spacing/2// the spacing is divided equally between top pipe and bottom pipe
    this.bottom= height - centry -spacing/2
    this.x=width
    this.w=50
    this.velocity=1
    this.highlight
    
    this.hits= function(bird)
    {
        if(bird.y-16<=this.top || bird.y+16>=height-this.bottom)
        {
            if(bird.x-16<=this.x+this.w && bird.x+16>=this.x)
            {
                this.highlight=true
                return true
            }
        }
        this.highlight=false
        return false
    }

    this.show = function()
    {
        if(this.highlight)
        {
            fill(255,0,0)
        }
        else{
            fill(255)
        }
        rect(this.x,0,this.w,this.top)
        rect(this.x,height-this.bottom,this.w,height)
    }   

    this.update = function()
    {
        this.x-=this.velocity
    }
    this.offScreen= function()
    {
        if(this.x+this.w<0)
        {
            return true
        }
        return false
    }
}

