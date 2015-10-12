'use strict';

module.exports = {
  '_id': '12345abcdef',
  'restaurant': {
    'name': 'Cuban Place',
    'genre': ['Cuban'],
    'phone': '+1 123-456-7890',
    'price': 1,
    'p_id': 'AaBbCcDdEeFfGg',
    'address': {
      'number': '1000',
      'street': '1st Ave N',
      'city': 'Seattle',
      'state': 'WA',
      'zip': '98101',
      'country': 'United States'
    },
    'menu_item': ['Cuban Roast'],
    'blog_link': '',
    'r_site': 'www.cubanplace.com',
    'menu_link': 'www.cubanplace.com/menu',
    'hours': {
      'mon': '10:00 am - 6:00 pm',
      'tue': '10:00 am - 6:00 pm',
      'wed': '10:00 am - 6:00 pm',
      'thu': '10:00 am - 6:00 pm',
      'fri': '10:00 am - 6:00 pm',
      'sat': '10:00 am - 6:00 pm',
      'sun': 'Closed'
    },
    'photos': [{
      'id': 'QWerTy',
      'url': 'www.aws.com/picture1',
      'caption': 'Cuban Sandwich',
      'show': true,
      'delete': false
    }]
  },
  'map': {
    'loc': {
      'lat': '47.1234',
      'long': '-123.4567'
    },
    'caption': 'Cuban Place'
  }
}
