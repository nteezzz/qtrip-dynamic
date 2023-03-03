import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  let params = new URLSearchParams(search);
  let urlAdv = params.get("adventure");
  return urlAdv;
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const url =
    config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
  try {
    let res = await fetch(url);

    let data = await res.json();
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const h1 = document.getElementById("adventure-name");
  h1.textContent = adventure.name;

  const p = document.getElementById("adventure-subtitle");
  p.textContent = adventure.subtitle;

  const pics = document.getElementById("photo-gallery");

  for (let image of adventure.images) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("class", "activity-card-image");
    img.src = image;
    div.appendChild(img);
    pics.appendChild(div);
  }

  const c = document.getElementById("adventure-content");
  c.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let pics = document.getElementById("photo-gallery");
  // pics.append(caro);
  let element = "";
  for (let i = 1; i < images.length; i++) {
    element +=
      "<div class='carousel-item '><img src='" +
      images[i] +
      "' class='d-block w-100' alt='...' class='activity-card-image'></div>";
  }

  pics.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${images[0]}" class="d-block w-100" alt="..." class="activity-card-image">
    </div>
    ${element} 
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  let soldPanel = document.getElementById("reservation-panel-sold-out");
  let availPanel = document.getElementById("reservation-panel-available");

  if (adventure.available) {
    soldPanel.style.display = "none";
    availPanel.style.display = "block";
    let cost = document.getElementById("reservation-person-cost");
    cost.innerHTML = `${adventure.costPerHead}`;
  } else {
    soldPanel.style.display = "block";
    availPanel.style.display = "none";
  }

  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total = document.getElementById("reservation-cost");
  let cost = adventure.costPerHead * persons;
  total.innerHTML = `${cost}`;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //const fName=document.getElementsByName("name").value
    const fName = form.elements["name"].value;
    const fDate = form.elements["date"].value;
    const fPerson = form.elements["person"].value;

    const update = {
      name: fName,
      date: fDate,
      person: fPerson,
      adventure: adventure.id,
    };
    const url = config.backendEndpoint + "/reservations/new";
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    }).then((response)=> response.json())
      .then((json) => {
        alert("Success!");
        location.reload();
      })
      .catch((error) => {
        alert("Failed!");
      });
  });
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner=document.getElementById("reserved-banner");
  if(adventure.reserved)
  {
    banner.style.display="block";

  }
  else
  {
    banner.style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
