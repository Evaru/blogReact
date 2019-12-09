import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import './Input.scss';

const Input = props => {
    const typeEnter = props.typeEnter || 'input'
    const inputType = props.type || 'text'
    const inputId = `${Math.random()}`
    
    return (
        <div className="Input">
            <label htmlFor={inputId}>{props.label}</label>
            {typeEnter==='textarea' ?
                <TextareaAutosize 
                    id={inputId}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    required={props.required}
                    disabled={props.disabled}
                />
                :
                <input 
                    type={inputType}
                    id={inputId}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    required={props.required}
                    disabled={props.disabled}
                />
            }
        </div>
    )
}

export default Input;