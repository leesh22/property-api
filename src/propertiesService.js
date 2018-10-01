import fetch from 'node-fetch';
import Promise from 'promise';
import {PROPERTIES} from './data';

const googleAPIKey = "AIzaSyAGbxwfFN_wQCo3hBe9JUcTEoAcoN6UjWE";

 export function checkDistance(pc) {
  const postcode = pc.split(' ').join(''); /* removing spaces from postcode string */
  const radius = 20000;

  const base_url = "https://maps.googleapis.com/maps/api/directions/json?origin=51.5073835,-0.1277801&"; /* google api base url with centerpoint hard coded */
  const destination = "destination=" + postcode;
  const api =  "&key=" + googleAPIKey;
  const request_url = base_url + destination + api;  /* construct request URL - easy to read */
  
  //fetching distance from origin (radius center point) to destination (propery address)
  return fetch(request_url)
    .then(res => res.json())
    .then((json) => {
      //mapping though response to get distnace
      return json.routes.map((routes) => {
        return routes.legs.map((legs) => {
          // cheching if distance from center to property is within the radius
          if(legs.distance.value > radius) {
            return false;
          } else {
            return true;
          }
        })
      })
    });
}


// would be call to database
export function getProperties() {
  var itemsProcessed = 0;

  //using promise to ensure array has been looped over before responding to request
  return new Promise((resolve) => {
    PROPERTIES.forEach((property, i, arr) => {

      //checking if each address is within the required radius - and updating property object to reflect
      checkDistance(property.address.postCode).then((distance) => {
        itemsProcessed++;
        property.withinServiceArea = distance[0][0];

        //once all items have been updated resolve promise
        if(itemsProcessed === arr.length) {
          resolve(PROPERTIES);
        }
      });
    });

  });
}
