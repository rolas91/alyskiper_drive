import timezone from 'moment-timezone'
import * as RNLocalize from "react-native-localize"

//definimos los estados del viaje de forma global
export const SOLICITADO = "SOLICITADO"
export const RECHAZADO = "RECHAZADO"
export const ENCURSO = "ENCURSO"
export const ESPERANDOCONFIRMACION = "ESPERANDOCONFIRMACION"
export const CONFIRMADO = "CONFIRMADO"
export const ENPROCESO = "ENPROCESO"
export const FINALIZADO = "FINALIZADO"
export const COBRADO = "COBRADO"


export const GetFecha = () => {
    var timez = RNLocalize.getTimeZone();
    return timezone().tz(timez).format("YYYY-MM-DD HH:mm:ss")
}

export const PubNubPublishKey = "pub-c-b5350d6e-9a1f-4d33-b5c9-918fe9bff121"
export const PubNubSubscribeKey = "sub-c-e286360e-fdc3-11e9-be22-ea7c5aada356"
export const ChanelSkiperDriver = "SkiperDrive"
export const KEYMAPBOX = "pk.eyJ1IjoiYWx5MjMyNCIsImEiOiJjazJnZ2xsZDIwYThqM2xwYW5xNHA5bHRxIn0.eFxM9e0vNpVoDUbhBI-hOw"
export const KEYGOOGLEMAP = "AIzaSyDRc0P0ozp5BU98gDG06OXbFaGk3OiOYxw"

export const decode = (t, e) => {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
      a = null, h = 0, i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
    }
    return d = d.map(function (t) {
      return {
        latitude: t[0],
        longitude: t[1]
      }
    })
}

export const getRoutePoints = async (origin, destination, mode) => {
  const origen = origin.latitude + "," + origin.longitude;
  const destino = destination.latitude + "," + destination.longitude;
  const url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origen + "&destination=" + destino + "&key=" + KEYGOOGLEMAP + "&mode=" + mode + "";
  const result = []
  await fetch(url)
  .then(response => response.json())
  .then(responseJson => {
      if (responseJson.routes.length) {
        var cortemp = decode(responseJson.routes[0].overview_polyline.points) // definition below;
        //   se quita esto porque no se usa para nada
        //   var length = cortemp.length - 1;
        //   var tempMARKERS = [];
        //   tempMARKERS.push(cortemp[0]);   //start origin
        //   tempMARKERS.push(cortemp[length]); //only destination adding
        cortemp.forEach( item => {
          result.push(item)
        })
      }
  }).catch(e => { 
        console.log(e)
  });
  return result
  
}

export const regionFrom = (lat, lon, distance) => {
  distance = distance/2
  const circumference = 40075
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000
  const angularDistance = distance/circumference

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
  const longitudeDelta = Math.abs(Math.atan2(
          Math.sin(angularDistance)*Math.cos(lat),
          Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

  return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
  }
}

export const GetDistance = async (origin, destination, mode) => {

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude + "," + origin.longitude }&destination=${destination.latitude + "," + destination.longitude }&key=${ KEYGOOGLEMAP }&mode=${ mode }`;
  var x = await fetch(url)
  .then(response => response.json())
  .then(json => {
    return json;
  }).catch(error => {
    console.log(error)
    return null
  });
  return x;
};