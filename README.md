---
title: Car vs Bike Classification
emoji: 🏎️🏍️
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
---

# Car vs Bike Classifier

A high-performance, portable image classification system with a premium "Glassmorphism" interface.

## 🚀 Quick Start
1.  **Double-click `RUN_PROJECT.bat`** in the `C:\CNN` folder.
2.  The script will automatically:
    - Train the Scikit-learn model (if missing).
    - Start the Unified Flask Server.
3.  Open your browser to: **[http://localhost:8000](http://localhost:8000)**

## ✨ Features
- **Integrated Architecture**: Frontend and Backend served by a single Flask process.
- **Premium Design**: Modern, responsive UI with glassmorphism effects.
- **Portable Environment**: Includes Python 3.11 with all dependencies pre-installed.
- **High Speed**: Optimized Scikit-learn model for instant classification.

## 🤗 Hugging Face Space Deployment
This project is optimized for deployment as a Docker Space on Hugging Face.

1. Create a new Space on [Hugging Face](https://huggingface.co/new-space).
2. Select **Docker** as the SDK.
3. Push your project files to the Space:
   - Make sure `Dockerfile`, `backend/`, and `car_bike_model.pkl` are included.
4. The space will automatically build and deploy the app on port 7860.

Alternatively, use the included assistant for a standard upload (if not using Docker):
1.  Open a terminal in the project folder.
2.  Run: `HF_ASSISTANT.bat auth login` (you will need your HF Token).
3.  Run: `HF_ASSISTANT.bat upload Afnaan08/CarvsBike .`

---
*Created with ❤️ for AI research and development.*
