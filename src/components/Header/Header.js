import React from 'react'
import classes from './Header.module.scss'
import Input from '../UI/Input/Input'
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";

const Header = props => {

        return (
            <div className={classes.Header}>
                <div className={classes.Header__inner}>
                    <h1>Weather App</h1>
                    <form onSubmit={event => props.onSumbitHandler(event)} className={classes['Header__search-form']}>
                        {/*<Input*/}
                        {/*    role="search"*/}
                        {/*    type="text"*/}
                        {/*    placeholder="Search"*/}
                        {/*    value={props.value}*/}
                        {/*    handleInput={event => props.onChangeHandler(event)}*/}
                        {/*/>*/}
                        <PlacesAutocomplete
                            // handleInput={event => props.onChangeHandler(event)}
                            // returnCoords={props.returnCoords}
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
