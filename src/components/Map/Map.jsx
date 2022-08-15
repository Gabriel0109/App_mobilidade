import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import styles from './styles.module.scss'
import { Tag, Flex } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import L from 'leaflet'
import bus from '../../assets/bus.svg'
import { gsap } from "gsap";
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RoutingContext } from '../../hooks/useRoutes';
import  Routes  from './Routing'

export  function Map(props) {
    // PONTO EM QUAL FOI FEITA A PESQUISA
    const {currentStop} = useContext(RoutingContext)


    // ÍCONE CUSTOMIZADO
    var redIcon = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png", 
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    // RESPOSTA DA API COM OS PONTOS
    const [routeId, setRouteId] = useState([]);
    async function handleTripId(id) {
            let firstPage = ("https://api.mobilidade.rio/sequence/?trip_id=" + id)
            let secondPage = ("https://api.mobilidade.rio/sequence/?page=2&trip_id=" + id)
            const requestRoutes = await axios.get(firstPage);
            const requestRoutes2 = await axios.get(secondPage)
            await axios
                .all([requestRoutes, requestRoutes2])
                .then(
                    await axios.spread((...responses) => {
                        var responsePage1 = responses[0].data.results;
                        var responsePage2 = responses[1].data.results
                        var fullResponse = responsePage1.concat(responsePage2)
                        setRouteId(fullResponse);
                    })
                )
        }

    // ANIMAÇÃO DO ÔNIBUS
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
                            
                            <Tag size="lg" w="100%" py={2} textAlign="center" variant='solid' bg="#074FA7" color="#fff">
                                <FaMapMarkerAlt />
                               {currentStop.name}
                           </Tag>
                     </Flex>
                    <MapContainer center={[ currentStop.latitude,currentStop.longitude]} zoom={13} scrollWheelZoom={true} id="map"className={styles.mapContainer}>
                            <Routes markers={routeId}/>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {routeId.map((e) => (
                            <Marker  key={e.id} position={[e.stop.latitude, e.stop.longitude]}>
                                <Popup>{e.stop.name}</Popup>
                            </Marker>
                        ))}
                        {/* SUA POSIÇÃO NO MAPA */}
                        <Marker position={[ currentStop.latitude,currentStop.longitude]} icon={redIcon}>
                            <Popup>
                                Você está aqui:
                                <br/>
                                {currentStop.name}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </>
    );
}
