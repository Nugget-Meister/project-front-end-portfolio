// let ships_url = "https://www.swapi.tech/api/starships/"

import { getShipList, getShipDetails, ships_url } from "./modules/api_calls.js";

// Prevent default on submit
let form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let shipName = e.target.ship.innerText
    let shipID = e.target.ship.value
    let shipAmount = e.target.amount.value

    if(!document.getElementById(shipID)) {
        getShipDetails(shipID, shipName, shipAmount)
    } else {
        //Should add an element to the dom when item exists
    }

}) 

//-- API CALLS
// Api call for information then populate list 

// function getShipList() {
//     let formShipSelection = document.getElementById("ship")
//     let result = fetch(ships_url)
//     .then(data => data.json())
//     .then(json => {
//         for(ship of json.results){
//             formShipSelection.append(createShipSelector(ship.name))
//             console.log(ship.name)
//         }    
//     })
// }

// function getShipDetails(id, name, amount) {
//     let result = fetch(ships_url+id)
//     .then(data => data.json())
//     .then(json => {
//         console.log(json.result.properties)
//         return json.result.properties
//     })
//     .then(result => {
//         let thisManufacturer = result.manufacturer
//         let thisModel = result.model
//         let thisCost = result.cost_in_credits
//         let thisCargo = result.cargo_capacity
//         let thisCrew = result.crew

//         addToList(name, id, thisManufacturer, thisModel, thisCost, thisCargo, thisCrew, amount);
//     })
// }



//-- ITEM CREATORS
// Create option for a form



function createSelectedItem(name, id, manufacturer, model, cost, cargo, crew, amount) {
    let section = document.createElement("section")
    //Id for duplicate protection
    section.setAttribute("id", id)
    section.classList.add('item-in-list')

    //Word spans
    let titleManufacturer = document.createElement("span")
    let titleModel = document.createElement("span")
    let titleCost = document.createElement("span")
    let titleCargo = document.createElement("span")
    let titleCrew = document.createElement("span")
    let titleAmount = document.createElement("span")

    //Data Spans
    let shipName = document.createElement("h2")
    let dataManufacturer = document.createElement("span")
    let dataModel = document.createElement("span")
    let dataCost = document.createElement("span")
    let dataCargo = document.createElement("span")
    let dataCrew = document.createElement("span")
    let dataAmount = document.createElement("span")
   
    // Data Text
    shipName.innerText = name
    dataManufacturer.innerText = manufacturer
    dataModel.innerText = model
    dataCost.innerText = cost
    dataCargo.innerText = cargo 
    dataCrew.innerText = crew
    dataAmount.innerText = amount || 1

    //Title Text
    titleManufacturer.innerText = "Manufacturer: "
    titleModel.innerText = "Model: "
    titleCost.innerText = "Cost: "
    titleCargo.innerText = "Cargo Cap: "
    titleCrew.innerText = "Required Crew: "
    titleAmount.innerText = "Amount: "

    // Buttons
    let buttonIncrement = document.createElement("button")
    let buttonDecrement = document.createElement("button")

    // Button Inner Text
    buttonIncrement.innerText = '+'
    buttonDecrement.innerText = '-'

    // Event Listeners for Buttons
    buttonIncrement.addEventListener("click", () => {     
        if(Number(dataAmount.innerText) < 10) {
            dataAmount.innerText = Number(dataAmount.innerText) + 1
        }   
    })
    buttonDecrement.addEventListener("click", () => {
        if(Number(dataAmount.innerText) > 0) {
            dataAmount.innerText = Number(dataAmount.innerText) - 1
        }
    })



    //Appending Elements
    section.append(shipName)
    section.append(titleManufacturer, dataManufacturer,document.createElement("br"))
    section.append(titleModel, dataModel,document.createElement("br"))
    section.append(titleCost, dataCost,document.createElement("br"))
    section.append(titleCargo, dataCargo,document.createElement("br"))
    section.append(titleCrew, dataCrew,document.createElement("br"))
    section.append(titleAmount, buttonIncrement,dataAmount,buttonDecrement, document.createElement("br"))

    return section
}

// Gets itemlist then appends created item to list

function addToList(name, id, manufacturer, model, cost, cargo, crew, amount) {
    let itemList = document.getElementById("item-list")
    itemList.append(createSelectedItem(name, id, manufacturer, model, cost, cargo, crew, amount))    
}

//-- Page manipulators
function incrementAmount(amount){
    
}

// getShipList(1)

export {
    createSelectedItem,
    addToList
}