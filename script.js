//buttons
const timer= document.getElementById("timer");
const startBtn= document.getElementById("start-btn");
const pauseBtn= document.getElementById("pause-btn");
const resetBtn= document.getElementById("reset-btn");

let currentMode="pomodoro";//for alarms
//alarms
const pomodoroSound= new Audio("sounds/pomodoro.mp3");
const breakSound=new Audio("sounds/break.mp3");

//click sound
const clickSound=new Audio("sounds/click.mp3");
document.querySelectorAll("button").forEach(button=>{
    button.addEventListener("click",function(){
        clickSound.currentTime=0;
        clickSound.play();
    });
});

//time variables
let minutes=25;
let seconds=0;
let interval=null;

//function to update the time on the screen
function updateTimer(){
    /*String().padStart convert minute to string first, 
    and then makes the string 2 char long which means if it 
    is shorter it adds "0", to teh string.*/
    
    let formattedMinutes = String(minutes).padStart(2,"0");
    let formattedSeconds = String(seconds).padStart(2,"0");

    timer.innerText= `${formattedMinutes}:${formattedSeconds}`;
}
updateTimer();

//countdown function
function startCountdown(){
    if(interval!==null){
    return;
}
     interval=setInterval(function(){
        if(seconds===0){
            if(minutes===0){
                clearInterval(interval);
                interval=null;
                if(currentMode==="pomodoro"){
                    pomodoroSound.play();
                }
                else{
                    breakSound.play();
                }
                return;
            }
            minutes--;
            seconds=59;
        }
        else{
            seconds--
        }
        updateTimer();
    },1000);
}

//Start ,Pause and Reset Buttons
startBtn.addEventListener("click",startCountdown);
pauseBtn.addEventListener("click",function(){
    clearInterval(interval);
    interval=null;
});
resetBtn.addEventListener("click",function(){
    clearInterval(interval);
    interval=null;
    minutes=25;
    seconds=0;
    updateTimer();
});

function removeActive(){
    pomodoroBtn.classList.remove("active");
    shortBtn.classList.remove("active");
     longBtn.classList.remove("active");

}

//modes
const pomodoroBtn=document.getElementById("pomodoro-btn");
const shortBtn=document.getElementById("short-btn");
const longBtn=document.getElementById("long-btn");

//pomodoro mode
function setPomodoro(){
    currentMode="pomodoro";
    clearInterval(interval);
    interval=null;
    minutes=25;
    seconds=0;
 updateTimer();
 removeActive();
 pomodoroBtn.classList.add("active");
}
//short break
function setShortBreak(){
    currentMode="short";
    clearInterval(interval);
    interval=null;
     minutes=5;
     seconds=0;
     updateTimer();removeActive();
 shortBtn.classList.add("active");
}
//long break
function setLongBreak(){
    currentMode="long";
    clearInterval(interval);
    interval=null;
    minutes=10;
    seconds=0;
    updateTimer();
    removeActive();
 longBtn.classList.add("active");
}
pomodoroBtn.addEventListener("click",setPomodoro);
shortBtn.addEventListener("click",setShortBreak);
longBtn.addEventListener("click",setLongBreak);
