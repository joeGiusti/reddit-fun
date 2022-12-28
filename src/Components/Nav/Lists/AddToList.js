import React, { useEffect, useRef, useState } from 'react'
import Lists from './Lists.js'
import "./Lists.css"
import { useDispatch, useSelector } from 'react-redux'
import { addToList } from '../NavSlice.js'

function AddToList(props) {

    const [selectedList, setSelectedList] = useState()
    const urlInputRef = useRef()
    const currentUrl = useSelector(state => state.navSlice.currentUrl)
    const dispatcher = useDispatch()

    useEffect(()=>{
        
    },[])

    function addUrlToList(close){
        // Get the input link
        const urlValue = urlInputRef.current.value
        
        // Make sure there are valid variables
        if(!urlValue || !selectedList){
            console.log("input values are not valid")
            return
        }

        // Add it to the state and local storage by dispatching redux action
        dispatcher(addToList({listName: selectedList?.name, link: urlValue}))

        if(close  == true)
            props.setShowAddToList(false)
        
    }

  return (
    <div className='addToListMenu'>
        <div className='closeButton' onClick={()=>props.setShowAddToList(false)}>X</div>
        <div className='addListSection'>
            Url To Add
            <div>
                <input defaultValue={currentUrl} className={"addToListMenuInput"} ref={urlInputRef}></input>
            </div>
        </div>
        <div className='addListSection'>
            List to add it to
            <div>
                <Lists setSelectedList={setSelectedList} selectedList={selectedList}></Lists>
            </div>
        </div>
        <div>
            <button onClick={()=>addUrlToList(true)}>Add and Close</button>
            <button onClick={addUrlToList}>Add to List</button>
        </div>
     </div>
  )
}

export default AddToList