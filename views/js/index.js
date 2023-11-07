const apiKey = "RGAPI-9d80bf01-e506-48ae-bbaf-eac2195feb98";
let datapuuid;
let region = "";
let locationn = "";
let matchId = "";
document.getElementById('search').addEventListener('submit', function (event) {
    event.preventDefault();
    region = document.getElementById('region').value;
    const summonerName = document.getElementById('summoner').value;
    let suummonerEndPoint = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "/?api_key=" + apiKey;
    if (region === 'la1' || region === 'la2' || region === 'na1') {
        locationn = "americas";
    } else if (region === 'eun1' || region === 'euw1' || region === 'ru') {
        locationn = "europe";
    } else {
        locationn = "asia";
    }
    fetch(suummonerEndPoint)
        .then(response => response.json())
        .then(data => {
            // window.location.href = "/history";
            datapuuid = data.puuid;
            let matchEndPoint = "https://" + locationn + ".api.riotgames.com/lor/match/v1/matches/by-puuid/" + datapuuid + "/ids?api_key=" + apiKey;
            fetch(matchEndPoint)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        setTimeout(() => {
                            console.log("Match numero: " + i + " " + data[i]);

                            matchId = data[i];
                            let matchIdEndPoint = "https://" + locationn + ".api.riotgames.com/lor/match/v1/matches/" + matchId + "?api_key=" + apiKey;
                            fetch(matchIdEndPoint)
                                .then(response => response.json())
                                .then(data => {
                                    console.log("Info data" + data.info.players[0].deck_code + " w/l player1" + data.info.players[0].game_outcome + " total de turnos: " + data.info.total_turn_count);
                                    console.log("Info data 2" + data.info.players[1].deck_code + " w/l player 2" + data.info.players[1].game_outcome + " total de turnos: " + data.info.total_turn_count);
                                })
                        }, i * 1000); // Se agrega un retraso de 0.5 segundos (500 ms) por cada iteración
                    }

                })
                .catch(error => {
                    console.error("Error en la solicitud de la API match");
                })
        })
        .catch(error => {
            console.error("Error en la solicitud de la API");
        })

})

