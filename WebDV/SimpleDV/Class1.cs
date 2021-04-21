using System;
using System.Windows.Forms;
using System.Collections.Generic;
using System.Linq;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectModel;
using DocsVision.BackOffice.WinForms;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.WinForms.Design.LayoutItems;
using DocsVision.BackOffice.WinForms.Design.PropertyControls;
using DocsVision.BackOffice.WinForms.Controls;
using DocsVision.Platform.ObjectModel.Search;
using DocsVision.BackOffice.ObjectModel.Services;
using DevExpress.XtraBars;

namespace BackOffice {
	public class CardDocumentЗаявка_на_командировкуScript : CardDocumentScript {
		private object _ColorStatus = null;
		private decimal _MoneyValueCity = 0.0m;

		#region Properties
		/// <summary>
		/// получения даты из контрола дата командировки с
		/// </summary>
		private DateTime DateBusinessTripWith
		{
			get
			{
				IPropertyControl dateBTW = MainControl.FindPropertyItem<IPropertyControl>("DateBusinesTripWith");
				if (dateBTW != null && dateBTW.ControlValue != null) return Convert.ToDateTime(dateBTW.ControlValue);
				return DateTime.MinValue;
			}
		}
		/// <summary>
		/// получения даты из контрола дата командировки по
		/// </summary>
		private DateTime DateBusinessTripTo
		{
			get
			{
				IPropertyControl dateBTT = MainControl.FindPropertyItem<IPropertyControl>("DateBusinesTripTo");
				if (dateBTT != null && dateBTT.ControlValue != null) return Convert.ToDateTime(dateBTT.ControlValue);
				return DateTime.MinValue;
			}
		}
		/// <summary>
		/// Получения и присовения значения в контрол количество командировачных дней
		/// </summary>
		private int CountDayBusinessTrip
		{
			get
			{
				IPropertyControl countDBT = MainControl.FindPropertyItem<IPropertyControl>("CountDaysBusinessTrip");
				if (countDBT != null) return Convert.ToInt32(countDBT.ControlValue);
				return 0;
			}
			set
			{
				IPropertyControl countDBT = MainControl.FindPropertyItem<IPropertyControl>("CountDaysBusinessTrip");
				if (countDBT != null && value > 0) countDBT.ControlValue = value;
			}
		}
		/// <summary>
		/// Запись цены билетов
		/// </summary>
		private decimal PriceTickets
		{
			set
			{
				IPropertyControl PriceTicketsControl = MainControl.FindPropertyItem<IPropertyControl>("PriceTikets");
				if (PriceTicketsControl != null)
					if (Decimal.Compare(value, 0.00m) > 0) PriceTicketsControl.ControlValue = value;
					else PriceTicketsControl.ControlValue = null;
			}
		}

		private ICustomizableControl MainControl { get { return (ICustomizableControl)this.CardControl; } }

		private ObjectContext ObjCtxt { get { return this.CardControl.ObjectContext; } }

