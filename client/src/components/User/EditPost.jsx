import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Auth from '../Auth'
import { useHistory } from 'react-router';

const EditPost = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    let id = localStorage.getItem('post-id');

    useEffect(() => {
        fetchdata();
    }, [])

    
    const fetchdata = async () => {
     

        let res = await axios.get(`https://post-app-server-1.herokuapp.com/posts/${id}` , {
            headers: {
                'x-auth-token': localStorage.getItem("x-auth-token")
            }
        }).catch(err => console.log(err))
        if (res) {
     
            setTitle(res.data.title);
            setBody(res.data.body);

        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            body,
        }

        try {
            const res = await axios.put(`https://post-app-server-1.herokuapp.com/posts/${id}`, data, {
                headers: {
                    "x-auth-token": localStorage.getItem("x-auth-token"),
                }
            })
            if (res.status === 200) {
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
            <h1>Update Post </h1>
            {message ? message : null}
            <form onSubmit={handleSubmit} >

                <div className="form-group">
                    <input className="form-control" onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder="enter title" required />
                </div>
                <div className="form-group">
                    <textarea className="form-control " onChange={e => setBody(e.target.value)} value={body} type="body" placeholder="enter description" ></textarea>
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" name="submit" />
                </div>
            </form>

        </Auth>
    )
}

export default EditPost
