import React, { Component } from "react";
import { Input,Button } from '../UI/index'
import moment from 'moment'
import './AddNote.scss';

const momentDate = moment().lang('ru')

class AddNote extends Component {
    constructor(props){
        super(props)
        this.state={
            id:Math.floor(Math.random() * 1000),
            date: momentDate.format('DD.MM.YYYY')
        }
    }

    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    addNote(){
        let items =JSON.parse(localStorage.getItem("notes"));
        items.push(this.state)
        localStorage.setItem("notes", JSON.stringify(items));
        this.props.history.push(`/`)
    }

    render(){
        return(
            <div className="Note">
                <div className="Note__Details">
                    <form onSubmit={this.addNote.bind(this)}>
                        <Input
                            name='title'
                            label='Заголовок'
                            required
                            onChange={this.handleChange.bind(this)}
                        />
                        <Input
                            name='shortDescription'
                            label='Краткое описание'
                            required
                            onChange={this.handleChange.bind(this)}
                        />
                        <Input 
                            name='fullDescription'
                            label='Текст'
                            required
                            typeEnter='textarea'
                            onChange={this.handleChange.bind(this)}
                        />
                        <Button 
                            type='submit'
                            styles='Save'
                            value='Save'
                            
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddNote