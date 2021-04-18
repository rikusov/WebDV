define(['tslib', '@docsvision/webclient/Helpers/MessageBox/MessageBox', '@docsvision/webclient/System/ExtensionManager'], function (tslib, MessageBox, ExtensionManager) { 'use strict';

    /**
     * События считающее количетво дней между даты с и даты по
     * @param l laypot для поиска поля количества дней
     * @param dBTW // дата с
     * @param dBTT //дата по
     */
    function setCountDayBusinesDay(l, dBTW, dBTT) {
        var CountDayBT = l.controls.tryGet("CountDayBusinessTrip");
        if (CountDayBT && dBTW && dBTT) {
            var diff = Math.floor((dBTT.getTime() - dBTW.getTime()) / (1000 * 3600 * 24)) + 1;
            if (diff > 0)
                CountDayBT.value = diff;
            else
                CountDayBT.value = null;
        }
    }
    /**
     * событие отлавливающее изменения даты с
     */
    function dateBusinessTripWithChanged(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var _dateBusinessTripTo;
            return tslib.__generator(this, function (_a) {
                _dateBusinessTripTo = sender.layout.controls.tryGet("DateBusinessTripTo");
                if (_dateBusinessTripTo && _dateBusinessTripTo.value)
                    setCountDayBusinesDay(sender.layout, sender.value, _dateBusinessTripTo.value);
                return [2 /*return*/];
            });
        });
    }
    /**
     * событие отлавливающее изменения даты по
     */
    function dateBuSinessTripToChanged(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var _dateBusinessTripWith;
            return tslib.__generator(this, function (_a) {
                _dateBusinessTripWith = sender.layout.controls.tryGet("DateBusinessTripWith");
                if (_dateBusinessTripWith && _dateBusinessTripWith.value)
                    setCountDayBusinesDay(sender.layout, _dateBusinessTripWith.value, sender.value);
                return [2 /*return*/];
            });
        });
    }
    /**
     * показ краткой информации
     */
    function OnClickButtonShowShortInfo(sender, e) {
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
    function CardBeforeSaving(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            var _name;
            return tslib.__generator(this, function (_a) {
                _name = sender.controls.tryGet("Name");
                if (_name && (_name.value == null || _name.value == "")) {
                    MessageBox.MessageBox.ShowInfo("Не заполнено поле Название!");
                    e.cancel();
                }
                return [2 /*return*/];
            });
        });
    }
    /**
     * Корректировка телефона
     */
    function CheckTelephone(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            return tslib.__generator(this, function (_a) {
                if (sender.value && sender.value.length > 12)
                    sender.value = sender.value.substring(0, 12);
                return [2 /*return*/];
            });
        });
    }
    function SetDirector(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            return tslib.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    }
    function CardActivatedForShow(sender, e) {
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
    function CardActivatedForEdit(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            return tslib.__generator(this, function (_a) {
                MessageBox.MessageBox.ShowInfo(e.defaultSender);
                return [2 /*return*/];
            });
        });
    }
    function ButtonOnApproval(sender, e) {
        return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
            return tslib.__generator(this, function (_a) {
                MessageBox.MessageBox.ShowInfo("тык!");
                return [2 /*return*/];
            });
        });
    }

    var DVEventHandler = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setCountDayBusinesDay: setCountDayBusinesDay,
        dateBusinessTripWithChanged: dateBusinessTripWithChanged,
        dateBuSinessTripToChanged: dateBuSinessTripToChanged,
        OnClickButtonShowShortInfo: OnClickButtonShowShortInfo,
        CardBeforeSaving: CardBeforeSaving,
        CheckTelephone: CheckTelephone,
        SetDirector: SetDirector,
        CardActivatedForShow: CardActivatedForShow,
        CardActivatedForEdit: CardActivatedForEdit,
        ButtonOnApproval: ButtonOnApproval
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
