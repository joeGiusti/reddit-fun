import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromList, setCurrentList } from '../Components/Nav/NavSlice'
import "../Styles/ListViewer.css"
import {openTab} from "../GlobalFunctions/Functions"

function ListViewer() {

  const currentUrl = useSelector(state => state.navSlice.currentUrl)
  const allLists = useSelector(state => state.navSlice.lists)
  const [linkList, setLinkList] = useState([]) 
  const dispatcher = useDispatch()

  // When the current url updates put that list in state to be mapped
  useEffect(()=>{

    // Set the current list based on the url
    const splitUrl = currentUrl.split("/")
    if(Array.isArray(splitUrl) && splitUrl.length > 1){
      const index = Number.parseInt(splitUrl[1])
      if(typeof(index) === "number" && Array.isArray(allLists) && allLists.length >= index)
        setLinkList(allLists[index])
      
    }

  },[currentUrl, allLists])

  function removeLinkFromList(link, event){
    if(event)
      event.stopPropagation()

    dispatcher(removeFromList({listName: linkList?.name, link: link}))
  }

  return (
    <div className='listViewer'>
      {linkList?.links?.map(link => (
        <div className='subPreview' onClick={(event)=>openTab(link, event)}>
          <div className='closeButton' onClick={(event)=>removeLinkFromList(link, event)}>X</div>
          {"link: "+link}
        </div>
      ))}
    </div>
  )
}

export default ListViewer