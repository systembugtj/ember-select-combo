import Ember from 'ember';
import escapeRegExp from '../utils/escapeRegExp';

export default Ember.Component.extend({
  tagName: 'li',
  isSelected: false,
  classNames: ['select-combo-list-item'],
  classNameBindings: ['isSelected:selected'],

  setupItem: Ember.on('didInsertElement', function() {
    this.filterChanged();
    this.selectedChanged();
  }),

  selectedChanged: Ember.observer('parentView.filterText', 'content', 'parentView.optionLabelPath', function() {
    var path = this.get('parentView.optionValuePath');
    // set class
    if (this.get(path) === this.get('parentView.selected')) {
      this.set('isSelected', true);
    } else {
      this.set('isSelected', false);
    }
  }),

  filterChanged: Ember.observer('parentView.filterText', 'content', 'parentView.optionLabelPath', function() {
    var path = this.get('parentView.optionLabelPath');
    var content = this.get(path);
    var querystr = escapeRegExp(this.get('parentView.filterText'));

    if (querystr !== '') {
      var reg = new RegExp(querystr, 'gi');

      content = content.replace(reg, function(str) {
        return '<span class="highlight">'+str+'</span>';
      });
    }

    this.$().html(content);
  }),

  contentChange: Ember.observer('content', function() {
    this.$().text(this.get('content.name'));
  }),

  setValueLabel: Ember.observer('parentView.valueLabel', 'parentView.value', function() {
    var valuePath = this.get('parentView.optionValuePath');
    if (this.get(valuePath) !== this.get('parentView.value')) {
      return false;
    }

    var labelPath = this.get('parentView.optionLabelPath');
    this.set('parentView.valueLabel', this.get(labelPath));
  }),

  click: function() {
    var path = this.get('parentView.optionValuePath');
    this.set('parentView.value', this.get(path));
    this.get('parentView').send('close');
  }
});
