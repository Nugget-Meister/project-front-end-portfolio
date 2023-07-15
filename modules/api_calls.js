import {
    createSelectedItem,
    addToList
} from "../index.js"

let ships_url = "https://www.swapi.tech/api/starships"


function createShipSelector(name, type){
    let selector = document.createElement(type)
    selector.setAttribute("value", "uid")
    selector.innerText = name
    
    return selector
}

function getShipList(page, targetID, elementType) {
    let formShipSelection = document.getElementById(targetID)
    let result = fetch(`${ships_url}?page=${page}&limit=10`)
    .then(data => data.json())
    .then(json => {
        console.log(json)

        for(let ship of json.results){
            if(elementType != "option") {
                formShipSelection.append(createShipSelector(ship.name, elementType))
            } else{
                formShipSelection.append(createShipSelector(ship.name, elementType))
            }
            
            // console.log(ship.name)
        }    
    })
}


function getShipDetails(id, name, amount) {
    let result = fetch(ships_url+"/"+id)
    .then(data => data.json())
    .then(json => {
        console.log(json)
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




export {getShipList, getShipDetails, createShipSelector, ships_url}
