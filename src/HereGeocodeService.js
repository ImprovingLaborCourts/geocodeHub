import { GeocodeServiceContract } from "./GeocodeServiceContract";
import H from '@here/maps-api-for-javascript';
class HereGeocodeService extends GeocodeServiceContract {
  platform

  constructor(key) {
    super();
    this.platform = new H.service.Platform({
      apikey: key
    });
  }

  async geocode(address) {
    let formatAddress = this.#prepareAddress(address);
    let geocoder = this.platform.getSearchService();
    let response = await geocoder.geocode({
      q: formatAddress,
    });

    let coords = response.items?.pop();

    return {
      lat: coords?.position?.lat || null,
      lng: coords?.position?.lng || null,
    };
  }

  #prepareAddress(address) {
    const { calle, numero, colonia, municipio, estado, codigo_postal } =
      address;

    let calleYNumero = [calle, numero].filter((v) => !!v).join(" ");
    const temp = [calleYNumero, colonia, municipio, estado, codigo_postal];

    return temp.filter((v) => !!v).join(", ");
  }

}

export default HereGeocodeService;
