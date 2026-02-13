import os
import numpy as np
from PIL import Image
from sklearn.ensemble import RandomForestClassifier
import joblib

# Define paths and parameters
DATASET_PATH = r"C:\Users\student\Desktop\project\Car-Bike-Dataset"
IMG_SIZE = 64
MODEL_PATH = 'car_bike_model.pkl'

def train_model():
    print(f"Loading dataset from: {DATASET_PATH}")
    
    if not os.path.exists(DATASET_PATH):
        print(f"Dataset not found at {DATASET_PATH}")
        return

    features = []
    labels = []
    classes = ['Bike', 'Car']

    for label, class_name in enumerate(classes):
        class_path = os.path.join(DATASET_PATH, class_name)
        if not os.path.exists(class_path):
            continue
        
        print(f"Loading {class_name} images...")
        count = 0
        for img_name in os.listdir(class_path):
            img_path = os.path.join(class_path, img_name)
            try:
                # Load, resize, and flatten image
                img = Image.open(img_path).convert('RGB')
                img = img.resize((IMG_SIZE, IMG_SIZE))
                img_array = np.array(img).flatten()
                
                features.append(img_array)
                labels.append(label)
                count += 1
            except Exception as e:
                # Skip invalid images
                continue
        print(f"Loaded {count} images for {class_name}")

    if not features:
        print("No images found to train on.")
        return

    X = np.array(features)
    y = np.array(labels)

    print(f"Training Random Forest model on {len(X)} images...")
    clf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    clf.fit(X, y)

    # Save model
    joblib.dump(clf, MODEL_PATH)
    print(f"Model saved as {MODEL_PATH}")

    # Save class names
    with open('class_names.txt', 'w') as f:
        for name in classes:
            f.write(f"{name}\n")
    print("Class names saved to class_names.txt")

if __name__ == "__main__":
    train_model()
