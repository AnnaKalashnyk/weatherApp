import React from 'react'
import classes from './Input.module.scss'

const Input = props => {
    const cls = [
        classes.Input,
        props.role
    ]
    const inputType = props.type || 'type'
    const htmlFor = `${inputType}-${Math.random}`

    return (
        <div className={cls.join(' ')}>
            {
                props.label
                ? <label htmlFor={htmlFor}>{props.label}</label>
                    : null
            }

            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />

        </div>
    );
};

export default Input;
