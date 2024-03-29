import React, { Component } from 'react';
import 'memoize-one';
import '@emotion/core';
import 'react-dom';
import 'prop-types';
import { e as cleanValue } from '../../dist/utils-06b0d5a4.browser.esm.js';
import '../../dist/index-1a961d17.browser.esm.js';
import { S as Select } from '../../dist/Select-b0aa3bb5.browser.esm.js';
import '@emotion/css';
import 'react-input-autosize';
import { m as manageState } from '../../dist/stateManager-04f734a2.browser.esm.js';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var compareOption = function compareOption(inputValue, option) {
  if (inputValue === void 0) {
    inputValue = '';
  }

  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(option.value).toLowerCase();
  var optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return "Create \"" + inputValue + "\"";
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};
var defaultProps = _extends({
  allowCreateWhileLoading: false,
  createOptionPosition: 'last'
}, builtins);
var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Creatable, _Component);

    function Creatable(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.select = void 0;

      _this.onChange = function (newValue, actionMeta) {
        var _this$props = _this.props,
            getNewOptionData = _this$props.getNewOptionData,
            inputValue = _this$props.inputValue,
            isMulti = _this$props.isMulti,
            onChange = _this$props.onChange,
            onCreateOption = _this$props.onCreateOption,
            value = _this$props.value,
            name = _this$props.name;

        if (actionMeta.action !== 'select-option') {
          return onChange(newValue, actionMeta);
        }

        var newOption = _this.state.newOption;
        var valueArray = Array.isArray(newValue) ? newValue : [newValue];

        if (valueArray[valueArray.length - 1] === newOption) {
          if (onCreateOption) onCreateOption(inputValue);else {
            var newOptionData = getNewOptionData(inputValue, inputValue);
            var newActionMeta = {
              action: 'create-option',
              name: name
            };

            if (isMulti) {
              onChange([].concat(cleanValue(value), [newOptionData]), newActionMeta);
            } else {
              onChange(newOptionData, newActionMeta);
            }
          }
          return;
        }

        onChange(newValue, actionMeta);
      };

      var options = props.options || [];
      _this.state = {
        newOption: undefined,
        options: options
      };
      return _this;
    }

    var _proto = Creatable.prototype;

    _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
      var allowCreateWhileLoading = nextProps.allowCreateWhileLoading,
          createOptionPosition = nextProps.createOptionPosition,
          formatCreateLabel = nextProps.formatCreateLabel,
          getNewOptionData = nextProps.getNewOptionData,
          inputValue = nextProps.inputValue,
          isLoading = nextProps.isLoading,
          isValidNewOption = nextProps.isValidNewOption,
          value = nextProps.value;
      var options = nextProps.options || [];
      var newOption = this.state.newOption;

      if (isValidNewOption(inputValue, cleanValue(value), options)) {
        newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
      } else {
        newOption = undefined;
      }

      this.setState({
        newOption: newOption,
        options: (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(options) : [].concat(options, [newOption]) : options
      });
    };

    _proto.focus = function focus() {
      this.select.focus();
    };

    _proto.blur = function blur() {
      this.select.blur();
    };

    _proto.render = function render() {
      var _this2 = this;

      var options = this.state.options;
      return React.createElement(SelectComponent, _extends({}, this.props, {
        ref: function ref(_ref) {
          _this2.select = _ref;
        },
        options: options,
        onChange: this.onChange
      }));
    };

    return Creatable;
  }(Component), _class.defaultProps = defaultProps, _temp;
}; // TODO: do this in package entrypoint

var SelectCreatable = makeCreatableSelect(Select);
var Creatable = manageState(SelectCreatable);

export default Creatable;
export { defaultProps, makeCreatableSelect };
