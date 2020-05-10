async function fetchData() {

	const response = await fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72');
	const rooms = await response.json();

	let lista = rooms.map(room => `<div class="room-board-card">
									<div class="room-div-img"><img class="room-img" src="${room.photo}" class="room-img"/></div>
									<div class="room-description">
									<div class="room-type"><p>${room.property_type}</p> <spam> <i onclick="myFunction(this)" class="far fa-heart"></i><spam></div>
									<div class="room-name"><p>${room.name}</p></div>
									<div class="room-price"><p><strong>R$ ${room.price}</strong>/noite</p></div>
									</div>
									</div>
									<hr>`);

	let names = lista.toString().replace(/\,/g, "");

	document.getElementById("the-rooms").innerHTML = `<div class="room-board"> ${names} <div>`;

}

fetchData();