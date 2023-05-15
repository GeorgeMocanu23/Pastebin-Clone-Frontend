import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faKey } from '@fortawesome/free-solid-svg-icons';

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/pastebin/allUsers");
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        setIsUsernameTaken(users.some(user => user.username === newUsername));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/pastebin/register", {
                username,
                password
            });
            alert("Now you must to login");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleNavigateToLogin = () => {
        navigate("/");
    }

    return (
        <div style={{ fontFamily: 'Monospace' }}>
            <h3>If you want to create a new account</h3>
            <form onSubmit={handleSignUp}>
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
                {isUsernameTaken && (
                    <p style={{ color: "red" }}>This username is already taken.</p>
                )}
                <Button variant="success" type="submit" disabled={!username || !password || isUsernameTaken}>
                    Sign Up <p style={{ display: "inline-block", width: "1px" }} />
                    <FontAwesomeIcon icon={faSignIn} />
                </Button>
            </form>
            <Button onClick={handleNavigateToLogin}>
                Login <p style={{ display: "inline-block", width: "17px" }} />
                <FontAwesomeIcon icon={faKey} />
            </Button>
        </div>
    );
}

export default SignUp;