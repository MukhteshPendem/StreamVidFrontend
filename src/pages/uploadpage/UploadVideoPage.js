import React, { useState } from 'react';
import axios from 'axios';
import './UploadVideoPage.module.css';

const UploadVideoPage = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !title || !description) {
            setMessage('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        try {
            const response = await axios.post('http://localhost:8082/api/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Video uploaded successfully! URL: ' + response.data);
        } catch (error) {
            setMessage('Upload failed: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Upload Video</h2>

            <label htmlFor="file-upload" className="customFileUpload">
                📂 Select File
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hiddenInput"
                required={true}
                accept="video/*"
                hidden={true}
            />
            {file && <p className="fileName">Selected file: {file.name}</p>}

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
            />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadVideoPage;
