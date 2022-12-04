import React from 'react'

function Column(props) {

    // Opens a new tab with the given URL
    function openTab(_url){
        window.open(_url, "_blank")
    } 

  return (
    <div className='column'>
    {props.dataState.map((item, index) => (
      <div key={index+item.id}>
        {(index % 2 == props.side) &&
          <div className='redditDiv' onClick={()=>openTab(item.data.url)}>
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
      
    ))}
  </div>
  )
}

export default Column