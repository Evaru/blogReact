import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import './TextField.scss';

const TextField = props => {
    const typeEnter = props.typeEnter || 'input'
    const inputType = props.type || 'text'
    const inputId = `${Math.random()}`
    
    return (
        <div className="TextField">
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
                    autoFocus={props.autoFocus}
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
                    autoFocus={props.autoFocus}
                />
            }
        </div>
    )
}

export default TextField;