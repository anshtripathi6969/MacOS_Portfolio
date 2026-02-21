import React from 'react'
import useWindowStore from '#store/window.js';


const WindowControls = ({ target }) => {

  const { closeWindow } = useWindowStore();

  return (
    <div id='window-controls'>
      <div className='close' onClick={() => closeWindow(target)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </div>
      <div className='minimize'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus">
          <path d="M5 12h14" />
        </svg>
      </div>
      <div className='maximize'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
          <path d="M5 12h14" /><path d="M12 5v14" />
        </svg>
      </div>
    </div>
  )
}

export default WindowControls;