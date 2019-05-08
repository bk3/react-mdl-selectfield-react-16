'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMdl = require('react-mdl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = function Option(props) {
  var className = props.className,
      onClick = props.onClick,
      children = props.children;

  return _react2.default.createElement(
    _reactMdl.MenuItem,
    { className: className, onClick: onClick },
    children || ''
  );
};

Option.propTypes = {
  className: _propTypes2.default.string,
  value: _propTypes2.default.any,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.string
};

exports.default = Option;