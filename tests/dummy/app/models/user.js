import DS from 'ember-data';

var User =  DS.Model.extend({
  name: DS.attr('string')
});

User.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Yehuda Katz' },
    { id: 2, name: 'Leah Silber' },
    { id: 3, name: 'Carl Lerche' },
    { id: 4, name: 'Tom Dale' },
    { id: 5, name: 'Peter Wagenet' }
  ]
});

export default User;
