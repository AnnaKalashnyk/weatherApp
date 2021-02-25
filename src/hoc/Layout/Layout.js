import React, {Component} from 'react'
import classes from './Layout.module.scss'
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import axios from 'axios'
import moment from 'moment'
import Loader from "../../components/Loader/Loader";

class Layout extends Component {
    state = {
        timesOfDay: '', //morning day evening night
        currentTime: {
            time: moment(),
            timeZone: 'America/Los_Angeles'
        },
        currentCity: '',
        weatherValue: {
            current: {
                description: 'Sunny',
                temperature: 25,
                wind: 13,
                precipitation: 13,
            },
            forecast: [
                {
                    description: {
                        text: 'Sunny',
                        image: ''
                    },
                    temperature: {
                        day: 32,
                        night: 14
                    },
                    wind: 13,
                    precipitation: 13,
                }
            ]
        },
        units: {
            temperatureUnits: '°',
            windUnits: 'km/h',
            precipitationUnits: 'mm'
        },
        searchResult: '',
        loading: true,
        error: ''
    }

    async componentDidMount() {
        const currentIPApi = 'https://cors-anywhere.herokuapp.com/https://api.ipify.org?format=json'
        const currentLocationApi = 'https://cors-anywhere.herokuapp.com/http://ip-api.com/json'

        try {
            await axios.get(`${currentIPApi}`)
                .then(async res => {
                    const ip = res.data.ip
                    await axios.get(`${currentLocationApi}/${ip}`)
                        .then(data => {
                            this.setState(prevState => ({
                                currentCity: data.data.city,
                                currentTime: {
                                    ...prevState.currentTime,
                                    timeZone: data.data.timezone
                                },
                                loading: false
                            }))
                        })
                })



        } catch (e) {
            console.log(e)
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                error: 'Can not detect your city'
            }))
        }
        this.updateData(this.state.currentCity)
    }

    defineTimesOfDay = time => {
        if (time > 21 || time <= 4) {
            this.setState({
                timesOfDay: 'night'
            })
        }

        if (time > 4 && time <= 9) {
            this.setState({
                timesOfDay: 'morning'
            })
        }

        if (time > 9 && time <= 17) {
            this.setState({
                timesOfDay: 'day'
            })
        }

        if (time > 17 && time <= 21) {
            this.setState({
                timesOfDay: 'evening'
            })
        }
    }

    updateData = async value => {
        const weatherApi = 'http://dataservice.accuweather.com'
        const weatherApiKey = 'CMZ2s7kgJ9EJcnD2KDAvvJFBDLlQQMwK'

        try {
            const cityResponse = await axios.get(`${weatherApi}/locations/v1/cities/search.json?q=${value}&apikey=${weatherApiKey}&language=en-us`)

            let cityID = cityResponse.data[0].Key
            let cityTimeZone = cityResponse.data[0].TimeZone.Name
            const currentCondResponse = await axios.get(`${weatherApi}/currentconditions/v1/${cityID}.json?apikey=${weatherApiKey}&details=true`)
            const forecastsResponse = await axios.get(`${weatherApi}/forecasts/v1/daily/5day/${cityID}.json?apikey=${weatherApiKey}&details=true`)

            console.log(forecastsResponse)
            let currentCondData = currentCondResponse.data[0]

            this.setState(prevState => ({
                ...prevState,
                currentTime: {
                    time: currentCondData.LocalObservationDateTime,
                    timeZone: cityTimeZone
                },
                currentCity: cityResponse.data[0].EnglishName,
                weatherValue: {
                    current: {
                        description: currentCondData.WeatherText,
                        temperature: Math.round(currentCondData.Temperature.Metric.Value),
                        wind: currentCondData.Wind.Speed.Metric.Value,
                        precipitation: currentCondData.Precip1hr.Metric.Value,
                    }
                },
            }))
        } catch (e) {
            console.log(e)
            this.setState(prevState => ({
                ...prevState,
                error: 'Nothing found'
            }))
        }
        this.defineTimesOfDay(moment(this.state.currentTime.time).tz(this.state.currentTime.timeZone).format('HH'))
    }
    onChangeHandler = event => {
        event.preventDefault()

        this.setState(prevState => ({
            ...prevState,
            searchResult: event.target.value
        }))

    }

    onSumbitHandler = event => {
        event.preventDefault()
        this.updateData(this.state.searchResult)
        this.setState({
            searchResult: ''
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                {this.state.loading
                ? <Loader/>
                : this.state.error.length === 0
                    ? <>
                        <Header
                        updateData={this.updateData}
                        onSumbitHandler={this.onSumbitHandler}
                        onChangeHandler={this.onChangeHandler}
                        value={this.state.searchResult}
                        />

                        <Banner
                        timesOfDay={this.state.timesOfDay}
                        city={this.state.currentCity}
                        currentTime={this.state.currentTime}
                        typeView='banner'
                        value={this.state.weatherValue}
                        units={this.state.units}
                        />
                    </>
                        : <div>{this.state.error}</div>
                }
            </div>
        )
    }
}

export default Layout
