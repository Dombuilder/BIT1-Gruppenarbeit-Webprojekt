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

            planetsFetch = data.planets
            displayPlanetData();

            document.getElementById("planetDataSelection").disabled = false;

        })
        .catch(function (error) {
            document.getElementById("planetDataOutput").innerHTML = "Fehler:" + error;
            console.log(error);
        })
}


function displayPlanetData() {
    let currentSelection = document.getElementById("planetDataSelection").value
    let planetsOutput = filterPlanetsByType(planetsFetch, currentSelection)

    document.getElementById("planetDataOutput").innerHTML = createPlanetDataString(planetsOutput);
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
        return planets
    }

    const filteredPlanets = planets.filter(function (planet) {
        return planet.type === type;
    })
    return filteredPlanets
}

function createPlanetDataString(planets) {
    let ausgabe = "";

    planets.forEach(function (planet) {
        ausgabe += `<h3>${planet.displayName}</h3>
                <p>Position im Sonnensystem: ${planet.position}<br>
                Art von Planet: ${determineType(planet.type)} <br>
                Äquatorialdurchmesser: ${planet.diameterKm} km <br>
                Masse: ${planet.massInE20kg}x10^20kg <br>
                Länge eines Tages: ${planet.dayLengthInHours} Stunden <br>
                Länge eines Jahres: ${planet.yearLengthInDays} Tage <br>
                Anzahl an bekannten Monden: ${planet.numberOfMoons} <br>
                Wichtige Raumfahrtmissionen: ${planet.notableSpaceMissions} <br>
                Fun Fact: ${planet.funFact} <br>
                </p>`;
    });
    return ausgabe;
}


fetchData();