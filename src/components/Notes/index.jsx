import React, { Component } from "react";
const notes = require('../../../back/Notes.json');

import { Pagination, Button } from '../UI/index'
import './Notes.scss';

  class Page extends React.Component {
      
    constructor(props){
        super(props)
        this.state={}
        this.handleClickDetails = this.handleClickDetails.bind(this);
        
    }
    componentDidMount(){
        //localStorage.clear()
        
        let newNotes =JSON.parse(localStorage.getItem("notes"));
        if(newNotes===(undefined || null)){
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }

    handleClickDetails(item){
        localStorage.setItem("data", JSON.stringify(item));
        let data =JSON.parse(localStorage.getItem("data"));
        this.props.history.push(`/note/${data.id}/details`)
    }

    removeNote(item){
        let notes =JSON.parse(localStorage.getItem("notes"));
        const index = notes.findIndex((e) => e.id === item.id);
        notes.splice(index, 1);
        localStorage.setItem('notes',JSON.stringify(notes));
        this.props.history.push(`/`)
        this.componentDidMount()
    }


    render() {
      const data = this.props.data
      
      return (
        <div>
         {data.map((item,i)=>{
                 
                    return(
                        <div key={i} className="Notes__list">
                            <div className="Notes__list-block">
                                <div 
                                    className="Notes__list-block__content"
                                    onClick={()=>this.handleClickDetails(item)}
                                >
                                    <h2  >{item.title}</h2>
                                    <p>{item.shortDescription}...</p>
                                    <span>{item.date}</span>
                                    <strong>Комментарии 
                                        <span> [{item.comments?item.comments.length:0}]</span>
                                    </strong>
                                </div>
                                <div className="Notes__list-block__remove">
                                    <Button 
                                        styles='Cansel'
                                        value='x'
                                        onClick={()=>this.removeNote(item)}
                                    />
                                </div>  
                            </div>
                            </div>
                    )})
                }
        </div>
      );
    }
  }


class Notes extends React.Component  {
    constructor(props){
        super(props)
    }
    

    render() {
        
        let newNotes =JSON.parse(localStorage.getItem("notes"));
        if(newNotes===(undefined || null)){
            newNotes = notes
        }
        return (
            <div className="Notes">
                <Pagination
                    data={newNotes}
                    history={this.props.history}
                >
                    <Page />
                </Pagination>
            </div>
        )
    }
}

export default Notes;