import Ember from 'ember';
import escapeRegExp from '../utils/escapeRegExp';

export default Ember.Component.extend({
  value: '',
  valueLabel: '',
  placeholder: 'Select',
  inputPlaceholder: 'filter...',
  optionValuePath: 'content',
  optionLabelPath: 'content',

  isOpen: false,
  selected: null,
  filtered: [],
  filterText: '',
  classNames: ['select-combo'],
  classNameBindings: ['isOpen:open'],
  attributeBindings: ['tabindex'],

  setupSelect: Ember.on('didInsertElement', function() {
    this.set('filterText', '');
    this.filtering();

    this.$().on('focus', function() {
      this.send('open');
    }.bind(this));
  }),

  destroySelect: Ember.on('willDestroyElement', function() {
    this.$().off('focus', '**');
  }),

  filtering: Ember.observer('filtered', 'filterText', function() {
    var searchStr = escapeRegExp(this.get('filterText'));

    // filtering
    if (searchStr) {
      this.set('filtered', this.get('content').filter(function(item) {
        return item.get('name').toLowerCase().match(
          searchStr.toLowerCase()
        );
      }));
    } else {
      this.set('filtered', this.get('content'));
    }
  }),

  actions: {
    open: function() {
      this.set('isOpen', true);
    },

    ensureClose: function() {
      if (this.$().is(':hover')) {
        return false;
      } else {
        this.send('close');
      }
    },

    close: function() {
      this.set('isOpen', false);
      this.set('filterText', '');
    }
  }
});
