var _         = require('lodash');
var React     = require('react');
var Bootstrap = require('react-bootstrap');
var Input     = Bootstrap.Input;
var Row       = Bootstrap.Row;
var Col       = Bootstrap.Col;

/**
 * @class Filter
 * @param data {Array} objects in array
 * @param onChange {function} call when filter data is changed
 * @param filterOpts {Object} filter options
 * filterOpts = {
 *  key1: {
 *    type        : {String} {'text'|'number'|'date'} filter data type is required
 *    xs          : {Number} Bootstrap Input width
 *    placeholder : {String} Input placeholder
 *    perfect     : {Boolean} filter match perfectlly or not
 *  },
 *  key2: ...
 * }
 */

var Filter = React.createClass({

  propTypes: {
    data       : React.PropTypes.array,
    filterOpts : React.PropTypes.object,
    onChange   : React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      data       : [],
      filterOpts : {},
      onChange   : function(){}
    }
  },

  getInitialState: function() {
    return {
      filters: {}
    };
  },

  onChange: function(e) {
    var key   = e.target.name;
    var value = e.target.value;
    var opts = this.props.filterOpts;
    var filters = this.state.filters;

    filters[key] = value;

    // compact
    var _filters = _.reduce(filters, function(ret, val, key) {
      if (val) {
        var _opts = opts[key];
        ret[key] = (_opts.type === 'date') ? new Date(val) : val;
      }
      return ret;
    }, {});

    this.setState({filters: filters});
    this.filter(_filters);
  },

  filter: function(filters) {
    var data = this.props.data;
    var opts = this.props.filterOpts;

    var list = _.filter(data, function(row) {
      return _.every(row, function(val, key) {

        // no filter
        if (!filters[key]) return true;

        var _opts   = opts[key];
        var type    = _opts.type;
        var perfect = _opts.perfect;
        var filterVal = filters[key];

        if (perfect) {
          return (val === filterVal);
        } else if (type === 'text') {
          return val.match(filterVal);
        } else if (type === 'number') {
          return val.toString().match(filterVal);
        } else if (type === 'date') {
          return (filterVal.getMonth() === val.getMonth() &&
                  filterVal.getYear() === val.getYear() &&
                  filterVal.getDate() === val.getDate()
                 );
        } else {
          return (val == filterVal);
        }
      });
    });

    // bubble to parent
    this.props.onChange(list);
  },

  render: function() {
    var filters = _.map(this.props.filterOpts, function(opts, key) {
      var type = opts.type || 'text';
      var xs   = opts.xs || ((type === 'date') ? 3 : 2);
      var offset = opts.offset || 0;
      var placeholder = opts.placeholder || key;

      return (
        <Col key={key} xs={xs} xsOffset={offset}>
          <Input
            name={key}
            placeholder={placeholder}
            type={type}
            onChange={this.onChange}
            value={this.state.filters[key]}
          />
        </Col>
      );
    }, this);

    return (
      <div className={this.props.className}>
        <Row>
          {filters}
        </Row>
      </div>
    );
  }
});

module.exports = Filter;

