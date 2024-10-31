import React, { useState, useEffect } from 'react';
import largeLogo from '../images/logo.png';
import Searchbox from '../pages/searchbox'
import smallLogo from '../images/smallogo.png';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";


function Nav() {
  const [isNavVisible, updateNavVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchisopen, setSearchopen] = useState(false);
  const [issearchboxpopup, setsearchboxPopup] = useState(false);


  const toggleNavbar = () => {
    updateNavVisible(!isNavVisible);
  };

  const closeSidebar = () => {
    updateNavVisible(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
      setSearchopen(true);
      if (!isSmallScreen) {
        setIsSearchVisible(true);
      }
    } else {
      setIsFixed(false);
      setIsSearchVisible(false);
      setSearchopen(false);
      setsearchboxPopup(false)
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 938 ) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      setsearchboxPopup(false)
    };
  }, []);

  const handlesearch = () => {
    setsearchboxPopup(true)
  };

  return (
    <div>
      <div className={`main ${isFixed ? 'fixed' : ''}`}>
        <div className="logo">
          <Link to={'/'}><img src={isSmallScreen ? smallLogo : largeLogo} alt="Logo" /></Link>
        </div>
        {!isSmallScreen && isSearchVisible && (
          <div className="inputbox">
            <IoSearchOutline  id='nav_search_ico'/>
            <input
              type="search"
              className="nav_search_input"
              placeholder="Search for all images in unseen"
            />
          </div>
        )}

        <div style={{ display: 'flex' }}>
          {isSmallScreen && (
            <div style={{ display: 'flex', alignItems: 'center' }} className='btn_box'>
              {searchisopen && (
                <>
                  <IoSearchOutline className='searchIcon_nav' onClick={handlesearch}/>
                </>
              )}
              {issearchboxpopup && <Searchbox/>}

              <button id='login'>Login</button>
              <button id='join'>Join</button>
            </div>
          )}
          <AiOutlineMenuFold onClick={toggleNavbar} className="menu-icon" />
          <div className={`sidebar ${isNavVisible ? 'visible' : ''}`}>
            <AiOutlineMenuUnfold className="closeIcon" onClick={closeSidebar} />
            <ul className="navbar_menu">
              <li>Explore</li>
              <li>Join</li>
              <li><button id='login-btn'>login</button></li>
              {!isSmallScreen && (
                <li><button id='sign_up'>Upload+</button></li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Nav;