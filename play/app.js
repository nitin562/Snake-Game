//prerequisite
let speed=localStorage.getItem("speed")

let prevtime=0
let direction={row:0,col:1} 
let snakeArr=[{row:15,col:2}]  
const boardgm=document.querySelector("#board")
let spaceCounter=0
let food={row:10,col:10}
const low=1,high=21
let lastScore=0
let scored=0
let HighScore=localStorage.getItem("Highscore")

//audio
let bgmusic=new Audio("../music/music.mp3")
let gameOver=new Audio("../music/gameover.mp3")
let foodmusic=new Audio("../music/food.mp3")
let movement=new Audio("../music/move.mp3")
//functions OK Exit
function start(){
    console.log(document.querySelector(".msgbox")[0])
    document.querySelector(".msgbox").style.animation="zoomOut 1s ease forwards"
    setTimeout(()=>{
        document.querySelector(".msgbox").remove()
        speed=localStorage.getItem("speed")
    },500)
    
    
}
function Exit(){
    document.querySelector(".msgbox").style.animation="zoomOut 0.5s ease forwards"
    localStorage.setItem("lastScore",lastScore)
    setTimeout(()=>{
        document.querySelector(".msgbox").remove()
        location.href="../index.html"
    },500)
    
}
function Continue(){
    document.querySelector(".msgbox").style.animation="zoomOut 0.5s ease forwards"
    setTimeout(()=>{
        document.querySelector(".msgbox").remove()
        bgmusic.play()
        speed=localStorage.getItem("speed")
    },500)

}
//collision
function isCollide(arr){
    if(arr.length==0){
        return false;
    }
    if((arr[0].row<=0 || arr[0].row>=21) || (arr[0].col<=0 || arr[0].col>=21)){
        return true;
    }
    
    for(let i=1;i<arr.length;i++){
        if(arr[0].row==arr[i].row && arr[0].col==arr[i].col){
            return true;
        }
    }


    return false;
}
//function to get messagebox
function msgbox(){
    let box=document.createElement('div')
    box.classList.add("msgbox")
    document.querySelector("body").append(box)
    return box
}

//gameEngine()
function gameEngine(){
    boardgm.innerHTML=""
    if(localStorage.getItem("Highscore") != null)
        HS.innerHTML="HIGHSCORE: "+localStorage.getItem("Highscore")
    else{
        localStorage.setItem("Highscore","00")
    }
    if(isCollide(snakeArr)){
        bgmusic.pause();
        gameOver.play()
        snakeArr=[{row:Math.round(low+(high-low)*Math.random()),col:Math.round(low+(high-low)*Math.random())}]
        direction={row:0,col:1}
        if(HighScore<scored){
            HighScore=scored;
        }
        lastScore=scored
        scored=0
        score.innerHTML="SCORE: "+scored
        localStorage.setItem("Highscore",HighScore)
        speed=0
        let msgbx=msgbox()
        
        msgbx.innerHTML=`<div id="msg">
        <p>Do you want to play Again</p>
        <div class="line">
            <button onclick=start()>OK</button>
            <button onclick=Exit()>Exit</button>
        </div>
    </div>`

        
    }
    bgmusic.play()
    //move snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].row+=direction.row
    snakeArr[0].col+=direction.col

    //food eaten
    if(food.row==snakeArr[0].row && food.col==snakeArr[0].col){
        foodmusic.play()
        snakeArr.unshift({row:snakeArr[0].row+direction.row,col:snakeArr[0].col+direction.col})
        food.row=Math.floor(low+(high-low)*Math.random())
        food.col=Math.floor(low+(high-low)*Math.random())
        scored++
        score.innerHTML="SCORE: "+scored
        console.log(HighScore)
        if(HighScore<scored){
            HighScore=scored
            localStorage.setItem("Highscore",HighScore)
            HS.innerHTML="HIGHSCORE: "+HighScore
        }
    }
    //create food
    let foodElement=document.createElement("div")
    foodElement.classList.add("food")
    foodElement.style.gridRowStart=food.row
    foodElement.style.gridColumnStart=food.col
    boardgm.append(foodElement)
    //create snake
    let temphead={...snakeArr[0]}
    snakeArr.forEach((element,index)=>{
        let snakePart=document.createElement("div")
        snakePart.classList.add("snakePart")
        if(index===0){
            snakePart.classList.add("head")
        }
        // console.log(element)
        if(index===snakeArr.length-1 && snakeArr.length!=1){
            snakePart.classList.add("tail")
            if(snakePart.row==temphead.row && snakePart.col==temphead.col){
                snakePart.style.transform=`rotate(${rotate})`
                temphead={...snakeArr[0]}
            }
        }
        snakePart.style.gridRowStart=element.row
        snakePart.style.gridColumnStart=element.col

        boardgm.append(snakePart)
    })
     
    

    


    

    
   
}


//main func
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-prevtime)/1000 < 1/speed){
        return;
    }
    prevtime=ctime
    // console.log(ctime) operation
    gameEngine()
}






//requestAnimation main
window.requestAnimationFrame(main)

window.addEventListener("keyup",(event)=>{
    movement.play()
    switch(event.key){
        case "ArrowUp":
            if(direction.row==1) break
            // previousdirection={...direction}
            direction.row=-1
            direction.col=0
            
            break
        case "ArrowDown":
            if(direction.row==-1) break
            // previousdirection={...direction}
            direction.row=1
            direction.col=0
            
            break
        case "ArrowLeft":
            if(direction.col==1){
                break;
            }
            // previousdirection={...direction}
            direction.row=0
            direction.col=-1
            
            break
        case "ArrowRight":
            if(direction.col==-1){
                break
            }
            
            // previousdirection={...direction}
            direction.row=0
            direction.col=1
            break
        
    }
    if(event.key==" "){
    
            bgmusic.pause()
            speed=0
            if(document.querySelectorAll(".msgbox").length==1){
                return;
            }
            lastScore=scored
            let bx=msgbox();
            bx.innerHTML=`<div id="msg">
        <p>Do you want to continue</p>
        <div class="line">
            <button onclick=Continue()>Continue</button>
            <button onclick=Exit()>Exit</button>
        </div>
    </div>`

        
        
        
    }
})