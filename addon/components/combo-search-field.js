import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'text',
  pointer: 0,
  valueLabel: '',

  setupKeyEvents: Ember.on('didInsertElement', function() {
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
  }),

  handleFocusout: Ember.on('didInsertElement', function() {
    if (this.$()) {
      this.$().trigger('focus');
    }
  }),

  destroyKeyEvents: Ember.on('willDestroyElement', function() {
    // destroy event listeners
    this.$().off('keydown', '**');
    this.$().off('focusout', '**');
  }),

  resetPointer: Ember.on('parentView.filtered', function() {
    this.set('pointer', 0);
  }),

  changePointer: function(delta) {
    var current = this.get('pointer');
    var newPointer = current + delta;

    if (this.get('parentView.filtered').objectAt(newPointer)) {
      this.set('pointer', newPointer);
    }
  },

  pointerChanged: Ember.observer('parentView.filtered', 'parentView.optionValuePath', 'parentView.filtered', function() {
    var filtered = this.get('parentView.filtered');
    if (!filtered || filtered.length < 1) {
      return false;
    }

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
  }),

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
  }
});
