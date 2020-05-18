
const API_URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

let currentPage = 1;

const ITEMS_PER_PAGE = 8;

// const filterPlaces = (input, places) => {
//     return places.filter(place => place.name.toLowerCase().includes(input.value.toLowerCase()))
// }

// const paginateData = (data) => {
//     return data.reduce((total, current, index) => {
//         const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1

//         total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current])

//         return total;
//     }, [])
// }

const fetchAPI = async (url) => {
    let response = await fetch(url)
    const textResponse = await response.text()
    return JSON.parse(textResponse)
}

const changePage = (pageToBeRendered) => {
    currentPage = pageToBeRendered
    renderPage()
}

const renderPaginationMenu = (paginatedData) => {

    const paginationContainer = document.querySelector('.pagination')

    while (paginationContainer.firstChild) {
        paginationContainer.removeChild(paginationContainer.firstChild)
    }

    const previousPage = document.createElement('span')
    previousPage.className = 'page-changer'
    previousPage.innerHTML = '<'
    previousPage.addEventListener('click', () => currentPage <= 1 ? () => { } : changePage(currentPage - 1))
    paginationContainer.appendChild(previousPage)
 

    paginatedData.forEach((_, index) => {
        //para cada array (página) dentro do nosso array total criaremos um botão numerado para ir para aquela página
        const pageButton = document.createElement('span')
        pageButton.innerHTML = index + 1 //index + 1 porque os indices começam em 0 e queremos mostrar a primeira página como 1

        pageButton.addEventListener('click', () => changePage(index + 1))

        if (currentPage === index + 1) {
            pageButton.className = 'active'
        }

        paginationContainer.appendChild(pageButton)
    })

    const nextPage = document.createElement('span')
    nextPage.className = 'page-changer'
    nextPage.innerHTML = '>'
    nextPage.addEventListener('click', () => currentPage >= paginatedData.length ? () => { } : changePage(currentPage + 1))

    paginationContainer.appendChild(nextPage)

    //por fim, método de avançãr a página que funciona igual o de voltar a página só que ao contrário :)
}

const renderPage = async () => {
    const apiData = await fetchAPI(API_URL)

    // const searchInput = document.querySelector('#filter')
    // let filteredApiData = filterPlaces(searchInput, apiData)

    // const searchButton = document.querySelector('#search-button')
    // searchButton.addEventListener('click', () => {
    //     filteredApiData = filterPlaces(searchInput, apiData)
    //     renderPage()
    // })

    //aqui chamamos nossos métodos anteriormente criados e adicionamos um listener para a ação de click no botão de filtro
    //que filtrará nossos dados 


    // const paginatedData = paginateData(ITEMS_PER_PAGE, filteredApiData)
    const paginatedData = paginateData(apiData)


    renderPaginationMenu(paginatedData);

    cardContainer = document.querySelector(".card-container");

    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild)
    }

    //esvaziamos nosso container de cards para que não sejam renderizados os cards da página antiga do usuário

    paginatedData[currentPage - 1].forEach(property => {
        //para cada item naquela página iteramos por ele criando os cards

        const { name, photo, price, property_type } = property;
        //desestruturação dos dados para utilizarmos

        cardInfo = document.createElement("div");
        cardInfo.className = "card-info"

        card = document.createElement("div");
        card.className = "card"

        cardImg = document.createElement("img");
        cardImg.className = "card-img"
        cardImg.src = photo;

        propertyType = document.createElement("div");
        propertyType.className = "property-type";
        propertyType.innerHTML = property_type
        propertyPrice = document.createElement("div");
        propertyPrice.className = "property-price";
        propertyPrice.innerHTML = "R$ " + price.toFixed(2) + '/noite'
        propertyName = document.createElement("div");
        propertyName.className = "property-name";
        propertyName.innerHTML = name;

        cardContainer.appendChild(card)
        card.appendChild(cardImg)
        card.appendChild(cardInfo)
        cardInfo.appendChild(propertyName)
        cardInfo.appendChild(propertyType)
        cardInfo.appendChild(propertyPrice)

        //aqui inserimos cada filho no seu respectivo pai
    })


}



function initMap() {
    const locations = [
        ['Avenida Paulista', -23.563311, -46.654275, 5],
        ['Gama Academy', -23.567427, -46.684607, 4],
        ['Marco Zero', -23.550460, -46.633934, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-23.550460, -46.633934),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
//função gerada pelo google, a alteração que eu fiz foi: criar locations para serem renderizadas no mapa e ao invés de renderizar
//apenas um marcador, iteramos por esse array e renderizamos um marcador para cada localidade

renderPage()
//e esse é o nosso método que faz todo o resto mostrado ai em cima :)
//espero que tenham gostado, e entendido, qualquer dúvida só me procurar :)
//obrigado!!
