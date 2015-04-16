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
    this.filtering();

    this.valueChanged();

    this.focusHandler = this.$().on('focus', function() {
      this.send('open');
    }.bind(this));
  }),

  destroySelect: Ember.on('willDestroyElement', function() {
    this.$().off('focus', this.focusHandler);
  }),

  getAttributeFromItem: function(item, property) {
    if (!item) return false;
    property = property || 'optionLabelPath'

    var attribute = this.get(property).replace(/^content./, '');
    if (attribute === 'content') {
      return item;
    } else {
      return item.get(attribute);
    }
  },

  valueChanged: Ember.observer('value', 'optionValuePath', 'filtered', function() {
    var value = this.get('value');
    var filtered = this.get('filtered');

    if (!value || !filtered) return false;

    filtered.forEach(function(item) {
      if (this.getAttributeFromItem(item, 'optionValuePath') === value) {
        return this.set('valueLabel',  this.getAttributeFromItem(item));
      }
    }.bind(this));
  }),

  filtering: Ember.observer('filterText', 'content', function() {
    var searchStr = escapeRegExp(this.get('filterText').toLowerCase());
    var content = this.get('content');

    if (!content) { return Ember.A() }

    // filtering
    if (searchStr) {
      this.set('filtered', content.filter(function(item) {
        return item.get('name').toLowerCase().match(searchStr);
      }));
    } else {
      this.set('filtered', content);
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
