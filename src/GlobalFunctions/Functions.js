export function setUrl(_url, event){
    
    if(event)
      event.stopPropagation()
    
    var currentUrl = window.location.href
    var fullUrl = ""
    if(currentUrl.includes("localhost"))
        fullUrl = "http://localhost:3000/?" + _url
    else
        fullUrl = "https://joegiusti.github.io/reddit-fun/?" + _url

    window.location.href = fullUrl
  } 

export function openTab(_url, event){
    
    if(event)
      event.stopPropagation()
    
    var currentUrl = window.location.href
    var fullUrl = ""
    if(currentUrl.includes("localhost"))
        fullUrl = "http://localhost:3000/?" + _url
    else
        fullUrl = "https://joegiusti.github.io/reddit-fun/?" + _url

    window.open(fullUrl, "_blank")
  } 