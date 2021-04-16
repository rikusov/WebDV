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
exports.__esModule = true;
exports.SomeControlImpl = void 0;
var react_1 = require("react");
var BaseControlImpl_1 = require("@docsvision/webclient/System/BaseControlImpl");
var LayoutManager_1 = require("@docsvision/webclient/System/LayoutManager");
var SomeControlImpl = /** @class */ (function (_super) {
    __extends(SomeControlImpl, _super);
    function SomeControlImpl(props, state) {
        return _super.call(this, props, state) || this;
    }
    SomeControlImpl.prototype.componentDidMount = function () {
    };
    SomeControlImpl.prototype.renderControl = function () {
        if (LayoutManager_1.layoutManager.cardLayout) {
            return (<div>
                    Hello world!
                </div>);
        }
    };
    return SomeControlImpl;
}(BaseControlImpl_1.BaseControlImpl));
exports.SomeControlImpl = SomeControlImpl;
