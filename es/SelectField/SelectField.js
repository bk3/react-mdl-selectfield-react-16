'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMdl = require('react-mdl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./SelectField.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectField = function (_Component) {
  _inherits(SelectField, _Component);

  function SelectField(props) {
    _classCallCheck(this, SelectField);

    // focused state
    var _this = _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, props));

    _this.state = { focused: false

      // generate selectfield id
    };_this.id = 'mdl-selectfield-' + selectFieldIndex;
    selectFieldIndex++;

    // override material menu if needed
    // this needs to be done only once
    // and it needs to be done in the constructor
    // otherwise menu does not work properly
    if (!overrideApplied) applyOverride();

    // bind methods
    _this.showMenu = _this.showMenu.bind(_this);
    _this.hideMenu = _this.hideMenu.bind(_this);
    _this.onMenuItemClick = _this.onMenuItemClick.bind(_this);
    _this.onTextfieldFocus = _this.onTextfieldFocus.bind(_this);
    _this.onTextfieldBlur = _this.onTextfieldBlur.bind(_this);
    _this.onTextfieldKeyDown = _this.onTextfieldKeyDown.bind(_this);
    return _this;
  }

  _createClass(SelectField, [{
    key: 'getInputNode',
    value: function getInputNode() {
      return this.input.refs.input;
    }
  }, {
    key: 'getMenu',
    value: function getMenu() {
      return this.getMenuNode().MaterialMenu;
    }
  }, {
    key: 'getMenuNode',
    value: function getMenuNode() {
      if (!this.menuNode) {
        this.menuNode = document.querySelectorAll('[data-mdl-for="' + this.id + '"]')[0];
      }
      return this.menuNode;
    }
  }, {
    key: 'menuVisible',
    value: function menuVisible() {
      return hasClass(this.getMenuNode().parentNode, 'is-visible');
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      var menu = this.getMenu();
      if (menuOpenCurrent && menu !== menuOpenCurrent) {
        menuOpenCurrent.hide();
        menuOpenCurrent = null;
      }
      if (!this.menuVisible()) {
        menu.show();
        menuOpenCurrent = menu;
      }
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      this.getMenu().hide();
      menuOpenCurrent = false;
    }
  }, {
    key: 'onMenuItemClick',
    value: function onMenuItemClick(child) {
      var _props = this.props,
          value = _props.value,
          onChange = _props.onChange;

      if (value !== child.props.value) {
        if (onChange) onChange(child.props.value);
      }
      this.hideMenu();
    }
  }, {
    key: 'onTextfieldFocus',
    value: function onTextfieldFocus() {
      var _props2 = this.props,
          value = _props2.value,
          onFocus = _props2.onFocus;

      this.showMenu();
      this.setState({ focused: true });
      if (onFocus) onFocus(value);
    }
  }, {
    key: 'onTextfieldBlur',
    value: function onTextfieldBlur() {
      var _props3 = this.props,
          value = _props3.value,
          onBlur = _props3.onBlur;

      this.setState({ focused: false });
      if (onBlur) onBlur(value);
    }
  }, {
    key: 'onTextfieldKeyDown',
    value: function onTextfieldKeyDown(e) {
      var TAB = 9;
      var ESCAPE = 27;

      switch (e.which) {
        case TAB:
          this.hideMenu();
          break;
        case ESCAPE:
          this.getInputNode().blur();
          this.hideMenu();
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          className = _props4.className,
          error = _props4.error,
          floatingLabel = _props4.floatingLabel,
          label = _props4.label,
          showMenuBelow = _props4.showMenuBelow,
          readOnly = _props4.readOnly,
          value = _props4.value;


      var children = _react.Children.toArray(this.props.children);

      var mainClass = (0, _classnames2.default)('mdl-selectfield', {
        'mdl-selectfield--menu-below': showMenuBelow,
        'mdl-selectfield--floating-label': floatingLabel,
        'mdl-selectfield--empty': !children.length,
        'mdl-selectfield--error': error
      }, className);

      var index = children.findIndex(function (c) {
        return c.props.value === value;
      });
      var inputValue = index > -1 ? children[index].props.children : '';

      var inputProps = {
        id: this.id,
        className: menuSkipForClass,
        type: 'text',
        value: inputValue,
        error: error,
        label: label,
        floatingLabel: floatingLabel,
        readOnly: true,
        ref: function ref(_ref) {
          return _this2.input = _ref;
        }
      };

      if (!readOnly) {
        inputProps.onFocus = this.onTextfieldFocus;
        inputProps.onBlur = this.onTextfieldBlur;
        inputProps.onKeyDown = this.onTextfieldKeyDown;
      }

      return _react2.default.createElement(
        'div',
        { className: mainClass },
        _react2.default.createElement(_reactMdl.Textfield, inputProps),
        !readOnly && _react2.default.createElement(_reactMdl.Icon, {
          className: 'mdl-selectfield__arrow',
          name: 'arrow_drop_' + (this.state.focused ? 'up' : 'down'),
          onClick: this.showMenu
        }),
        !readOnly && _react2.default.createElement(
          _reactMdl.Menu,
          { target: this.id },
          children.map(function (child) {
            var className = (0, _classnames2.default)({
              'mdl-menu__item--selected': child.props.value === value,
              'mdl-menu__item--disabled': child.props.disabled
            });
            return _react2.default.cloneElement(child, {
              className: className,
              onClick: function onClick() {
                return _this2.onMenuItemClick(child);
              }
            });
          })
        )
      );
    }
  }]);

  return SelectField;
}(_react.Component);

