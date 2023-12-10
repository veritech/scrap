// 'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

const OpenStreetMap = (props) => {
  const { children, lat, lng } = props
  const ZOOM_LEVEL = 10
  const mapRef = useRef()

  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={ZOOM_LEVEL}
      ref={mapRef} 
      style={{ height: "400px"}}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {children}
    </MapContainer>
  )
}

export default OpenStreetMap
