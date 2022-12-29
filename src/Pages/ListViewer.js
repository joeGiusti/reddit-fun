import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromList, setCurrentList, deleteList, setListName } from '../Components/Nav/NavSlice'
import "../Styles/ListViewer.css"
import {openTab, setUrl} from "../GlobalFunctions/Functions"
import ConfirmBox from '../Components/ConfirmBox'

function ListViewer() {

  const currentUrl = useSelector(state => state.navSlice.currentUrl)
  const allLists = useSelector(state => state.navSlice.lists)
  const [linkList, setLinkList] = useState([]) 
  const [showConfirmBox, setShowConfirmBox] = useState() 
  const listIndexRef = useRef(0)
  const listNameInput = useRef()
  const dispatcher = useDispatch()

  // When the current url updates put that list in state to be mapped
  useEffect(()=>{

    // Set the current list based on the url
    const splitUrl = currentUrl.split("/")
    if(Array.isArray(splitUrl) && splitUrl.length > 1){
      const index = Number.parseInt(splitUrl[1])
      if(typeof(index) === "number" && Array.isArray(allLists) && allLists.length >= index){
        listIndexRef.current = index
        setLinkList(allLists[index])
      }
      
    }

  },[currentUrl, allLists])

  function removeLinkFromList(link, event){
    if(event)
      event.stopPropagation()

    dispatcher(removeFromList({listName: linkList?.name, link: link}))
  }
  function updateListName(){

    console.log("updating list " + listIndexRef.current + " to: " + listNameInput.current.value)

    dispatcher(setListName({index: listIndexRef.current, name: listNameInput.current.value}))
  }

  function cancelConfirmMessage(){
    setShowConfirmBox(false)
  }
  function deleteListFunction(){

    // Dispatch a function that will delete the list in state and localStorate
    dispatcher(deleteList(listIndexRef.current))

    // Close the dialogue box
    //setShowConfirmBox(false)

    // Go to the top list
    setUrl("lists/0")
  }

  return (
    <div className='listViewer'>
      <div className='listViewerTop'>
        <div className='listViewerTopInner'>
          <div>
            <button className='deleteButton' onClick={()=>setShowConfirmBox(true)}>Delete List</button>
          </div>
          <div>
            <input 
              className='listNameInput' 
              defaultValue={linkList?.name} 
              ref={listNameInput}
              onChange={updateListName}
            ></input>
          </div>
        </div>
      </div>
      {linkList?.links?.map(link => (
        <div className='subPreview' onClick={(event)=>openTab(link, event)}>
          <div className='closeButton' onClick={(event)=>removeLinkFromList(link, event)}>X</div>
          {link}
        </div>
      ))}
      {showConfirmBox &&
        <ConfirmBox message={"Permantaly Delete List?"} cancel={cancelConfirmMessage} confirm={deleteListFunction}></ConfirmBox>
      }
    </div>
  )
}

export default ListViewer