export const displayMap = (locations) => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcmJha3IwMSIsImEiOiJja3F0dDNqaXoxdW9yMnJxaGMwMTZxZzIzIn0.dimje8_tvLwM4zXYmWtF0w';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/omarbakr01/ckqtyparw0fcs18m4sjpza93i',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current locations
    bounds.extend(loc.coordinates)
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
}

