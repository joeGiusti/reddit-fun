import './App.css';
import { useEffect, useRef, useState } from 'react';
import Column from './Components/Column';
import Home from "./Pages/Home.js"
import { Route, Router, Routes } from 'react-router-dom';
import Nav from './Components/Nav';

function App() {

  const [dataState, setDataState] = useState([])

  const postArrayRef = useRef([])
  const observerRef = useRef()
  const lastPost = useRef()
  const urlArray = useRef([])

  useEffect(()=>{

    // Create an intersection observer
    observerRef.current = createObserver()

  },[])
 
  // Creates an intersection observer taht will add posts when the last post is visible
  function createObserver(){
    return new IntersectionObserver(elements => {
      elements.forEach(element => {
        
        if(element.isIntersecting){
        
          // Load more posts
          loadNext()

          // Stop observing the previous last posts
          observerRef.current.unobserve(element.target)
          element.target.classList.remove("last-post")          
        }
      })
    })
  }

  // Gets the list of posts from the url and calls addToArry
  function addFromLink(_sub, _after){

    // Create the url from the input text
    var subUrl = "https://www.reddit.com/" + _sub + ".json?limit=10"+"&after="+_after
    
    // Fetch the json and add the posts in the data array of the json
    fetch(subUrl).then(res=>res.json()).then(json=>addToArray(json.data.children))

  }

  // Adds the given post items to the array of posts
  function addToArray(_itemsToAdd){

    console.log("postArrayRef.current")
    console.log(postArrayRef.current)
    console.log("_itemsToAdd")
    console.log(_itemsToAdd)

    // Make an array with both 
    var tempArray = [...postArrayRef.current, ..._itemsToAdd]

    // Save the after value of the last post so new posts can be laded when user scrolls past the last post
    lastPost.current = tempArray[tempArray.length-1].kind+"_"+tempArray[tempArray.length-1].data.id


    // Save the new array in the ref so we can add to it next time more loads
    postArrayRef.current = tempArray

    // Put the array in state to update the dom and display them
    setDataState(tempArray)

    // Add the observers after the state has updated and the posts are rendered
    setTimeout(() => {
      addObservers()
    }, (1000));

  }

  // Adds the items to every other spot in the array of posts
  function addToArray2Threads(_itemsToAdd){
    var tempArray = []
    var c = 0
    var c2 = 0
    var alt = true

    while(c <= postArrayRef.current.length || c2 <= _itemsToAdd.length){
      if(alt){
        if(c < postArrayRef.current.length)
          tempArray.push(postArrayRef.current[c])
        c++
        alt = false
      }else{
        if(c2 < _itemsToAdd.length)
          tempArray.push(_itemsToAdd[c2])
        c2++
        alt = true
      }
    }
    setDataState(tempArray)
  }

  // Uses the links in the text area to load posts
  function loadFromText(){

    // Removes the current posts
    postArrayRef.current = []
    lastPost.current = null

    // Get the list of links
    var string = document.getElementsByClassName("urlInput")[0].value
    var links = string.split('\n')

    urlArray.current = links

    // Add to the list of posts from each one
    //links.forEach(link => addFromLink(link, lastPost.current))

    // Seperated this out so it can be called independent of the textbox reading and post array reset
    loadNext()

  }
  function loadNext(){
    console.log("loading next")
    urlArray.current.forEach(link => addFromLink(link, lastPost.current))
  }

  // Opens a new tab with the given URL
  function openTab(event, _url){
    
    event.stopPropagation()
    
    var currentUrl = window.location.href
    var fullUrl = ""
    if(currentUrl.includes("localhost"))
        fullUrl = "http://localhost:3000/" + _url
    else
        fullUrl = "https://joegiusti.github.io/reddit-fun/?" + _url

    window.open(fullUrl, "_blank")
  } 
  function setUrl(event, _url){
    event.stopPropagation()

    window.location.href = window.location.href.split("/")[0] +"/reddit-fun/?"+_url
  } 

  function addObservers(){
    console.log("adding observers")
    var lastPosts = document.querySelectorAll(".last-post")
    console.log("to:")
    console.log(lastPosts)
    lastPosts.forEach(post => {
      observerRef.current.observe(post)

    })
  }

  return (
    <div>
    <Nav openTab={openTab}></Nav>
    <Routes>            
      <Route path="/" element={<Home/>} />
      <Route path="/:type/:name" element={<Home/>} />
      <Route path="/reddit-fun/" element={<Home/>} />
    </Routes>    
    </div>
  );
}

