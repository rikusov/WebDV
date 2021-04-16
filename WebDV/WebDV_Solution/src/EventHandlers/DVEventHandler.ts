import { Numerator } from "@docsvision/webclient/BackOffice/Numerator";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { ICardSavingEventArgs } from "@docsvision/webclient/System/ICardSavingEventArgs";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { func } from "prop-types";


function setCountDayBusinesDay(l: Layout, dBTW: Date, dBTT: Date) {
    let CountDayBT = l.controls.tryGet<NumberControl>("CountDayBusinessTrip");

    if (CountDayBT && dBTW && dBTT) {
        let diff = Math.floor((dBTT.getTime() - dBTW.getTime()) / (1000 * 3600 * 24)) + 1;
        if (diff > 0) CountDayBT.value = diff;
        else CountDayBT.value = null;
    }
}

export async function dateBusinessTripWithChanged(sender: DateTimePicker, e: any): JQueryDeferred<void> {
    let _dateBusinessTripTo = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripTo");

    if (_dateBusinessTripTo && _dateBusinessTripTo.value)
        setCountDayBusinesDay(sender.layout, sender.value, _dateBusinessTripTo.value);
}

export async function dateBuSinessTripToChanged(sender: DateTimePicker, e: any): JQueryDeferred<void> {
    let _dateBusinessTripWith = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripWith");

    if (_dateBusinessTripWith && _dateBusinessTripWith.value)
        setCountDayBusinesDay(sender.layout, _dateBusinessTripWith.value, sender.value,);
}

export async function OnClickButtonShowShortInfo(sender: CustomButton, e: any): JQueryDeferred<void> {
    let _nubmerrequest = sender.layout.controls.tryGet<Numerator>("Number");
    let _dateCreated = sender.layout.controls.tryGet<DateTimePicker>("DateCreated");
    let _dateBTWith = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripWith");
    let _dateBTTo = sender.layout.controls.tryGet<DateTimePicker>("DateBusinessTripTo");
    let _baseBTInfo = sender.layout.controls.tryGet<TextArea>("BaseForBusinessTrip");

    let s = "";

    if (_nubmerrequest && _nubmerrequest.value.number) s +="����� ������: " + _nubmerrequest.value.number + "\n";
    if (_dateCreated && _dateCreated.value) s += "���� ��������: " + _dateCreated.value.toLocaleDateString("ru") + "\n";
    if (_dateBTWith && _dateBTWith.value) s += "���� ������������ �:" + _dateBTWith.value.toLocaleDateString("ru") + "\t";
    if (_dateBTTo && _dateBTTo.value) s += "��: " + _dateBTTo.value.toLocaleDateString("ru") + "\n";
    if (_baseBTInfo && _baseBTInfo.value) s += "��������� ��� �������: " + _baseBTInfo.value;

    if (s != "") MessageBox.ShowInfo(s);
    else MessageBox.ShowInfo("�� ������� ���� ��� ����������� ����������");
}

export async function CardBeforeSaving(sender: Layout, e: CancelableEventArgs<ICardSavingEventArgs>): JQueryDeferred<void> {
    let _name = sender.controls.tryGet<TextBox>("Name");

    if (_name && (_name.value == null || _name.value == "")) {
        MessageBox.ShowInfo("�� ��������� ���� ��������!");
        e.cancel();
    } 
}
