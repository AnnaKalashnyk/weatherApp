import React from 'react'
import classes from './Geolocation.module.scss'

const Geolocation = props => {
    return (
        <h3 className={classes.Geolocation}>
            { props.city }
        </h3>
    );
};

export default Geolocation
