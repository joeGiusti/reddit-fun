 import React from 'react'
 
 function Post({item, index, dataState, side, openTab}) {

    // show different things based on the type
    // also do actions like play video on hover
    // can put overlays
    // can have a window that opens a larger view when user clicks the post
    //   maybe use array index instead of post data so there can be a left and right arrow button

    // show user and sub and have ability to open that user or sub in another tab

    // basically build all the functionality from the other site

   return (
    <div key={index+item.id}>
        {(index % 2 == side) &&
        <div className={'redditDiv ' + ((index == dataState.length - 3 || index == dataState.length - 4) && " last-post")} onClick={()=>openTab(item.data.url)}>
            <div className='title'>{item.data.title}</div>
            <div className='title'>{item.data.domain}</div>
            <div className='title'>{item.data.fullname}</div>

            {/* <img src={item.data.thumbnail}></img> */}
                
            <img className='image' src={item.data?.preview?.images[0]?.source?.url.replaceAll("amp;", "")}></img>
            {item.data.domain === "redgifs.com" &&
            <div>
                {console.log(item.data.media.oembed.html.split('"')[1])}
                <iframe
                src={item.data.media.oembed.html.split('"')[1]}
                ></iframe>
            </div>
            }
        </div>
        }
    </div>
   )
 }
 
 export default Post