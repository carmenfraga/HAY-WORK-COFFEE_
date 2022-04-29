let map
let geocoder

function initMap() {
    renderMap()
    getCoffees()

}

function renderMap() {

    const { Map } = google.maps

    map = new Map(
        document.querySelector('#coffeesMap'),
        {
            center: { lat: 40.418086207028765, lng: - 3.7031749569643813 },
            zoom: 13,
        }
    )
}

function getCoffees() {
    axios
        .get('/api/coffees')
        .then(({ data }) => coffeeMarkers(data))
        .catch(err => console.log(err))
}

function coffeeMarkers(coffees) {
    const { Marker } = google.maps

    coffees.forEach(coffee => {

        new Marker({
            map, position: {
                lat: coffee.address.location.coordinates[0],
                lng: coffee.address.location.coordinates[1]
            },
            title: coffee.name
        })
    })
}


