import React from 'react'
import Post from './Post'

function Column(props) {

    // Opens a new tab with the given URL
    function openTab(_url){
        window.open(_url, "_blank")
    } 

  return (
    <div className='column'>
      {props.dataState.map((item, index) => (
        <Post key={item.data.id} item={item} index={index} dataState={props.dataState} side={props.side} openTab={openTab}></Post>      
      ))}
    </div>  
  )
}

export default Column