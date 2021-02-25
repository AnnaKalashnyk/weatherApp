import React from 'react'
import classes from './Header.module.scss'
import Input from '../UI/Input/Input'

const Header = props => {

        return (
            <div className={classes.Header}>
                <div className={classes.Header__inner}>
                    <h1>Weather App</h1>
                    <form onSubmit={event => props.onSumbitHandler(event)} className={classes['Header__search-form']}>
                        <Input
                            role="search"
                            type="text"
                            placeholder="Search"
                            value={props.value}
                            onChange={event => props.onChangeHandler(event)}
                        />
                        <button>
                            <i className="fa fa-search"/>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        )
}

export default Header
