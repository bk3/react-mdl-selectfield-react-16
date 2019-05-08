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

var Tag = function Tag(props) {
  var value = props.value,
      text = props.text,
      readOnly = props.readOnly,
      remove = props.remove;

  var buttonProps = {
    raised: true
  };
  if (!readOnly) {
    buttonProps.onClick = function () {
      return remove(value);
    };
  }
  return _react2.default.createElement(
    _reactMdl.Button,
    buttonProps,
    text,
    !readOnly && _react2.default.createElement(_reactMdl.Icon, { name: 'clear' })
  );
};

Tag.propTypes = {
  readOnly: _propTypes2.default.bool.isRequired,
  remove: _propTypes2.default.func.isRequired,
  text: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.any.isRequired
};

exports.default = Tag;