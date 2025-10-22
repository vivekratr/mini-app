import React, { useEffect } from 'react'
import { useContentStore } from "../stores/contentStore.js";
import { useNavigate } from 'react-router-dom';
import "../styles/Terms.css"
import Navbar from '../components/Navbar.jsx';


const Terms = () => {
  const { language, fetchContent, content } = useContentStore();
  const navigate = useNavigate();


   useEffect(() => {
            fetchContent("terms");
    }, [language])
  return (
    <div className='main-container1'>
    <div className='terms main-container'>
      <Navbar/>
      <h1 className='title'>{content?.terms?.title || 'Terms'}</h1>

      <button onClick={() => navigate(-1)} className='back-button'>{content?.terms?.buttonText || 'Close and Go Back'}</button>

      <div className='desc'>
        <p className='text1'><b>{content?.terms?.text1 || 'BY'}</b> {content?.terms?.text2 || ''}<span id='t-blueText'>{content?.terms?.text3 || ''}</span> {content?.terms?.text4 || ''}</p>
        
      </div>

      <button onClick={() => navigate(-1)} className='back-button'>{content?.terms?.buttonText || 'Close and Go Back'}</button>

      
    </div>
    </div>

  )
}

export default Terms
