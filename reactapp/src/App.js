import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./pages/login";
import Nav from "./component/nav";
import {BrowserRouter,Switch, Route} from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://127.0.0.1:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
            }
        )();
    });


    return (
        <div className="App">
            <BrowserRouter>

            <Nav name={name} setName={setName}/>

                <main className="form-signin">
                  
                    <Switch>
                    <Route path="/login" element={() => <Login setName={setName}/>}/>
                    <Route path="/register"> 
                    <Register/>
                    </Route> 
                    <Route path="/" exact element={() => <Home name={name}/>}/>
                    </Switch>       
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
