import citykanji from "../../data/japanesecitykanji";
import prefs from "../../data/japan_prefectures.js";

export default function CityText({
  matches,
  selected,
  setIsCities,
  setClicked,
}) {
  const info = selected
    ? selected.Japanese.split("").map((x) =>
        Object.keys(citykanji).map((k) => citykanji[k][x])
      )
    : "";

  const match = matches[selected.index];
  console.log(match);

  return (
    <div>
      <div className="flex flex-col justify-around gap-4 text-lg font-bold text-center md:text-2xl">
        <p className="flex items-end justify-center w-full gap-1 md:flex-row">
          {selected["City (Special Ward)"]} <span>|</span>
          <p
            //go to prefecture
            onClick={() => {
              setIsCities(false);
              setClicked(
                prefs.features.find((el) => el.id == selected.Prefecture)
              );
            }}
            className="text-lg text-blue-900 hover:text-blue-600 hover:cursor-pointer"
          >
            {selected.Prefecture}
          </p>
          <p className="text-lg">
            (
            {selected["Population"] > 1000000
              ? (selected["Population"] / 1000000).toFixed(2) + "m"
              : (selected["Population"] / 1000).toFixed(0) + "k"}
            )
          </p>
        </p>

        <div className="flex flex-row justify-center gap-3">
          {selected.Japanese.split("")
            .slice(0, -1)
            .map((x, ind) => (
              <div className="flex flex-col w-full gap-4 text-center">
                <div className="flex flex-row justify-center items-end gap-0.5">
                  <a
                    href={`https://jisho.org/search/${x}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 text-3xl md:text-6xl hover:text-blue-800"
                  >
                    {x}
                  </a>
                  {
                    <p className="text-sm">
                      {info[ind][5] ? "N" + info[ind][5] : ""}
                    </p>
                  }
                </div>
                {
                  <div className="flex flex-col gap-4 overflow-y-auto h-44 md:h-36">
                    {<p className="text-lg">{info[ind][0]}</p>}
                    {
                      //kun highlight
                      <p className="text-sm">
                        {ind < match.length
                          ? info[ind][1] &&
                            info[ind][1]
                              .split(" ")
                              .map((x, i) =>
                                match[ind][0] == 1 && match[ind][1] == i - 1 ? (
                                  <span className="text-red-500">{x}</span>
                                ) : (
                                  <span>{x} </span>
                                )
                              )
                          : info[ind][1]}
                      </p>
                    }
                    {
                      //on highlight
                      <p className="text-sm">
                        {ind < match.length
                          ? info[ind][2] &&
                            info[ind][2]
                              .split(" ")
                              .map((x, i) =>
                                match[ind][0] == 0 && match[ind][1] == i - 1 ? (
                                  <span className="text-red-500">{x}</span>
                                ) : (
                                  <span>{x} </span>
                                )
                              )
                          : info[ind][2]}
                      </p>
                    }
                  </div>
                }
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
