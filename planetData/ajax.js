let planetsFetch = [];


function fetchData(){
    fetch("planetData/planets.json")
        .then(function (response){
            if (!response.ok) {
                throw new Error("Es ist ein Netzwerkproblem aufgetreten");
            }
            return response.json();
        })
        .then(function (data){
            if (!Array.isArray(data.planets)) {
                document.getElementById("planetDataOutput").innerHTML = "Keine Planeten gefunden";
                return;
            }

        planetsFetch = data.planets
        console.log(planetsFetch)
        printString(createPlanetDataString(planetsFetch), "planetDataOutput")    

        })
        .catch(function (error){
            document.getElementById("planetDataOutput").innerHTML = "Fehler:" + error;
        })
}

function createPlanetDataString(planets){
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


function determineType(type){
    switch (type){
            case "stone": 
                return "Steinplanet"; 
            case "gas": 
                return "Gasriese";
            case "ice": 
                return "Eisriese";
    }
}

function printString(string, elementId){
    if (elementId === null || string === null) return;

    document.getElementById(elementId).innerHTML = string;
}


fetchData();