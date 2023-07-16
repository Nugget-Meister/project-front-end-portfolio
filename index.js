// let ships_url = "https://www.swapi.tech/api/starships/"

import { getShipList, getShipDetails, ships_url } from "./modules/api_calls.js";

let errorSound = document.createElement("AUDIO")
let successSound = document.createElement("AUDIO")

errorSound.src = "../data/music/misc_menu_4.wav"
errorSound.type = "audio/wav"

successSound.src = "../data/music/sharp_echo.wav"
successSound.type = "audio/wav"


// Prevent default on submit
let form = document.querySelector("form")
if(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let shipID = e.target.ship.value
        let shipAmount = e.target.amount.value

        successSound.load()
        errorSound.load()

        if(shipID == 0 || shipAmount <= 0) {
            errorSound.play()
            shipID == 0 ? createWarningBox("No ship selected. Select a ship to add to your fleet. Click to dismiss.") : null
            shipAmount <= 0 ? createWarningBox("Invalid amount entered. Can only add 1 or greater ships. Click to dismiss.") : null
        } else {
            if(!document.getElementById(shipID)) {
                successSound.play()
                getShipDetails(shipID, shipAmount)
            } else {
                errorSound.play()
                createWarningBox("This ship already exists in your fleet! Click to dismiss.")
            }
        }
    }) 
}

function createWarningBox(message) {
    let container = document.getElementById("container")
    let messageBox = document.createElement("div")
    messageBox.classList.toggle("warning")
    messageBox.innerText = message || "${default_message}"
    messageBox.addEventListener("click",(e) =>{
        e.target.remove()
    })
    container.prepend(messageBox)
}

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
    buttonDecrement.addEventListener("click", (e) => {
        console.log(e.target.parent)
        if(Number(dataAmount.innerText) > 1) {
            dataAmount.innerText = Number(dataAmount.innerText) - 1
        } else {
            section.remove()
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

if(document.getElementById("formShip")){
    getShipList(1,"ship","option")
}

export {
    createSelectedItem,
    addToList,
}