const apiKey="RGAPI-e55eb8e0-bd90-4a73-b71c-dccc742f2cd1";

document.getElementById('search').addEventListener('submit', function(event){
    event.preventDefault();
    const region = document.getElementById('region').value;
    const summonerName = document.getElementById('summoner').value;
    let suummonerEndPoint = "https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonerName+"/?api_key="+apiKey;
    fetch(suummonerEndPoint)
    .then(response => response.json())
    .then(data => {
        console.log(data.puuid);
        window.location.href = "/history";
    })
    .catch(error =>{
        console.error("Error en la solicitud de la API");
    })

})