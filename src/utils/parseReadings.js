/*
parseReadings gets the kun and on readings, and sees where there is a valid match in the city name to parse.
*/
export default function parseReadings(name, kun, on) {

  const rendaku = {
    'sh': 'j',
    'ch': 'j',
    'ts': 'z',
    't': 'd',
    'h': 'b',
    'f': 'b',
    'k': 'g',
    's': 'z'
  }
  //eventually handle rendaku with a dict and check if second in arr.
  //will return true if kun, false if on, and the index of the matching reading
  let arr = [];
  name = name.toLowerCase(); //remove capitalization
  for (const i in kun) {
    
    //returns indices
    const kuns = kun[i];
    const ons = on[i];

    //enable rendaku if i > 0 aka second character or greater
    
    // console.log(i, 'kuns', kuns, 'ons', ons);
    for (const k in kuns) {
      if (name.startsWith(kuns[k])) {
        arr.push([1, parseInt(k)]);
        // console.log(name, kuns[k], name.slice(kuns[k].length));
        name = name.slice(kuns[k].length);
      }
    }
    for (const o in ons) {
      if (name.startsWith(ons[o])) {
        arr.push([0, parseInt(o)]);
        // console.log(name, ons[o], name.slice(ons[o].length));
        name = name.slice(ons[o].length);
      }
    }
  }
  return arr;
}
