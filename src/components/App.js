import React, { Component } from "react";
import Header from "../components/Header/index.jsx";
import Notes from "../components/Notes/index.jsx"
import NoteDetails from "../components/Notes/NoteDetails/Details.jsx"
import AddNote from "../components/AddNote/AddNote.jsx"
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="content">
                <Router>   
                    <Header/> 
                    <Switch >
                        <Route path="/" exact component={Notes}/>
                        <Route path="/add" exact component={AddNote}/>
                        <Route path="/note/:id/details" exact component={NoteDetails}/>
                        <Route path="*" exact />   
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;