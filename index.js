//A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.

//Api Call 
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-ghp-et-web-ft-sf/events'

// state variable

let state = [];

//references pointing to my HTML //
const eventsList = document.querySelector("#eventsList");
const addEventForm = document.querySelector("#addEvent");

addEventForm.addEventListener("submit", addParty);


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
  const partyEntry = []
  for (i = 0; i < state.length; i++) {
    const partyId = state[i].id
    const partyInfo = document.createElement("li");
    console.log(partyInfo)
    partyInfo.innerHTML = `
        <h4>${state[i].name}</h4>
        <h4>${state[i].date}</h4>
        <h4>${state[i].location}</h4>
        <h4>${state[i].description}</h4>
        `
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete Event"
    partyInfo.append(deleteButton)
    console.log('renderEvents: ', state[i].id);
    deleteButton.addEventListener("click", () => deleteEvent(partyId))


    partyEntry.push(partyInfo);
  }
  
  eventsList.replaceChildren(...partyEntry);
};

async function addParty(event) {
  event.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventForm.name.value,
        date: new Date(addEventForm.date.value).toISOString(),
        location: addEventForm.location.value,
        description: addEventForm.description.value,

      }),
    });

  if (!response.ok) {
      throw new Error("Failed to create party");
    }

    initRender();
  } catch (error) {
    console.error(error);
  }
};

async function deleteEvent(id) {
  console.log('deleteEvent: ', id);

  try{ 
    const response = await fetch(`${API_URL}/${id}`, { //adding ID to API URL to target that specific item. 
      method: "DELETE",
    })
    initRender()
  } catch(error) {
    console.error(error)
  }
}

