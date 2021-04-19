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
import React from "react";
import { BaseControlImpl } from "@docsvision/webclient/System/BaseControlImpl";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
var SomeControlImpl = /** @class */ (function (_super) {
    __extends(SomeControlImpl, _super);
    function SomeControlImpl(props, state) {
        return _super.call(this, props, state) || this;
    }
    SomeControlImpl.prototype.componentDidMount = function () {
    };
    SomeControlImpl.prototype.renderControl = function () {
        if (layoutManager.cardLayout) {
            return (React.createElement("div", null, "Hello world!"));
        }
    };
    return SomeControlImpl;
}(BaseControlImpl));
export { SomeControlImpl };
//# sourceMappingURL=SomeControlImpl.js.map