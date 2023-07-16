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

# API Calls.js

## createShipSelector (name, uid, elementType)
Intermediary function used to generate an element with the ships name and uid, allows to be used to create an element of any type.

- `name` {string}- Name of the ship in question, will be set as the inner text for the element
- `uid` {string} - The uid of the ship in question. This us used when making the api request for a specific ship.
- `elementType` {string} - The type of element to be created. 

## getShipList (page, targetID, elementType)
Makes an api call to get all of the available ships from SWAPI then makes generates the list using `createShipSelector()`. Targets the id of a specific element to inject list into.

- `page` {string} - Which page you wish to load from SWAPI (allows 1-4).
- `targetID` {string} - The id of an element on the webpage to populate the list in.
- `elementType` {string}- The type of element to generate when populating the list.




## getShipDetails (id, amount)
Makes an api call to SWAPI to get the information on a ship with a given ID, then uses `addToList()` to generate & append the information to the page.

- `id` {string} - Id used to specify which ship to make an API call for
- `amount` {string} - The amount of ships that are being planned on being added. Passed to inner functions.

# Index.js

## createWarningBox(message)
Creates a warning box screen with whatever `messsage` you choose to put in it. It is dismissed whenever a user clicks on it.
 - `message` {string} - String value containing the messsage you want to put in thte message box.

## createSelectedItem(name, id, manufacturer, model, cost, cargo, crew, amount)
Creates an element with the included information as its contents. Also gives the container buttons to increment/decrement the amount in the container. The element is deleted when the amount reaches 0. **Does not append to document. See** `addToList()` **for appending to the DOM**
- `name` {string} - Name of the ship
- `id` {string} - The id of the ship. Used for dupe protection against creating two elements for the same ship.
- `manufacturer` {string} - The ships manufacturer
- `model` {string} -  The ships model
- `cost` {string} - The ships cost in credits
- `crew` {string} - The recommended/minimum crew required.
- `amount` {string} - How many ships are being added.


## addToList(name, id, manufacturer, model, cost, cargo, crew, amount)
Intermediary function thar appends the result of createSelectedItem() to the DOM. See `createSelectedItem()` for more information.

## soundLoaderIndex()
Helper function explicitly for loading in sounds on index.html. Prevents errors froim sounds from attempting to be loaded on other pages. Takes no additional input.


# Ship_details.js

## createItemDetailsII(source, targets, titles)
Improved version of createItemDetails that allows for dynamic creation of elements based on input arrays. Depending on length of arrays will provide a title, followed by the keys value. Targets and titles should be the same length or the keys will map to undefined. **Keys with no title will not be mapped onto the new element.**

- `source` {object} - Source info where keys are going to be referenced into the element/
- `targets` {array} - Array of keys stored in the source that will be used to get information from `source`. Mapped syncronously with `titles`
- `titles` {array} - Titles of elements that will be prepended before the target keys in the object. Mapped synchronously with `targets`

## addToListII(source, targetID, targets, titles)
Intermediary function that appends the result of createItemDetailsII() to DOM. See `createItemDetailsII()` for more information.

## function addListenerToButtons()
Loops through all of the ships added to the shipList and adds an event listener that makes an API call for the ships information the passes it through addToListII() and plays an audio cue when ran.
- This function is also made to reduce API calls by having the existing information that was already called hidden if another call is made. Attempting to get information on the a previous ships will toggle that ships information into focus instead of making another API call.


# Stretch Goals

The stretch goals implemented are: 
- Usage of sound cues on various elements to provide auditory feedback.
- Use of CSS transitions to create responsive elements on page.
- Split your CSS or JavaScript into multiple files, with each file relating to a specific functionality.

# Sources
- source for background ambience - yd - openGameArt - https://opengameart.org/content/background-space-track
- Used faviccon.io to generate  icon - https://favicon.io/
- The rest of the sounds were sourced from GDC Conventions via Sonniss - https://sonniss.com/