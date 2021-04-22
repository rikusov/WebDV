var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { $DVController } from "../Controllers/DVController";
/**
 * Функция считающее количетво дней между "даты с" и "даты по"
 * @param l laypot для поиска поля количества дней
 * @param dBTW // дата с
 * @param dBTT // дата по
 */
export function setCountDayBusinesDay(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var CountDayBT, dBTW, dBTT, diff, cityCtrl, priceTicketsCtrl;
        return __generator(this, function (_a) {
            CountDayBT = sender.layout.controls.tryGet("CountDayBusinessTrip");
            dBTW = sender.layout.controls.tryGet("DateBusinessTripWith");
            dBTT = sender.layout.controls.tryGet("DateBusinessTripTo");
            if (CountDayBT && dBTW && dBTW.hasValue() && dBTT && dBTT.hasValue()) {
                diff = Math.floor((dBTT.value.getTime() - dBTW.value.getTime()) / (1000 * 3600 * 24)) + 1;
                if (diff > 0)
                    CountDayBT.value = diff;
                else
                    CountDayBT.value = null;
            }
            cityCtrl = sender.layout.controls.tryGet("CityBusinessTrip");
            if (cityCtrl && cityCtrl.hasValue())
                cityChenged(cityCtrl, e);
            else {
                priceTicketsCtrl = sender.layout.controls.tryGet("PriceTickets");
                if (priceTicketsCtrl)
                    priceTicketsCtrl.value = null;
            }
            return [2 /*return*/];
        });
    });
}
/**
 * показ краткой информации
 */
export function onClickButtonShowShortInfo(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var _nubmerrequest, _dateCreated, _dateBTWith, _dateBTTo, _baseBTInfo, s;
        return __generator(this, function (_a) {
            _nubmerrequest = sender.layout.controls.tryGet("Number");
            _dateCreated = sender.layout.controls.tryGet("DateCreated");
            _dateBTWith = sender.layout.controls.tryGet("DateBusinessTripWith");
            _dateBTTo = sender.layout.controls.tryGet("DateBusinessTripTo");
            _baseBTInfo = sender.layout.controls.tryGet("BaseForBusinessTrip");
            s = "";
            if (_nubmerrequest && _nubmerrequest.value.number)
                s += "Номер заявки: " + _nubmerrequest.value.number + "\n";
            if (_dateCreated && _dateCreated.value)
                s += "Дата создания: " + _dateCreated.value.toLocaleDateString("ru") + "\n";
            if (_dateBTWith && _dateBTWith.value)
                s += "Даты командировки с:" + _dateBTWith.value.toLocaleDateString("ru") + "\t";
            if (_dateBTTo && _dateBTTo.value)
                s += "по: " + _dateBTTo.value.toLocaleDateString("ru") + "\n";
            if (_baseBTInfo && _baseBTInfo.value)
                s += "Основание для поездки: " + _baseBTInfo.value;
            if (s != "")
                MessageBox.ShowInfo(s);
            else
                MessageBox.ShowInfo("Не найдены поля для отображения информации");
            return [2 /*return*/];
        });
    });
}
/**
 * Проверка перед сохранением
 */
export function onSaveCard(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var _name;
        return __generator(this, function (_a) {
            _name = sender.controls.tryGet("Name");
            if (_name && (_name.value == null || _name.value == "")) {
                MessageBox.ShowInfo("Не заполнено поле Название!");
                e.cancel();
                return [2 /*return*/];
            }
            e.accept();
            return [2 /*return*/];
        });
    });
}
/**
 * Проверка введенного телефона
 */
export function telephoneChanged(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        return __generator(this, function (_a) {
            if (sender.value && sender.value.length > 12)
                sender.value = sender.value.substring(0, 12);
            return [2 /*return*/];
        });
    });
}
/**
 * Активация/Деактивация кнопки "На соласование"
 */
export function onVisebleButtonOnApproval(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var ButtonOnApproval, StateButton;
        return __generator(this, function (_a) {
            ButtonOnApproval = sender.controls.tryGet("OnApproval");
            StateButton = sender.controls.tryGet("ButtonState");
            if (ButtonOnApproval && sender.cardInfo.state.caption == "Проект") {
                if (StateButton)
                    StateButton.params.visibility = false;
            }
            else if (ButtonOnApproval)
                ButtonOnApproval.params.visibility = false;
            return [2 /*return*/];
        });
    });
}
/**
 * получаем руководителя и телефон
 * при смене командированого
 */
