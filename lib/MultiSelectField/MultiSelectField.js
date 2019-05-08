'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./MultiSelectField.scss');

var _SelectField = require('../SelectField/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelectField = function (_Component) {
  _inherits(MultiSelectField, _Component);

  function MultiSelectField(props) {
    _classCallCheck(this, MultiSelectField);

    // bind event handlers
    var _this = _possibleConstructorReturn(this, (MultiSelectField.__proto__ || Object.getPrototypeOf(MultiSelectField)).call(this, props));

    _this.onSelectFocus = _this.onSelectFocus.bind(_this);
    _this.onSelectBlur = _this.onSelectBlur.bind(_this);
    _this.onSelectChange = _this.onSelectChange.bind(_this);
    _this.onTagClick = _this.onTagClick.bind(_this);
    return _this;
  }

  _createClass(MultiSelectField, [{
    key: 'onSelectFocus',
    value: function onSelectFocus() {
      var _props = this.props,
          value = _props.value,
          onFocus = _props.onFocus;

      if (onFocus) onFocus(value);
    }
  }, {
    key: 'onSelectBlur',
    value: function onSelectBlur() {
      var _props2 = this.props,
          value = _props2.value,
          onBlur = _props2.onBlur;

      if (onBlur) onBlur(value);
    }
  }, {
    key: 'onSelectChange',
    value: function onSelectChange(val) {
      var _props3 = this.props,
          value = _props3.value,
          onChange = _props3.onChange;

      if (value.indexOf(val) === -1) {
        var newValue = value.concat([val]);
        if (onChange) onChange(newValue);
      }
    }
  }, {
    key: 'onTagClick',
    value: function onTagClick(val) {
      var _props4 = this.props,
          value = _props4.value,
          onChange = _props4.onChange;

      var newValue = value.filter(function (v) {
        return v !== val;
      });
      if (onChange) onChange(newValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props5 = this.props,
          className = _props5.className,
          error = _props5.error,
          floatingLabel = _props5.floatingLabel,
          label = _props5.label,
          readOnly = _props5.readOnly,
          value = _props5.value;


      var children = _react.Children.toArray(this.props.children);

      var mainClass = (0, _classnames2.default)('mdl-multiselectfield', className);

      var tags = value.map(function (val) {
        var index = children.findIndex(function (c) {
          return c.props.value === val;
        });
        var child = children[index];
        return {
          value: child.props.value,
          text: child.props.children
        };
      });

      var options = children.filter(function (c) {
        return value.indexOf(c.props.value) === -1;
      });

      return _react2.default.createElement(
        'div',
        { className: mainClass },
        _react2.default.createElement(
          _SelectField2.default,
          {
            floatingLabel: floatingLabel,
            label: label,
            error: error,
            readOnly: readOnly,
            onFocus: this.onSelectFocus,
            onBlur: this.onSelectBlur,
            onChange: this.onSelectChange
          },
          options
        ),
        _react2.default.createElement(
          'div',
          { className: 'mdl-taglist' },
          tags.map(function (tag) {
            return _react2.default.createElement(_Tag2.default, {
              key: tag.value,
              value: tag.value,
              text: tag.text,
              readOnly: readOnly,
              remove: _this2.onTagClick
            });
          })
        )
      );
    }
  }]);

  return MultiSelectField;
}(_react.Component);

MultiSelectField.propTypes = {
  children: _propTypes2.default.arrayOf(_propTypes2.default.element).isRequired,
  className: _propTypes2.default.string,
  error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
  floatingLabel: _propTypes2.default.bool,
  label: _propTypes2.default.string.isRequired,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  readOnly: _propTypes2.default.bool,
  value: _propTypes2.default.array
};
MultiSelectField.defaultProps = {
  value: []
};
exports.default = MultiSelectField;