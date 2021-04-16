"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SomeControl = exports.SomeControlParams = void 0;
var BaseControl_1 = require("@docsvision/webclient/System/BaseControl");
var SomeControlImpl_1 = require("./SomeControlImpl");
var Readwrite_1 = require("@docsvision/webclient/System/Readwrite");
var SomeControlParams = /** @class */ (function (_super) {
    __extends(SomeControlParams, _super);
    function SomeControlParams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Readwrite_1.rw
    ], SomeControlParams.prototype, "id");
    __decorate([
        Readwrite_1.rw
    ], SomeControlParams.prototype, "someParam");
    return SomeControlParams;
}(BaseControl_1.BaseControlParams));
exports.SomeControlParams = SomeControlParams;
var SomeControl = /** @class */ (function (_super) {
    __extends(SomeControl, _super);
    function SomeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SomeControl.prototype.createParams = function () {
        return new SomeControlParams();
    };
    SomeControl.prototype.createImpl = function () {
        return new SomeControlImpl_1.SomeControlImpl(this.props, this.state);
    };
    return SomeControl;
}(BaseControl_1.BaseControl));
exports.SomeControl = SomeControl;
