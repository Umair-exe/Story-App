import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'
import "./cards.css"

const Posts = ({ posts, getPosts }) => {

    const history = useHistory();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/posts/delete/${id}`, {
                headers: {
                    "x-auth-token": localStorage.getItem('x-auth-token')
                }
            })
            getPosts();
        } catch (error) {
            console.log(error)

        }

    }
    const handleUpdate = (id) => {
        localStorage.setItem("post-id",id);
        history.push('/posts/edit')
    }
    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} className="card">
                    <div className="container">
                        <div>
                            <h4 style={{padding:"5px 10px"}}><b>{post.title}</b></h4>
                            <p style={{padding:"5px 30px"}}>{post.body}</p>
                        </div>
                        <div className="button">
                            <button onClick={() => handleUpdate(post._id)} className="btn btn-warning" style={{marginRight:"5px"}}>Edit</button>
                            <button onClick={() => handleDelete(post._id)} className="btn btn-info ">Delete</button>
                        </div>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default Posts
