import Ember from 'ember';
import escapeRegExp from '../utils/escapeRegExp';

export default Ember.Component.extend({
  filtered: [],
  filterText: '',
  classNames: ['select-combo'],
  value: null,
  placeholder: 'Select',
  inputPlaceholder: 'filter...',
  classNameBindings: ['isOpen:open'],
  isOpen: false,
  selected: null,
  attributeBindings: ['tabindex'],

  setupSelect: function() {
    this.set('filterText', '');
    this.filtering();

    this.$().on('focus', function() {
      this.send('open');
    }.bind(this));
  }.on('didInsertElement'),

  destroySelect: function() {
    this.$().off('focus', '**');
  }.on('willDestroyElement'),

  filtering: function() {
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
  }.observes('content', 'filterText'),

  actions: {
    open: function() {
      this.set('isOpen', true);
    },

    close: function() {
      window.setTimeout(function() {
        this.set('isOpen', false);
        this.set('filterText', '');
      }.bind(this), 100);
    }
  }
});
