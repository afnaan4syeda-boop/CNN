import React from 'react'
import ImageUpload from './components/ImageUpload'
import './index.css'

function App() {
    return (
        <div className="container">
            <header>
                <h1>Car vs Bike Classifier</h1>
                <p>Upload an image to detect if it's a Car or a Bike</p>
            </header>
            <main>
                <ImageUpload />
            </main>
            <footer>
                <p>Powered by TensorFlow & React</p>
            </footer>
        </div>
    )
}

export default App
