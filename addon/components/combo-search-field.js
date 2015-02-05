import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'text',
  pointer: 0,
  valueLabel: '',

  setupKeyEvents: function() {
    var self = this;

    var onHappend = function(e) {
      return self.keyHandler(e);
    };

    this.$().on('keydown', onHappend);
    this.pointerChanged();
  }.on('didInsertElement'),

  resetPointer: function() {
    this.set('pointer', 0);
  }.observes('parentView.filtered'),

  destroyKeyEvents: function() {
    this.$().off('keydown', '**');
  }.on('willDestroyElement'),

  changePointer: function(delta) {
    var current = this.get('pointer');
    var newPointer = current + delta;

    if (this.get('parentView.filtered').objectAt(newPointer)) {
      this.set('pointer', newPointer);
    }
  },

  pointerChanged: function() {
    var itemToSelect = this.get('parentView.filtered').objectAt(this.get('pointer'));
    var attribute = this.get('parentView.optionValuePath').replace(/^content\./, '');
    var value;

    if (attribute) {
      value = itemToSelect.get(attribute);
    } else {
      value = itemToSelect;
    }

    this.set('parentView.selected', value);
  }.observes('pointer', 'parentView.filtered'),

  keyHandler: function(e) {
    switch(e.which) {
      // down
      case 40:
        e.preventDefault();
        this.changePointer(1);
      break;
      // up
      case 38:
        e.preventDefault();
        this.changePointer(-1);
      break;
      // enter
      case 13:
        e.preventDefault();
        this.set('parentView.value', this.get('parentView.selected'));
        this.$().trigger('focusout');
      break;
      case 27:
        this.$().trigger('focusout');
      break;
    }
  },

  autoFocus: function() {
    this.$().trigger('focus');
  }.on('didInsertElement')
});
