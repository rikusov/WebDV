import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";
import { Employee } from "@docsvision/webclient/BackOffice/Employee";
import { MultipleEmployees } from "@docsvision/webclient/BackOffice/MultipleEmployees";
import { Numerator } from "@docsvision/webclient/BackOffice/Numerator";
import { StateButtons } from "@docsvision/webclient/BackOffice/StateButtons";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { Dropdown } from "@docsvision/webclient/Platform/Dropdown";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { ICardSavingEventArgs } from "@docsvision/webclient/System/ICardSavingEventArgs";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { func } from "prop-types";
import { $DVController } from "../Controllers/DVController";

/**
 * Функция считающее количетво дней между "даты с" и "даты по"
 * @param l laypot для поиска поля количества дней
 * @param dBTW // дата с
 * @param dBTT // дата по
 */
export async function setCountDayBusinesDay(sender: DateTimePicker, e: any): JQueryDeferred<void> {
    let CountDayBT = sender.layout.controls.tryGet<NumberControl>("CountDayBusinessTrip");

    let dBTW = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripWith");
    let dBTT = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripTo");

    if (CountDayBT && dBTW && dBTW.hasValue() && dBTT && dBTT.hasValue()) {
        let diff = Math.floor((dBTT.value.getTime() - dBTW.value.getTime()) / (1000 * 3600 * 24)) + 1;
        if (diff > 0) CountDayBT.value = diff;
        else CountDayBT.value = null;
    }
    let cityCtrl = sender.layout.controls.tryGet<DirectoryDesignerRow>("CityBusinessTrip");

    if (cityCtrl && cityCtrl.hasValue())
        cityChenged(cityCtrl, e);
    else {
        let priceTicketsCtrl = sender.layout.controls.tryGet<NumberControl>("PriceTickets");

        if (priceTicketsCtrl) priceTicketsCtrl.value = null
    }
}
/**
 * показ краткой информации 
 */
export async function onClickButtonShowShortInfo(sender: CustomButton, e: any): JQueryDeferred<void> {
    let _nubmerrequest = sender.layout.controls.tryGet<Numerator>("Number");
    let _dateCreated = sender.layout.controls.tryGet<DateTimePicker>("DateCreated");
    let _dateBTWith = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripWith");
    let _dateBTTo = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripTo");
    let _baseBTInfo = sender.layout.controls.tryGet<TextArea>("BaseForBusinessTrip");

    let s = "";

    if (_nubmerrequest && _nubmerrequest.value.number) s +="Номер заявки: " + _nubmerrequest.value.number + "\n";
    if (_dateCreated && _dateCreated.value) s += "Дата создания: " + _dateCreated.value.toLocaleDateString("ru") + "\n";
    if (_dateBTWith && _dateBTWith.value) s += "Даты командировки с:" + _dateBTWith.value.toLocaleDateString("ru") + "\t";
    if (_dateBTTo && _dateBTTo.value) s += "по: " + _dateBTTo.value.toLocaleDateString("ru") + "\n";
    if (_baseBTInfo && _baseBTInfo.value) s += "Основание для поездки: " + _baseBTInfo.value;

    if (s != "") MessageBox.ShowInfo(s);
    else MessageBox.ShowInfo("Не найдены поля для отображения информации");
}
/**
 * Проверка перед сохранением
 */
export async function onSaveCard(sender: Layout, e: CancelableEventArgs<ICardSavingEventArgs>): JQueryDeferred<void> {
    let _name = sender.controls.tryGet<TextBox>("Name");

    if (_name && (_name.value == null || _name.value == "")) {
        MessageBox.ShowInfo("Не заполнено поле Название!");
        e.cancel();
        return;
    }
    e.accept();
}
/**
 * Проверка введенного телефона
 */
export async function telephoneChanged(sender: TextBox, e: any): JQueryDeferred<void> {
    if (sender.value && sender.value.length > 12) sender.value = sender.value.substring(0, 12);
}
/**
 * Активация/Деактивация кнопки "На соласование"
 */
export async function onVisebleButtonOnApproval(sender: Layout, e: any): JQueryDeferred<void> {
    let ButtonOnApproval = sender.controls.tryGet<CustomButton>("OnApproval");
    let StateButton = sender.controls.tryGet<StateButtons>("ButtonState");

    if (ButtonOnApproval && sender.cardInfo.state.caption == "Проект") {
        if (StateButton) StateButton.params.visibility = false;
    }
    else if (ButtonOnApproval) ButtonOnApproval.params.visibility = false;
}
/**
 * получаем руководителя и телефон
 * при смене командированого
 */
