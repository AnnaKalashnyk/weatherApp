import React from 'react'
import classes from './Banner.module.scss'
import Geolocation from '../Geolocation/Geolocation'
import Clock from '../Clock/Clock'
import WeatherInfo from '../WeatherInfo/WeatherInfo'

const Banner = props => {
    const cls = [
        classes.Banner,
        classes[props.timesOfDay]
    ]

    return(
        <>
            <div className={cls.join(' ')}/>

            <div className={classes.Section}>
                <div className={classes['Location-info']}>
                    <Geolocation
                        city={props.city}
                    />

                    <Clock
                        currentTime={props.currentTime}
                    />
                </div>

                <WeatherInfo
                    typeView={props.typeView}
                    value={props.value}
                    units={props.units}
                />
            </div>
        </>
    )
}


export default Banner
