import React, { useState } from 'react';
import axios from 'axios';
import './analyze.css';
import u from '../assets/upload.png';

export default function Analyze() {
    const [analysis, setAnalysis] = useState('');

    // Handle file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        // Ensure file is selected
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Make the request to Flask backend
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Set the analysis response from the backend
            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error("Error uploading the file:", error);
            setAnalysis("Error analyzing the report.");
        }
    };

    return (
        <div className="analyze-main">
            <div className="a-1">
                <input 
                    type="file" 
                    id="myFile" 
                    name="filename" 
                    className="file-input" 
                    onChange={handleFileUpload} 
                />
                <label htmlFor="myFile" className="file-label">
                    <img src={u} alt="Upload" /> <br />
                    Upload a Medical Report
                </label>
            </div>
            <div className="a-2">
                <div className="analysis">
                    <p>{analysis ? analysis : 'Analysis comes here'}</p>
                </div>
            </div>
        </div>
    );
}
