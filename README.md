[![Stories in Ready](https://badge.waffle.io/andyjac/hinton.svg?label=ready&title=Ready)](http://waffle.io/andyjac/hinton)
[![Throughput Graph](https://graphs.waffle.io/andyjac/hinton/throughput.svg)](https://waffle.io/andyjac/hinton/metrics)
[![Build Status](https://travis-ci.org/andyjac/hinton.svg)](https://travis-ci.org/andyjac/hinton)
Hinton
===============
###### Companion iPhone app for [ginahinton.com](http://www.ginahinton.com)

API Reference
---------------
#### GET api/restaurant/all 
Returns an array of map data for all restaurants in the database

Response data takes the following format:
```

_id: uniqueId,
map: {
  loc: {
    lat: String,
    long: String
  },
  marker: String,
  caption: String
}
```

---------------

#### GET api/restaurant/:id
Returns data for a specific restaurant based on its unique Id

`api/restaurant/555be35472e4ac971324f9d9` -> Returns restaurant data for The Pink Door

---------------

#### GET api/restaurant/genre/all

Returns an array of all distinct restaurant genres in the database

Example response: `["Chinese","Mediterranean","Seafood","Food Truck"]`

---------------

#### GET api/restaurant/genre/:genre

Returns an array of map data for restaurants which contain the given genre

Request: `api/restaurant/genre/Mexican`

Response:

```
[{
  "_id":"555be37272e4ac971324f9db",
  "map": {
    "marker":"",
    "caption":"Tacos Chukis",
    "loc": {
      "lat":"47.620581",
      "long":"-122.321306"
    },
  },
}]
```
#### Creator/Project Lead:

* Gina Hinton

#### Developers:

##### iOS:

* Brandon Roberts

##### JavaScript:

* Bob Day
* Nick Eagan
* Andrew Jacobson
* Lamson Le