		#endregion
		#region Methods
		/// <summary>
		/// Установка количества дней командировки
		/// </summary>
		private void SetCountDayBussinesTrip()
		{
			if (DateBusinessTripWith != DateTime.MinValue && DateBusinessTripTo != DateTime.MinValue)
				CountDayBusinessTrip = DateBusinessTripTo.Subtract(DateBusinessTripWith).Days + 1;
		}
		/// <summary>
		/// Рекурсивное получение руководителя
		/// </summary>
		/// <param name="tek_manager"> текущий руководитель сотрудника </param>
		/// <param name="tek_employee"> guid сотрудника </param>
		/// <returns> 
		/// 	возвращается первый найденый руководитель
		/// 	чей guid отличается от guid-а сотрудника
		/// 	если нет вышестоящего подразделения возвращается текущий сотрудник 
		/// </returns>
		private StaffEmployee Get_Director(StaffEmployee tek_manager, Guid tek_employee)
		{
			if (tek_manager.GetObjectId() == tek_employee && tek_manager.Unit.ParentUnit != null)
				return Get_Director(tek_manager.Unit.ParentUnit.Manager, tek_employee);
			return tek_manager;
		}
		/// <summary>
		/// Присвоение суммы командировачных
		/// </summary>
		private void SetMoneyBusinessTrip()
		{
			IPropertyControl MoneyBusinessTripControl = MainControl.FindPropertyItem<IPropertyControl>("MoneyBusinessTrip");

			if (MoneyBusinessTripControl != null && CountDayBusinessTrip != 0 && Decimal.Compare(_MoneyValueCity, 0.0m) > 0)
			{
				MoneyBusinessTripControl.ControlValue = _MoneyValueCity * CountDayBusinessTrip;
			}
			else if (MoneyBusinessTripControl != null)
			{
				MoneyBusinessTripControl.ControlValue = null;
			}
		}
		/// <summary>
		/// Дективация кнопки (На согласование), если статуск карточки != Проект
		/// </summary>
		private void DeactivatedButtonOnApproval()
		{
			BarItem ButtonOnApproval = MainControl.RibbonControl.Items["OnApproval"];

			if (ButtonOnApproval != null)
			{
				if (this.BaseObject.SystemInfo.State.DefaultName != "Project") { ButtonOnApproval.Visibility = BarItemVisibility.Never; }
				else { ButtonOnApproval.Visibility = BarItemVisibility.Always; }
			}
		}
		#endregion
		#region Event Handlers
		/// <summary>
		/// При изминении (даты командировки c) записать дату в _DateBusinessTripWith и выполнить расчет если (дата по) заполнена
		/// </summary>
		private void DateBusinesTripWith_EditValueChanged(System.Object sender, System.EventArgs e)
		{
			SetCountDayBussinesTrip();

			PriceTickets = 0.0m;
		}
		/// <summary>
		/// При изминении (даты командировки по) записать дату в _DateBusinessTripTo и выполнить расчет если (дата с) заполнена
		/// </summary>
		private void DateBusinesTripTo_EditValueChanged(System.Object sender, System.EventArgs e)
		{
			SetCountDayBussinesTrip();

			PriceTickets = 0.0m;
		}
		/// <summary>
		/// Кнопка при нажатии отображает основную инфориацию
		/// </summary>
		private void ShortInfo_ItemClick(System.Object sender, DevExpress.XtraBars.ItemClickEventArgs e)
		{
			NumeratorBox NumberProp = MainControl.FindPropertyItem<NumeratorBox>("Number");
			IPropertyControl DateCProp = MainControl.FindPropertyItem<IPropertyControl>("DateCreated");
			IPropertyControl BaseBTProp = MainControl.FindPropertyItem<IPropertyControl>("BaseForBusinessTrip");

			string s = "";
			if (NumberProp != null) s += "Номер заявки: " + NumberProp.Text + "\n";
			if (DateCProp != null && DateCProp.ControlValue != null) s += "Дата созания: " + ((DateTime)DateCProp.ControlValue).ToString("d") + "\n";
			if (DateBusinessTripWith != DateTime.MinValue) s += "Даты командировки C: " + (DateBusinessTripWith).ToString("d");
			if (DateBusinessTripTo != DateTime.MinValue) s += " по: " + (DateBusinessTripTo).ToString("d") + "\n";
			if (BaseBTProp != null) s += "Основание для поездки: " + BaseBTProp.ControlValue + "\n";

			if (s != "") { MessageBox.Show(s); }
			else MessageBox.Show("Ошибка при получения данных!");
		}
		/// <summary>
		/// При изменении статуса отображение сообщения и окраска поля в желтый
		/// </summary>
		private void Заявка_на_командировку_StateChanged(System.Object sender, System.EventArgs e)
		{
			ICustomPropertyItem StatusPropItem = MainControl.FindPropertyItem<ICustomPropertyItem>("Status");

			MessageBox.Show("Состояние изменено");

			if (StatusPropItem != null)
			{
				_ColorStatus = StatusPropItem.Control.BackColor;
				StatusPropItem.Control.BackColor = System.Drawing.Color.Yellow;
			}
			DeactivatedButtonOnApproval();
		}
		/// <summary>
		/// Присвоение полю "Кто оформляет" сотрудников из групы Секретари 
		/// </summary>
		private void Заявка_на_командировку_CardActivated(System.Object sender, DocsVision.Platform.WinForms.CardActivatedEventArgs e)
		{
			if (e.ActivateFlags == DocsVision.Platform.CardHost.ActivateFlags.New)
			{
				StaffGroup SekretariGroup = ObjCtxt.FindObject<StaffGroup>(new QueryObject(BaseUniversalItem.NameProperty.Name, "Секретарь"));
				if (SekretariGroup != null)
				{
					IPropertyControl WhoRegistrControl = MainControl.FindPropertyItem<IPropertyControl>("WhoRegistrating");
					if (WhoRegistrControl != null) { WhoRegistrControl.ControlValue = SekretariGroup.EmployeesIds.ToArray<Guid>(); }
				}
			}
			DeactivatedButtonOnApproval();
		}
		/// <summary>
		/// Возвращение полю Статус обычнsq цвет при закрытии карточки 
		/// </summary>
		private void Заявка_на_командировку_CardClosed(System.Object sender, System.EventArgs e)
		{
			if (_ColorStatus != null)
			{
				ICustomPropertyItem StatusProp = MainControl.FindPropertyItem<ICustomPropertyItem>("Status");
				if (StatusProp != null) { StatusProp.Control.BackColor = (System.Drawing.Color)_ColorStatus; }
				_ColorStatus = null;
			}
		}
		/// <summary>
		/// Проверка перед сохранением на заполнение поля Название
		/// </summary>
		private void Заявка_на_командировку_Saving(System.Object sender, System.ComponentModel.CancelEventArgs e)
		{
			IPropertyControl NameProp = MainControl.FindPropertyItem<IPropertyControl>("Name");

			if (NameProp != null && NameProp.ControlValue == null)
			{
				MessageBox.Show("Для сохранения должно быть заполнено поле Название");
				e.Cancel = true;
			}
		}
		/// <summary>
		/// Заполнение полей руководитель и телефон, при выборе командируемого
		/// </summary>
		private void PersonBusinessTrip_EmployeeChanged(System.Object sender, System.EventArgs e)
		{
			CommunicativeChooseBox PersonBusinessTripCtrl = MainControl.FindPropertyItem<CommunicativeChooseBox>("PersonBusinessTrip");
			IPropertyControl DirectorControl = MainControl.FindPropertyItem<IPropertyControl>("Director");
			IPropertyControl TelephoneControl = MainControl.FindPropertyItem<IPropertyControl>("Telephone");

			if (PersonBusinessTripCtrl != null && PersonBusinessTripCtrl.Value != Guid.Empty && DirectorControl != null && TelephoneControl != null)
			{
				StaffEmployee ManagerEmp = ObjCtxt.GetObject<StaffEmployee>(PersonBusinessTripCtrl.Value);

				if (ManagerEmp.Manager == null) ManagerEmp = ManagerEmp.Unit.Manager;
				ManagerEmp = Get_Director(ManagerEmp, PersonBusinessTripCtrl.Value);

				DirectorControl.ControlValue = ManagerEmp.GetObjectId();
				TelephoneControl.ControlValue = ManagerEmp.Phone;
			}
		}
		/// <summary>
		/// Расчет суммы командировачных или присваивание переменой _MoneyValueCity(значение из справочника городов)
		/// при выборе города
		/// </summary>
		private void CityBussinesTrip_EditValueChanged(System.Object sender, System.EventArgs e)
		{
			UniversalItemChooseBox CountDayBT = MainControl.FindPropertyItem<UniversalItemChooseBox>("CityBussinesTrip");

			if (CountDayBT.Value != Guid.Empty)
			{
				BaseUniversalItem CardCityItem = ObjCtxt.GetObject<BaseUniversalItem>(CountDayBT.Value);
				var DailyAllowance = CardCityItem.ItemCard.GetSection(new Guid("{D18195A3-BED9-41F6-AC48-58C69E6D6F5E}"));
				if (DailyAllowance.Count == 1)
					_MoneyValueCity = Convert.ToDecimal(((BaseCardSectionRow)DailyAllowance[0])["DailyAllowance"].ToString().Replace('.', ','));
			}
			else { _MoneyValueCity = 0.0m; }

			SetMoneyBusinessTrip();

			PriceTickets = 0.0m;
		}
		/// <summary>
		/// Расчет суммы комндировачных при смене города 
		/// </summary>
		private void CountDaysBusinessTrip_EditValueChanged(System.Object sender, System.EventArgs e)
		{
			SetMoneyBusinessTrip();
		}
		/// <summary>
		/// Обработка кнопки для перехода в состоянии на согласовании 
		/// </summary>
		private void OnApproval_ItemClick(System.Object sender, DevExpress.XtraBars.ItemClickEventArgs e)
		{
			BaseCardSystemInfo sysInfo = this.BaseObject.SystemInfo;

			IList<StatesStateMachineBranch> stateMachineBranches = ObjCtxt.GetService<IStateService>().GetStateMachineBranches(sysInfo.CardKind);

			StatesStateMachineBranch branch = stateMachineBranches.Where(b => b.StartState == sysInfo.State
				&& b.BranchType == StatesStateMachineBranchBranchType.Line
				&& b.EndState.DefaultName.Equals("OnApproval")).FirstOrDefault();

			if (branch != null)
				this.CardControl.ChangeState(branch);
			else
				MessageBox.Show("Ошибка при изменении состояния!");

			DeactivatedButtonOnApproval();
		}
		/// <summary>
		/// событе нажатия на кнопку GetPriceTikets
		/// если поле билеты не заполнено считается, что выбрано Авиа
		/// Внешний метод GetTikets в APITikets.dll (git:https://github.com/rikusov/APITikets)
		/// </summary>
		private void GetPriceTikets_ItemClick(System.Object sender, DevExpress.XtraBars.ItemClickEventArgs e)
		{
			IPropertyControl TiketsControl = MainControl.FindPropertyItem<IPropertyControl>("Tikets");

			if (TiketsControl != null && Convert.ToInt32(TiketsControl.ControlValue) == 1)
			{
				MessageBox.Show("Функция запроса стоимости билетов реализована только для Авиаперелетов!");
				return;
			}

			UniversalItemChooseBox CityBT = MainControl.FindPropertyItem<UniversalItemChooseBox>("CityBussinesTrip");

			if (DateBusinessTripTo != DateTime.MinValue && DateBusinessTripWith != DateTime.MinValue && CityBT != null && CityBT.Value != Guid.Empty)
			{
				BaseUniversalItem CardCityItem = ObjCtxt.GetObject<BaseUniversalItem>(CityBT.Value);

				var AirPortsKod = CardCityItem.ItemCard.GetSection(new Guid("{D18195A3-BED9-41F6-AC48-58C69E6D6F5E}"));
				if (AirPortsKod.Count == 1)
				{
					var ValueKodAirport = ((BaseCardSectionRow)AirPortsKod[0])["KodAirport"];

					if (ValueKodAirport == null)
					{
						MessageBox.Show("Код аэропорта отсутсвует в справочнике!");
						return;
					}
					ExtensionMethod method = this.Session.ExtensionManager.GetExtensionMethod("APITikets", "GetTikets");
					method.Parameters.AddNew("KodCityDistant", ParameterValueType.String, ValueKodAirport.ToString());
					method.Parameters.AddNew("DateDeparture", ParameterValueType.DateTime, DateBusinessTripWith);
					method.Parameters.AddNew("DateArrival", ParameterValueType.DateTime, DateBusinessTripTo);

					decimal a = Convert.ToDecimal(method.Execute().ToString().Replace('.', ','));

					if (Decimal.Compare(a, -4.0m) == 0) { MessageBox.Show("При попытке получения цены произошла ошибка!"); }
					else if (Decimal.Compare(a, -3.0m) == 0) { MessageBox.Show("Не найдены билеты вылета и прилета в указаные даты!"); }
					else if (Decimal.Compare(a, -2.0m) == 0) { MessageBox.Show("Не найдены билеты прилета в указаную дату!"); }
					else if (Decimal.Compare(a, -1.0m) == 0) { MessageBox.Show("Не найдены билеты вылета в указаную дату!"); }
					else { PriceTickets = a; }
				}
			}
			else { MessageBox.Show("Для выполнения функции поиска билетов необходимо заполнить:\nДата командировки с,по, и Город."); }
		}
		/// <summary>
		/// При изменении вида билетов(в случае если выбран поезд убирать стоимость)
		/// </summary>
		private void Tikets_EditValueChanged(System.Object sender, System.EventArgs e)
		{
			IPropertyControl TiketsControl = MainControl.FindPropertyItem<IPropertyControl>("Tikets");
			if (TiketsControl != null && Convert.ToInt32(TiketsControl.ControlValue) == 1) PriceTickets = 0.0m;
		}
		#endregion
	}
}