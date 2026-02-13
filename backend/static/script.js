document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const previewContainer = document.getElementById('preview-container');
    const uploadContent = document.querySelector('.upload-content');
    const imagePreview = document.getElementById('image-preview');
    const classifyBtn = document.getElementById('classify-btn');

    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');
    const loader = document.getElementById('loader');
    const predictionText = document.getElementById('prediction-text');
    const confidenceText = document.getElementById('confidence-text');
    const confidenceBar = document.getElementById('confidence-bar');
    const resetBtn = document.getElementById('reset-btn');

    let selectedFile = null;

    // Trigger file input
    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    dropZone.addEventListener('click', () => {
        if (!selectedFile) fileInput.click();
    });

    // Handle drag & drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--glass-border)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--glass-border)';
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFiles(e.target.files[0]);
        }
    });

    function handleFiles(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            uploadContent.classList.add('hidden');
            previewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    // Classification Request
    classifyBtn.addEventListener('click', async () => {
        if (!selectedFile) return;

        resultSection.classList.remove('hidden');
        resultContent.classList.add('hidden');
        loader.classList.remove('hidden');

        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                showResult(result.class, result.confidence);
            } else {
                alert('Error: ' + result.error);
                resetUI();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error, check console');
            resetUI();
        }
    });

    function showResult(prediction, confidence) {
        loader.classList.add('hidden');
        resultContent.classList.remove('hidden');

        predictionText.textContent = prediction;
        confidenceText.textContent = confidence;

        // Animate bar
        setTimeout(() => {
            confidenceBar.style.width = confidence;
        }, 100);
    }

    resetBtn.addEventListener('click', resetUI);

    function resetUI() {
        selectedFile = null;
        fileInput.value = '';
        uploadContent.classList.remove('hidden');
        previewContainer.classList.add('hidden');
        resultSection.classList.add('hidden');
        confidenceBar.style.width = '0%';
    }
});
