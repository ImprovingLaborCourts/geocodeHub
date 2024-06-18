import { GeocodeServiceContract } from "./GeocodeServiceContract";

class GeocodeBoxService extends GeocodeServiceContract {

  #key

  constructor(key) {
    super()
    this.key = key;
  }

  async geocode(address) {
    let formatAddress = this.#prepareAddress(address)
    let response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${formatAddress}&country=mx&access_token=${this.key}`, {
        method: "GET"
    }).then(res => res.json() );
    console.log('lmr:', response)
    let result = response.features.pop()
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

export default GeocodeBoxService
