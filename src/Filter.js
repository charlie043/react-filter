/** @jsx React.DOM */

var _         = require('lodash');
var React     = require('react');
var Bootstrap = require('react-bootstrap');
var Input     = Bootstrap.Input;
var Panel     = Bootstrap.Panel;
var Row       = Bootstrap.Row;
var Col       = Bootstrap.Col;

/**
 * Simple Filter
 * @class Filter
 * @param panel {Boolean} enclose with Bootstrap.Panel
 * @param onChange {Function} call when input values are changed.
 * @param filters {Array} array of filter specific
 *  // filter specific
 *  {
 *    key         : {String}, // filter key
 *    type        : {String}, // filter type // 'string'|'number'|'date'
 *    placeholder : {String}  // input placeholder
 *
 *  }
 */
var Filter = React.createClass({

  propTypes: {
    panel    : React.PropTypes.bool,
    onChange : React.PropTypes.func,
    filters  : React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      panel   : false,
      onChange: function(){},
      filters : []
    }
  },

  getInitialState: function() {
    return {
      filters: {}
    };
  },

  onChange: function(e) {
    var name  = e.target.name;
    var value = e.target.value;
    var state = this.state.filters;
    state[name] = value;
    this.setState(state);

    // compact
    var filters = _.reduce(state, function(ret, value, key) {
      if (value) ret[key] = value;
      return ret;
    }, {});

    // bubble to parent
    this.props.onChange(filters);
  },

  render: function() {
    var self = this;
    var filters = self.props.filters.map(function(filter, index) {
      var key  = filter.key || index;
      var type = filter.type || 'text';
      var xs   = filter.xs || (type === 'date') ? 3 : 2;
      var placeholder = filter.placeholder || key;
      return (
        <Col key={key} xs={xs}>
          <Input
            name={key}
            placeholder={placeholder}
            type={type}
            onChange={self.onChange}
            value={self.state.filters[key]}
          />
        </Col>
      );
    });

    if (this.props.panel) {
      return (
        <Panel header='Filter'>
          <Row>
            {filters}
          </Row>
        </Panel>
      );
    }

    return (
      <Input wrapperClassName="wrapper">
        <Row>
          {filters}
        </Row>
      </Input>
    );
  }
});

module.exports = Filter;
