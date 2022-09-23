import React, {useState, useEffect} from 'react'
import classes from './Layout.module.scss'
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'

const Layout = () => {
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [currentCity, setCurrentCity] = useState('')
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [error, setError] = useState(null)
    const [units, setUnits] = useState({
        temperatureUnits: '°',
        windUnits: 'km/h',
        precipitationUnits: 'mm'
    })
    const [currentWeather, setCurrentWeather] = useState({
        description: '',
        temperature: 0,
        wind: 0,
        precipitation: 0,
    })
    const [metcast, setMetcast] = useState({
        description: {
            text: '',
            image: ''
        },
        temperature: {
            day: 0,
            night: 0
        },
        wind: 0,
        precipitation: 0,
    })

    const optionsForNavigator = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000}

    const updateData = async () => {
        const options = {
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
            params: {lon: lng, lat: lat},
            headers: {
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                'X-RapidAPI-Key': '931ab49f2fmshff09ac17aa440bap19acfejsn03bfeab066e6'
            }
        };
        axios.request(options).then(function (response) {
            setTimezone(response.data.data[0].timezone)
            setCurrentCity(response.data.data[0].city_name)
            setCurrentWeather({
                description: response.data.data[0].weather.description,
                temperature: Math.round(response.data.data[0].temp),
                wind: Math.round(response.data.data[0].wind_spd),
                precipitation: response.data.data[0].precip,
            })

        }).catch(function (error) {
            console.error(error);
        });
    }

    let newLat,newLng

    const getPosition = (options) => {
        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        })
    }

    useEffect(() => {
        getPosition(optionsForNavigator)
            .then(res => {
                newLat = JSON.stringify(res.coords.latitude)
                newLng = JSON.stringify(res.coords.longitude)
                setLat(newLat);
                setLng(newLng);
            })
            .then(() => {
                if (lat !== null && lng !== null) {
                    updateData()
                }
            })
            .catch(error => {
                setError(error)
            })
    }, [lat,lng,currentCity])


    const onChangeHandler = event => {
        event.preventDefault()
        setSearchResult(event.target.value)

    }

    const onSumbitHandler = event => {
        event.preventDefault()
        updateData(searchResult)
        setSearchResult('')
    }

    const returnCoords = (lat, lng) => {
        return setLat(lat), setLng(lng)
    }

        return (
            <div className={classes.Layout}>
                {loading ? <Loader/>
                : !error
                    ? <>
                        <Header
                        updateData={updateData}
                        onSumbitHandler={onSumbitHandler}
                        onChangeHandler={onChangeHandler}
                        value={searchResult}
                        returnCoords={returnCoords}
                        />

                        <Banner
                        city={currentCity}
                        timezone={timezone}
                        typeView='banner'
                        current={currentWeather}
                        metcast={metcast}
                        units={units}
                        />
                    </>
                        : <div className={classes.error}>{error}</div>
                }
            </div>
        )
}

export default Layout
