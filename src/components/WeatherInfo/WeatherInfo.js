import React from 'react'
import classes from './WeatherInfo.module.scss'

const WeatherInfo = props => {
    const {forecast, current} = props.value
    const {temperatureUnits, precipitationUnits, windUnits} = props.units
    const cls = [
        classes.WeatherInfo,
        classes[props.typeView]
    ]

    const renderTemperature = param => {
        switch(param) {
            case 'card':
                return <div className={classes.Temperature}><i className="fa fa-temperature-high"></i><span>{forecast.temperature.day}{temperatureUnits}</span> / <span>{forecast.temperature.night}{temperatureUnits}</span></div>
            case 'banner':
                return <div className={classes.Temperature}><span>{current.temperature}{temperatureUnits}</span></div>
            default:
                return null
        }
    }

    const renderDescriptionImage = param => {
        switch(param) {
            case 'card':
                return <img src={forecast.description.image} alt={`It's ${forecast.description.text}`} />
            case 'banner':
                return null
            default:
                return null
        }
    }

    const renderPrecipitation = param => {
        switch(param) {
            case 'card':
                return <span>{forecast.precipitation}</span>
            case 'banner':
                return <span>{current.precipitation}</span>
            default:
                return null
        }
    }

    const renderWind = param => {
        switch(param) {
            case 'card':
                return <span>{forecast.wind}</span>
            case 'banner':
                return <span>{current.wind}</span>
            default:
                return null
        }
    }

    return (
        <div className={cls.join(' ')}>

            <div className={classes['CurrentConditions_primary']}>
                { renderTemperature(props.typeView) }

                <div className={classes.WeatherInfo__description}>

                    { renderDescriptionImage(props.typeView) }
                    <p>{current.description}</p>

                </div>
            </div>

            <div className={classes['CurrentConditions_secondary']}>
                <div className={classes.Wind}>
                    <i className="fa fa-wind"></i>
                    {renderWind(props.typeView)}
                    {windUnits}
                </div>

                <div className={classes.Precipitation}>
                    <i className="fa fa-umbrella"></i>
                    {renderPrecipitation(props.typeView)}
                    {precipitationUnits}
                </div>
            </div>

        </div>
    );
};

export default WeatherInfo
