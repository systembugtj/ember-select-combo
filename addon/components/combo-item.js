import Ember from 'ember';
import escapeRegExp from '../utils/escapeRegExp';

export default Ember.Component.extend({
  tagName: 'li',
  isSelected: false,
  classNames: ['select-combo-list-item'],
  classNameBindings: ['isSelected:selected'],

  setupItem: function() {
    this.filterChanged();
    this.selectedChanged();
  }.on('didInsertElement'),

  selectedChanged: function() {
    var path = this.get('parentView.optionValuePath');
    // set class
    if (this.get(path) === this.get('parentView.selected')) {
      this.set('isSelected', true);
    } else {
      this.set('isSelected', false);
    }
  }.observes('parentView.selected', 'content', 'parentView.optionValuePath'),

  filterChanged: function() {
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
  }.observes('parentView.filterText', 'content', 'parentView.optionLabelPath'),

  contentChange: function() {
    this.$().text(this.get('content.name'));
  }.observes('content'),

  setValueLabel: function() {
    var valuePath = this.get('parentView.optionValuePath');
    if (this.get(valuePath) !== this.get('parentView.value')) {
      return false;
    }

    var labelPath = this.get('parentView.optionLabelPath');
    this.set('parentView.valueLabel', this.get(labelPath));
  }.observes('parentView.optionLabelPath', 'parentView.value'),

  click: function() {
    var path = this.get('parentView.optionValuePath');
    this.set('parentView.value', this.get(path));
  }
});
