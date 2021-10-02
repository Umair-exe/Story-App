import axios from 'axios';
import React, { useState } from 'react'
import Auth from '../Auth'
import { useHistory } from 'react-router';

const AddPosts = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] =useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            body,
        }
       
        try {
            const res = await axios.post('http://localhost:5000/posts/create',data , {
                headers: {
                    "x-auth-token": localStorage.getItem("x-auth-token"),
                }
            })
            if(res.status === 200) {
                setMessage(res.data.message)
                setTitle('');
                setBody('');
                history.push('/home')
            }
            
        } catch (error) {
            console.log(error)
            
        }

        

    }

    return (
        <Auth>
            <h1>Add New Story </h1>
            {message? message: null}
            <form onSubmit={handleSubmit} >
             
                <div className="form-group">
                    <input className="form-control" onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder="enter title" required />
                </div>
                <div className="form-group">
                    <textarea className="form-control "  onChange={e => setBody(e.target.value)} value={body} type="body" placeholder="enter description" ></textarea>
                </div>
                <div className="form-group">
                   <input className="btn btn-primary" type="submit" name="submit" />
                </div>
            </form>

        </Auth>
    )
}

export default AddPosts
