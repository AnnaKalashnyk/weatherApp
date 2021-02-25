import React from 'react'
import classes from './Clock.module.scss'
import 'moment-timezone'
import moment from 'moment'
import 'moment-timezone'

const Clock = props => {

    const {time, timeZone} = props.currentTime

    return (
        <p className={classes.Clock}>
            {moment(time).tz(timeZone).format('HH:mm')}
        </p>
    );
};

export default Clock
