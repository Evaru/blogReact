import React, { Component } from "react";
import './Button.scss';

const Button = props => {
    const buttonType = props.type || 'button'
    const typeClick = props.typeClick || 'button'
    const className = props.styles ? props.styles : 'Button'
    
    return (
        <div 
            className={className}
            onClick={props.onClick}
            >
         {typeClick==='link' ?
            <a 
                name={props.name}
                href={props.href}
            >
                {props.children ? props.children : props.value }
            </a>
            :
            <button 
                type={buttonType}
                name={props.name}
               
                onSubmit={props.onSubmit}
                disabled={props.disabled}
            >
                 {props.children ? props.children : props.value }
            </button>
         }
        </div>
    )
}

export default Button;