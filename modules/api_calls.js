import {
    addToList
} from "../index.js"

let ships_url = "https://www.swapi.tech/api/starships"


function createShipSelector(name, uid, elementType){
    let selector = document.createElement(elementType)
    selector.setAttribute("value", uid)
    selector.innerText = name
    
    return selector
}

function getShipList(page, targetID, elementType) {
    let formShipSelection = document.getElementById(targetID)
    let result = fetch(`${ships_url}?page=${page}&limit=10`)
    .then(data => data.json())
    .then(json => {
        for(let ship of json.results){
            formShipSelection.append(createShipSelector(ship.name, ship.uid, elementType))
        }   
    }).then(
        document.getElementById("loading").remove()
    )
}


function getShipDetails(id, amount) {
    let result = fetch(ships_url+"/"+id)
    .then(data => data.json())
    .then(json => {
        return json.result.properties
    })
    .then(result => {
        let thisManufacturer = result.manufacturer
        let thisModel = result.model
        let thisCost = result.cost_in_credits
        let thisCargo = result.cargo_capacity
        let thisCrew = result.crew
        let thisName = result.name

        addToList(thisName, id, thisManufacturer, thisModel, thisCost, thisCargo, thisCrew, amount);
    })
}




export {getShipList, getShipDetails, createShipSelector, ships_url}
