# Add helper to `nimble:restivus` for url building.

## Install
### Add package
```Bash
meteor add zodiase:restivus-build-url
```
### Directly import patched Restivus class
```JavaScript
import { Restivus } from 'meteor/zodiase:restivus-build-url';
```

### (Or) patch it by yourself
```JavaScript
import { Restivus } from 'meteor/nimble:restivus';
import { patch } from 'meteor/zodiase:restivus-build-url';

patch(Restivus);
```

### (Or) use the standalone build function
```JavaScript
import { buildUrl } from 'meteor/zodiase:restivus-build-url';
```

## Usage
Use `Restivus.prototype.buildUrl` to build URLs.
```JavaScript
import { Restivus } from 'meteor/zodiase:restivus-build-url';

const EndPoint = new Restivus({
  apiPath: 'rest/',
  version: 'v1',
  useDefaultAuth: false,
  prettyJson: true
});

const listUrl = 'items',
      detailUrl = 'items/:_id';

EndPoint.addRoute(listUrl, { authRequired: false }, {
  get () {
    return {
      'statusCode': 200,
      'body': collection.find({})
        .fetch()
        .map((item) => _.extend(item, {
          links: [
            {
              'rel': 'self',
              'href': EndPoint.buildUrl(detailUrl, { _id: item._id })
            }
          ]
        }))
    };
  },
  post () {
    // Handle request and insert new item.
    const newItemId = collection.insert({});
    return {
      'statusCode': 201,
      'headers': {
        'Location': EndPoint.buildUrl(detailUrl, { _id: newItemId }),
      },
      'body': 'SomeResponse'
    };
  }
});
```

Use the standalone `buildUrl` function.
```JavaScript
import { buildUrl } from 'meteor/zodiase:restivus-build-url';

buildUrl('items/:_id', { _id: 'helloworld' }, 'rest/v1');
//> 'http://localhost:3000/rest/v1/items/helloworld'
```
