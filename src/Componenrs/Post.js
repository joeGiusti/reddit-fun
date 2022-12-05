 import React, { useRef, useState } from 'react'
 import VideoViewer from './VideoViewer' 

 function Post({item, index, dataState, side, openTab}) {

    const hovering = useRef(false)
    const [videoLink, setVideoLink] = useState()

    // show different things based on the type
    // also do actions like play video on hover
    // can put overlays
    // can have a window that opens a larger view when user clicks the post
    //   maybe use array index instead of post data so there can be a left and right arrow button

    // show user and sub and have ability to open that user or sub in another tab

    // basically build all the functionality from the other site

    // show a video play overlay if it is a type with a video

    function openPost(){

        console.log("opening post")
        console.log(item)

        // https://m.youtube.com/watch?v=yd1XEkMotK8
        // https://www.youtube.com/watch?app=desktop&v=yd1XEkMotK8
        // https://www.youtube.com/embed/yd1XEkMotK8

        console.log(item.data.domain)
        console.log(item.data.link_url)

        var url = " "

        if(!item.data.domain)
            url = item.data.link_url
        else
            url = item.data.url.replaceAll("amp;", "")

        if(item.data.domain === "redgifs.com")
            url =  item.data.media.oembed.html.split('"')[1].replaceAll("amp;", "")

        if(item.data.domain === "v.redd.it")    
            url = item.data.media.reddit_video.fallback_url.replaceAll("amp;", "")

        if(item.data.domain === "i.redd.it")
            url = item.data.url.replaceAll("amp;", "")

        if(item.data.domain === "imgur.com")
            url = item.data.url.replaceAll("amp;", "")

        if(item.data.domain === "i.imgur.com")
            // url = item.data.url.replaceAll("amp;", "")
            url = "https://imgur.com/"+item.data.url.replaceAll("amp;", "").split("/")[3].split(".")[0]+"/embed"
            
            //:https://imgur.com/91S22q6/embed

        if(item.data.domain === "gfycat.com")
            url = item.data.media.oembed.html.split('"')[3].replaceAll("amp;", "")
        
            if(item.data.domain === "m.youtube.com")
            url = "https://www.youtube.com/embed/"+item.data.url.split("=")[1]

        setVideoLink(url)
    }
    function closePost(){
        setVideoLink(null)
    }

  // Opens a new tab with the given URL
  function openTab(event, _url){
    event.preventDefault()
    window.open(_url, "_blank")
  } 

//onClick={()=>openTab(item.data.url)}
   return (
    <div key={index+item.id}>
        {videoLink && <VideoViewer src={videoLink} close={closePost}></VideoViewer>}
        {(index % 2 == side) &&
        <div className={'redditDiv ' + ((index == dataState.length - 3 || index == dataState.length - 4) && " last-post")} onClick={openPost}>
            <div className='title'>{item.data.title}</div>
            {/* <div className='title'>{item.data.domain}</div> */}
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
            

            {/* <img src={item.data.thumbnail}></img> */}

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