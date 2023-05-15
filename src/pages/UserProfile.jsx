import React from "react";
import { getId } from "../components/UserId";
import ContentList from "../components/ContentList";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons'

function UserProfile() {
    const id = getId();
    const navigate = useNavigate();

    if (!id) {
        return<Link to="/">Please log in to see your profile.</Link>
    }

    const handleNavigateToAddContent = () => {
        navigate("/content");
    }

    return (
        <div>
            <h5>Welcome, user {id}!</h5>
            <Button onClick={handleNavigateToAddContent}>
                Add content page <p style={{ display: "inline-block", width: "1px" }} />
                <FontAwesomeIcon icon={faPencil} />
            </Button>
            <ContentList userId={id} />
        </div>
    );
}

export default UserProfile;