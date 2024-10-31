import React from 'react'
import NavBar from '../nav/nav'
import { useState,useEffect } from 'react';
import GreenHeart from '../images/green.png'
import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';
import '../styles/ImageDetails.css'
import { FaRegHeart,FaRegBookmark,FaShareAlt} from "react-icons/fa";
import { FaCircleInfo,FaUserPlus} from "react-icons/fa6";
import { MdOutlineModeComment  } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import axios  from 'axios';

export default function ImageDetails() {

  const location = useLocation();
  const { image } = location.state;
  console.log(image)
  const [images, setImages] = useState([]);
  const [query] = useState(image.alt_description);
  const [likeCount,increesLikeCount] = useState(image.likes)
  const [isLiked, setIsLiked] = useState(false);
  const[isDownloading,settextDownload] = useState(false)
  const [isError,setErrorUpdate] = useState(false)



  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://192.168.8.123:3001/api/search/${query}`);
        setImages(response.data);
        console.log('Fetched images:', response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      
        setErrorUpdate(true)
         
      }
    };

    fetchImages();
  }, []);


  const IncreesLikeCount = () =>{
    if (isLiked) {
      increesLikeCount(likeCount - 1);
    } else {
      increesLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  }

  const handleDownload = (url, filename) => {
    saveAs(url, filename);
    settextDownload(true)
    setTimeout(() => {
      settextDownload(false);
    }, 2000);
  };

  const loadMore = async () => {
    try {
      const response = await axios.get(`http://192.168.8.123:3001/api/search/${query}`);
      setImages(prevImages => [...prevImages, ...response.data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };


  return (
    <div>
      <NavBar/>
      <div className="mainBox">
        <div className="LargeSetup">
          <div className="imageBox">
             <div className="header_btnBox">
               <button>Edit</button>
               <button style={{backgroundColor:'#00AB6B',border:'none',color:'#fff'}} onClick={() => handleDownload(image.urls.full, `image-${image.id}.jpg`)}>{isDownloading ? 'Downloading....': 'Download'}</button>
             </div>
             <img src={image.urls.small} alt="" srcset="" />
          </div>
          <div className="Details_Box">
            <div className="large_header-tbn">
               <button style={{marginLeft:'0'}}>Edit</button>
               <button style={{backgroundColor:'#00AB6B',border:'none',color:'#fff',marginRight:'0'}} onClick={() => handleDownload(image.urls.full, `image-${image.id}.jpg`)}>{isDownloading ? 'Downloading....': 'Download'}</button>
            </div>
             <div className="mediabtns">
                 <div className='btnBox-one'>
                    <button style={{padding:'0px 16px'}} className={isLiked ? "Liked" : ''} onClick={IncreesLikeCount}>
                      {!isLiked ? (
                        <FaRegHeart style={{marginRight:'5px'}} id='Icons'/>
                      ): 
                        <img src={GreenHeart}  style={{width:'16px',marginRight:'5px'}}/>
                      }
                      <p>{likeCount}</p></button>
                    <button className='squreIconBtn'><FaRegBookmark/></button>
                    <button className='squreIconBtn' id='Icons'><MdOutlineModeComment/></button>
                 </div>
                 <div className='btnBox-one'>
                    <button className='squreIconBtn' id='Icons'><FaShareAlt/></button>
                    <button className='squreIconBtn' id='Icons'><FaCircleInfo/></button>
                 </div>
             </div>
             <hr id='hr00'/>
             <div style={{width:'90%',margin:'auto',padding: '30px 0'}}>
                <p>{image.alt_description}</p>
             </div>
             <hr id='hr00'/>
             <div className="profile">
                <div className="image_and_names">
                  <div style={{display:'flex'}}> 
                    <div className="profile_image">
                      <img src={image.user.profile_image.small} alt="Profile of Owner"/>
                    </div>
                    <div className="name_fallowers">
                      <h3>{image.user.name}</h3>
                      <p>{image.views} followers</p>
                    </div>
                  </div>
                  <div className="follow_btn">
                      <FaUserPlus id='follow'/>
                      <h4>Follow</h4>
                  </div>
                </div>
                <button className='donetBtn'>Subscribe</button>
              </div>
              <hr id='hr00'/>
          </div>
        </div>

          <div style={{width:'90%',marginTop:'20px'}} className='largScreenBox'>
            <h4>Comments</h4>
              <div className="comment_main_box">
                  <BiComment/>
                    <h4 style={{fontSize:'15px',marginTop:'10px'}}>The community are waiting to hear <br />from you!</h4>
                    <p style={{fontSize:'12px',marginTop:'8px'}}>Log in or Join Pixabay to view comments</p>
                    <div className="cmt_btns">
                    <button id='login'>Log in</button>
                    <button style={{backgroundColor:'#00AB6B',border:'none',color:'#fff'}}>Join with Unseen</button>
                  </div>
              </div>
          </div>
          <div className="Related_Image">
             <h4>Related Images</h4>
             <div className="">
                .image-filterBox
             </div>
          </div>

        </div>
     </div>
  )
}
