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

  getValueLabel: function() {
    var attribute = this.get('optionValuePath').replace(/^content\./, '');

    if (attribute === 'content') {
      attribute = '';
    }
    return attribute;
  },

  setupSelect: Ember.on('didInsertElement', function() {
    this.set('filterText', this.getValueLabel());
    this.filtering();

    this.valueChanged();

    this.focusHandler = this.$().on('focus', function() {
      this.send('open');
    }.bind(this));
  }),

  destroySelect: Ember.on('willDestroyElement', function() {
    this.$().off('focus', this.focusHandler);
  }),

  valueChanged: Ember.observer('value', function() {
    if (this.get('value')) {
      this.set('valueLabel', this.get('value.name'));
    }
  }),

  filtering: Ember.observer('filterText', 'content', function() {
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
