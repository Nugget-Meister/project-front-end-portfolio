import { getShipList, getShipDetails, ships_url } from "../modules/api_calls.js";


let shipList = document.getElementById("ship-list")


let neededTargets = ["name","model","cargo_capacity"]
let neededTitles = ["Name: ", "Model: ", "Cargo Capacity: "]

function createItemDetails(name, id, manufacturer, model, cost, cargo, crew, amount) {
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

function createItemDetailsII(source, targets, titles) {
    let section = document.createElement("section")
    section.setAttribute("id", "$value")

    for(let item in titles){
        // console.log(titles[item], targets[item])
        let itemTitle = document.createElement("span")
        let itemValue = document.createElement("span")
        let newBreak = document.createElement("br")

        itemTitle.innerText = titles[item]
        itemValue.innerText = source.properties[targets[item]]
        section.append(itemTitle, itemValue, newBreak)
    }

    return section
}

function addToListII(source, targetID, targets, titles) {

    let thisTarget = document.getElementById(targetID)
    // console.log(thisTarget)
    thisTarget.append(createItemDetailsII(source,targets,titles))
}


// addToListII({properties: {loaf: "buns"}},"ship-details", neededTargets, neededTitles)


for(let ship of shipList.children){
    // console.log(ship)
    ship.addEventListener("click", () => {
        // console.log(ship.getAttribute("value"))
        let id = ship.getAttribute("value")
        let result = fetch(ships_url+"/"+id)
        .then(data => data.json())
        .then(json => {
            console.log(json.result)
            addToListII(json.result,"ship-details", neededTargets, neededTitles)
        })
    })

}



// getShipList(1,"ship-list","span")