'use client'

import React, { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const OpenStreetMap = () => {
  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
  const ZOOM_LEVEL = 9
  const mapRef = useRef()

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: "400px"}}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {location.loaded && !location.error && (
        <Marker
        position={[
            location.coordinates.lat,
            location.coordinates.lng,
        ]}
        ></Marker>
    )}
    </MapContainer>
  )
}

export default OpenStreetMap
