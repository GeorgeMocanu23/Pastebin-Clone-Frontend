import React, { useEffect, useState } from "react";
import DeleteContent from "../components/DeleteContent";
import axios from "axios";
import { SpinnerRoundOutlined } from 'spinners-react';
import "bootstrap/dist/css/bootstrap.min.css";

function ContentList({ userId }) {
    const [idContentList, setIdContentList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const contentListResponse = await axios.get(`http://localhost:8080/api/v1/pastebin/${userId}/content`);
                const contentList = contentListResponse.data.map((content) => ({
                    id: content.id,
                    content: content.content
                }));
                const contentIds = await axios.get(`http://localhost:8080/api/v1/pastebin/${userId}/contents`);
                for (let i = 0; i < contentList.length; ++i) {
                    contentList[i].id = contentIds.data[i];
                }
                setIdContentList(contentList);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (userId) {
            fetchContents();
        }
    }, [userId]);

    const handleDelete = async (contentId) => {
        try {
            if (contentId) {
                await axios.delete(`http://localhost:8080/api/v1/pastebin/${userId}/content/${contentId}`);
                setIdContentList((prevContentList) => prevContentList.filter((content) => content.id !== contentId));
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" />
    }

    return (
        <>
            <h5>Your repository is:</h5>
{/*             <p>userId: {userId}</p> */}
            {Array.isArray(idContentList) && idContentList.map((content) => (
                <div key={content.id} style={{ border: '1px solid gray', padding: '5px', marginBottom: '5px', background: 'yellow' }}>
                    <div style={{ whiteSpace: 'pre-line' }}>
{/*                         <p>Your content id number {content?.id}:</p> */}
                        {content?.content}
                    </div>
                    <DeleteContent
                        userId={userId}
                        contentIdToDelete={content?.id}
                        handleDeleteContent={handleDelete}
                    />
                </div>
            ))}
        </>
    );
}

export default ContentList;