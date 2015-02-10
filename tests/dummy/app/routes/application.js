import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('article');
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('users', this.store.find('user'));
  }
});
