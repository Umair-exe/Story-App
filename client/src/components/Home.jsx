import React, { useEffect, useState } from 'react'
import axios from "axios";
import Auth from './Auth';
import Posts from './User/Posts';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './style.css'



function Home() {

    const [posts, setPosts] = useState('');
    const [mount,setmount] = useState(true);

    let history = useHistory();
    useEffect(() => {
        if (mount) {
            getPosts();
        }
        return () => setmount(false)
    }, [posts,mount])

    const getPosts = async () => {
        let {data} = await axios.get('http://localhost:5000/posts/', {
            headers: {
                "x-auth-token": localStorage.getItem('x-auth-token'),
            }
        });
      
        data.length!==0 ? setPosts(data): setPosts('');
    }

    const logout = () => {
        console.log("logout called");
        localStorage.removeItem("x-auth-token");
        history.push('/');
    }
    return (
        <Auth>
            <div>
                <div className="head">
                    <h1>Posts</h1>
                    <button onClick={() => {
                        logout();
                    }} className="btn btn-danger float-right ">Logout</button>
                </div>
                <div>
                    <Link to="/posts/create"> <button className="btn btn-primary float-right">Add New Post </button></Link>
                </div>
                {!posts ? <div className=""><h1 className="text-center">No Stories</h1></div> : <Posts getPosts={getPosts} posts={posts} />}

            </div>
        </Auth>
    )
}

export default Home
