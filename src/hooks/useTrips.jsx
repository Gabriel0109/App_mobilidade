import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";


export const TripContext = createContext()


export function TripProvider({children}){
    const [trip, setTrip ] = useState([])


    useEffect(() => {   
    try{
        async function getTrips() {
            await axios.get('https://api.mobilidade.rio/trip')
                .then(response => {
                    console.log(response.data)
                })

        }
        getTrips()
    } catch{
        console.log('erro')
    }
       
    }, [])

    // FUNÇÕES DE BUSCAS
    const [searchTripCode, setSearchTripCode] = useState('')

    const searchHandler = (query) => {
        setSearchTripCode(query);
    }
   

    const [route, setRoute] = useState('')
    async function handleQUeryRoute() {
        let first = ("https://api.mobilidade.rio/sequence/?trip_id=" + route)
        let second = ("https://api.mobilidade.rio/sequence/?page=2&trip_id=" + route)

        const requestRoutes = await axios.get(first);
        const requestRoutes2 = await axios.get(second)

        await axios
            .all([requestRoutes, requestRoutes2 ])
            .then(
                await axios.spread((...responses) => {
                    var response1 = responses[0].data.results;
                    var response2 = responses[1].data.results
                    var teste = response1.concat(response2)
                    console.log('response1', response1)
                    console.log('response2', response2)
                    console.log('teste', teste)
                })
            )


    }
    useEffect(() => {
        handleQUeryRoute()
    }, [route])
    
    return(
        <TripContext.Provider value={{ trip, searchHandler, searchTripCode, route, setRoute }}>
            {children}
        </TripContext.Provider>
    )
}