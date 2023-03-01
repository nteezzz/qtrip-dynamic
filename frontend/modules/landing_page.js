import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const url =config.backendEndpoint+"/cities";
  try{
    let res = await fetch(url);
  
    let data = await res.json();
    return data;
  }
  catch(error){
    return null;
  }


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

  const row=document.getElementById("data");

  const divCol=document.createElement("div");
  divCol.setAttribute("class","col-lg-3 col-md-6 col-sm-12 mb-3");
  const anchor=document.createElement("a");
  let url="pages/adventures/?city="+id
  anchor.setAttribute("href",url);
  anchor.id=id;
  const divTile=document.createElement("div");
  divTile.setAttribute("class","tile");

  const img=document.createElement("img");
  img.src=image;
  img.alt=city+"image";
  img.class="rounded img-fluid";

  const divText=document.createElement("div");
  divText.setAttribute("class","tile-text text-center");
  const h5=document.createElement("h5");
  h5.textContent=city;
  const p=document.createElement("p");
  p.textContent=description;
  divText.appendChild(h5);
  divText.appendChild(p);

  divTile.appendChild(img);
  divTile.appendChild(divText);

  anchor.appendChild(divTile);

  divCol.appendChild(anchor);

  row.appendChild(divCol);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
