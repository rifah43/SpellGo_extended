import React, { useState } from "react";

function Theme() {
    const token = localStorage.getItem('token');
    const [textColor, setTextColor] = useState('#000000'); // Default text color
    const [buttonColor, setButtonColor] = useState('#000000'); // Default button color
    const [backgroundImage, setBackgroundImage] = useState('image1.jpg');
    const imagePaths = {
        "Image 1": "image1.jpg",
        "Image 2": "image2.jpg",
        "Image 3": "image3.jpg",
        // Add more image options and paths as needed
    };

    const handleTextColorChange = (e) => {
        setTextColor(e.target.value);
    };

    const handleButtonColorChange = (e) => {
        setButtonColor(e.target.value);
    };

    const handleBackgroundImageChange = (e) => {
        const selectedImageName = e.target.value;
        const selectedImagePath = imagePaths[selectedImageName];
        setBackgroundImage(selectedImagePath);
    };

    async function setTheme() {
        try {
            console.log(textColor, backgroundImage, buttonColor);
            await fetch('http://localhost:5000/theme/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    backgroundImage: backgroundImage,
                    textColor: textColor,
                    buttonColor: buttonColor,
                }),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="theme-container">
            <h2>Customize Your Theme</h2>

            <div className="color-pickers">
                <div className="color-picker">
                    <label>Text Color:</label>
                    <input type="color" value={textColor} onChange={handleTextColorChange} />
                </div>

                <div className="color-picker">
                    <label>Button Color:</label>
                    <input type="color" value={buttonColor} onChange={handleButtonColorChange} />
                </div>
            </div>

            <div className="background-selector">
                <label>Select Background Image:</label>
                <select value={backgroundImage} onChange={handleBackgroundImageChange}>
                    <option value="Image 1">Image 1</option>
                    <option value="Image 2">Image 2</option>
                    <option value="Image 3">Image 3</option>
                </select>
            </div>

            <button className="submit-button" onClick={setTheme}>Change Theme</button>
        </div>
    );
}

export default Theme;
