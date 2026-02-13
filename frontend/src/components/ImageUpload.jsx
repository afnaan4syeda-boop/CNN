import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Prediction failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="upload-section">
                <label htmlFor="image-upload" className="upload-zone">
                    {preview ? (
                        <img src={preview} alt="Preview" className="preview-image" />
                    ) : (
                        <div className="placeholder">
                            <span>Drag & Drop or Click to Upload</span>
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className="controls">
                <button onClick={handleSubmit} disabled={!selectedImage || loading}>
                    {loading ? 'Analyzing...' : 'Classify Image'}
                </button>
            </div>

            {result && (
                <div className={`result animate-fade-in`}>
                    <p>Prediction: <span className={result.class.toLowerCase()}>{result.class}</span></p>
                    <p>Confidence: {result.confidence}</p>
                </div>
            )}

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default ImageUpload;
