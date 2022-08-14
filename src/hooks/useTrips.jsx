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
                    console.log(response.data.results)
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
   
 
    
    return(
        <TripContext.Provider value={{ trip, searchHandler, searchTripCode }}>
            {children}
        </TripContext.Provider>
    )
}