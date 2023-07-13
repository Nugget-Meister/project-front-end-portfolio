let base_url = "https://www.swapi.tech/api/"
let ships_url = "https://www.swapi.tech/api/starships/"
// let vehicles_url = "https://www.swapi.tech/api/vehicles"

let formShipSelection = document.getElementById("ship")


// function getVehicles() {}

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

function createShipSelector(name){
    let selector = document.createElement("option")
    selector.setAttribute("value", name)
    selector.innerText = name
    
    return selector
}

// console.log(formShipSelection)
getShipList()