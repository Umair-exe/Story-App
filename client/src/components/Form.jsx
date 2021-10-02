import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';


import axios from 'axios';
import { isLoggedIn } from '../services/AuthServices';


const Form = ({ register }) => {
    let history = useHistory();
    const [msg, setMsg] = useState('');
    const [isloading, setIsloading] = useState(false);
    const [login, setLogin] = useState(false);
    const [error, seterror] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isLoggedIn()) {
            return history.push('/home');
        }

    }, [history])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsloading(true)

        if (register) {
            handleRegister();

        }
        else {
            handleLogin();
        }
    }

    const handleRegister = async () => {
        try {
            const { data: { msg } } = await axios.post('https://post-app-server-1.herokuapp.com/registerUser', {
                name,
                email,
                password,
            })
            setMsg(msg);
            setEmail('');
            setIsloading(false);
            setPassword('');
            history.push("/login");
            setTimeout(() => {
                setMsg(null);
            }, 5000);

        } catch (err) {
            setMsg(err.msg);
            setTimeout(() => {
                setMsg(null);
            }, 5000);
            console.log(err.msg)
        }
    }
    const logged = () => {
        setLogin(true);
    }


    const handleLogin = async () => {
        try {
            let res = await axios.post("http://localhost:5000/auth", {
                email,
                password,
            })
            if (res.data.loggedIn) {

                const { token } = res.data;
                localStorage.setItem("x-auth-token", token);
                history.push("/home")
            }
            else {
                setMsg(res.msg)
                setTimeout(() => {
                    setMsg(null);
                }, 5000);
            }
        } catch (error) {
            if (error) {
                seterror("incorrect details")
                setTimeout(() => {
                    seterror(null);
                }, 5000);
            }
            console.log(error);
        }
    }


    return (
        <div className="container">
            <h1>{register ? "Register" : "Login"}</h1>
            {msg ? <div className="alert alert-success">
                <strong>{msg}</strong>
            </div> : null}

            {error ? <div className="alert alert-danger">
                <strong>{error}</strong>
            </div> : null}
            <form onSubmit={handleSubmit} >
                {register && (<div className="form-group">
                    <input className="form-control" type="text" onChange={e => setName(e.target.value)} placeholder="enter name" required />
                </div>)}

                <div className="form-group">
                    <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="enter email" required />
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password" />
                </div>
                {!isloading ? <div className="spinner-border"></div> : null}
                {register ? <div className="form-group">
                    <button className="btn btn-primary">Register</button>
                </div> : <div className="form-group">
                    <button className="btn btn-primary" >Login</button>

                </div>}

                {register ? <div className="form-group">
                    <Link to="/login" className="btn btn-primary" >Login</Link>
                </div> : <div className="form-group">
                    <Link to="/register" className="btn btn-primary" >Register</Link>
                </div>}
            </form>

            {login ? history.push('/home') : null}
        </div>
    )
}

export default Form
