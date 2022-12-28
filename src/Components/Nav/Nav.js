import React, { useEffect, useRef, useState } from 'react'
import {netflixLogoUrl, squareAvatarUrl} from "../../Resources/Constants"
import AuthMenu from './Auth/AuthMenu'
import "./Nav.css"
import List from "./Lists/Lists.js"
import { useDispatch, useSelector } from 'react-redux'
import AddToList from './Lists/AddToList.js'
import { loadLists } from './NavSlice'

function Nav(props) {

    // State variable that determines if the navbar is displayed
    const [showNav, setshowNav] = useState(true)
    const showNavRef = useRef()
    const [displayNav, setDisplayNav] = useState(true)
    const displayNavRef = useRef()
    const [showAddToList, setShowAddToList] = useState()

    // State variable that determines if the navbar has a background
    const [showNavBackground, setshowNavBackground] = useState(true)
    const displayNavTimer = useRef()
    // Show or hide the auth menu
    const [showAuthMenu, setShowAuthMenu] = useState()
    // A ref is necessary to access current value in an event listener or timer
    const showAuthMenuRef = useRef()
    // For the common links
    const pages = [
        {
            name: "Funny",
            url: "r/funny" 
        },
        // {
        //     name: "Gone Wild",
        //     url: "r/gonewild" 
        // },
        // {
        //     name: "Petite Gone Wild",
        //     url: "r/petitegonewild" 
        // },
        // {
        //     name: "Grool",
        //     url: "r/grool" 
        // },
        {
            name: "Cat Gifs",
            url: "r/catgifs" 
        }
    ]

    // Refs used to track consecutive scrolling direction and amount
    const lastScrollPos = useRef()
    const currentScrollInterval = useRef()
    const lists = useSelector(state => state.navSlice.lists)
    const firstLoad = useRef(true)

    const dispatcher = useDispatch()

    useEffect(()=>{       
        // Only call this once on load
        if(!firstLoad){
            return
        }
        firstLoad.current = false

        // Loads the lists from localStorage
        dispatcher(loadLists())

        // Create an event listener that calls check scroll when the user scrolls 
        window.addEventListener("scroll", checkScroll)
        // This will remove the listener when the compnent unmounts
        return ()=>window.removeEventListener("scroll", checkScroll)
    },[])

    function showNavBar(show){
        // If the nav bar should be shown
        if(show){

            // If the nav bar is not already being shown, show it
            if(!showNavRef.current){

                // Clear the timer in case it will stop displaying soon, we want it to display if this is called
                clearTimeout(displayNavTimer.current)
                displayNavTimer.current = null

                // Display it (it will be rendered on the screen)
                setDisplayNav(true)
                displayNavRef.current = true
    
                // Right after set this so the transparency comes in
                setTimeout(() => {
                    setshowNav(true)
                    showNavRef.current = true
                }, 10);
            }
        }else if(showNavRef.current){
            
            if(showAuthMenuRef.current)
                return

            // Make it so it fades out by setting opacity to 0
            setshowNav(false)
            showNavRef.current = false

            // If there is not already a time that will make the display turn off
            if(!displayNavTimer.current){
                // Save the timer so it can be cleared if user wants to show the nav before it times out
                displayNavTimer.current = setTimeout(() => {
                    // Make it so it does not render so it does not cover anything
                    setDisplayNav(false)
                    showNavRef.current = false
                }, 800);
            }
            
        }

    }

    // Get the list, cycle through and add the url to the correct one, put it in state, put in local storate
    function addToList(_list, _newUrl){

    }

    // Check the scroll height and set state accordingly
    function checkScroll(){                

        // If they are at the top show the nav bar
        if(window.scrollY < 300){
            showNavBar(true)                
        }
        // If the user just scrolled up
        else if(window.scrollY < lastScrollPos.current){
            // Add the amount they scrolled up the the counter
            currentScrollInterval.current += lastScrollPos.current - window.scrollY
            // If they have scrolled up 20 consecuctive intervals show the navbar
            if(currentScrollInterval.current > 20)
            showNavBar(true)
        }
        // If the user scrolled down 
        else{
            // Hide the navbar
            showNavBar(false)
            // And reset the scroll up counter
            currentScrollInterval.current = 0
        }

  
        
        // // If they are at the very top don't show the background (so the user can see the banner)
        // if(window.scrollY < 100){
        //     setshowNavBackground(true)
        // // When they are scrolled down a little show the nav background
        // }else{
        //     setshowNavBackground(true)
        // }

        // Save the current scroll position so it can be checked next time this function is called
        lastScrollPos.current = window.scrollY
    }

    function displayAuthMenu(show){
        setShowAuthMenu(show)
        showAuthMenuRef.current = show
    }

  return (
    <div className={`navBar ${showNavBackground && " navBackground"} ${showNav && " showNav"} ${!displayNav && " dontDisplay"}`}>
        <img className='navLogo' src={netflixLogoUrl}></img>
        <img className='navAvatar'  src={squareAvatarUrl} onClick={()=>displayAuthMenu(true)}></img>
        {/* <div className='dropDown'>
            Common Links
            {pages.map((pageInfo, index) => (
                <div key={"linkItem"+index} className='dropDownItem' onClick={(e)=>props.openTab(e, pageInfo.url)}>{pageInfo.name}</div>
            ))}
        </div> */}
        <List></List>
        <div className='addToList' onClick={()=>setShowAddToList(true)}>+</div>
        {showAuthMenu && <AuthMenu setShowAuthMenu={displayAuthMenu}></AuthMenu>}
        {showAddToList && <AddToList setShowAddToList={setShowAddToList}></AddToList>}
    </div>
  )
}

export default Nav