export async function onChangedPersonBussinesTrip(sender: Employee, e: any): JQueryDeferred<void> {
    let director = sender.layout.controls.tryGet<Employee>("Director");
    let telephone = sender.layout.controls.tryGet<TextBox>("Telephone");

    if (sender.hasValue() && director && telephone) {
        let director_model = await $DVController.getDirector(sender.value.id);

        if (director_model) {
            director.value = director_model.director;
            telephone.value = director_model.phone;
        }
        else {
            director.value = null;
            telephone.value = null;
        }
    }
}
/**
 * первое окрытие карточки
 */
export async function openedCard(sender: Layout, e: IEventArgs): JQueryDeferred<void> {
    let sekretary = await $DVController.getSecretary();

    let whoRegistrating = sender.controls.tryGet<MultipleEmployees>("WhoRegistrating");

    if (sekretary && whoRegistrating)
        whoRegistrating.value = sekretary;
}
/**
 * получаем стоимость билетов
 */
export async function getPriceTikcetOnClick(sender: CustomButton, e: IEventArgs): JQueryDeferred<void> {
    let tikets = sender.layout.controls.tryGet<Dropdown>("Tikets");

    if (tikets && tikets.value == "Поезд") {
        MessageBox.ShowInfo("Функция запроса стоимости билетов реализована только для Авиаперелетов!");
        return;
    } 

    let dateBTW = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripWith");
    let dateBTT = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripTo");
    let cityControl = sender.layout.controls.tryGet<DirectoryDesignerRow>("CityBusinessTrip");
    let priceTik = sender.layout.controls.tryGet<NumberControl>("PriceTickets");

    if (dateBTT && dateBTT.value && dateBTW && dateBTW.value && cityControl && cityControl.hasValue() && priceTik) {
        let price = await $DVController.getPriceTickets(cityControl.value.id, dateBTW.value, dateBTT.value);

        if (price == -4.0) MessageBox.ShowInfo("При попытке получения цены произошла ошибка!");
        else if (price == -3.0) MessageBox.ShowInfo("Не найдены билеты вылета и прилета в указаные даты!");
        else if (price == -2.0) MessageBox.ShowInfo("Не найдены билеты прилета в указаную дату!");
        else if (price == -1.0) MessageBox.ShowInfo("Не найдены билеты вылета в указаную дату!");
        else if (price > 0.0) priceTik.value = price;
        else MessageBox.ShowInfo("Ошибка при получении данных с сервера!");
    }
    else MessageBox.ShowInfo("Ошибка при работе с ключевыми полями!");
}
/**
 * кнопка на согласование
 */
export async function onApprovalOnClick(sender: CustomButton, e: IEventArgs): JQueryDeferred<void> {
    let cardInfo = sender.layout.cardInfo;

    let operationId = await $DVController.getOperationsIdState(cardInfo.kindId, cardInfo.state.stateId, "OnApproval");

    if (operationId != "00000000-0000-0000-0000-000000000000")
        sender.layout.changeState(operationId);
    else
        MessageBox.ShowWarning("Ошибка при смене состояния");
}
/**
 * событие изменения города
 */
export async function cityChenged(sender: DirectoryDesignerRow, e: any): JQueryDeferred<void> {
    if (!sender.hasValue()) return;

    let moneyBT = sender.layout.controls.tryGet<NumberControl>("MoneyBusinessTrip");
    let dayBT = sender.layout.controls.tryGet<NumberControl>("CountDayBusinessTrip");

    if (moneyBT == null && dayBT == null && dayBT.value == null) return;

    let priceBT = (await $DVController.getMoneyBussinesTrip(sender.value.id)) * dayBT.value;

    if (priceBT > 0.0) moneyBT.value = priceBT;
    else moneyBT.value = null;

    let priceTicketsCtrl = sender.layout.controls.tryGet<NumberControl>("PriceTickets");

    if (priceTicketsCtrl) priceTicketsCtrl.value = null
}
/**
 * изменения вида билетов 
 */
export async function ticketsChenged(sender: Dropdown, e: any): JQueryDeferred<void> {
    if (sender.hasValue() && sender.value == "Поезд") {
        let priceTicketsCtrl = sender.layout.controls.tryGet<NumberControl>("PriceTickets");

        if (priceTicketsCtrl) priceTicketsCtrl.value = null
    }
}