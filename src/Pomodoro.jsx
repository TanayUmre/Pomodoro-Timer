import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./main.css";

function Pomodoro(){
    const [timeLeft,setTimeLeft]=useState(30*60);
    const [isRunning,setIsRunning]=useState(false);
    const [isDark,setIsDark]=useState(true);
    const [duration,setDuration]=useState(30);
    const [customMin,setCustomMin]=useState("");

    const TOTAL_TIME=duration*60;

    useEffect(()=>{
        if (!isRunning) return;
        const interval=setInterval(()=>{
        setTimeLeft((prev)=>{
            if(prev<=1){
                clearInterval(interval);
                setIsRunning(false);
                confetti({particleCount:150,spread:100,origin:{y:0.6}});
                return 0;
            }
            return prev-1;
        });
        },1000);
        return ()=>clearInterval(interval);
    },[isRunning]);

    const minutes=Math.floor(timeLeft/60);
    const seconds=timeLeft % 60;
    const formattedTime=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    const progress=timeLeft/TOTAL_TIME;
    const circumference=2*Math.PI*120;
    const dashOffset=circumference*(1-progress);
    const changeDuration=(newDuration)=>{
        setIsRunning(false);
        setDuration(newDuration);
        setTimeLeft(newDuration*60);
    }
    const handleCustomDuration=(e)=>{
        e.preventDefault();
        const newduration=Number(customMin);
        if(!Number.isInteger(newduration) || newduration<1 || newduration>180)
        {
            return;
        }
        changeDuration(newduration);
        setCustomMin("");
    }
    const handleStartPause=()=>{
        if(timeLeft===0){
            setTimeLeft(TOTAL_TIME);
        }
        setIsRunning((prev)=>!prev);
    };

    const handleReset=()=>{
        setIsRunning(false);
        setTimeLeft(TOTAL_TIME);
    };

    return (
        <div className={`pomodoro-container ${isDark?"dark":"light"}`}>
            <div className="pomodoro-card">
                <div className="timer-header">
                    <button className="theme-button" onClick={() => setIsDark((prev) => !prev)}>
                        {isDark?"☀️":"🌙"}
                    </button>
                    <div className="timer-label">
                    {timeLeft===0?"Session Complete 🎉":isRunning?"FOCUS":"READY TO FOCUS"}
                    </div>
                </div>
                <div className="duration-settings">
                    <p className="duration-title">Choose your duration</p>
                    <div className="duration-presets">{[15,30,45,60].map((min)=>(
                        <button key={min} className={`duration-button ${duration==min?"selected":""}`} onClick={()=>changeDuration(min)} disabled={isRunning}>{min} min</button>))}
                    </div>
                    <form className="custom-duration-form" onSubmit={handleCustomDuration}>
                        <input type="number" min="1" max="180" step="1" value={customMin} onChange={(e)=>{setCustomMin(e.target.value)}} placeholder="Custom minutes(1-180)" aria-label="Custom timer duration in minutes" disabled={isRunning} required/>
                        <button type="submit" disabled={isRunning}>Apply</button>
                    </form>
                </div>
                <div className="timer-wrapper">
                    <svg className="progress-ring" width="280" height="280" viewBox="0 0 280 280">
                        <circle className="progress-ring-background" cx="140" cy="140" r="120"/>
                        <circle className="progress-ring-progress" cx="140" cy="140" r="120" strokeDasharray={circumference} strokeDashoffset={dashOffset}/>
                    </svg>
                    <div className="timer-text">
                        <span className="time">{formattedTime}</span>
                        <span className="minutes-label">MINUTES</span>
                    </div>
                    </div>
                    <div className="controls">
                    <button className="start-button" onClick={handleStartPause}>
                        {timeLeft===0?"Start Again":isRunning?"Pause":"Start"}
                    </button>
                    <button className="reset-button" onClick={handleReset}>
                        Reset
                    </button>
                    </div>
                    <div className="session-info">
                    <span className="dot"></span>
                    {duration} minute focus session
                </div>
            </div>
        </div>
    );
}

export default Pomodoro;