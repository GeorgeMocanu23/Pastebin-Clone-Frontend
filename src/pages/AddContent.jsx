import React, { useState } from "react";
import axios from "axios";
import { getId, setId } from '../components/UserId';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import DeleteUser from '../components/DeleteUser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSdCard, faDoorOpen, faList } from '@fortawesome/free-solid-svg-icons';

function AddContent() {
    const [content, setContent] = useState("");
    const id = getId();
    const navigate = useNavigate();

    const handleBodyChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:8080/api/v1/pastebin/${id}/content`;
        try {
            await axios.post(url, {
                content: content
            });
            setContent("");
        } catch (error) {
            console.error(error);
        }
    };

    if (!id) {
        return <Link to="/">Please login to add content</Link>;
    }

    const handleLogout = () => {
        setId(null);
        navigate("/");
    };

    const navigateToContents = () => {
        navigate("/{id}");
    }

    return (
        <div>
        <DeleteUser />
            <Button onClick={handleLogout} style={{ position: "fixed", top: 25, right: 25 }} variant="outline-danger">
                Logout <p style={{ display: "inline-block", width: "1px" }} />
                <FontAwesomeIcon icon={faDoorOpen} />
            </Button>
            <h5>Your user number is: {id}</h5>
            <Button onClick={navigateToContents}>
                Your repository <p style={{ display: "inline-block", width: "1px" }} />
                <FontAwesomeIcon icon={faList} />
            </Button>
            <form onSubmit={handleSubmit}>
                <br />
                <FloatingLabel label="Leave your content here...">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here..."
                        style={{ height: '100px', backgroundColor: 'yellow' }}
                        value={content}
                        onChange={handleBodyChange}
                    />
                </FloatingLabel>
                <br />
                <Button variant="outline-success" type="submit" disabled={!content}>
                    Save <p style={{ display: "inline-block", width: "1px" }} />
                    <FontAwesomeIcon icon={faSdCard} />
                </Button>
            </form>
        </div>
    );
}

export default AddContent;