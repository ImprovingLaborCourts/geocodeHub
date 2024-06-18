import { GeocodeServiceContract } from "./GeocodeServiceContract";
import Radar from "radar-sdk-js";

class RadarMapService extends GeocodeServiceContract {

  constructor(key) {
    super()
    Radar.initialize(key)
  }

  async geocode(address) {
    let formatAddress = this.#prepareAddress(address)
    let response = await Radar.forwardGeocode({
      query: formatAddress,
      layers: 'address,locality,county,state,postalCode',
      country:'mx' })

    let result = response.addresses.pop()
    let coords= result?.geometry?.coordinates

    return {
      lat: coords[1] || null,
      lng: coords[0] || null
    }

  }

  #prepareAddress(address){
    const { calle, numero, colonia, municipio, estado, codigo_postal } = address

    let calleYNumero= [calle, numero].filter(v => !!v).join(' ')
    const temp = [calleYNumero, colonia, municipio, estado, codigo_postal]

    return temp.filter(v => !!v).join(', ')
  }

}

export default RadarMapService