export default App;


    //#region 
    /*

    After you have the Post component working properly work on the loading from selected subs

    for redgifs its specified under
    item.data.domain = "redgifs.com"
    and the actual video link is at 
    item.data.media.oembed.html
    :
    example:
    "&lt;iframe src="https://redgifs.com/ifr/loathsomescalyenglishsetter" frameborder="0" scrolling="no" width="100%" height="100%"
      allowfullscreen style="position:absolute;"&gt;&lt;/iframe&gt;"
    just need to get the source and put it in a iframe

    after format
    item.type + '_' + item.data.id

    the ting I have works but it takes a bit to load
    maybe have a thing that opens when its clicked
    also it can start playing onHover
    would make a component for each post div
    also make it so there is columns so they posts are independent of height

    where reddnight was posted
    https://www.reddit.com/r/webdev/?f=flair_name%3A%22Showoff%20Saturday%22
    
    creating a reddit client
    search: "reddit client github"
    a list of them:
    Here are 109 public repositories matching this topic...  
    https://github.com/topics/reddit-client
    one simple one that came up in the search:
    https://github.com/ssorallen/react-reddit-client

    xcenture consulting, doing a lot of thing

    some others
    searched: reddit client REACT github
    this one has a /server folder next to source
    in index.html had div with id=root, index.js has starts with <Router></Router>
    going through this one, cloned it and trying to understand the flow
    "The back-end simply proxies to Reddit's public API. The front-end is written using a superset of Rangle's react-redux toolchain."
    uses an express server
    https://github.com/RSNara/reddit-client/tree/master/server
    mentions redGifs, seems like java though and imports android stuff
    https://github.com/QuantumBadger/RedReader
    others:
    https://github.com/ajnsit/reddit-client
    https://github.com/Docile-Alligator/Infinity-For-Reddit
    https://github.com/Monte9/Reddit-ReactNative
    https://github.com/abdullahceylan/ac-react-reddit
    https://github.com/pablen/react-reddit-client
    https://github.com/topics/reddit-client
    https://github.com/ssorallen/react-reddit-client
    
    there is a youtube video abou it
    https://www.youtube.com/results?search_query=react+reddit+client
    https://www.youtube.com/watch?v=rP-ZARMGY10
    

    ================================================================================
    Thoughts:

    It would be a good idea to re-create some of these projects from scratch doing what they did
    like it would be a good idea to talk through monologues of people who have a way of speaking

    ================================================================================
    done so far:

    https://www.reddit.com/dev/api/

    url?after=after<after>&limit=100
    where after is the id of the last post of the current request
    also called author_fullname in the data item
    could call it and before rendering anything just get that after value and start there bri

    adding .json at and of link shows data as json
    can fetch it and map it as an array
    window.open(url, _blank) opens the post in a new tab
    
    removing amp; from image files make them displayable
    item.data?.preview?.images[0]?.source?.url.replaceAll("amp;", "")
    
    media_metadata has the links for the images when there is no preview section 
      (all of them but its a json so not itteratable)

    found these reddits
    https://www.reddit.com/r/reddnight/
    https://www.reddit.com/user/hoperadchenko/
    https://www.reddit.com/r/cakeslip/comments/v9maru/rcakeslip_lounge/
    https://www.cakeslip.com/discover
    https://www.reddit.com/user/_WhatchaDoin_/

    found the api link by going into network tab at reddnight.com and filtering by Fetch/XHR
    it was called index.js and returned a json with an array of posts as one of its properties

    tried to call it in a react app with fetch but it was blocked by cors
    cors will block by default unless there is a header with "Access-Control-Allow-Origin"

    tried adding 'no-cors' but that didn't work and it would be silly if it did

    research to find a way around CORs
    
    can access it by pasting link in browser or with postman but that won't help create a site

    ====================

    reddit post about someone creating an api and using cors to guard it
    https://stackoverflow.com/questions/52680723/protect-api-with-cors

    CORs is enforced by the browser so it won't mean anything outside of the browser
    if another web site wants to access your API from their server and then put results into their own web pages, they can do that
    how is this done? maybe how the reddnight person got it from reddit
   
    this person is showing how to create a cors proxy
    https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors

    what is Heroku 
    https://www.youtube.com/watch?v=r5ZUQvl9BtE
    :
    platform as a service
    can create node endopints restful apis etc
    they will host the backend and frontend
    :
    used freecodecamp timestamp api service as an example
    :
    instead of creating your own node.js service
    can do that on godaddy, free on Heroku

    // this is blocked by cors
    // it seems like they created this api and made it so it can't be used from other domains by setting cors policy
    // fetch("https://reddnight.com/_next/data/iKUOrFPMx2YBZciVRULNn/index.json")
    ====================

    went to subreddit in the reddnight app and it requested from this url

    Request URL: https://reddnight-server.herokuapp.com/subreddit?q=bustypetite&filter=Hot&time=hour&page=1

    which is a heroku app
    so they have an api they created and put on Heroku that gets data from reddit an sends it back
    with cors so its only accessable from reddnight.com


    ================================================================================
    
    to learn

    front end
    react-router-dom
      how are the props being send, for example with Main, maybe globally accessable through the redux store
    redux react
      reducers
      sagas
    
    back end
    express server
    httpProxy.createProxyServer

    Get the data:
    use an api
    create an api
    create an api with cors policy specified
    create the proxy api
    create an api like the reddnight guy
    how to use heroku 

    Reverse engineer the page:
    how is a react app sent to a browser?

    general
    sending data in the url of the page ex: /r/username




    ====================

    what is webpack?
    puts all the files into one place
    https://www.youtube.com/watch?v=5zeXFC_-gMQ
     
    ====================
    how to use fetch api
    https://www.youtube.com/watch?v=cuEtnrL9-H0
    fetch("url")
    .then(res => res.json())
    .then(data => console.log(data))
      this only happens if there is a network error, response always succedes
    .catch(err => console.log(err))

    if(res.ok){
      consol.log("all good, 200 - 299")
    }else{
      console.log("error in fetch")
    }

    can also post with fetch


  ================================================================================
    other options to get data are
    XMLHttpRequest
    Fetch API (described above)
    Axios
    JQuery

    https://www.youtube.com/watch?v=RG-weA9HUrg

  ================================================================================
    */
    //#endregion
