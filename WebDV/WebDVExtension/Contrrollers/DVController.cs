using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models.Generic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using WebDVExtension.Models;
using WebDVExtension.Services;

namespace WebDVExtension.Contrrollers {
    /// <summary>
    /// Контроллер для серверного расширения
    /// </summary>
    public class DVController : Controller{
        private readonly IServiceProvider _serviceProvider;
        private readonly ServiceHelper _serviceHelper;
        /// <summary>
        /// Конструктор для DVController
        /// </summary>
        public DVController(IServiceProvider serviceProvider) {
            _serviceProvider = serviceProvider;
            _serviceHelper = new ServiceHelper(serviceProvider);
        }
        /// <summary>
        /// получение модели руководителя
        /// </summary>
        /// <param name="employeeId">Id сотрудника</param>
        /// <returns> Модель руководителя <see cref="DirectorDataModel"/></returns>
        public ActionResult GetDirector(Guid employeeId) {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            DirectorDataModel director = new GetDirectorService().GetDirector(_serviceHelper, context, employeeId);

            CommonResponse<DirectorDataModel> response = new CommonResponse<DirectorDataModel>();
            response.InitializeSuccess(director);

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(response), "application/json");
        }
        /// <summary>
        /// Сервис запроса секретарей
        /// </summary>
        /// <returns>Масив сотрудников из группы секретарей</returns>
        public ActionResult GetSecretary() {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            EmployeeModel[] sekretary = new GetEmployeesSecretary().GetSecretary(_serviceHelper, context);

            CommonResponse<EmployeeModel[]> response = new CommonResponse<EmployeeModel[]>();
            response.InitializeSuccess(sekretary);

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(response), "application/json");
        }
        /// <summary>
        /// Сервис получения цены билета
        /// </summary>
        /// <param name="cityId">Id выбраного города</param>
        /// <param name="dateBusinessTripWith">Дата вылета</param>
        /// <param name="dateBusinessTripTo">Дата прилета</param>
        /// <returns>decimal (Сумма ценн билетов)
        /// в случае ошибки во внешнем методе:
        /// -4.0m произошла ошибка в сервисе запроса билетов
        /// -3.0m не найдены билеты в даты вылета и прилета
        /// -2.0m не найдены билеты в дату прилета
        /// -3.0m не найдены билеты в дату вылета
        /// </returns>
        public ActionResult GetPriceTickets(Guid cityId, DateTime dateBusinessTripWith, DateTime dateBusinessTripTo) {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            decimal price = 0.0m;

            if (cityId != Guid.Empty) {
                BaseUniversalItem CardCityItem = context.ObjectContext.GetObject<BaseUniversalItem>(cityId);
                
                var AirPortsKod = CardCityItem.ItemCard.GetSection(new Guid("{D18195A3-BED9-41F6-AC48-58C69E6D6F5E}"));

                if (AirPortsKod.Count == 1) {
                    var ValueKodAirport = ((BaseCardSectionRow)AirPortsKod[0])["KodAirport"];
                    if (ValueKodAirport != null) {
                        ExtensionMethod method = context.Session.ExtensionManager.GetExtensionMethod("APITikets", "GetTikets");
                        method.Parameters.AddNew("KodCityDistant", ParameterValueType.String, ValueKodAirport);
                        method.Parameters.AddNew("DateDeparture", ParameterValueType.DateTime, dateBusinessTripWith);
                        method.Parameters.AddNew("DateArrival", ParameterValueType.DateTime, dateBusinessTripTo);

                        price = Convert.ToDecimal(method.Execute().ToString().Replace('.', ','));
                    }
                }
            }

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(price), "application/json");
        }
        /// <summary>
        /// Запрос суммы командировачных
        /// </summary>
        /// <param name="cityId">Id города</param>
        /// <returns>decimal (Сумма командировачных из справочника)</returns>
        public ActionResult GetMoneyBussinesTrip(Guid cityId)
        {
            decimal price = 0.0m;

            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            if (cityId != Guid.Empty) {
                BaseUniversalItem CardCityItem = context.ObjectContext.GetObject<BaseUniversalItem>(cityId);
                var ListCity = CardCityItem.ItemCard.GetSection(new Guid("{D18195A3-BED9-41F6-AC48-58C69E6D6F5E}"));
                if (ListCity.Count == 1) {
                    var MoneyBT = ((BaseCardSectionRow)ListCity[0])["DailyAllowance"];
                    if (MoneyBT != null)
                        price = Convert.ToDecimal(MoneyBT.ToString().Replace('.', ','));
                }
            }

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(price), "application/json");
        }
        /// <summary>
        /// Запрос Id операции перевода карточки в указаное состояние
        /// </summary>
        /// <param name="kindCardId">id вида карточки</param>
        /// <param name="statCardId"> текущее состояние </param>
        /// <param name="endStateName"> целевое состояние </param>
        /// <returns>id операции перехода в целевое состояние или Guid.Empty</returns>
        public ActionResult GetOperationsIdState(Guid kindCardId, Guid statCardId , string endStateName){
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            KindsCardKind kindCard = context.ObjectContext.GetObject<KindsCardKind>(kindCardId);

            IList<StatesStateMachineBranch> branches = context.ObjectContext.GetService<IStateService>().GetStateMachineBranches(kindCard);

            StatesStateMachineBranch branch = branches.Where(b => b.StartState.GetObjectId().Equals(statCardId)
                && b.BranchType == StatesStateMachineBranchBranchType.Line
                && b.EndState.DefaultName.Equals(endStateName)).FirstOrDefault();

            Guid operationId = Guid.Empty;

            if (branch != null) 
                operationId = branch.Operation.GetObjectId();

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(operationId), "application / json");
        }
    }
}