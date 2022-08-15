import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import styles from './styles.module.scss'
import { gsap } from "gsap";
import { Tag, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet'
import bus from '../../assets/bus.svg'

export  function Map(props) {
    var redIcon = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const [routeId, setRouteId] = useState([]);

    function handleTripId(id) {
        axios
            .get("https://api.mobilidade.rio/sequence/?trip_id=" + id)
            .then((value) => {
                setRouteId(value.data.results);
            });
    }

    useEffect(() => {
        gsap.from('.loader', { scale: .5,  repeat: -1, yoyo: true })
        handleTripId(props.route_id);
    }, [props.route_id]);

    return (
        <>
            {routeId.length === 0 ? (
              <div>
                <img className='loader' src={bus} alt="" />
              </div>
            ) : (
                <div className={styles.mapWrapper}>
                     <Flex my="3">
                           <Tag size="lg"   w="100%" textAlign="center" variant='solid' colorScheme='blue'>
                               {routeId[0].stop.name}
                           </Tag>
                     </Flex>
                    <MapContainer
                        center={[
                            routeId[0].stop.latitude,
                            routeId[0].stop.longitude,
                        ]}
                        zoom={13}
                        scrollWheelZoom={true}
                        id="map"
                        className={styles.mapContainer}
                                            >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {routeId.map((e) => (
                            <Marker
                            key={e.id}
                                position={[e.stop.latitude, e.stop.longitude]}
                            >
                                <Popup>{e.stop.name}</Popup>
                            </Marker>
                        ))}
                        <Marker
                            position={[
                                routeId[0].stop.latitude,
                                routeId[0].stop.longitude,
                            ]}
                            icon={redIcon}
                        >
                            <Popup>
                                Você está aqui
                                <br />
                                {routeId[0].stop.name}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </>
    );
}
