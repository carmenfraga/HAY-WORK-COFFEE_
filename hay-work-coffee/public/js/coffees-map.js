let map

function initMap() {
    renderMap()
    getCoffees()
}

function renderMap() {

    const { Map } = google.maps

    map = new Map(
        document.querySelector('#coffeesMap'),
        {
            center: { lat: 40.392499, lng: -3.698214 },
            zoom: 10,
        }
    )
}

function getCoffees() {

    axios.get('/api/coffees')
        .then(({ data }) => coffeeMarkers(data))
        .catch(err => console.log(err))
}

function coffeeMarkers(coffees) {

    const { Marker } = google.maps

    coffees.forEach(coffee => {

        const position = {
            lat: coffee.location.coordinates[0],
            lng: coffee.location.coordinates[1],
        }

        new Marker({ position, title: coffee.name, map })
    })
}