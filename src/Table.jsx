var _         = require('lodash');
var React     = require('react');
var Bootstrap = require('react-bootstrap');
var Filter    = require('./Filter.jsx');
var Table     = Bootstrap.Table;

var data = [
  {id: 'id-1', num: 1, type: 'type1'},
  {id: 'id-2', num: 2, type: 'type1'},
  {id: 'id-3', num: 3, type: 'type1'},
  {id: 'id-4', num: 4, type: 'type1'},
  {id: 'id-5', num: 5, type: 'type2'},
  {id: 'id-6', num: 6, type: 'type2'},
  {id: 'id-7', num: 7, type: 'type2'},
  {id: 'id-8', num: 8, type: 'type2'},
  {id: 'id-9', num: 9, type: 'type3'},
  {id: 'id-10', num: 10, type: 'type3'},
  {id: 'id-11', num: 11, type: 'type3'},
];

var SortedTable = React.createClass({

  getDefaultProps: function() {
    return {
      keyIndex: ['id', 'num', 'type'],
      keyLabel: {
        id    : 'ID',
        num   : '数',
        type  : 'テスト'
      },
      data: data,

      filter : false,
      sort   : false
    };
  },

  getInitialState: function() {
    return {
      data: this.props.data,
      sortFlag: true
    };
  },

  sort: function(key) {
    if (!this.props.sort) {
      return function(){};
    }

    var self = this;
    return function() {
      var flag = !self.state.sortFlag;
      self.setState({
        data: _.sortByOrder(self.state.data, key, flag),
        sortFlag: flag
      });
    }
  },

  render: function() {
    var self = this;
    var keyIndex = this.props.keyIndex;
    var keyLabel = this.props.keyLabel;
    var thead = keyIndex.map(function(value, index) {
      var key = keyLabel[value] ? keyLabel[value] : value ;
      return (<th key={index} onClick={self.sort(value)}>{key}</th>);
    });
    var tbody = this.state.data.map(function(row, index) {
      var tds = keyIndex.map(function(key, index) {
        var val = row[key];
        return (<td key={index}>{val}</td>);
      });
      return (
        <tr key={index}>
          {tds}
        </tr>
      );
    });

    var filters = [
      {type: 'text', key : 'id', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id1', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id2', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id3', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id4', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id5', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id6', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id7', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id8', placeholder: 'あいでぅ'},
      {type: 'text', key : 'id9', placeholder: 'あいでぅ'},
      {type: 'number', key : 'ide3', placeholder: 'あいでぅ'},
      {type: 'date', key : 'ide4', placeholder: 'あいでぅ'},
    ];

    return (
      <div>
        <Filter filters={filters} onChange={this.onChange} />
        <Table striped bordered condensed hover responsive >
          <thead>
            <tr>
              {thead}
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </Table>
      </div>
    );
  },
  onChange: function(filters) {
    console.log(filters);
  }
});

module.exports = SortedTable;
