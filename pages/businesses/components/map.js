import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
const customIcon = L.icon({
  iconUrl: "../svg/city.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function MyMap(props) {
  const { position, zoom } = props;

  return (
    <MapContainer
      center={Object.values(position)}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "50%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={Object.values(position)} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
