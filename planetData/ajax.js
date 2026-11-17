let planetsFetch = [];


function fetchData() {
    fetch("planetData/planets.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Es ist ein Netzwerkproblem aufgetreten");
            }
            return response.json();
        })
        .then(function (data) {
            if (!Array.isArray(data.planets)) {
                document.getElementById("planetDataOutput").innerHTML = "Keine Planeten gefunden";
                return;
            }

            planetsFetch = data.planets;

            document.getElementById("planetDataSelection").disabled = false;

        })
        .catch(function (error) {
            document.getElementById("planetDataOutput").innerHTML = "Fehler:" + error;
            console.log(error);
        })
}


function displayPlanetDataByType(selection) {
    if (selection === null || selection === "none") return;
    if (selection === "empty") displayPlanetData(planetsFetch);

    let planetsOutput = filterPlanetsByType(planetsFetch, selection);

    displayPlanetData(planetsOutput);

    document.getElementById("disableOnSelection").disabled = true;
}

function displayPlanetDataByName(selection) {
    if (selection === null || selection === "none") return;
    let planetsOutput = getPlanetById(planetsFetch, selection);
    
    displayPlanetData(planetsOutput);

        document.getElementById("disableOnSelection").disabled = true;
}

function displayPlanetData(planets){
    let ausgabe = "";

    if(!Array.isArray(planets)){
        document.getElementById("planetDataOutput").innerHTML = createPlanetDataString(planets);
        return;
    }

    planets.forEach(function(planet){
        ausgabe += createPlanetDataString(planet);
    })

    document.getElementById("planetDataOutput").innerHTML = ausgabe;
}


//Hilfsmethoden
function determineType(type) {
    switch (type) {
        case "stone":
            return "Steinplanet";
        case "gas":
            return "Gasriese";
        case "ice":
            return "Eisriese";
    }
}

function filterPlanetsByType(planets, type) {
    if (type === null || type === "empty") {
        return planets;
    }

    const filteredPlanets = planets.filter(function (planet) {
        return planet.type === type;
    })
    return filteredPlanets;
}

function getPlanetById(planets, id){
    if (id === null || id === "empty" || id === "none") {
        return planets;
    }

    const foundPlanet = planets.find((planet)=> {
        if (planet.upid == id){
            return [planet];
        }
    })
    return foundPlanet;
}

function createPlanetDataString(planet) {
    return `<div class="w3-panel w3-light-grey w3-round w3-leftbar">
                <h3>${planet.displayName}</h3>
                <p>Position im Sonnensystem: ${planet.position}<br>
                Art von Planet: ${determineType(planet.type)} <br>
                Äquatorialdurchmesser: ${planet.diameterKm} km <br>
                Masse: ${planet.massInE20kg}x10^20kg <br>
                Länge eines Tages: ${planet.dayLengthInHours} Stunden <br>
                Länge eines Jahres: ${planet.yearLengthInDays} Tage <br>
                Anzahl an bekannten Monden: ${planet.numberOfMoons} <br>
                Wichtige Raumfahrtmissionen: ${planet.notableSpaceMissions.join(", ")} <br>
                Fun Fact: ${planet.funFact} <br>
                </p>
            </div>`;
}


fetchData();