/**
 * MDL v1 is hard to extend with react ...
 */

/**
 * Increment selectfield id for automatic menu target
 *
 * @type {Number}
 */


SelectField.propTypes = {
  children: _propTypes2.default.arrayOf(_propTypes2.default.element).isRequired,
  className: _propTypes2.default.string,
  error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
  floatingLabel: _propTypes2.default.bool,
  label: _propTypes2.default.string.isRequired,
  showMenuBelow: _propTypes2.default.bool,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  readOnly: _propTypes2.default.bool,
  value: _propTypes2.default.any
};
SelectField.defaultProps = {
  showMenuBelow: false
};
exports.default = SelectField;
var selectFieldIndex = 0;

/**
 * Has override been applied?
 *
 * @type {Boolean}
 */
var overrideApplied = false;

/**
 * Currently open menu
 *
 * @type {Boolean|String}
 */
var menuOpenCurrent = false;

/**
 * Skip menu for click class
 *
 * @type {String}
 */
var menuSkipForClass = 'mdl-menu--skip-for-click';

/**
 * Check if element has class
 *
 * @param  {HTMLElement} node
 * @param  {String}  cls
 * @return {Boolean}
 */
function hasClass(node, cls) {
  return (' ' + node.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/**
 * Override MaterialMenu
 *
 * @see https://github.com/google/material-design-lite/issues/4450#issuecomment-228093633
 */
function applyOverride() {
  overrideApplied = true;
  window.MaterialMenu.prototype.handleForClick_ = function (evt) {
    // START OVERRIDE
    if (hasClass(evt.target.parentNode, menuSkipForClass)) {
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    }
    // END OVERRIDE
    if (this.element_ && this.forElement_) {
      var rect = this.forElement_.getBoundingClientRect();
      var forRect = this.forElement_.parentElement.getBoundingClientRect();

      if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
        // Do not position the menu automatically. Requires the developer to
        // manually specify position.
      } else if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
        // Position below the "for" element, aligned to its right.
        this.container_.style.right = forRect.right - rect.right + 'px';
        this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
        // Position above the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.bottom = forRect.bottom - rect.top + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
        // Position above the "for" element, aligned to its right.
        this.container_.style.right = forRect.right - rect.right + 'px';
        this.container_.style.bottom = forRect.bottom - rect.top + 'px';
      } else {
        // Default: position below the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      }
    }

    this.toggle(evt);
  };
}