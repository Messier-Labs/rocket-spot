import toDegrees from './toDegrees';
import toRadians from './toRadians';

export default function getBearing(positionA, positionB) {
  let { latitude: latitudeA, longitude: longitudeA } = positionA;
  let { latitude: latitudeB, longitude: longitudeB } = positionB;

  latitudeA = toRadians(latitudeA);
  latitudeB = toRadians(latitudeB);

  let deltaLongitude = toRadians(longitudeB - longitudeA);

  let y = Math.sin(deltaLongitude) * Math.cos(latitudeB);
  let x = Math.cos(latitudeA)*Math.sin(latitudeB) - Math.sin(latitudeA)*Math.cos(latitudeB) * Math.cos(deltaLongitude);

  let bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360;
};
