const TOTAL= 200
var birds=[];
var savedBirds=[]
var pipes=[];
let counter=0
function setup()
{
    createCanvas(400,600);
    for(let i=0;i<TOTAL;i++)
    {
        birds[i]= new Bird()
    }
}
function draw()
{
    background(0)
    if(counter % 200 == 0)
    {
        pipes.push(new Pipe())
    }
    counter++;
    for(let i=pipes.length-1;i >=0;i--)
    {
        pipes[i].show()
        pipes[i].update()

        for(let j=birds.length-1;j>=0;j--)// for all the birds if any bird hits the pipe then the bird is eliminated
        {
            if(pipes[i].hits(birds[j]))
            {
                savedBirds.push(birds.splice(j,1)[0])
            }
        }

        if(pipes[i].offScreen())
        {
            pipes.splice(i,1)
        }
    }
    
    for(let bird of birds)
    {
        bird.think(pipes)// bird is given a neural network
        bird.update()
        bird.show()
    }
    if(birds.length===0)
    {
        nextGeneration()// if all the birds are eliminated then a new generation of birds are created
        pipes=[]
        counter=0
    }
}

function keyPressed()
{
    if(key == ' ')
    {
        bird.jump()
    }
}