import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('article');
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    window.setTimeout(function() {
      controller.set('users', this.store.find('user'));
    }.bind(this), 100);
  }
});
