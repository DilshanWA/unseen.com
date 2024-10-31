import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/images.css';

function Imags() {
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesByPage, setImagesByPage] = useState({});

    const fetchImages = async (page) => {
        if (imagesByPage[page]) {

            setImagesByPage(imagesByPage);
            return;
        }

        try {
            const response = await axios.get(`http://192.168.8.123:3001/api/random?page=${page}`);
            console.log('API response:', response.data);
            setImagesByPage(prevImagesByPage => ({
                ...prevImagesByPage,
                [page]: response.data
            }));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages(currentPage);
    }, [currentPage]);

    const handleNextClick = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousClick = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <div className="grid-container">
                <div className="images">
                    {imagesByPage[currentPage] && imagesByPage[currentPage].map(image => (
                        <div className="card" key={image.id}>
                            <img src={image.urls.regular} alt={image.alt_description} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={handlePreviousClick} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
        </div>
    );
}

export default Imags;
