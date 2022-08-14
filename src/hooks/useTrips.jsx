import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";


export const TripContext = createContext()


export function TripProvider({children}){
    const [trip, setTrip ] = useState([])


    useEffect(() => {   
       async function getTrips(){
        await axios.get('https://api.mobilidade.rio/trip/?code=1K84')
                .then(response => {
                    setTrip(response.data)
                })

       }
       getTrips()
    }, [])
    
    return(
        <TripContext.Provider value={{trip}}>
            {children}
        </TripContext.Provider>
    )
}