import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import '../styles/searchbox.css';
import Home from './Home'
import { IoSearchOutline } from "react-icons/io5";

function SearchBox({ onSearch }) { 
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`http://192.168.8.123:3001/api/search/${searchQuery}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error searching images', error);
    }
  };

  return (
    <div className="popup">
       <div className="inputbox2" id='input_box2'>
            <IoSearchOutline className='searchIcon' id='nav_search_ico' onClick={handleSearch}/>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="nav_search_input_search"
              placeholder="Search for all images in unseen"
            />
          </div>
    </div>
  );
}

export default SearchBox;
