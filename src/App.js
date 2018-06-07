import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Api} from './api';
import {UsersList} from "./components/UsersList";
import {Loader} from "./components/Loader";
import {CreateUser} from "./components/CreateUser";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoading: 0,
            userToUpdate:{id:0,name:"",age:""}
        }
    }

    componentDidMount() {
        this.startLoading();
        Api.getUsers()
            .then((users) => {
                this.setState((prevState) => ({
                    users: users
                }));

                this.stopLoading();
            });
    }

    updateUser=(id)=>{
        const user = this.state.users[id-1]
        console.log(user)
    this.setState({userToUpdate:{id:user.id,name:user.username,age:user.age}})
    }

    stopLoading() {
        this.setState((prevState) => ({
            isLoading: --prevState.isLoading
        }));
    }

    startLoading() {
        this.setState((prevState) => ({
            isLoading: ++prevState.isLoading
        }));
    }

    onUserCreateHandler =(user)=>{
        this.startLoading();

        Api.createUser(user)
            .then((newUser) => {
                this.setState((prevState) => ({
                    users: [...prevState.users, newUser]
                }));
                this.stopLoading();
            });
    }

    onDeleteHandler =()=>{
        this.startLoading();

        Api.deleteUser(this.state.userToUpdate.id)
            .then((newUser) => {
                this.setState((prevState) => ({
                    users: [...prevState.users, newUser]
                }));
                this.stopLoading();
            });
    }

    render = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                {this.state.isLoading ? (<Loader/>) :
                    (<section className='app'>
                        <CreateUser onUserCreate={this.onUserCreateHandler}/>
                        <UsersList users={this.state.users} updateUser={this.updateUser}/>
                    </section>)}

                    <form>
                        <input type="text" name="id" placeholder="name" value={this.state.userToUpdate.name} />
                            <input type="text" name="name" placeholder="age" value={this.state.userToUpdate.age} />
                        <input type="button" name="save" value="save"/>
                        <input type="button" name="delete" value="delete" onClick={this.onDeleteHandler} />

                    </form>
            </div>
        );
    }
}

export default App;