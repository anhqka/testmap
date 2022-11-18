import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
const apiKey = "AIzaSyAKjzo9xWrPixaFhBnb9uerRNpATN1xTng"

const mapStyles = {
    height: "80vh",
    width: "100%"
};

const Map = ({ distance }) => {

    const [map, setMap] = React.useState(null)
    const [selected, setSelected] = useState({})

    const onSelect = item => {
        setSelected({
            name: item.name,
            location: {
                lat: item.lat,
                lng: item.lng
            }
        })
        console.log(item);
    }
    const [center, setCenter] = useState({
        name: distance[0].destinationCoords?.name,
        lat: distance[0].destinationCoords?.latitude,
        lng: distance[0].destinationCoords?.longitude
    })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <div className='flex'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {
                    center.lat ?
                        <Marker
                            position={center}
                            draggable={true}
                            zoom={10}
                            onClick={() => onSelect(center)}
                        /> :
                        null
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
            <p>
                {distance.map((store, index) => {
                    return (
                        <div key={index} onClick={() => setCenter({
                            name: distance[0].destinationCoords?.name,
                            lat: store.destinationCoords.latitude,
                            lng: store.destinationCoords.longitude
                        })}>{store.destinationCoords.name}</div>
                    )
                })}
            </p>
        </div>
    ) : <></>
}
export default Map