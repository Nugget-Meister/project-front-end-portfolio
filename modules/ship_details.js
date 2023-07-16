import { getShipList, getShipDetails, ships_url } from "../modules/api_calls.js";


let shipList = document.getElementById("ship-list")
let shipDetails = document.getElementById("ship-details")


let neededTargets = [
    // "name",
    "starship_class",
    "model",
    "manufacturer",
    "cargo_capacity",
    "consumables",
    "crew",
    "passengers",
    "hyperdrive_rating",
    "max_atmosphering_speed"

]
let neededTitles = [
    // "Name: ",
    "Starship Class: ",
    "Model: ", 
    "Manufacturer: ",
    "Cargo Capacity: ", 
    "Supply Capacity: ",
    "Required Crew: ",
    "Max Passengers: ",
    "Hyperdrive Rating: ",
    "Atmospheric Speed: "

]


function createItemDetailsII(source, targets, titles) {
    let section = document.createElement("section")
    section.setAttribute("id", source.uid)

    //Ship Name

    let shipName = document.createElement("h2")
    shipName.innerText = source.properties.name
    section.append(shipName)

    //Additional Details
    for(let item in titles){
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

function addListenerToButtons() {
    for(let ship of shipList.children){
        // console.log(ship)
        ship.addEventListener("click", () => {
            // console.log(ship.getAttribute("value"))
            let id = ship.getAttribute("value")
            let idCheck = document.getElementById(id)
            
            //Hide everything
            for(let child of shipDetails.children){
                if(child.classList[0] != "hidden"){
                    child.classList.toggle("hidden")
                }
            }
            if(idCheck){
                console.log("item exists")
                //Show element clicked on
                if(idCheck.classList[0] == "hidden") {
                    idCheck.classList.toggle("hidden")
                }
        
            } else {
                let result = fetch(ships_url+"/"+id)
                .then(data => data.json())
                .then(json => {
                    console.log(json.result)
                    addToListII(json.result,"ship-details", neededTargets, neededTitles)
                })
            }        
        })
    
    }
}



getShipList(1,"ship-list","span")

setTimeout(() => {
    addListenerToButtons()
},1000)

