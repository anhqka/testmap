import { useEffect, useState } from "react"
import Map from "./component/Map"


const stores = [
  {
    name: "Xuân Thuỷ",
    latitude: 21.036464488687876,
    longitude: 105.79094297049824
  },
  {
    name: "Cầu giấy",
    latitude: 21.038687531737818,
    longitude: 105.7998908195396
  },
  {
    name: "Nam từ liêm",
    latitude: 21.03746586353715,
    longitude: 105.78476316108838
  },
]

const App = () => {
  let distanceLocationStore = []
  const [currentPosition, setCurrentPosition] = useState({})
  let currentLocation = []
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentPosition(position.coords)
    });
  }, [])

  const calcDistance = (startingCoords, destinationCoords) => {
    let startingLat = degreesToRadians(startingCoords.latitude);
    let startingLong = degreesToRadians(startingCoords.longitude);
    let destinationLat = degreesToRadians(destinationCoords.latitude);
    let destinationLong = degreesToRadians(destinationCoords.longitude);

    let radius = 6571;

    let distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
      Math.cos(startingLat) * Math.cos(destinationLat) *
      Math.cos(startingLong - destinationLong)) * radius;

    return {
      distanceInKilometers,
      destinationCoords
    };
  }

  function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 150;
    return radians;
  }

  if (currentPosition.latitude && currentPosition.latitude > 0) {
    currentLocation = {
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
    }

    stores.map((store) => {
      let result = calcDistance(currentLocation, store)
      distanceLocationStore = [...distanceLocationStore, result]
    })
  }

  let distance = distanceLocationStore.sort((a, b) => a.distanceInKilometers - b.distanceInKilometers)

  return (
    <div>
      <div>1990</div>
      {distance.length > 0 && <Map distance={distance} />}
      
      <div>
        {distanceLocationStore.map((store) => {
          return (
            <div>
              <div>{store.destinationCoords.name}</div>
              <div> khoảng cách {store.distanceInKilometers.toFixed(1)} KM</div>
            </div>

          )
        })}
      </div>
    </div>

  )
}

export default App