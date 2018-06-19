class Bird{
    constructor(brain)
    {
        this.y= height/2
        this.x= 64
        
        this.lift=-15
        this.gravity =0.6;
        this.velocity = 0;
        this.retardation=1
        this.rad=16 

        this.score=0; // the length of time for which the bird lived
        this.fitness=0;
    
        if(brain)
        {
            this.brain= brain.copy()
        }
        else
        {
            this.brain = new NeuralNetwork(6,7,2)
        }
    } 

    mutate()
    {
        this.brain.mutate(0.1)
    }
    show()
    {
        stroke(255)
        fill(255, 100)
        ellipse(this.x,this.y,32,32)
    }
    think(pipes)
    {
        let closest = null
        let closestD = Infinity
        for(let i=0;i<pipes.length;i++)
        {
             let d = pipes[i].x+pipes[i].w-this.x-this.rad // find the closes pipe from the currently generated pipes
             if(d>0 && d<closestD) // we are not to consider the pipes which is behind the bird 
             {
                 closest=pipes[i]
                 closestD=d
             }
        }
        let inputs=[]
        inputs[0] = this.y
        inputs[1] = closest.top + this.rad
        inputs[2] = height - closest.bottom - this.rad
        inputs[3] = closest.x
        inputs[4] = closest.x+closest.w
        inputs[5] = this.velocity
        let outputs=this.brain.feedforward(inputs)
        if(outputs.data[0] > outputs.data[1])
        {
            this.jump()
        }
    }

    update()
    {
        this.score+=1//score increases every time computer renders it 

        this.velocity+=this.gravity
        this.velocity*=0.9
        this.y+=this.velocity
        if(this.y>height)
        {
            if(this.retardation<-1*this.lift){
                this.retardation+=2
                this.velocity+= this.lift+this.retardation
            }
            else{
               this.y=height
               this.velocity=0
            }
        }
        if(this.y<0)
        {
            this.y=0
            this.velocity=0
        }
    }
    jump()
    {
        this.retardation=1
        this.velocity+= this.lift
    }
}
