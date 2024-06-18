import { GeocodeServiceContract } from './GeocodeServiceContract.js'
import { Loader } from "@googlemaps/js-api-loader";

class GoogleGeocodeService extends GeocodeServiceContract {

  loader;

  constructor(key) {
    super()
    this.loader = new Loader({
      apiKey: key,
      version: "weekly",
    })
  }

  async geocode(address) {
    return this.loader.load().then(async () => {
      const { Geocoder } = await google.maps.importLibrary("geocoding");

      const geocoder = new Geocoder();

      let response = await geocoder.geocode({
        address: this.#prepareAddress(address),
        componentRestrictions: {
          country: 'MX',
        }
      })

      let result = response.results

      return result.length ? {
        lat: result[0].geometry.location.lat(),
        lng: result[0].geometry.location.lng()
      } : {}
    })
  }

  #prepareAddress(address){
    const { calle, numero, colonia, municipio, estado, codigo_postal } = address

    const temp = [`${calle} ${numero}`, colonia, municipio, estado, codigo_postal]

    return temp.filter(v => !!v).join(', ')
  }

}

export default GoogleGeocodeService
