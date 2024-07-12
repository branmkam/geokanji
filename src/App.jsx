import { useState, useEffect } from "react";
import "./index.css";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import PrefText from "./components/PrefText";
import CityText from "./components/CityText";
import startcities from "../data/startcities";
import parseReadings from "./utils/parseReadings";
import citykanji from "../data/japanesecitykanji";

function App() {
  const [matches, setMatches] = useState({});

  //get kanji matches
  useEffect(() => {
    Object.keys(startcities).forEach((s) => {
      const srs = parseReadings(
        startcities[s]["City (Special Ward)"],
        startcities[s]["Japanese"]
          .split("")
          .slice(0, -1)
          .map((ch) => citykanji["kun names"][ch]),
        startcities[s]["Japanese"]
          .split("")
          .slice(0, -1)
          .map((ch) => citykanji["on names"][ch])
      );
      setMatches((m) => {
        return { ...m, [`${startcities[s].index}`]: srs };
      });
    });
  }, [startcities]);

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
        matches={matches}
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
      <div className="z-0 leaflet-container">
        <Map
          isCities={isCities}
          setHovered={setHovered}
          clicked={clicked}
          setClicked={setClicked}
        />
      </div>
      <div className="z-20 font-outfit px-4 py-2 bottom-2 left-2 fixed h-96 md:h-80 w-[95%] md:w-3/4 rounded-xl bg-[#ffffffaa]">
        {infotext}
      </div>
      <div className="fixed z-20 text-4xl text-white font-oswald top-2 left-2">
        GeoKanji
      </div>
      <button
        onClick={() => {
          setIsCities((s) => !s), setClicked(null);
        }}
        className="fixed z-20 p-2 text-xl text-white bg-blue-600 font-oswald top-2 right-2 rounded-xl"
      >
        See {isCities ? "Prefectures" : "Cities"}
      </button>
    </>
  );
}

export default App;
