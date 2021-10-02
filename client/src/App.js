
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Form from './components/Form';
import AddPosts from './components/User/AddPosts';
import EditPost from './components/User/EditPost';

function App() {
  return (
    <div className="container" >

      <Switch>
        <Route exact path="/posts/edit">
          <EditPost />
        </Route>
        <Route exact path="/posts/create">
          <AddPosts />
        </Route>
        <Route exact path="/">
          <Link to="/register" className="btn btn-primary">Register</Link>
          <Link to="/login" className="btn btn-danger">Login</Link>
        </Route>
        <Route exact path="/register">
          <Form register={true} />
        </Route>
        <Route exact path="/login">
          <Form register={false} />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
        <Redirect to="/not-found" />
      </Switch>


    </div>
  );
}

export default App;
