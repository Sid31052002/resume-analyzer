import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ProgressBar from './components/ProgressBar';
import Results from './components/Results';

const App = () => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFilesAdded = (newFiles) => {
        if (newFiles.length + files.length > 5) {
            alert('You can upload a maximum of 5 files!');
            return;
        }
        setFiles([...files, ...newFiles]);
    };

    const handleUpload = async () => {
        setLoading(true);
        setProgress(0);

        const formData = new FormData();
        files.forEach((file) => formData.append('resumes', file));

        try {
            const response = await axios.post('http://localhost:5000/api/resumes/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percent);
                },
            });

            setResults(response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Resume Analyzer</h1>
            <FileUpload onFilesAdded={handleFilesAdded} />
            {files.length > 0 && (
                <button onClick={handleUpload} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze Resumes'}
                </button>
            )}
            {loading && <ProgressBar progress={progress} />}
            {results && <Results results={results} />}
        </div>
    );
};

export default App;
