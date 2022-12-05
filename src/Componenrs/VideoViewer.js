import React, { useRef, useState } from 'react'

// would be better if it took in the data object and parsed the url here
// could also set a state variable that determines which type to show (img or iframe)
// can add custom links to the video boxes
// moveable

function VideoViewer(props) {
    const [clicking, setClicking] = useState(false)

  return (
    <div className={'videoViewer '+(clicking && " clicking")} onMouseDown={()=>{setClicking(true)}} onMouseUp={()=>{setClicking(false)}} onMouseLeave={()=>{setClicking(false)} }>        
        <div className='closeButton' onClick={props.close}>X</div>
        {(props.src.includes(".jpg") || props.src.includes(".png") || props.src.includes(".gifv") || props.src.includes(".mp4")) ? 
            <img src={props.src}></img>
            :
            <iframe src={props.src}></iframe>
        }
    </div>
  )
}

export default VideoViewer