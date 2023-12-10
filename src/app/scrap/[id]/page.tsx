'use client'
import { useEffect, useMemo, useState } from "react";
// import OpenStreetMap from "../../components/open_street_map";
import { ScrapDto, getScrap } from "../actions";
import { Marker, Popup } from "react-leaflet";
import dynamic from "next/dynamic";

const DEFAULT_CENTER = {
    lat: 51.4,
    lng: 0.4
}

const ViewScrap = (props: { params: { id: string }}) => {
    console.log("ViewScrap", props);

    const { params: { id: scrapId } } = props;

    const [scrap, setScrap] = useState<ScrapDto>();

    const Map = useMemo(() => dynamic(() => import('../../components/open_street_map'), {
        loading: () => (<p>Loading Map...</p>),
        ssr: false
    }))

    useEffect(() => {
        getScrap(scrapId).then(r => {
            setScrap(r);
        })
    }, [scrapId])

    console.log('setScrap', scrap);

    return (
        <div>
            <p>{scrap?.description}</p>
            <Map
                lat={scrap ? scrap.latitude : DEFAULT_CENTER.lat}
                lng={scrap ? scrap.longitude: DEFAULT_CENTER.lng}
            >
                {scrap && 
                <Marker 
                    position={[scrap.latitude, scrap.longitude]}>
                        <Popup>{scrap.latitude}{scrap.longitude}</Popup>
                        </Marker>
                }
            </Map>
        </div>
    )
}

export default ViewScrap;