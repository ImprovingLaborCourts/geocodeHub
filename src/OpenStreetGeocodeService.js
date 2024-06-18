 import { GeocodeServiceContract } from './GeocodeServiceContract.js';

class OpenStreetMapServiceContract extends GeocodeServiceContract {

  constructor() {
    super()
  }

  #prepareAddress(address){
    const { calle, municipio, estado } = address

    return {
      street: calle,
      city: municipio,
      state: estado,
      country: 'mx',
      format: 'jsonv2'
    }
  }

  #bindParams(params){
    let result = ''
    let keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      result += `${keys[i]}=${params[keys[i]]}&`
    }
    return result
  }

  async geocode(address){
    address = this.#prepareAddress(address)
    let query = this.#bindParams(address)
    let response = await fetch(`https://nominatim.openstreetmap.org/search?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    }).then(res => res.json() );

    let result = response.pop()

    if(!result){
      delete address.street
      query = this.#bindParams(address)
      response = await fetch(`https://nominatim.openstreetmap.org/search?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json() );
      result = response.pop()
    }

    return {
      lat: result.lat || null,
      lng: result.lon || null
    }
  }

}

export default OpenStreetMapServiceContract
