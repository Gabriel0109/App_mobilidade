import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ markers, color }) => {
    const instance = new L.Routing.control({
        show: false,
        collapsible: false,
        waypoints: markers.map((e) => {
            return [e.stop.latitude, e.stop.longitude];
        }),
        fitSelectedRoutes: true,
        draggableWaypoints: false,
        routeWhileDragging: false,
        addWaypoints: false,
        lineOptions: {
            styles: [
                {
                    color: "#4169E1",
                    opacity: 0.8,
                    weight: 6
                }
            ]
        },
    });

    return instance;
};

const Routes = createControlComponent(createRoutineMachineLayer);

export default Routes;