import {
  MapContainer,
  useMap,
  TileLayer,
  GeoJSON,
  Marker,
  CircleMarker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import prefs from "../../data/japan_prefectures.js";
import seedrandom from "seedrandom";
import startcities from "../../data/startcities.js";
import zoomLevel from "../utils/zoomLevel.js";
import citykanji from "../../data/japanesecitykanji.js";
import parseReadings from "../utils/parseReadings.js";

export default function Map({ isCities, setHovered, clicked, setClicked }) {
  const bounds = [
    [26, 127],
    [46.5, 151],
  ];

  const [zoom, setZoom] = useState(5);

  const MapController = () => {
    const map = useMap();
    const handleZoomEnd = (e) => {
      setZoom(e.target.getZoom());
    };
    useMapEvent("zoomend", handleZoomEnd);
    return null;
  };

  //prefectures
  function onEachPrefecture(feature, layer) {
    const rng = seedrandom(feature.id + 0.2); //guarantee same colors every load
    // const prefName = feature.id + "<br/>" + feature.properties.nam_ja;
    const color =
      clicked && clicked.id == feature.id
        ? "#ff0000aa"
        : "#" +
          ((rng(feature.id) * 0xffffff) << 0).toString(16).padStart(6, "0");

    layer.on("mouseover", function (e) {
      //   layer.bindPopup(prefName).openPopup(); // here add openPopup()
      setHovered(feature);
      layer.setStyle({
        fillColor: "white",
        color: "white",
        weight: 1,
        fillOpacity: 0.6,
      });
    });
    layer.on("mouseout", function (e) {
      setHovered(null);
      layer.setStyle({
        fillColor: color,
        color: color,
        weight: 1,
        fillOpacity: 0.6,
      });
    });
    layer.on("click", function (e) {
      setClicked(feature);
    });

    //init
    layer.setStyle({
      fillColor: color,
      color: color,
      weight: 1,
      fillOpacity: 0.6,
    });
  }

  //cities
  const markers = Object.keys(startcities)
    .filter(
      (s) =>
        zoomLevel(startcities[s]["Population"]) < zoom ||
        (clicked && clicked.index == startcities[s].index)
    )
    .map((s) => (
      <CircleMarker
        eventHandlers={{
          click: (e) => {
            setClicked(startcities[s]);
          },
          mouseover: (e) => {
            setHovered(startcities[s]);
          },
          mouseout: (e) => {
            setHovered(null);
          },
        }}
        radius={20 - zoomLevel(startcities[s]["Population"]) * 2}
        center={[startcities[s]["Latitude"], startcities[s]["Longitude"]]}
        style={{
          fillColor:
            clicked && clicked.Latitude == startcities[s]["Latitude"]
              ? "#ff000099"
              : "#0000ff99",
        }}
      >
        {/* <Popup>{startcities[s]["City (Special Ward)"]}</Popup> */}
      </CircleMarker>
    ));

  return (
    <MapContainer
      className="z-0"
      center={[36.648, 138.19]}
      zoomControl={false}
      zoom={5}
      minZoom={4}
      maxZoom={12}
      bounds={bounds}
    >
      <TileLayer
        attribution="&copy; Esri"
        url="http://services.arcgisonline.com/ArcGis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
      />
      <MapController />
      {isCities ? (
        markers
      ) : (
        <GeoJSON data={prefs.features} onEachFeature={onEachPrefecture} />
      )}
    </MapContainer>
  );
}
