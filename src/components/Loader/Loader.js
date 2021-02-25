import React from 'react'
import classes from './Loader.module.scss'

const Loader = props => {
    return (
        <>
            <div className={classes.Loader}>
                <div className={classes.Loader__circle}>
                    <div></div>
                </div>
                <p className={classes.Loader__text}>Checking your location...</p>
            </div>
        </>
    );
};

export default Loader;
