/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-select-combo',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/css/ember-select-combo.css');
  }
};
