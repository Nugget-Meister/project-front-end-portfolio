import {getShipList, ships_url} from "../modules/api_calls.js";

// Audio Cues
let successSound = document.createElement("AUDIO")

successSound.src = "../data/music/sharp_echo.wav"
successSound.type = "audio/wav"
successSound.volume = 0.25

// Element References

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
    thisTarget.append(createItemDetailsII(source,targets,titles))
}


function addListenerToButtons() {
    for(let ship of shipList.children){

        ship.addEventListener("click", () => {
            //Run load then play to allow interruption
            successSound.load()
            successSound.play()
            let id = ship.getAttribute("value")
            let idCheck = document.getElementById(id)
            
            //Hide all elements
            for(let child of shipDetails.children){
                if(child.classList[0] != "hidden"){
                    child.classList.toggle("hidden")
                }
            }
            if(idCheck){
                //Show element clicked on
                if(idCheck.classList[0] == "hidden") {
                    idCheck.classList.toggle("hidden")
                }
            } else {
                let result = fetch(ships_url+"/"+id)
                .then(data => data.json())
                .then(json => {
                    addToListII(json.result,"ship-details", neededTargets, neededTitles)
                })
            }        
        })
    
    }
}

if(document.getElementById("ship-list")){
    getShipList(1,"ship-list","span")
}


setTimeout(() => {
    addListenerToButtons()
},1000)

