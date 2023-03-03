import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url =
    config.backendEndpoint + "/adventures/reservations/" ;
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

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length > 0) {
     document.getElementById("no-reservation-banner").style.display = "none";
     document.getElementById("reservation-table-parent").style.display = "block";
     let table = document.getElementById("reservation-table");
     for (let i of reservations) {
      console.log(i);
      let tr = document.createElement("tr");
       let d1 = new Date(i.date);
       let dateText = d1.toLocaleString("en-IN");
       d1 = new Date(i.time);
       let dateAndTime = d1.toLocaleString("en-IN", 
       { dateStyle: "long",
         timeStyle: "medium",});
         let button = document.createElement("button");
         button.setAttribute("id", i.id);
          button.setAttribute("class", "reservation-visit-button");
           let link = document.createElement("a");
            link.textContent = "Visit Adventure";
             link.setAttribute("href","../detail/?adventure="+i.adventure);
             button.append(link);
              tr.append(button);
              tr.innerHTML = ` 
               <td>${i.id}</td>
               <td>${i.name}</td>
               <td>${i.adventureName}</td>
               <td>${i.person}</td>
               <td>${dateText.split(",")[0]}</td>
               <td>${i.price}</td>
               <td>${dateAndTime.split(" at")[0]+","+dateAndTime.split("at")[1]}</td>`;
               tr.append(button);
               table.append(tr);
              }
            } 
            else {
               document.getElementById("no-reservation-banner").style.display = "block";
               document.getElementById("reservation-table-parent").style.display = "none";
               }


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
