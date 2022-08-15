import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const TripContext = createContext()


export function TripProvider({children}){
    // BUSCAR TODAS AS LINHAS
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

    // FUNÇÃO DE BUSCA DO PONTO
    const [searchTripCode, setSearchTripCode] = useState('')

    const searchHandler = (query) => {
        setSearchTripCode(query);
    }
    return(
        <TripContext.Provider value={{ trip, searchHandler,  searchTripCode}}>
            {children}
        </TripContext.Provider>
    )
}