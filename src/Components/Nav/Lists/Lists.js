import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUrl } from '../../../GlobalFunctions/Functions'
import { addList, loadLists } from '../NavSlice'
import "./Lists.css"

function Lists(props) {

  const [addNew, setAddNew] = useState()
  const newListInputRef = useRef()
  // const listList = useSelector(state => state.litSlice.lists)
  const lists = useSelector(state => state.navSlice.lists)
  const dispatcher = useDispatch()

  useEffect(()=>{

    // If parent component is using it as a selector put the first list as default
    if(props.setSelectedList){
      // Make sure there is a valid array to pull the default list from
      if(Array.isArray(lists) && lists.length > 0)
        // console.log("list was found: "+lists[0].name)  
        props.setSelectedList(lists[0])
    }

    // Event listeners for escape and enter
    window.addEventListener("keydown", keyDown)
    return ()=>{window.removeEventListener("keydown", keyDown)}

  },[])
  function keyDown(event){
    if(event.key == "Escape"){
      setAddNew(false)
    }
    if(event.key == "Enter"){
      addListFunction()
    }
  }

  function openAddNewInput(){
    setAddNew(true)
    setTimeout(() => {
      newListInputRef.current.defaultValue = ""
      newListInputRef.current.focus()
    }, 100);
    
  }

  function addListFunction(){
    
    // Get the input name
    const newListName = newListInputRef.current.value
    
    // Don't add empty strin names
    if(newListName === "")
      return
    
    // Use a dispatcher to call the addList action which will put the list in state and localStorage
    dispatcher(addList(newListName))
    
    // And stop showing the input
    setAddNew(false)
  }

  return (
    <div className='dropDown'>
      <div className='listsContainer'>
        {/* if the parent component is using this as a selector this prop will be there */}
        {props.setSelectedList ? 
        <div>
          {props.selectedList?.name}
        </div> 
        : 
        // Otherwise it will just be used to go to the list's page
        <div>Lists</div>}
            
            <div className='dropDownItem' onClick={openAddNewInput}>+ Add List +</div>
            {addNew &&
              <div className='dropDownItem'>
                <input ref={newListInputRef} onMouseEnter={()=>window.focus(newListInputRef.current)}></input>
                <div className='addButton' onClick={addListFunction}>+</div>
              </div>
            }
            {lists.map((item, index) => (
              <div 
                key={index+item.name} 
                className='dropDownItem' 
                title={"add to list"}
                onClick={(event)=>{
                  if(props.setSelectedList){
                    props.setSelectedList(item)
                  }else{
                    setUrl("lists/"+index)
                  }
                }}
              >
                  {item.name}
                </div>
            ))}
        </div>
      </div>
  )
}

export default Lists