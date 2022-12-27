 import React, { useRef, useState } from 'react'
 import VideoViewer from './VideoViewer' 
    import playImage from "../Images/playIcon.png"

 function Post({item, index, dataState, side, openTab}) {

    const hovering = useRef(false)
    const [videoLink, setVideoLink] = useState()
    const [showPost, setShowPost] =  useState(false)
    // show different things based on the type
    // also do actions like play video on hover
    // can put overlays
    // can have a window that opens a larger view when user clicks the post
    //   maybe use array index instead of post data so there can be a left and right arrow button

    // show user and sub and have ability to open that user or sub in another tab

    // basically build all the functionality from the other site

    // show a video play overlay if it is a type with a video

    // link to open the reddit post
    // https://www.reddit.com + permalink

    function openPost(){

        setShowPost(true)
        
    }
    function closePost(){
        setVideoLink(null)
        setShowPost(false)
    }

  // Opens a new tab with the given URL
  function openTab(event, _url){

    console.log("going to url " + _url)

    event.stopPropagation()
    
    var currentUrl = window.location.href
    var fullUrl = ""
    if(currentUrl.includes("localhost"))
        fullUrl = "http://localhost:3000/" + _url
    else
        fullUrl = "https://joegiusti.github.io/reddit-fun/?" + _url

    console.log("opening full url: " + fullUrl)

    window.open(fullUrl, "_blank")
  } 

//onClick={()=>openTab(item.data.url)}
   return (
    <div key={index+item.id}>
        {showPost && <VideoViewer close={closePost} item={item} openTab={openTab}></VideoViewer>}
        {(index % 2 == side) &&
        <div className={'redditDiv ' + ((index == dataState.length - 3 || index == dataState.length - 4) && " last-post")} onClick={openPost}>
            <div className='title'>{item.data.title}</div>            
            
            <div 
                className='redditLink' 
                onClick={event => openTab(event, item.data.subreddit_name_prefixed)}
            >
                {item.data.subreddit_name_prefixed}
            </div>
            <div 
                className='redditLink'
                onClick={event => openTab(event, "user/"+item.data.author)}
            >
                {"user/"+item.data.author}
            </div>            
            

            {/* <img src={item.data.thumbnail}></img> */}

            {(
                item.data.domain === "redgifs.com" ||
                item.data.domain === "v.redd.it" ||
                item.data.domain === "gfycat.com" ||
                item.data.domain === "imgur.com" ||
                item.data.domain === "m.youtube.com"||
                item.data.url?.includes("gifv")
                
             ) && 
                <div className='playButton'><img src={playImage}></img></div>
            }
            
            {item.data.domain ?
                <img className='image' src={item.data?.preview?.images[0]?.source?.url.replaceAll("amp;", "")}></img>            
                :
                <img className='image' src={item.data?.link_url.replaceAll("amp;", "")}></img>                                            
            }    
        </div>
        }
    </div>
   )
 }
 
 export default Post