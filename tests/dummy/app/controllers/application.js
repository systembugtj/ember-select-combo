import Ember from 'ember';

export default Ember.ArrayController.extend({
  isOpen: false,

  actions: {
    openToggle: function() {
      if (!this.get('isOpen')) {
        this.set('isOpen', true);
      } else {
        return this.set('isOpen', false);
      }

      this.store.find('user').then(function(users) {
        this.set('users2', users);
      }.bind(this));
    }
  }
});
