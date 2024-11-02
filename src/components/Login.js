import React, { useState, useEffect } from 'react';
import './Login.css';

function Login() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // List of images to display in the carousel
    const images = [
        "https://pbs.twimg.com/profile_banners/137780376/1721288039/1080x360",
        "https://pbs.twimg.com/profile_banners/2150403589/1593601883/1080x360",
        "https://pbs.twimg.com/profile_banners/1144169755672113155/1604490445/1080x360",
        "https://pbs.twimg.com/profile_banners/2611325450/1689948283/1080x360",
        "https://pbs.twimg.com/profile_banners/2376754662/1723789742/1080x360",
        "https://pbs.twimg.com/profile_banners/882230658554368000/1712045293/1080x360"
    ];

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Allow only numbers and limit length to 10 digits
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
            setIsButtonEnabled(value.length === 10);
        }
    };

    // Automatic image switch every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Set the current image based on dot click
    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="carousel">
                    <img
                        className="carousel-image"
                        src={images[currentImageIndex]}
                        alt={`Banner ${currentImageIndex + 1}`}
                    />
                    <div className="carousel-dots">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => goToImage(index)}
                            ></span>
                        ))}
                    </div>
                </div>
                <div className="login-content">
                    <h3>Get Started</h3>
                    <div className="phone-input">
                        <input
                            type="text"
                            className="mobile-input"
                            placeholder="Enter mobile number"
                            value={mobileNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        className="otp-button"
                        style={{
                            backgroundColor: isButtonEnabled ? '#007bff' : '#d3d3d3',
                            cursor: isButtonEnabled ? 'pointer' : 'not-allowed'
                        }}
                        disabled={!isButtonEnabled}
                    >
                        Get OTP
                    </button>
                    <p className="login-note">
                        By continuing, you agree to our <a href="/privacy-policy">privacy policy</a> and <a href="/terms-of-use">terms of use</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