export function onChangedPersonBussinesTrip(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var director, telephone, director_model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    director = sender.layout.controls.tryGet("Director");
                    telephone = sender.layout.controls.tryGet("Telephone");
                    if (!(sender.hasValue() && director && telephone)) return [3 /*break*/, 2];
                    return [4 /*yield*/, $DVController.getDirector(sender.value.id)];
                case 1:
                    director_model = _a.sent();
                    if (director_model) {
                        director.value = director_model.director;
                        telephone.value = director_model.phone;
                    }
                    else {
                        director.value = null;
                        telephone.value = null;
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
/**
 * первое окрытие карточки
 */
export function openedCard(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var sekretary, whoRegistrating;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $DVController.getSecretary()];
                case 1:
                    sekretary = _a.sent();
                    whoRegistrating = sender.controls.tryGet("WhoRegistrating");
                    if (sekretary && whoRegistrating)
                        whoRegistrating.value = sekretary;
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * получаем стоимость билетов
 */
export function getPriceTikcetOnClick(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var tikets, dateBTW, dateBTT, cityControl, priceTik, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tikets = sender.layout.controls.tryGet("Tikets");
                    if (tikets && tikets.value == "Поезд") {
                        MessageBox.ShowInfo("Функция запроса стоимости билетов реализована только для Авиаперелетов!");
                        return [2 /*return*/];
                    }
                    dateBTW = sender.layout.controls.tryGet("DateBusinessTripWith");
                    dateBTT = sender.layout.controls.tryGet("DateBusinessTripTo");
                    cityControl = sender.layout.controls.tryGet("CityBusinessTrip");
                    priceTik = sender.layout.controls.tryGet("PriceTickets");
                    if (!(dateBTT && dateBTT.value && dateBTW && dateBTW.value && cityControl && cityControl.hasValue() && priceTik)) return [3 /*break*/, 2];
                    return [4 /*yield*/, $DVController.getPriceTickets(cityControl.value.id, dateBTW.value, dateBTT.value)];
                case 1:
                    price = _a.sent();
                    if (price == -4.0)
                        MessageBox.ShowInfo("При попытке получения цены произошла ошибка!");
                    else if (price == -3.0)
                        MessageBox.ShowInfo("Не найдены билеты вылета и прилета в указаные даты!");
                    else if (price == -2.0)
                        MessageBox.ShowInfo("Не найдены билеты прилета в указаную дату!");
                    else if (price == -1.0)
                        MessageBox.ShowInfo("Не найдены билеты вылета в указаную дату!");
                    else if (price > 0.0)
                        priceTik.value = price;
                    else
                        MessageBox.ShowInfo("Ошибка при получении данных с сервера!");
                    return [3 /*break*/, 3];
                case 2:
                    MessageBox.ShowInfo("Ошибка при работе с ключевыми полями!");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * кнопка на согласование
 */
export function onApprovalOnClick(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var cardInfo, operationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardInfo = sender.layout.cardInfo;
                    return [4 /*yield*/, $DVController.getOperationsIdState(cardInfo.kindId, cardInfo.state.stateId, "OnApproval")];
                case 1:
                    operationId = _a.sent();
                    if (operationId != "00000000-0000-0000-0000-000000000000")
                        sender.layout.changeState(operationId);
                    else
                        MessageBox.ShowWarning("Ошибка при смене состояния");
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * событие изменения города
 */
export function cityChenged(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var moneyBT, dayBT, priceBT, priceTicketsCtrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sender.hasValue())
                        return [2 /*return*/];
                    moneyBT = sender.layout.controls.tryGet("MoneyBusinessTrip");
                    dayBT = sender.layout.controls.tryGet("CountDayBusinessTrip");
                    if (moneyBT == null && dayBT == null && dayBT.value == null)
                        return [2 /*return*/];
                    return [4 /*yield*/, $DVController.getMoneyBussinesTrip(sender.value.id)];
                case 1:
                    priceBT = (_a.sent()) * dayBT.value;
                    if (priceBT > 0.0)
                        moneyBT.value = priceBT;
                    else
                        moneyBT.value = null;
                    priceTicketsCtrl = sender.layout.controls.tryGet("PriceTickets");
                    if (priceTicketsCtrl)
                        priceTicketsCtrl.value = null;
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * изменения вида билетов
 */
export function ticketsChenged(sender, e) {
    return __awaiter(this, void 0, JQueryDeferred, function () {
        var priceTicketsCtrl;
        return __generator(this, function (_a) {
            if (sender.hasValue() && sender.value == "Поезд") {
                priceTicketsCtrl = sender.layout.controls.tryGet("PriceTickets");
                if (priceTicketsCtrl)
                    priceTicketsCtrl.value = null;
            }
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=DVEventHandler.js.map