import {
    createSelectedItem,
    addToList
} from "../index.js"

let ships_url = "https://www.swapi.tech/api/starships/"

function getShipList() {
    let formShipSelection = document.getElementById("ship")
    let result = fetch(ships_url)
    .then(data => data.json())
    .then(json => {
        console.log(json)

        for(let ship of json.results){
            formShipSelection.append(createShipSelector(ship.name))
            console.log(ship.name)
        }    
    })
}


function getShipDetails(id, name, amount) {
    let result = fetch(ships_url+id)
    .then(data => data.json())
    .then(json => {
        console.log(json.result.properties)
        return json.result.properties
    })
    .then(result => {
        let thisManufacturer = result.manufacturer
        let thisModel = result.model
        let thisCost = result.cost_in_credits
        let thisCargo = result.cargo_capacity
        let thisCrew = result.crew

        addToList(name, id, thisManufacturer, thisModel, thisCost, thisCargo, thisCrew, amount);
    })
}

function createShipSelector(name){
    let selector = document.createElement("option")
    selector.setAttribute("value", "uid")
    selector.innerText = name
    
    return selector
}


export {getShipList, getShipDetails, createShipSelector, ships_url}
