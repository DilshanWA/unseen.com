import React, { useState, useEffect } from 'react';
import Nav from '../nav/nav';
import '../styles/home.css';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import { saveAs } from 'file-saver';
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const navigation  = useNavigate()
  const [isError,setErrorUpdate] = useState(false)
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://192.168.8.123:3001/api/random');
        setImages(response.data);
        console.log('Fetched images:', response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      
        setErrorUpdate(true)
         
      }
    };

    fetchImages();
  }, []);

  const loadMore = async () => {
    try {
      const response = await axios.get('http://192.168.8.123:3001/api/random');
      setImages(prevImages => [...prevImages, ...response.data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDownload = (url, filename) => {
    saveAs(url, filename);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://192.168.8.123:3001/api/search/${query}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error searching images', error);
      setErrorUpdate(true)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const ImageDetails = (image) =>{
    navigation('/ImageDetails', { state: { image } })
  }

  return (
    <div>
      <Nav />
      <div className="hero">
        <div className='headerText'>
          <p>Stunning royalty-free images & royalty free stock</p>
          <p id="smaller_text">Over 4.3 million+ high quality stock images, videos and music shared by our talented community.</p>
        </div>
        <div className="inputbox">
          <IoSearchOutline className='searchIcon' onClick={handleSearch} />
          <input
            type="search"
            value={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => setQuery(e.target.value)}
            className='search_input'
            placeholder='search for all images in unseen'
          />
        </div>
      </div>
      <div className="grid-container">
        <div className="images">
          {images.map(image => (
            <div className="card" key={image.id}>
              <img src={image.urls.small} alt={image.alt_description} className='mainImage' onClick={()=> ImageDetails(image)}/>
              <div className="details">
                <div className="graditbox">
                  <div className="photographer">
                    <img src={image.user.profile_image.small} alt="" className='userProfile' />
                    <div className="Others">
                      <span>{image.user.name}</span>
                      <div style={{ width: '200px' }}>
                        <p id="smallpdiscribr">{image.alt_description}</p>
                      </div>
                    </div>
                    <MdOutlineFileDownload className='download_icon' onClick={() => handleDownload(image.urls.full, `image-${image.id}.jpg`)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!isError ? (
          <button className="loadMore" onClick={loadMore}>Load more</button>
        ): null }
      </div>
      <div className="error-box">
        {isError ? (
           <div className="div"><h1>Error Loading bro</h1></div>
        ): null }
      </div>
    </div>
  );
}

export default Home;
