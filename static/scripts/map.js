const houseList = document.querySelector(".house-list");
// const map = L.map('map').setView([28.6139, 77.2090], 13);

// Fetch data from your Flask endpoint
const search = document.getElementById("ani");

search.addEventListener("submit", async function (e) {
  console.log("Sumbit button works");
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  
  e.preventDefault();
  const formData = new FormData(search);
  var data = {};
  formData.forEach(function (value, key) {
    data[key] = value;
  });
  console.log(data);
  const reply = await fetch(
    "https://a3cd395f-a873-4cc8-863d-5937166f1d15-00-1rs47bgtx64wq.pike.replit.dev/get-properties",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  houseList.innerHTML = "";
  const response = await reply.json();

  response.forEach((house) => {
    house.image_url = "https://i.imgur.com/nJgklIA.jpeg";
    let houseCard = document.createElement("div");
    houseCard.innerHTML = `
        <div class="house-card" data-id="${house.id}">
            <img src="${house.image_url}" alt="${house.name} class="house-image">
            <div class="info">
              <h2 class="house_name">${house.name}</h2>
              <p class="address">${house.address}</p>
              <p class="ratings">${house.rating}</p>
              
              <p class="rent">₹ ${house.cost}/Month</p>
            </div>
        </div>
      `;
    houseList.appendChild(houseCard);

  });
  //await initMap();
  document.getElementById("query").value = "";
});

// function addHouseMarker(house) {
//   L.marker([house.latitude, house.longitude]).addTo(map)
//     .bindPopup(`<b>${house.name}</b><br>${house.address}`)
//     .openPopup();
// }



let map;


async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-33.91722, 151.23064),
    zoom: 16,
    mapId: "DEMO_MAP_ID",
  });

  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
  const icons = {
    parking: {
      icon: iconBase + "parking_lot_maps.png",
    },
    library: {
      icon: iconBase + "library_maps.png",
    },
    info: {
      icon: iconBase + "info-i_maps.png",
    },
  };
  const features = [
    {
      position: new google.maps.LatLng(-33.91721, 151.2263),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91539, 151.2282),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: "info",
    },
  ];

  for (let i = 0; i < features.length; i++) {
    const iconImage = document.createElement("img");

    iconImage.src = icons[features[i].type].icon;

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: features[i].position,
      content: iconImage,
    });
  }
}

initMap();