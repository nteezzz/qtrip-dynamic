
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  let params=new URLSearchParams(search);
  let urlCity= params.get('city');
  console.log(urlCity);
  return urlCity;
  
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url =config.backendEndpoint+"/adventures?city="+city;
  try{
    let res = await fetch(url);
  
    let data = await res.json();
    return data;
  }
  catch(error){
    return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  
// File: pages/adventures/index.html
let row=document.getElementById("data");

for(let adventure of adventures)
{
const divCol=document.createElement("div");
divCol.setAttribute("class","col-6 col-lg-3 mb-3");

const anchor=document.createElement("a");
let url="detail/?adventure="+adventure.id;
anchor.setAttribute("href",url);
anchor.id=adventure.id;

const divCard=document.createElement("div");
divCard.setAttribute("class","activity-card");

const img=document.createElement("img");
img.src=adventure.image;
img.alt=adventure.name+"image";

const divBan=document.createElement("div");
divBan.setAttribute("class","category-banner");
divBan.textContent=adventure.category;

let container1=document.createElement("div");
container1.setAttribute("class","activity-card-text");
let divName=document.createElement("div");
divName.textContent=adventure.name;
let divPrice=document.createElement("div");
divPrice.textContent="₹"+adventure.costPerHead;
container1.appendChild(divName);
container1.appendChild(divPrice);


let container2=document.createElement("div");
container2.setAttribute("class","activity-card-text");
let divDur=document.createElement("div");
divDur.textContent="Duration";
let divDuration=document.createElement("div");
divDuration.textContent=adventure.duration +"Hours";
container2.appendChild(divDur);
container2.appendChild(divDuration);

const divContent=document.createElement("div");

divContent.appendChild(container1);
divContent.appendChild(container2);

divCard.appendChild(img);
divCard.appendChild(divBan);
divCard.appendChild(divContent);

anchor.appendChild(divCard);

divCol.appendChild(anchor);

row.appendChild(divCol);

}
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newList=list.filter(function(i){
    return i.duration>=low && i.duration<=high;
  });
  return newList;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newList=list.filter(function(i){
    return categoryList.indexOf(i.category)!=-1;
  });
  return newList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {

  const arr=filters["duration"].split("-");
  const lowInt=parseInt(arr[0]);
  const highInt=parseInt(arr[1]);

  if(filters["duration"].length>0){
     list = filterByDuration(list, lowInt, highInt);
    }
  if(filters["category"].length>0){
     list= filterByCategory(list, filters["category"]);
    }
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let data=JSON.stringify(filters);
  localStorage.setItem('filters',data);

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {

  return JSON.parse(localStorage.getItem('filters'));
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  const area=document.getElementById("category-list");
  for(let i in filters["category"]){
  const ele=document.createElement("div");
  ele.setAttribute("class","category-filter");
  ele.textContent=filters["category"][i];
  area.append(ele);

  }
  

  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
