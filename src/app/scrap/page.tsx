"use client"
import { useEffect } from "react";
import OpenStreetMap from '../components/open_street_map'

export default function Scrap() {
    useEffect(() => {
        async function getScrap() {
            const res = await fetch('/api/scrap')
            .then(r => r.json());
            console.log("data", res);
        }

        getScrap();
    });

    return (<OpenStreetMap />);
}
