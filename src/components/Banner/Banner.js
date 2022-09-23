import React, {useEffect, useState} from 'react'
import classes from './Banner.module.scss'
import WeatherInfo from '../WeatherInfo/WeatherInfo'

const Banner = props => {
    const [timesOfDay, setTimesOfDay] = useState(null) //morning day evening night
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const tick = setInterval(() => {
            let now = new Date();
            setDate(now);
        }, 1000);

        return () => clearInterval(tick);
    }, []);

    const cls = [
        classes.Banner,
        classes[timesOfDay]
    ]

    const defineTimesOfDay = time => {
        if (time > 21 || time <= 4) {
            setTimesOfDay('night')
        }

        if (time > 4 && time <= 9) {
            setTimesOfDay('morning')
        }

        if (time > 9 && time <= 17) {
            setTimesOfDay('day')
        }

        if (time > 17 && time <= 21) {
            setTimesOfDay('evening')
        }
    }

    useEffect(() => {
        let time = date.toLocaleTimeString('en-US', { timeZone: props.timezone, hour12: false });
        let hours = time.substring(0,2)
        defineTimesOfDay(hours)
    }, [date])

    return (
        <>
            <div className={cls.join(' ')}/>

            <div className={classes.Section}>
                <div className={classes.Location__info}>
                    <div className={classes.Location__city}>{props.city}</div>

                    <div className={classes.Location__time}>{`${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</div>
                </div>

                <WeatherInfo
                    typeView={props.typeView}
                    current={props.current}
                    metcast={props.metcast}
                    units={props.units}
                />
            </div>
        </>
    )
}


export default Banner
