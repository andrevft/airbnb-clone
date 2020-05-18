
const API_URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

// let currentPage = 1;

// const ITEMS_PER_PAGE = 8;


const fetchAPI = async (url) => {
    let response = await fetch(url)
    const textResponse = await response.text()
    return JSON.parse(textResponse)
};


const renderPage = async () => {
    const apiData = await fetchAPI(API_URL);

    cardContainer = document.querySelector(".the-rooms");


    apiData.forEach(property => {


        const { name, photo, price, property_type } = property;


        card = document.createElement("div");
        card.className = "room-board-card"

        cardImg = document.createElement("div");
        cardImg.className = "room-div-img"


        propertyImg = document.createElement("img");
        propertyImg.className = "room-img";
        propertyImg.src = photo;

        cardInfo = document.createElement("div");
        cardInfo.className = "room-description"

        propertyType = document.createElement("div");
        propertyType.className = "room-type";
        propertyType.innerHTML = `<p> ${property_type} </p> <span> <i onclick="myFunction(this)" class="far fa-grin"></i><span></div>`;
        propertyName = document.createElement("div");
        propertyName.className = "room-name";
        propertyName.innerHTML = name;
        propertyPrice = document.createElement("div");
        propertyPrice.className = "room-price";
        propertyPrice.innerHTML = "<p><strong>R$ " + price.toFixed(2) + "</strong>/noite"


        cardContainer.appendChild(card)
        card.appendChild(cardImg)
        cardImg.appendChild(propertyImg)
        card.appendChild(cardInfo)
        cardInfo.appendChild(propertyType)
        cardInfo.appendChild(propertyName)
        cardInfo.appendChild(propertyPrice)

    });

	// let lista = rooms.map(room => `<div class="room-board-card">
	// 								<div class="room-div-img"><img class="room-img" src="${room.photo}" class="room-img"/></div>
	// 								<div class="room-description">
	// 								<div class="room-type"><p>${room.property_type}</p> <span> <i onclick="myFunction(this)" class="far fa-grin"></i><span></div>
	// 								<div class="room-name"><p>${room.name}</p></div>
	// 								<div class="room-assets"><p>3 hóspedes · 1 quarto · 2 camas · 1 banheiro</p> <p>Wifi · Estacionamento gratuito · Ar-condicionado</p></div>
	// 								<div class="room-price"><p><strong>R$ ${room.price}</strong>/noite</p></div>
	// 								</div>
	// 								</div>
	// 								<hr>`);
	// let names = lista.toString().replace(/\,/g, "");
	// document.getElementById("the-rooms").innerHTML = `<div class="room-board"> ${names} <div>`;



}


renderPage();
