define(['tslib', '@docsvision/webclient/Helpers/MessageBox/MessageBox', '@docsvision/webclient/System/ExtensionManager'], function (tslib, MessageBox, ExtensionManager) { 'use strict';

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
                    s += "����� ������: " + _nubmerrequest.value.number + "\n";
                if (_dateCreated && _dateCreated.value)
                    s += "���� ��������: " + _dateCreated.value.toLocaleDateString("ru") + "\n";
                if (_dateBTWith && _dateBTWith.value)
                    s += "���� ������������ �:" + _dateBTWith.value.toLocaleDateString("ru") + "\t";
                if (_dateBTTo && _dateBTTo.value)
                    s += "��: " + _dateBTTo.value.toLocaleDateString("ru") + "\n";
                if (_baseBTInfo && _baseBTInfo.value)
                    s += "��������� ��� �������: " + _baseBTInfo.value;
                if (s != "")
                    MessageBox.MessageBox.ShowInfo(s);
                else
                    MessageBox.MessageBox.ShowInfo("�� ������� ���� ��� ����������� ����������");
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
                    MessageBox.MessageBox.ShowInfo("�� ��������� ���� ��������!");
                    e.cancel();
                }
                return [2 /*return*/];
            });
        });
    }

    var DVEventHandler = /*#__PURE__*/Object.freeze({
        __proto__: null,
        dateBusinessTripWithChanged: dateBusinessTripWithChanged,
        dateBuSinessTripToChanged: dateBuSinessTripToChanged,
        OnClickButtonShowShortInfo: OnClickButtonShowShortInfo,
        CardBeforeSaving: CardBeforeSaving
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
