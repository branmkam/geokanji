export default function zoomLevel(pop) {
  const mills = pop / 1000000;
  //return 3.6 + Math.pow(2, (-mills + 6.5) / 2.5);
  return Math.log(mills) / Math.log(3) * -1 + 5; //log3(x) + 6
}
