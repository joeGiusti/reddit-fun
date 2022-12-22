import React, { useEffect, useRef } from 'react'
import Post from './Post'

function Column(props) {

    useEffect(()=>{
      count.current = 0
      console.log("column index: "+props.columnIndex)
      console.log(props.dataState.map(item => item.data.title))
      console.log(count.current)
    },[props.dataState])

    // Opens a new tab with the given URL
    function openTab(_url){
        window.open(_url, "_blank")
    } 
    const count = useRef(0)

    function postIsInColumn(item){
      var showPost = false
      console.log("column: " + props.columnIndex + " current: "+count.current + " " + item.data.title+" show: " + (count.current == props.columnIndex))
      if (count.current == props.columnIndex)
          showPost = true
      count.current ++
      if(count.current > props.countMax)
          count.current = 0
      return showPost
    }

  return (
    <div className='column'>
      {props.columnIndex}
    {props.dataState.map((item, index) => (
      (
        postIsInColumn(item) &&
        <Post item={item} index={index} dataState={props.dataState} openTab={openTab} key={item.data.id}></Post>
      )
      // <div key={index+item.id}>
      //   {(index % 2 == props.side) &&
      //     <div className={'redditDiv ' + ((index == props.dataState.length - 3 || index == props.dataState.length - 4) && " last-post")} onClick={()=>openTab(item.data.url)}>
      //       <div className='title'>{item.data.title}</div>
      //       <div className='title'>{item.data.domain}</div>
      //       <div className='title'>{item.data.fullname}</div>

      //       {/* <img src={item.data.thumbnail}></img> */}
                  
      //       <img className='image' src={item.data?.preview?.images[0]?.source?.url.replaceAll("amp;", "")}></img>
      //       {item.data.domain === "redgifs.com" &&
      //         <div>
      //           {console.log(item.data.media.oembed.html.split('"')[1])}
      //           <iframe
      //             src={item.data.media.oembed.html.split('"')[1]}
      //           ></iframe>
      //         </div>
      //       }
      //     </div>
      //   }
      // </div>
      
    ))}
  </div>
  )
}

export default Column