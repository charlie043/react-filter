# react-filter
### install
```
$ npm install react-filter
```
### use
```javascript
var Filter = require('react-filter');

var sample_data = [  
  { id : 'id-1', count : 1, date : new Date(2015, 3, 1)},
  { id : 'id-2', count : 2, date : new Date(2015, 3, 2)},
  { id : 'id-3', count : 3, date : new Date(2015, 3, 3)},
  { id : 'id-4', count : 4, date : new Date(2015, 3, 4)}
];
    
var App = React.createClass({
  
  onChange: fuction(filteredData) {
    console.log(filteredData);
  },

  render: function() {
    var opts = {
      id    : {type: 'text'},
      count : {type: 'number'},
      date  : {type: 'date'}
      // key : {opts}
    };
  
    return (
      <Filter 
        data={data}
        filterOpts={opts}
        onChange={this.onChange}
      />
    );
  }
});

React.render(<App />, document.body);
```

### options
- type {String}

data type
- placeholder {String}

input placeholder
- xs {Number}

value of bootstrap grid system
- xsOffset {Number}

offset value of bootstrap grid system
- perfect

filter perfect matching or not. default false.
```
{
  type        : 'text',
  placeholder : 'Address',
  xs          : 3,
  xsOffset    : 1,
  perfect     : true
}
```
