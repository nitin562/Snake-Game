let arr=Array.from(document.getElementsByTagName("button"))
let clickSound=new Audio("../music/whiss.wav")
let whissSound=new Audio("../music/clicked.wav")
let soundBg=new Audio("../music/trapbeat.mp3")
if(localStorage.getItem("newSpeed")!=-1){
    localStorage.setItem("speed","4")
    localStorage.setItem("active","0")
}


document.addEventListener("mousemove",()=>{
    soundBg.loop=true;
    soundBg.play()
})


arr.forEach(element=>{
    element.addEventListener("mouseenter",()=>{
        whissSound.play()
    })
    element.addEventListener("mouseleave",()=>{
        whissSound.currentTime=0
    })
    element.addEventListener("click",()=>{
        whissSound.pause()
        whissSound.currentTime=0
        clickSound.play()
    })
})
arr[0].addEventListener("click",()=>{
    setTimeout(()=>{
        location.href="../play/game.html"
    },500)
})
function msgbox(){
    let box=document.createElement('div')
    box.classList.add("msgbox")
    document.querySelector("body").append(box)
    return box
}
function level(){
    let bx=msgbox()
    bx.innerHTML=`
    <p>SET LEVEL</p>
    <div class="levelField">
    <label for="Easy">Easy <button id="Easy"></button></label> 
    <label for="Moderate">Moderate<button id="Moderate"></button></label> 
    <label for="Advance">Advance<button id="Advance"></button></label> 
    <label for="Custom">Speed <input type="text" name="speed" id="speed"></label> 
    </div>
    <button id="Enter">OK</button>`
 //elements and stored value
 let easybtn=document.querySelector("#Easy")
 let Moderatebtn=document.querySelector("#Moderate")
 let Advancebtn=document.querySelector("#Advance")
 let speedField=document.querySelector("#speed")
 let allbtn=document.querySelectorAll(".levelField button")
 let okBtn=document.querySelector("#Enter")
 let SpeedOfSnake=parseInt(localStorage.getItem("speed"));
 let active=parseInt(localStorage.getItem("active"))

 //intital
 speedField.value=""+SpeedOfSnake

if(active!=3){
    allbtn[active].style.backgroundColor="royalblue"
}

 //eventlistner
 allbtn.forEach((element,index)=>{
    console.log(element)
    element.addEventListener("click",()=>{
        active=index
        element.style.backgroundColor="royalblue"
        for(let i=0;i<3;i++){
            if(index!=i){
                allbtn[i].style.backgroundColor="transparent"
            }
        }
        localStorage.setItem("active",active)
    })
 })
 easybtn.addEventListener("click",()=>{
    SpeedOfSnake=4
    speedField.value=SpeedOfSnake
 })
 Moderatebtn.addEventListener("click",()=>{
    SpeedOfSnake=8
    speedField.value=SpeedOfSnake
 })
 Advancebtn.addEventListener("click",()=>{
    SpeedOfSnake=12
    speedField.value=SpeedOfSnake
 })
 speedField.addEventListener("keyup",()=>{
    allbtn.forEach(element=>{
        element.style.backgroundColor="transparent"
    })
    if((parseInt(speedField.value)>=0 && parseInt(speedField.value)<=12) && parseInt(speedField.value)%4===0){
        active=parseInt(speedField.value)/4 -1
        allbtn[active].style.backgroundColor="royalblue"

    }
    active=3
    localStorage.setItem("active","3")
    SpeedOfSnake=speedField.value
    localStorage.setItem("speed",speedField.value)
 })
 okBtn.addEventListener("click",()=>{
    localStorage.setItem("active",active)
    localStorage.setItem("speed",SpeedOfSnake)
    bx.style.animation="zoomout 0.5s ease forwards"
    setTimeout(()=>{
        bx.remove()
    },500)
    localStorage.setItem("newSpeed",-1)
 })

}
arr[1].addEventListener("click",()=>{
    level()
})


function stats(){
    let bx=msgbox()
  
    bx.innerHTML=`
    <p>ScoreBoard</p>
    <div class="line">
        <div class="row">
            <p>HighScore</p>
            <p id="HS">0</p>
        </div>
        <div class="row">
            <p>Last Score</p>
            <p id="LS">0</p>
        </div>
        <button>OK</button>
    </div>
    `
    HS.innerHTML=localStorage.getItem("Highscore")
    LS.innerHTML=(localStorage.getItem("lastScore")==null)?"0":localStorage.getItem("lastScore")
    document.querySelector(".line button").addEventListener("click",()=>{
        bx.style.animation="zoomout 0.5s ease forwards"
        setTimeout(()=>{
        bx.remove()
        },500)
    })

}
arr[2].addEventListener("click",stats)