import React, { useEffect, useRef, useState } from 'react'

// would be better if it took in the data object and parsed the url here
// could also set a state variable that determines which type to show (img or iframe)
// can add custom links to the video boxes
// moveable
// If its just a post put the long text in the viewwer
// expandable comment section that can be scrolled to on the viewer

// by default the title, text, link buttons, comments, are all viewable by scrolling in the VideoViewer component


function VideoViewer({item, close, openTab}) {
    const [source, setSource] = useState()
    const [type, setType] = useState()
    
    const justStarted = useRef(true)
    const dragCurrentCoordinates = useRef({x: 10, y: 10})
    const dragStartCoordinates = useRef({x: 0, y: 0})
    const dragEndCoordinates = useRef({x: 0, y: 0})

    const initialWindowCoordinates = useRef({x: 10, y: 10})
    const currentMouseCoordinates = useRef({x: 10, y: 10})
    const clickMoving = useRef(false)

    const element = useRef()

    useEffect(()=>{
      if(justStarted.current){
        element.current = document.querySelector("#"+item.data.id)
        openPost()
        setUpDragListener()
        justStarted.current = false
      }
    },[])
    
    function setUpDragListener(){
      console.log("setting up drag listener")

      // element?.addEventListener("dragstart", event => {
      //   startMove(event)                
      // })
      // Might have to put listener on the main window because it stops when it gets out of the videoDisplay
      window.addEventListener("mousemove", event => {
        currentMouseCoordinates.current = {"x" : event.clientX, "y" : event.clientY}
        clickMoveMove()
        //console.log(currentMouseCoordinates.current)
      })
      // element?.addEventListener("dragend", event => {
      //   endMove(event)
      // })
      // Stop moving it when user presses escape
      window.addEventListener("keydown", event => {
        if(event.key == "Escape")
          clickMoveEnd()
      })
    }
    
    function startMove(event){
  
      dragStartCoordinates.current.x = event.clientX
      dragStartCoordinates.current.y = event.clientY
    }
    function endMove(event){
      console.log("Moved to {x: "+event.clientX+" y: "+event.clientY+"}")

      dragEndCoordinates.current.x = event.clientX
      dragEndCoordinates.current.y = event.clientY

      moveFromDrag()
    }
    function moveFromDrag(){

      const deltaX = dragEndCoordinates.current.x - dragStartCoordinates.current.x
      const deltaY = dragEndCoordinates.current.y - dragStartCoordinates.current.y

      dragCurrentCoordinates.current.x = dragCurrentCoordinates.current.x + deltaX
      dragCurrentCoordinates.current.y = dragCurrentCoordinates.current.y + deltaY

      if(element.current){
        element.current.style.left = dragCurrentCoordinates.current.x + "px"
        element.current.style.top = dragCurrentCoordinates.current.y + "px"
      }

    }



    function clickMoveStart(){
      // Turn on the flag
      clickMoving.current = true      
      // Save the start position. Current kept up to date the whole time window is open
      dragStartCoordinates.current = currentMouseCoordinates.current
      if(element.current){
        initialWindowCoordinates.current.x = element.current.offsetLeft
        initialWindowCoordinates.current.y = element.current.offsetTop
      }
      else{
        element.current = document.querySelector("#"+item.data.id)
      }
    }
    function clickMoveMove(){
      // If moving flag is true move the window with the mouse
      if(clickMoving.current){        

        // Calculate difference between drag start and current mouse position
        const deltaX = currentMouseCoordinates.current.x - dragStartCoordinates.current.x
        const deltaY = currentMouseCoordinates.current.y - dragStartCoordinates.current.y
  
        console.log("moved mouse by x: " + deltaX + " y: " + deltaY)        
  
        if(element){
          element.current.style.left = initialWindowCoordinates.current.x + deltaX + "px"
          element.current.style.top = initialWindowCoordinates.current.y + deltaY + "px"
        }
        // set the position style
      }
    }
    function clickMoveEnd(){
      clickMoving.current = false

      // Calculate difference between drag start and current mouse position
      const deltaX = currentMouseCoordinates.current.x - dragStartCoordinates.current.x
      const deltaY = currentMouseCoordinates.current.y - dragStartCoordinates.current.y

      // Adjust the initial 
      initialWindowCoordinates.current.x = initialWindowCoordinates.current.x + deltaX
      initialWindowCoordinates.current.y = initialWindowCoordinates.current.y + deltaY

    }
    function toggleClickMoving(){
      if(clickMoving.current)
        clickMoveEnd()        
      else
        clickMoveStart()
      
    }

    function openPost(){

        console.log("opening post")
        console.log(item)

        var url = " "

        // If there is no domain
        if(!item.data.domain)
            url = item.data.link_url
        else
            url = item.data.url.replaceAll("amp;", "")

        // This is how to display redgif links
        if(item.data.domain === "redgifs.com")
            url =  item.data.media.oembed.html.split('"')[1].replaceAll("amp;", "")

        // This allows reddit videos to be displayed
        if(item.data.domain === "v.redd.it")    
            url = item.data.media.reddit_video.fallback_url.replaceAll("amp;", "")

        // reddit images
        if(item.data.domain === "i.redd.it")
            url = item.data.url.replaceAll("amp;", "")

        // imagur images and vieos
        if(item.data.domain === "imgur.com")
            url = item.data.url.replaceAll("amp;", "")
        
        // imagur images
        if(item.data.domain === "i.imgur.com")
            // url = item.data.url.replaceAll("amp;", "")
            //url = "https://imgur.com/"+item.data.url.replaceAll("amp;", "").split("/")[3].split(".")[0]+"/embed"
            url = item.data.url
            //:https://imgur.com/91S22q6/embed

        // Gyfcat
        if(item.data.domain === "gfycat.com")
            url = item.data.media.oembed.html.split('"')[3].replaceAll("amp;", "")
        
        // Youtube
        if(item.data.domain === "m.youtube.com")
            url = "https://www.youtube.com/embed/"+item.data.url.split("=")[1]

        // If it is something that can be displayed by an img tag set a variable so it will display as such
        if(url.includes(".jpg") || url.includes(".png") || url.includes(".gifv") || url.includes("imgur"))
          setType("image")
        else if(url.includes("/r/"))
          setType("text")
        // The ohters require an IFrame
        else
          setType("iframe")

        // Put the url in state so it can be displayed
        setSource(url)
    }

//onMouseDown={()=>{setClicking(true)}} onMouseUp={()=>{setClicking(false)}} onMouseLeave={()=>{setClicking(false)} }
  return (
    <div id={item.data.id} className={'videoViewer '} onClick={event=>{event.preventDefault()}}>   
        <div onClick={toggleClickMoving} className={"redditLink move"}>Click to Move</div>     
        <div className='closeButton' onClick={close}>X</div>
        <div 
            className='redditLink' 
            onClick={event => openTab(event, "../"+item.data.subreddit_name_prefixed)}
        >
            {item.data.subreddit_name_prefixed}
        </div>
        <div 
            className='redditLink'
            onClick={event => openTab(event, "../user/"+item.data.author)}
        >
            {"user/"+item.data.author}
        </div>  
        <div 
            className='redditLink'
            onClick={event => openTab(event, "www.reddit.com"+item.data.permalink)}
        >
            {"user/"+item.data.permalink}
        </div>  
        {type === "image" && <img src={source}></img>}
        {type === "iframe" && <iframe src={source}></iframe>}
        {type === "text" && <div></div>}
        <div className='title'>{item.data.title}</div>
        <div className='title'>{item.data.selftext}</div>
    </div>
  )
}

export default VideoViewer