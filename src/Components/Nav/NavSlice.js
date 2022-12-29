import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { json } from "react-router-dom";

const navSlice = createSlice({
    name: "navSlice",
    initialState: {
        // The list of all the lists
        lists: [
            {
              name: "Favorites",
              links: ["r/cats", "r/funny"]
            },
            {
              name: "Other",
              links: ["r/cats", "r/funny"]
            },
          ],
        // The current url to be displayed
        currentUrl: null
    },
    reducers: {
        loadLists: (state) => {
            // Load the lists from local storage
            const loadedLists = localStorage.getItem("reddit-lists")
            // If lists were loaded put them in state
            if(loadedLists){
                state.lists =  JSON.parse(loadedLists) 
                console.log("loaded lists: ")
                console.log(JSON.parse(loadedLists))
            } // Else it will be the default initial state
        },
        setCurrentUrl: (state, action) => {
            state.currentUrl = action.payload
        },
        addList: (state, action) => {
            // Create a new version of the lists
            var tempLists = [{name: action.payload, links: []}, ...state.lists]
            
            // Put it in state and localStorage
            state.lists = tempLists
            localStorage.setItem("reddit-lists", JSON.stringify(tempLists))

        },
        // Example payload: {listName: "list one", link: "r/cats"} adds r/cats to list one
        addToList: (state, action) => {
            // Get a copy of the lists so it can be put in local storage
            var tempLists = state.lists
            tempLists.forEach(list => {
                if(list.name == action.payload.listName){
                    list.links.push(action.payload.link)
                }
            })

            // Put the new version of the lists in state and localStorage
            state.lists = tempLists
            localStorage.setItem("reddit-lists", JSON.stringify(tempLists))

        },
        // action = {listName: "listName", link: "link"}
        removeFromList: (state, action) => {

            // Look through and add all that do not match the name
            var tempLists = []
            state.lists.forEach((list, index) => {
                tempLists.push(list)
                if(list.name === action.payload.listName){
                    var tempLinksArray = []
                    list.links.forEach(link => {
                        if(link !== action.payload.link)
                            tempLinksArray.push(link)
                        // else
                        //     console.log("removed " + link + " from "+list.name)
                    })
                    tempLists[index].links = tempLinksArray
                }
            })

            // Put the new version of the lists in state and localStorage
            state.lists = tempLists
            localStorage.setItem("reddit-lists", JSON.stringify(tempLists))
        }, 
        deleteList: (state, action) => {

            var tempLists = []
            
            // Add all but the index to be deleted 
            state.lists.forEach((item, index) =>{
                if(action.payload != index)
                tempLists.push(item)
            })

            // Put it in state and localstorage
            state.lists = tempLists
            localStorage.setItem("reddit-lists", JSON.stringify(tempLists))
        },
        setListName: (state, action) => {
            // Get the lists
            var tempLists = state.lists
            
            // Set the name of the corresponding one
            tempLists[action.payload.index].name = action.payload
            
            // Put it in state and localstorage
            state.lists = tempLists
            localStorage.setItem("reddit-lists", JSON.stringify(tempLists))

        }
    }
})

export const navSliceReducer = navSlice.reducer
export const {setCurrentUrl, addList, addToList, loadLists, removeFromList, deleteList, setListName} = navSlice.actions
