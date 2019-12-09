import React, { Component } from "react";
import {Link} from 'react-router-dom'
import { Input,Button } from '../UI/index'
import './Header.scss';

class Header extends Component {
           
    render() {
        return (
            <header>
               <div className="header__block">
                    <div  className="headBlog"> 
                        <img src="../../src/images/toy.png" alt=""/>
                    </div>
               </div>
               <div className="header__center">
                    <Link to="/" >
                        <h1>Блог</h1>
                    </Link>
               </div>
               <div className="header__block">
                    <Link to="/add" >
                        <Button
                            styles='Redact'
                            typeClick='link'
                            //href='/add'
                            value='Добавить статью'
                        />
                   </Link>
               </div>
            </header>
        )
    }
}

export default Header;