import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFilesAdded }) => {
    const onDrop = useCallback((acceptedFiles) => {
        onFilesAdded(acceptedFiles);
    }, [onFilesAdded]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'application/pdf',
        maxSize: 5 * 1024 * 1024, // 5 MB
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: '2px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '20px',
            }}
        >
            <input {...getInputProps()} />
            <p>Drag and drop up to 5 PDF files here, or click to select files</p>
        </div>
    );
};

export default FileUpload;
