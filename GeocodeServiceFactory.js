import OpenStreetMapService from './src/OpenStreetGeocodeService';
import GoogleGeocodeService from './src/GoogleGeocodeService';
import RadarMapService from './src/RadarMapService';
import GeocodeBoxService from './src/GeocodeBoxService';
import HereGeocodeService from './src/HereGeocodeService';

const geoServices = {
  'openStreet': OpenStreetMapService,
  'google': GoogleGeocodeService,
  'radar': RadarMapService,
  'box': GeocodeBoxService,
  'here': HereGeocodeService
};

export const createGeocodeService = (type, key='') => {
  if (!geoServices[type]) {
    throw new Error(`Servicio de geocodificación ${type} no soportado`);
  }
  return new geoServices[type](key);
}
