export class GeocodeServiceContract {

  /**
   * Geocodifica una dirección y devuelve las coordenadas geográficas.
   *
   * @param {Object} address - La dirección que se desea geocodificar, compuesta de las siguientes partes: calle, número, colonia, municipio, estado, codigo_postal.
   * @returns {Object} Un objeto con las propiedades `latitude` y `longitude` que representan las coordenadas geográficas de la dirección proporcionada.
   * @throws {Error} Si el método no ha sido implementado por la clase que extiende este contrato.
   */
  geocode(address) {
    throw new Error('geocode() debe ser implementado en la clase que suscribe este contrato');
  }

}
