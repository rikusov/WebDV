define(['tslib', '@docsvision/webclient/Helpers/MessageBox/MessageBox', '@docsvision/webclient/System/RequestManager', '@docsvision/webclient/System/UrlStore', '@docsvision/webclient/System/ExtensionManager'], function (tslib, MessageBox, RequestManager, UrlStore, ExtensionManager) { 'use strict';

    /**
     * класс реализующий серверное расширение WebDVExtension
     * */
    var DVController = /** @class */ (function () {
        function DVController() {
        }
        /**
         * Получения руководителя сотрудника
         * @param employeeId Id сотрудника
         */
        DVController.prototype.getDirector = function (employeeId) {
            var url = UrlStore.urlStore.urlResolver.resolveUrl("GetDirector", "DV");
            var data = {
                employeeId: employeeId
            };
            return RequestManager.requestManager.post(url, JSON.stringify(data));
        };
        /**
         * Получения масива сотрудников из группы секрктарь
         * */
        DVController.prototype.getSecretary = function () {
            var url = UrlStore.urlStore.urlResolver.resolveUrl("GetSecretary", "DV");
            return RequestManager.requestManager.get(url);
        };
        /**
         * Получение ценны билетов
         * @param cityId Id города
         * @param dateBusinessTripWith дата вылета
         * @param dateBusinessTripTo дата прилета
         */
        DVController.prototype.getPriceTickets = function (cityId, dateBusinessTripWith, dateBusinessTripTo) {
            var url = UrlStore.urlStore.urlResolver.resolveUrl("GetPriceTickets", "DV");
            var data = {
                cityId: cityId,
                dateBusinessTripWith: dateBusinessTripWith,
                dateBusinessTripTo: dateBusinessTripTo
            };
            return RequestManager.requestManager.post(url, JSON.stringify(data));
        };
        /**
         * Возврвщает сумму командировачных
         * @param cityId Id города
         */
        DVController.prototype.getMoneyBussinesTrip = function (cityId) {
            var url = UrlStore.urlStore.urlResolver.resolveUrl("GetMoneyBussinesTrip", "DV");
            var data = {
                cityId: cityId,
            };
            return RequestManager.requestManager.post(url, JSON.stringify(data));
        };
        /**
         * *Возвращат id операции для смены статуса карточки
         * @param kindCardId Id вида карточки
         * @param statCardName текущий статус карточки
         * @param endStatName целевой статус карточки
         */
        DVController.prototype.getOperationsIdState = function (kindCardId, statCardId, endStateName) {
            var url = UrlStore.urlStore.urlResolver.resolveUrl("GetOperationsIdState", "DV");
            var data = {
                kindCardId: kindCardId,
                statCardId: statCardId,
                endStateName: endStateName
            };
            return RequestManager.requestManager.post(url, JSON.stringify(data));
        };
        return DVController;
    }());
    var $DVController = new DVController();

    /**
     * Функция считающее количетво дней между "даты с" и "даты по"
     * @param l laypot для поиска поля количества дней
     * @param dBTW // дата с
     * @param dBTT // дата по
     */
    function setCountDayBusinesDay(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var CountDayBT, dBTW, dBTT, diff, cityCtrl, priceTicketsCtrl;
            return tslib.__generator(this, function (_a) {
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
                    cityChenged(cityCtrl);
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
    function onClickButtonShowShortInfo(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var _nubmerrequest, _dateCreated, _dateBTWith, _dateBTTo, _baseBTInfo, s;
            return tslib.__generator(this, function (_a) {
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
                    MessageBox.MessageBox.ShowInfo(s);
                else
                    MessageBox.MessageBox.ShowInfo("Не найдены поля для отображения информации");
                return [2 /*return*/];
            });
        });
    }
    /**
     * Проверка перед сохранением
     */
    function onSaveCard(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var _name;
            return tslib.__generator(this, function (_a) {
                _name = sender.controls.tryGet("Name");
                if (_name && (_name.value == null || _name.value == "")) {
                    MessageBox.MessageBox.ShowInfo("Не заполнено поле Название!");
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
    function telephoneChanged(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            return tslib.__generator(this, function (_a) {
                if (sender.value && sender.value.length > 12)
                    sender.value = sender.value.substring(0, 12);
                return [2 /*return*/];
            });
        });
    }
    /**
     * Активация/Деактивация кнопки "На соласование"
     */
    function onVisebleButtonOnApproval(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var ButtonOnApproval, StateButton;
            return tslib.__generator(this, function (_a) {
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
    function onChangedPersonBussinesTrip(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var director, telephone, director_model;
            return tslib.__generator(this, function (_a) {
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
    function openedCard(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var sekretary, whoRegistrating;
            return tslib.__generator(this, function (_a) {
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
    function getPriceTikcetOnClick(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var tikets, dateBTW, dateBTT, cityControl, priceTik, price;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tikets = sender.layout.controls.tryGet("Tikets");
                        if (tikets && tikets.value == "Поезд") {
                            MessageBox.MessageBox.ShowInfo("Функция запроса стоимости билетов реализована только для Авиаперелетов!");
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
                            MessageBox.MessageBox.ShowInfo("При попытке получения цены произошла ошибка!");
                        else if (price == -3.0)
                            MessageBox.MessageBox.ShowInfo("Не найдены билеты вылета и прилета в указаные даты!");
                        else if (price == -2.0)
                            MessageBox.MessageBox.ShowInfo("Не найдены билеты прилета в указаную дату!");
                        else if (price == -1.0)
                            MessageBox.MessageBox.ShowInfo("Не найдены билеты вылета в указаную дату!");
                        else if (price > 0.0)
                            priceTik.value = price;
                        else
                            MessageBox.MessageBox.ShowInfo("Ошибка при получении данных с сервера!");
                        return [3 /*break*/, 3];
                    case 2:
                        MessageBox.MessageBox.ShowInfo("Ошибка при работе с ключевыми полями!");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * кнопка на согласование
     */
    function onApprovalOnClick(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var cardInfo, operationId;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cardInfo = sender.layout.cardInfo;
                        return [4 /*yield*/, $DVController.getOperationsIdState(cardInfo.kindId, cardInfo.state.stateId, "OnApproval")];
                    case 1:
                        operationId = _a.sent();
                        if (operationId != "00000000-0000-0000-0000-000000000000")
                            sender.layout.changeState(operationId);
                        else
                            MessageBox.MessageBox.ShowWarning("Ошибка при смене состояния");
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * событие изменения города
     */
    function cityChenged(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var moneyBT, dayBT, priceBT, priceTicketsCtrl;
            return tslib.__generator(this, function (_a) {
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
    function ticketsChenged(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var priceTicketsCtrl;
            return tslib.__generator(this, function (_a) {
                if (sender.hasValue() && sender.value == "Поезд") {
                    priceTicketsCtrl = sender.layout.controls.tryGet("PriceTickets");
                    if (priceTicketsCtrl)
                        priceTicketsCtrl.value = null;
                }
                return [2 /*return*/];
            });
        });
    }

    var DVEventHandler = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setCountDayBusinesDay: setCountDayBusinesDay,
        onClickButtonShowShortInfo: onClickButtonShowShortInfo,
        onSaveCard: onSaveCard,
        telephoneChanged: telephoneChanged,
        onVisebleButtonOnApproval: onVisebleButtonOnApproval,
        onChangedPersonBussinesTrip: onChangedPersonBussinesTrip,
        openedCard: openedCard,
        getPriceTikcetOnClick: getPriceTikcetOnClick,
        onApprovalOnClick: onApprovalOnClick,
        cityChenged: cityChenged,
        ticketsChenged: ticketsChenged
    });

    // Главная входная точка всего расширения
    // Данный файл должен импортировать прямо или косвенно все остальные файлы, 
    // чтобы rollup смог собрать их все в один бандл.
    // Регистрация расширения позволяет корректно установить все
    // обработчики событий, сервисы и прочие сущности web-приложения.
    ExtensionManager.extensionManager.registerExtension({
        name: "DVEventHandler",
        version: "1.0.0",
        globalEventHandlers: [DVEventHandler]
    });

});
//# sourceMappingURL=extension.js.map
