import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { setId } from '../components/UserId';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSignIn } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCheckUserExists = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/pastebin/user/${username}`);
            setId(response.data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const userExist = await handleCheckUserExists();
            if (userExist === false) {
                alert("This account does not exist, you will be redirected to register page.");
                navigate("/register");
                return;
            }
            await axios.post("http://localhost:8080/api/v1/pastebin/login", {
                username,
                password
            });
            alert(`Welcome back, ${username}!`);
            navigate("/content");
        } catch (error) {
            console.log(error);
            alert("Incorrect username or password");
            setUsername("");
            setPassword("");
        }
    };

    const handleNavigateToRegister = () => {
        navigate("/register");
    }

    return (
        <div>
            <h3>If you already exist</h3>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter username"
                />
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter password"
                />
                <br />
                <Button variant="success" type="submit" disabled={!username || !password}>
                    Login <p style={{ display: "inline-block", width: "17px" }} />
                    <FontAwesomeIcon icon={faKey} />
                </Button>
            </form>
            <Button onClick={handleNavigateToRegister}>
                Sign Up <p style={{ display: "inline-block", width: "1px" }} />
                <FontAwesomeIcon icon={faSignIn} />
            </Button>
        </div>
    );
}

export default Login;