import citykanji from "../../data/japanesecitykanji";

export default function CityText({ selected }) {
  
    const info = selected
    ? selected.Japanese
        .split("")
        .map((x) => Object.keys(citykanji).map((k) => citykanji[k][x]))
    : "";
    
  return (
    <div>
      <div className="flex text-lg gap-4 md:text-2xl text-center font-bold justify-around flex-col">
        <p>
          {selected['City (Special Ward)']}{" "}
          <a
            href={`https://jisho.org/search/${selected.Japanese.split("").slice(
              -1
            )}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-800"
          >
            ({selected.Japanese.split("").slice(-1)})
          </a>
        </p>
        <div className="flex flex-row gap-3">
          {selected.Japanese.split("")
            .slice(0, -1)
            .map((x, ind) => (
              <div className="flex flex-col w-72 text-center gap-4">
                <div className="flex flex-row  justify-center items-end gap-0.5">
                  <a
                    href={`https://jisho.org/search/${x}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 md:text-6xl text-3xl hover:text-blue-800"
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
                  <div className="flex flex-col gap-4 h-44 md:h-28 overflow-y-auto">
                    {info[ind]
                      .slice(0, 4)
                      .map((i, infoind) =>
                        infoind == 0 ? (
                          <p className="text-lg">{i}</p>
                        ) : (
                          <p className="text-sm">{i}</p>
                        )
                      )}
                  </div>
                }
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
