# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy only the backend directory contents and model
COPY backend/ ./backend/

# Install dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose the default Hugging Face Space port
EXPOSE 7860

# Run the unified Flask server
CMD ["python", "backend/main.py"]
