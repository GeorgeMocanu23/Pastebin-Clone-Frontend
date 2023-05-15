import { getId, setId } from '../components/UserId';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteUser() {
    const userId = getId();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/pastebin/${userId}`);
            setId(null);
            console.log(response);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        handleClose();
    };

    return (
        <>
            <Button style={{ position: "fixed", top: 25, left: 25 }} variant="outline-danger" onClick={handleShow}>
                Delete account <p style={{ display: "inline-block", width: "1px" }} />
                <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your account with id: {userId} and all your contents will be deleted
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteUser;