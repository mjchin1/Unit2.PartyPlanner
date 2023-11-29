//A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.

//Api Call 
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-ghp-et-web-ft-sf/events'

// state variable

let state = [];

//references pointing to my HTML //
const eventsList = document.querySelector("#eventsList"); 



//initial render - run the function to get and display AP info


const initRender = async () => {
    await getEvents(); 
    renderEvents(); 
}; 
initRender();
//get info from api
async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const events = await response.json();
        console.log(events);
        state = events.data;
    } catch (error) {
        console.log(error);
    }
};

//display API info
function renderEvents() {
    for (i = 0; i < state.length; i++) {
        const partyInfo = document.createElement("li");
        console.log(partyInfo)
        partyInfo.innerHTML = `
            <h4>${state[i].name}</h4>
            <h4>${state[i].date}</h4>
            <h4>${state[i].location}</h4>
            <h4>${state[i].description}</h4>
        `
        eventsList.appendChild(partyInfo);
    }
}; 
    

