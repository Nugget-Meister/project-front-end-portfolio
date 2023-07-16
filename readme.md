# Star Wars - Fleet Command
##### Powered by SWAPI - https://www.swapi.tech/
## Preamble
Hello Commander! Welcome to fleet command. With the full might of the New Galactic Empire at your disposal, you will need to assemble a fleet to scour the stars to wipe out the Jedi plague.

### Fleet Command
- You should see a form in front of you, in it. You will see a selection of fine ships that you currently have access to, ranging from the lowly Corvette to the magnificent Death Star! As someone held in such high regard, money is no longer an issue, tell us what you want and we shall see it done! We'll add it to the back log and it will be made available to you... Eventually... Glory to the Empire! 

### Starship Details
- At this point you've spent all this time picking out ships, but surely you need to refresh your memory from time to time. Simply select a ship by clicking on it and watch as the information fills the display.

## How to Use

### Fleet Command

- Depending on the size of the screen you should see a form on the left or in the center of 

1. Pick a ship from the dropdown menu, failure to select a ship will have an error show up in the DOM.

2. Select a number between 1-10. The maximum amount of ships you can have of a given type in a fleet is 10. Any **higher** will result in an error showing up on the DOM. Attempting to put less than 1 will also have an error show up on the DOM

- While not necessary, you have the ability to reset the form by clicking the reset button. This will restore the default values to the form.

On the right hand side of the screen or on the bottom, You will see a brief description of the ships stats on your screen. This information includes the: 
- Manufacturer
- Model
- Credit Cost
- Cargo Capacity 
- Required Crewmates

You can add or subtract ships in singular increments by pressing the +/- buttons respectively, maxing out at 10. **Reducing the count to 0 will remove the ship from your fleet.** A sound cue will play when this happens.

### Ship Details

An encyclopedia of sorts that shows more information that you may need if you wish to do more research on a given ship available. You will see a selection of ships on the left-hand side or center of the screen depending on your screen size.

Clicking on one will result in its information showing up on the right-hand side or bottom of the page depending on screen size, with the following information being displayed below.

Example 
```
CR90 corvette
Starship Class: corvette
Model: CR90 corvette
Manufacturer: Corellian Engineering Corporation
Cargo Capacity: 3000000
Supply Capacity: 1 year
Required Crew: 30-165
Max Passengers: 600
Hyperdrive Rating: 2.0
Atmospheric Speed: 950
```


# Functions

## API Calls.js

### createShipSelector (name, uid, elementType)
Used to dynamically generate a list of ships after po


- name - Name of the 
### getShipList (page, targetID, elementType)
### getShipDetails (id, amount)

## Index.js
### createWarningBox(message)
### createSelectedItem(name, id, manufacturer, model, cost, cargo, crew, amount)
### addToList(name, id, manufacturer, model, cost, cargo, crew, amount)
### soundLoaderIndex()

## Ship_details.js
### createItemDetailsII(source, targets, titles)
### addToListII(source, targetID, targets, titles)
### function addListenerToButtons()


# Stretch Goals

The stretch goals implemented are: 
- Usage of sound cues on various elements to provide auditory feedback.
- Use of CSS transitions to create responsive elements on page.
- Split your CSS or JavaScript into multiple files, with each file relating to a specific functionality.

# Sources
- source for background ambience - yd - openGameArt - https://opengameart.org/content/background-space-track
- Used faviccon.io to generate  icon - https://favicon.io/
- The rest of the sounds were sourced from GDC Conventions via Sonniss - https://sonniss.com/