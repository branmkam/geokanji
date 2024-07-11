import prefkanji from "../../data/japaneseprefkanji";

export default function PrefText({ selected }) {
  
    const info = selected
    ? selected.properties.nam_ja
        .split("")
        .map((x) => Object.keys(prefkanji).map((k) => prefkanji[k][x]))
    : "";
    
    return (
    <div>
      <div className="flex text-lg gap-4 md:text-2xl text-center font-bold justify-around flex-col">
        <p>
          {selected.id}
          <a
            href={`https://jisho.org/search/${selected.properties.nam_ja
              .split("")
              .slice(-1)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-800"
          >
           {" "}({selected.properties.nam_ja.split("").slice(-1)})
          </a>
        </p>
        <div className="flex flex-row gap-3">
          {selected.properties.nam_ja
            .split("")
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
                  <div className="flex flex-col gap-4 h-40 md:h-28 overflow-y-auto">
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
