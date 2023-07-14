let base_url = "https://www.swapi.tech/api/"
let ships_url = "https://www.swapi.tech/api/starships/"
// let vehicles_url = "https://www.swapi.tech/api/vehicles"

let formShipSelection = document.getElementById("ship")


// Prevent default on submit
let form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    let shipName = e.target.ship.innerText
    let shipID = e.target.ship.value

    e.preventDefault();
    addToList(shipName, shipID);


}) 


// Api call for information then populate list 

function getShipList() {
    let result = fetch(ships_url)
    .then(data => data.json())
    .then(json => {
        for(ship of json.results){
            formShipSelection.append(createShipSelector(ship.name))
            console.log(ship.name)
        }    
    })
}

// Create option for a form

function createShipSelector(name){
    let selector = document.createElement("option")
    selector.setAttribute("value", "uid")
    selector.innerText = name
    
    return selector
}

function createSelectedItem(name, id) {
    let section = document.createElement("section")
    section.setAttribute("id", id)

    //Word spans
    let titleManufacturer = document.createElement("span")
    let titleModel = document.createElement("span")
    let titleCost = document.createElement("span")
    let titleCargo = document.createElement("span")
    let titleCrew = document.createElement("span")

    //Data Spans
    let shipName = document.createElement("h2")
    let dataManufacturer = document.createElement("span")
    let dataModel = document.createElement("span")
    let dataCost = document.createElement("span")
    let dataCargo = document.createElement("span")
    let dataCrew = document.createElement("span")
   
    // Data Text
    

    //Title Text
    titleManufacturer.innerText = "Manufacturer: "
    titleModel.innerText = "Model: "
    titleCost.innerText = "Cost: "
    titleCargo.innerText = "Cargo Cap: "
    titleCrew.innerText = "Required Crew: "

    //Append
    section.append(shipName)
    section.append(titleManufacturer,dataManufacturer,document.createElement("br"))

    return section
}

function addToList(name, id) {
    let itemList = document.getElementById("item-list")

    if(!document.getElementById(id)) {
        itemList.append(createSelectedItem(name, id))
    } else {
        //Should add an element to the dom when item exists
    }
    
}


// getShipList()