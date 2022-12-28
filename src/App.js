import './App.css';
import { useEffect, useRef, useState } from 'react';
import Column from './Components/Column';
import Home from "./Pages/Home.js"
import { Route, Router, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import ListViewer from './Pages/ListViewer';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from './Components/Nav/NavSlice';

function App() {

  const dispatcher = useDispatch()
  const firstLoad = useRef(true)

  const url = useSelector(state => state.navSlice.currentUrl)

  useEffect(()=>{
    
    if(!firstLoad.current)
      return
    firstLoad.current = false

    getUrlFromLocation()

  },[])
 
  // Gets url from window.location.href, if none sets a default
  function getUrlFromLocation(){
    // Look in the url for a sub link 
    var fromHref = window.location.href.split("?")
  
    // If there is something there to add put it in the current url state
    var urlFromLink = ""
    if(Array.isArray(fromHref) && fromHref.length > 1)
      urlFromLink = fromHref[1]
    // If there is no link in the location set a default url   
    else
      urlFromLink = "r/catgifs"
    
    // Put in the global store for other components
    dispatcher(setCurrentUrl(urlFromLink))
  }
 
  return (
    <div>
    <Nav></Nav>
    {url?.includes("list")
      ?
      <ListViewer></ListViewer>
      :
      <Home></Home>
    }
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

