import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";


export const RoutingContext = createContext()


export function RoutingProvider({ children }) {

    const [route, setRoute] = useState('')
    const [routeId, setRouteId] = useState([]);
    const loader = useRef()
    // GERAR VIAGENS DE FORMA GLOBAL
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


    // PEGAR PONTO EM QUE FOI PESQUISADO
    const [currentStop, setCurrentStop] = useState({})
    async function getCurrentStop() {
        await axios.get("https://api.mobilidade.rio/stop/2028O00023C0/")
            .then(response => setCurrentStop(response.data))
            
    }
    useEffect(() => {
        getCurrentStop()
    }, [])

    return (
        <RoutingContext.Provider value={{ handleTripId, route, setRoute, currentStop, routeId, setRouteId, loader }}>
            {children}
        </RoutingContext.Provider>
    )
}