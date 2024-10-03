# GeoCodeHub

GeoCodeHub es un libreria que te permite interactuar fácilmente con diversos proveedores de geolocalización

Actualmente tiene integracion con:
- [Leaflet (OpenStreetMap)](https://leafletjs.com/reference.html)
- [Google maps](https://developers.google.com/maps/documentation/javascript)
- [radar](https://radar.com/documentation/maps/maps)
- [map box](https://docs.mapbox.com/mapbox-gl-js/guides/install/)
- [here maps](https://www.here.com/docs/bundle/maps-api-for-javascript-developer-guide/page/topics/get-started-bundling.html)

## Instalación
### Antes de instalar
Para usar **HERE Maps** primero se deben realizar ciertos ajustes al proyecto:

Agregar configuración para el repositorio público de HERE Maps API for JavaScript con npm

```sh
npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
```
También en caso de usar babel se debe configurar un plugin para transformar los methods privados
1. Instalamos el plugin 
```sh
yarn add @babel/plugin-transform-private-methods --dev
```
2. Lo agregamos a nuestra configuración de babel
```js
module.exports = {
   ... ,
   "plugins": [
        ... ,
       "@babel/plugin-transform-private-methods"
    ]
}
```
### Instalar la libreria
usando npm:
```sh
npm install -S https://github.com/ImprovingLaborCourts/geocodeHub
```
usando yarn
```sh
npm add -S https://github.com/ImprovingLaborCourts/geocodeHub
```
## Uso
1. Importar la liberia
```js
import {createGeocodeService} from '@improvingLaborCourts/geocodeHub'
```
2. Crear un servicio geolocalización con el tipo y la key
```js
let geoService = createGeocodeService(
    'here', //'openStreet' || 'google' || 'radar' || 'box'
     key
)
```
3. Invocar el método geocode, pasando un objeto con las propiedades de la dirección:
   - calle
   - número
   - colonia
   - municipio
   - estado
   - codigo_postal
```js
let coords = await geoService.geocode({
   calle: 'Río Hondo',
   numero: '1',
   colonia: 'progreso tizapan',
   municipio: 'alvaero obregon',
   estado: 'ciudad de mexico',
   codigo_postal: '01080'
})
```
