import React, {useEffect, useState} from 'react'
import TimerSharpIcon from '@material-ui/icons/TimerSharp';


export const Contdown = () => {


    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`${year}-10-1`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [year] = useState(new Date().getFullYear());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
        );
    });







    return (
        <div>
            {/*<h1>HacktoberFest {year} Countdown</h1>*/}
            {/*<h2>With React Hooks!</h2>*/}
            {/*{timerComponents.length ? timerComponents : <span>Time's up!</span>}*/}


            <div className="contDown1">
                <h1 className="time-head" id="headline">Countdown to the first conference</h1>
                <div className="contDown">
                    <TimerSharpIcon className="count-icon" />
                    <div className="count-day">  {timeLeft.days} DAYS</div>
                    <div className="count-hours"> {timeLeft.hours} HOURS</div>
                    <div className="count-min">{timeLeft.minutes} MINUTES</div>
                    <div className="count-sec"> {timeLeft.seconds} SECONDS</div>
                </div>
            </div>
        </div>
    );
}