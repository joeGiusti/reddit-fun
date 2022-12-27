import React, { useEffect, useRef, useState } from 'react'
import {netflixLogoUrl, squareAvatarUrl} from "../Resources/Constants"
import "../Styles/Nav.css"

function Nav(props) {

    // State variable that determines if the navbar has a background
    const [showNav, setshowNav] = useState(true)
    const [showNavBackground, setshowNavBackground] = useState(true)
    const pages = [
        {
            name: "Funny",
            url: "r/funny" 
        },
        {
            name: "Gone Wild",
            url: "r/gonewild" 
        },
        {
            name: "Petite Gone Wild",
            url: "r/petitegonewild" 
        },
        {
            name: "Grool",
            url: "r/grool" 
        },
        {
            name: "Cat Gifs",
            url: "r/catgifs" 
        }
    ]

    // Refs used to track consecutive scrolling direction and amount
    const lastScrollPos = useRef()
    const currentScrollInterval = useRef()

    useEffect(()=>{       
        // Create an event listener that calls check scroll when the user scrolls 
        window.addEventListener("scroll", checkScroll)
        // This will remove the listener when the compnent unmounts
        return ()=>window.removeEventListener("scroll", checkScroll)
    },[])

    // Check the scroll height and set state accordingly
    function checkScroll(){                

        // If the user just scrolled up
        if(window.scrollY < lastScrollPos.current){
            // Add the amount they scrolled up the the counter
            currentScrollInterval.current += lastScrollPos.current - window.scrollY
            // If they have scrolled up 20 consecuctive intervals show the navbar
            if(currentScrollInterval.current > 20)
            setshowNav(true)
        }
        // If the user scrolled down 
        else{
            // Hide the navbar
            setshowNav(false)
            // And reset the scroll up counter
            currentScrollInterval.current = 0
        }

        // If they are at the top show the nav bar
        if(window.scrollY < 300){
            setshowNav(true)                
        }
        
        // If they are at the very top don't show the background (so the user can see the banner)
        if(window.scrollY < 100){
            setshowNavBackground(true)
        // When they are scrolled down a little show the nav background
        }else{
            setshowNavBackground(true)
        }

        // Save the current scroll position so it can be checked next time this function is called
        lastScrollPos.current = window.scrollY
    }

  return (
    <div className={`navBar ${showNavBackground && " navBackground"} ${showNav && " showNav"}`}>
        <img className='navLogo' src={netflixLogoUrl}></img>
        <img className='navAvatar'  src={squareAvatarUrl}></img>
        <div className='dropDown'>
            Common Links
            <div className='dropDownItem' >+ Add Reddit</div>
            {pages.map((pageInfo, index) => (
                <div key={"linkItem"+index} className='dropDownItem' onClick={(e)=>props.openTab(e, pageInfo.url)}>{pageInfo.name}</div>
            ))}
        </div>
    </div>
  )
}

export default Nav