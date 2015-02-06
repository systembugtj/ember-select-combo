import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'text',
  pointer: 0,
  valueLabel: '',

  setupKeyEvents: function() {
    var self = this;

    var onKey = function(e) {
      return self.keyHandler(e);
    };

    var onFocusout = function(e) {
      return self.handleFocusout(e);
    };

    // event listeners
    this.$().on('keydown', onKey);
    this.$().focusout(onFocusout);

    this.pointerChanged();
  }.on('didInsertElement'),

  resetPointer: function() {
    this.set('pointer', 0);
  }.observes('parentView.filtered'),

  destroyKeyEvents: function() {
    // destroy event listeners
    this.$().off('keydown', '**');
    this.$().off('focusout', '**');
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

    if (!itemToSelect) {
      return false;
    }

    if (attribute === 'content') {
      value = itemToSelect;
    } else {
      value = itemToSelect.get(attribute);
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
        this.get('parentView').send('close');
      break;
      case 27:
        e.preventDefault();
        console.log('esc');
        this.get('parentView').send('close');
      break;
    }
  },

  handleFocusout: function() {
    if (this.$()) {
      this.$().trigger('focus');
    }
  }.on('didInsertElement')
});
