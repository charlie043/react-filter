var React     = require('react');
var Table     = require('./Table.jsx');
var Bootstrap = require('react-bootstrap');
var Navbar    = Bootstrap.Navbar;
var Nav       = Bootstrap.Nav;
var NavItem   = Bootstrap.NavItem;

var Header = React.createClass({
  render: function() {
    return (
      <Navbar brand="React-gulp">
        <Nav right>
          <NavItem eventKey={1} href="#">menu1</NavItem>
          <NavItem eventKey={2} href="#">menu2</NavItem>
        </Nav>
      </Navbar>
    );
  }
});

var Index = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Table filter sort />
      </div>
    );
  }
});

window.onload = function() {
  React.render(<Index />, document.body);
};
