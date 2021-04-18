import { Employee } from "@docsvision/webclient/BackOffice/Employee";
import { Numerator } from "@docsvision/webclient/BackOffice/Numerator";
import { StateButtons } from "@docsvision/webclient/BackOffice/StateButtons";
import { Button } from "@docsvision/webclient/Helpers/Button";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { BasicApiEvent } from "@docsvision/webclient/System/ApiEvent";
import { BasicEvent } from "@docsvision/webclient/System/BasicEvent";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { ExtensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { ICardSavingEventArgs } from "@docsvision/webclient/System/ICardSavingEventArgs";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { func } from "prop-types";

/**
 * События считающее количетво дней между даты с и даты по
 * @param l laypot для поиска поля количества дней
 * @param dBTW // дата с
 * @param dBTT //дата по
 */
export function setCountDayBusinesDay(l: Layout, dBTW: Date, dBTT: Date) {
    let CountDayBT = l.controls.tryGet<NumberControl>("CountDayBusinessTrip");

    if (CountDayBT && dBTW && dBTT) {
        let diff = Math.floor((dBTT.getTime() - dBTW.getTime()) / (1000 * 3600 * 24)) + 1;
        if (diff > 0) CountDayBT.value = diff;
        else CountDayBT.value = null;
    }
}
/**
 * событие отлавливающее изменения даты с
 */
export async function dateBusinessTripWithChanged(sender: DateTimePicker, e: any): JQueryDeferred<void> {
    let _dateBusinessTripTo = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripTo");

    if (_dateBusinessTripTo && _dateBusinessTripTo.value)
        setCountDayBusinesDay(sender.layout, sender.value, _dateBusinessTripTo.value);
}
/**
 * событие отлавливающее изменения даты по 
 */
export async function dateBuSinessTripToChanged(sender: DateTimePicker, e: any): JQueryDeferred<void> {
    let _dateBusinessTripWith = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripWith");

    if (_dateBusinessTripWith && _dateBusinessTripWith.value)
        setCountDayBusinesDay(sender.layout, _dateBusinessTripWith.value, sender.value,);
}
/**
 * показ краткой информации 
 */
export async function OnClickButtonShowShortInfo(sender: CustomButton, e: any): JQueryDeferred<void> {
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

export async function CardBeforeSaving(sender: Layout, e: CancelableEventArgs<ICardSavingEventArgs>): JQueryDeferred<void> {
    let _name = sender.controls.tryGet<TextBox>("Name");

    if (_name && (_name.value == null || _name.value == "")) {
        MessageBox.ShowInfo("Не заполнено поле Название!");
        e.cancel();
    } 
}
/**
 * Корректировка телефона
 */
export async function CheckTelephone(sender: TextBox, e: any): JQueryDeferred<void> {
    if (sender.value && sender.value.length > 12) sender.value = sender.value.substring(0, 12);
}

export async function SetDirector(sender: Employee, e: any): JQueryDeferred<void> {
       
    //pass
}

export async function CardActivatedForShow(sender: Layout, e: any): JQueryDeferred<void> {

    let ButtonOnApproval = sender.controls.tryGet<CustomButton>("OnApproval");
    let StateButton = sender.controls.tryGet<StateButtons>("ButtonState");

    if (ButtonOnApproval && sender.cardInfo.state.caption == "Проект") {
        if (StateButton) StateButton.params.visibility = false;
    }
    else if (ButtonOnApproval) ButtonOnApproval.params.visibility = false;

}

export async function CardActivatedForEdit(sender: Layout, e: BasicEvent<IEventArgs>): JQueryDeferred<void> {

    MessageBox.ShowInfo(e.defaultSender);

}

export async function ButtonOnApproval(sender: CustomButton, e: any): JQueryDeferred<void> {
    MessageBox.ShowInfo("тык!");
}
