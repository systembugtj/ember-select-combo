import DS from 'ember-data';

var Article =  DS.Model.extend({
  title: DS.attr('string'),
  user_id: DS.belongsTo('user')
});

Article.reopenClass({
  FIXTURES: [
    { id: 1, title: 'Yehuda Katz', user: 2 },
  ]
});

export default Article;
