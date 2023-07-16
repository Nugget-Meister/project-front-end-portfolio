// let ships_url = "https://www.swapi.tech/api/starships/"

import { getShipList, getShipDetails, ships_url } from "./modules/api_calls.js";

let errorSound = document.createElement("AUDIO")
let successSound = document.createElement("AUDIO")
let incrementSound = document.createElement("AUDIO")
let decrementSound = document.createElement("AUDIO")
let removeSound = document.createElement("AUDIO")

errorSound.src = "./data/music/misc_menu_4.wav"
successSound.src = "./data/music/sharp_echo.wav"
incrementSound.src = "./data/music/beep_01.ogg"
decrementSound.src = "./data/music/beep_02.ogg"
removeSound.src = "./data/music/beep_03.ogg"

errorSound.type = "audio/wav"
successSound.type = "audio/wav"
incrementSound.type = "audio/ogg"
decrementSound.type = "audio/ogg"
removeSound.type = "audio/ogg"

// Prevent default on submit
let form = document.querySelector("form")
if(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let shipID = e.target.ship.value
        let shipAmount = e.target.amount.value

        successSound.load()
        errorSound.load()

        if(shipID == 0 || shipAmount <= 0 || shipAmount > 10) {
            errorSound.play()
            shipID == 0 ? createWarningBox("No ship selected. Select a ship to add to your fleet. Click to dismiss.") : null
            shipAmount <= 0 ? createWarningBox("Invalid amount entered. Can only add 1-10 ships. Click to dismiss.") : null
            shipAmount > 10 ? createWarningBox("Maximum of 10 of each ship in the Fleet! Click to remove.") : null
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

    let container = document.getElementById("warnings")
    let messageBox = document.createElement("div")
    messageBox.classList.toggle("warning")
    messageBox.innerText = message || "${default_message}"
    messageBox.addEventListener("click",(e) =>{
        removeSound.load()
        removeSound.play()
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
            incrementSound.load()
            incrementSound.play()
            dataAmount.innerText = Number(dataAmount.innerText) + 1
        } else {
            errorSound.load()
            errorSound.play()
            createWarningBox("Maximum of 10 of each ship in the Fleet! Click to remove.")
        }   
    })
    buttonDecrement.addEventListener("click", (e) => {
        console.log(e.target.parent)
        if(Number(dataAmount.innerText) > 1) {
            decrementSound.load()
            decrementSound.play()
            dataAmount.innerText = Number(dataAmount.innerText) - 1
        } else {
            removeSound.load()
            removeSound.play()
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
    addToList,
}