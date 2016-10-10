Package.describe({
  name: 'zodiase:restivus-build-url',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Add helper to Restivus prototype for building urls.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Zodiase/meteor__restivus-build-url.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  api.use('nimble:restivus@0.8.11');
  api.use('zodiase:check@=0.0.5');
  api.mainModule('restivus-build-url.js', 'server');
});
