const videosContainer = document.getElementById('videos-container')
const leftHeaderDown = document.getElementById('left-header-down')
const channelImage = document.getElementById('channel-image')
//Urban Roosters
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCvbTYgbzLcCginSC03fhmwg&part=snippet%2Cid&order=date&maxResults=9';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c4ba738476msh17f3a69ef3f48e6p1ecee0jsn5fa331bf2eae',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const APIChannelDetails = 'https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=UCvbTYgbzLcCginSC03fhmwg';

async function fetchData(urlApi){
    const response = await fetch(urlApi,options);
    const data = await response.json(); 
    return data
}

(async ()=> {
    try{
        const videos = await fetchData(API);
        console.log(videos)
        let listaVideos = `
        ${videos.items.map(video => `
            <div>
                <img class="video" src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}">
                <p>${video.snippet.title}</p>
            </div>
        `).slice(0,4).join('')}
        `
        videosContainer.innerHTML = listaVideos
    }catch(error){
        console.log(error);
    }
})();
let prueba 
async function asignChannelDetails(){
    const data =await fetchData(APIChannelDetails,options);
    console.log(data)
    prueba = data
    //Asignar titulo y descripción
    const title = `
        <h1>${data.items[0].brandingSettings.channel.title}<span> ${data.items[0].snippet.customUrl}</span></h1>
            <p>${data.items[0].snippet.description}</p>
    `
    const channelIMG = `
    <img src="${data.items[0].snippet.thumbnails.high.url}" alt="channel-image">
    `
    leftHeaderDown.innerHTML = title
    channelImage.innerHTML = channelIMG
}

asignChannelDetails()

