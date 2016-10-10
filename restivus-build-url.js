import path from 'path';

import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { check } from 'meteor/zodiase:check';

const regEx_varName = /:([_a-zA-Z][_a-zA-Z0-9]*)/;

const buildUrl = (pattern, params, apiPath) => {
  check(pattern, String, '"pattern" must be a string.');
  check(params, Object, '"params" must be an object.');
  check(apiPath, String, '"apiPath" must be a string.');

  let urlPath = pattern, match;

  // Replace all variables in the pattern.
  while (match = urlPath.match(regEx_varName)) {
    urlPath = urlPath.replace(match[0], params[match[1]]);
  }

  return Meteor.absoluteUrl(path.join(apiPath, urlPath));
};

const patch = (_Restivus) => {
  if (typeof _Restivus.prototype.buildUrl === 'undefined') {

    _Restivus.prototype.buildUrl = function (pattern, params) {
      return buildUrl(pattern, params, this._config.apiPath);
    };

  }

  return _Restivus;
};

patch(Restivus);

export {
  buildUrl,
  patch,
  Restivus
};
