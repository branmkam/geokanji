import { useState, useEffect } from "react";
import "./index.css";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import PrefText from "./components/PrefText";
import CityText from "./components/CityText";

function App() {
  const [isCities, setIsCities] = useState(true);
  const [clicked, setClicked] = useState(null);
  const [hovered, setHovered] = useState(null);

  const selected = hovered ? hovered : clicked;

  const infotext = selected ? (
    isCities ? (
      <CityText
        selected={selected}
        setIsCities={setIsCities}
        setClicked={setClicked}
      />
    ) : (
      <PrefText selected={selected} />
    )
  ) : (
    <p className="text-center">
      Select or hover over a {isCities ? "city" : "prefecture"}
    </p>
  );

  return (
    <>
      <div className="leaflet-container z-0">
        <Map
          isCities={isCities}
          setHovered={setHovered}
          clicked={clicked}
          setClicked={setClicked}
        />
      </div>
      <div className="z-20 font-outfit px-4 py-2 bottom-2 left-2 fixed h-80 md:h-64 w-[95%] md:w-3/4 rounded-xl bg-[#ffffffaa]">
        {infotext}
      </div>
      <div className="z-20 font-oswald fixed top-2 left-2 text-white text-4xl">
        GeoKanji
      </div>
      <button
        onClick={() => {
          setIsCities((s) => !s), setClicked(null);
        }}
        className="z-20 font-oswald fixed top-2 right-2 text-white text-xl p-2 bg-blue-600 rounded-xl"
      >
        See {isCities ? "Prefectures" : "Cities"}
      </button>
    </>
  );
}

export default App;
