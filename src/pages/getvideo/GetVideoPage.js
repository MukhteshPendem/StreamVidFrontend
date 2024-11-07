import React, { useState } from 'react';
import axios from 'axios';
import './GetVideoPage.module.css';

const GetVideoPage = () => {
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');

    const handleGetVideo = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/api/videos/${title}`);
            if (response.data.url) {
                setVideoUrl(response.data.url);
                setError('');
                setTitle('')
            } else {
                setError('Video not found');
            }
        } catch (error) {
            console.log(`${process.env.BACKEND_URL}`);
            setError('Failed to fetch video: ' + error.message);

        }
    };

    return (
        <div>
            <h2>Get Video</h2>
            <input
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            required={true}/>
            <button onClick={handleGetVideo}>Get Video</button>
            {error && <p>{error}</p>}
            {videoUrl && (
                <div>
                    <h3>Video</h3>
                    <video controls width="600" src={videoUrl}>
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default GetVideoPage;
