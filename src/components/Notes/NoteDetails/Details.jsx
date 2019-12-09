import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import { Input,Button,TextField } from '../../UI/index'
import './Details.scss';



class NoteDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            add:false,
            disabled:true,
            redactNote:false,
        }
    }

    componentWillMount(){
        let item =JSON.parse(localStorage.getItem("data"));
       
        this.setState({
             ...this.state,
            id:item.id ? item.id :null,
            title: item.title ? item.title : null,
            shortDescription: item.shortDescription ? item.shortDescription : null,
            fullDescription: item.fullDescription ? item.fullDescription : null,
            date: item.date ? item.date : null,
            comments: item.comments ? item.comments :[],
            data:item,
            add:false,
            redactComment:false
        })
        
    }
    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    redactNote(){
        this.setState({
            ...this.state,
            disabled:false,
            redactNote:true
        })

    }

    saveRedactNote(){
        this.setState({
            ...this.state,
            disabled:true,
            redactNote:false,
            add:false
        })
        let items =JSON.parse(localStorage.getItem("data"));
        let notes =JSON.parse(localStorage.getItem("notes"));

        const index = notes.findIndex((e) => e.id === items.id);
        notes[index]=this.state
        localStorage.setItem("notes",JSON.stringify(notes));
    }
    addComment(){
        this.setState({
            ...this.state,
            add:true
        })
    }

    canselComment(){
        this.setState({
            ...this.state,
            add:false
        })
    }

    saveComment(){
 
        this.setState({
            ...this.state,
            add:false
        })
        
        this.state.comments.push({
            id:Math.floor(Math.random() * 1000),
                    author:this.state.author,
                    textComments:this.state.textComments,
                    disabledComment:true
        })

        let data = JSON.parse(localStorage.getItem("data"));
        data.comments = this.state.comments
        localStorage.setItem("data",JSON.stringify(data));
        
        this.saveRedactNote()
        this.componentWillMount()
    }
    
    redactComment(item){
        
        let items =JSON.parse(localStorage.getItem("data"));
        
        const indexComments = items.comments.findIndex((e) => e.id === item.id);
        let dataItem = items.comments[indexComments]
        this.setState({
            ...this.state,
            author:dataItem.author,
            textComments: dataItem.textComments,
            redactComment:true,
            idComment:item.id
        })
        
        let dataComment={
            id:item.id,
            author:this.state.author,
            textComments:this.state.textComments,
            disabledComment:false
        }

        this.state.comments[indexComments]=dataComment

        items.comments = this.state.comments
        localStorage.setItem("data",JSON.stringify(items));
    }
    
    updateCompany(event, index) {
       
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            ...this.state,
            [name]: value,
            redactIndex:index
        })
        const { comments, redactIndex } = this.state;
        let data = JSON.parse(localStorage.getItem("data"));
        data.comments[index]= {
            ...comments[index],
            author: this.state.comments[index].author,
            textComments :  this.state.comments[index].textComments,
        }
        localStorage.setItem("data",JSON.stringify(data));
        
    }

    saveCommentItem(){               
        let data = JSON.parse(localStorage.getItem("data"));
        const { comments, redactIndex } = this.state;
        let {author,textComments,disabledComment} = data.comments[redactIndex]
        data.comments[redactIndex] = {
            ...data.comments[redactIndex],
            author: author!=undefined ? author : this.state.author,
            textComments: textComments!=undefined ?textComments : this.state.textComments,
            disabledComment:true,
        }
        // this.setState({
        //     ...this.state,
        //     redactComment:false,
        //     comments: data.comments
        // })
        localStorage.setItem("data",JSON.stringify(data))
        let notes =JSON.parse(localStorage.getItem("notes"));
        const indexs = notes.findIndex((e) => e.id === data.id);
        notes[indexs]=data
        localStorage.setItem("notes",JSON.stringify(notes));
        location.reload()
    }

    deleteComments(item){
        let items =JSON.parse(localStorage.getItem("data"));
        const indexComments = items.comments.findIndex((e) => e.id === item.id) 
        items = this.state
        items.comments.splice(indexComments, 1)
        localStorage.setItem('data',JSON.stringify(items));
        let notes =JSON.parse(localStorage.getItem("notes"));
        const index = notes.findIndex((e) => e.id === items.id);
        notes[index]=items
        localStorage.setItem("notes",JSON.stringify(notes));
        this.componentWillMount()
    }
   

    render(){

        return(

            <div className="Note" 
            >
                <div className="Note__Details">
                    <div className="Note__Details-main">
                        <div className="Note__Details-main__content">
                            <TextField
                                name='title'
                                required
                                value={this.state.title}
                                disabled={this.state.disabled}
                                onChange={this.handleChange.bind(this)}
  
                            />
                            {this.state.redactNote===true &&
                            <TextField
                                name='shortDescription'
                                label='Краткое описание'
                                required
                                value={this.state.shortDescription}
                                disabled={this.state.disabled}
                                onChange={this.handleChange.bind(this)}
  
                            />
                            }
                            <TextField
                                name='fullDescription'
                                typeEnter='textarea'
                                required
                                value={this.state.fullDescription}
                                disabled={this.state.disabled}
                                onChange={this.handleChange.bind(this)}
                            />
                            <TextField
                                name='date'
                                value={this.state.date}
                                disabled={true}
                            />
                        </div>
                        
                        {this.state.redactNote!==true ?
                            <Button
                                styles='Redact' 
                                value='Редактировать статью'
                                onClick={this.redactNote.bind(this)}
                            />
                        : 
                            <Button
                                styles='Save'
                                value='Сохранить'
                                onClick={this.saveRedactNote.bind(this)}
                            />

                        }
                        
                    </div>
                    {this.state.data.comments && 
                    this.state.data.comments.length!=0 ?
                    <div>
                         <h3>Комментарии:</h3>
                        <div className="NoteDetails__comments">
                            {this.state.data.comments.map((comment,i)=>{

                                return(
                                    <div key={i} className="NoteDetails__comment">
                                       <div className="NoteDetails__comment-content">
                                        <TextField 
                                                name='author'
                                                // label='Автор'
                                                value={comment.author}
                                                disabled={comment.disabledComment}
                                                onChange={(e) => this.updateCompany(event, i)}
                                                
                                            />
                                            <TextField 
                                                name='textComments'
                                                // label='Комментарий'
                                                typeEnter='textarea'
                                                className="NoteDetails__comment-text"
                                                value={comment.textComments}
                                                disabled={comment.disabledComment}
                                                onChange={(e) => this.updateCompany(event, i)}
                                                
                                            />
                                       </div>
                                        
                                            {this.state.redactComment!==true ?

                                            <div className="NoteDetails__comment-button">
                                                <Button
                                                    styles='Redact'
                                                    value="Редактировать"
                                                    onClick={this.redactComment.bind(this,comment)}
                                                />
                                                <Button
                                                    styles='Cansel'
                                                    onClick={this.deleteComments.bind(this,comment)}
                                                    value='Удалить'
                                                />
                                            </div>
                                            :
                                            comment.disabledComment!=true &&
                                            <div className="NoteDetails__comment-button">
                                                <Button
                                                    styles='Save'
                                                    value="Сохранить"
                                                    onClick={this.saveCommentItem.bind(this,comment)}
                                                />
                                            </div>
                                            }
                                    </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                   :
                   null
               }
               <div>
                {this.state.add!==false ?
                    <form  onSubmit={this.saveComment.bind(this)} >
                        <Input 
                            name='author'
                            label='Автор'
                            required
                            onChange={this.handleChange.bind(this)}
                        />
                        <Input 
                            name='textComments'
                            label='Комментарий'
                            typeEnter='textarea'
                            required
                            onChange={this.handleChange.bind(this)}
                        />
                        <div className='add__comment'>
                            <Button 
                                type="submit"
                                styles='Save' 
                                
                                value='Сохранить комментарий'/>
                            <Button 
                                styles='Cansel' 
                                onClick={this.canselComment.bind(this)} 
                                value='Отмена'/>
                        </div>
                    </form>
                    :
                    <Button styles='Save' onClick={this.addComment.bind(this)} value='Добавить комментарий'/>
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default NoteDetails