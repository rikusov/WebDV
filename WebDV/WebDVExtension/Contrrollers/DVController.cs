using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.BackOffice.WebClient.Helpers;
//using DocsVision.BackOffice.WebClient.State;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectModel.Search;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
        /// <returns> EmployeeModel руководителя</returns>
        public ActionResult GetDirector(Guid employeeId) {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            DirectorDataModel director = (new GetDirectorService()).GetDirector(_serviceHelper, context, employeeId);

            CommonResponse<DirectorDataModel> response = new CommonResponse<DirectorDataModel>();

            response.InitializeSuccess(director);

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(response), "application/json");

        }

        public ActionResult GetSecretary() {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            EmployeeModel[] sekretary = (new GetEmployeesSecretary()).GetSecretary(_serviceHelper, context);

            CommonResponse<EmployeeModel[]> response = new CommonResponse<EmployeeModel[]>();

            response.InitializeSuccess(sekretary);

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(response), "application/json");

        }

        public ActionResult GetPriceTickets(Guid cityId, DateTime dateBusinessTripWith, DateTime dateBusinessTripTo) {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            if (cityId == Guid.Empty) return null;

            BaseUniversalItem CardCityItem = context.ObjectContext.GetObject<BaseUniversalItem>(cityId);

            var AirPortsKod = CardCityItem.ItemCard.GetSection(new Guid("{D18195A3-BED9-41F6-AC48-58C69E6D6F5E}"));

            if (AirPortsKod.Count != 1) return null;

            var ValueKodAirport = ((BaseCardSectionRow)AirPortsKod[0])["KodAirport"];

            if (ValueKodAirport == null) return null;

            ExtensionMethod method = context.Session.ExtensionManager.GetExtensionMethod("APITikets", "GetTikets");
            method.Parameters.AddNew("KodCityDistant", ParameterValueType.String, ValueKodAirport);
            method.Parameters.AddNew("DateDeparture", ParameterValueType.DateTime, dateBusinessTripWith);
            method.Parameters.AddNew("DateArrival", ParameterValueType.DateTime, dateBusinessTripTo);

            decimal price = Convert.ToDecimal(method.Execute().ToString().Replace('.', ','));

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(price), "application/json");
        }

        public ActionResult GetMoneyBussinesTrip(Guid cityId)
        {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            if (cityId == Guid.Empty) return null;

            BaseUniversalItem CardCityItem = context.ObjectContext.GetObject<BaseUniversalItem>(cityId);

            var ListCity = CardCityItem.ItemCard.GetSection(new Guid("{D18195A3-BED9-41F6-AC48-58C69E6D6F5E}"));

            if (ListCity.Count != 1) return null;

            var MoneyBT = ((BaseCardSectionRow)ListCity[0])["DailyAllowance"];

            if (MoneyBT == null) return null;

            decimal price = Convert.ToDecimal(MoneyBT.ToString().Replace('.', ','));

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(price), "application/json");
        }

        public ActionResult GetIdOnApproval(Guid statcardId){
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            StatesState statecard = context.ObjectContext.GetObject<StatesState>(statcardId);

            IStateService stateService = context.ObjectContext.GetService<IStateService>();


            IEnumerable<StatesStateMachineBranch> branch = stateService.FindLineBranchesByStartState(statecard);

            Guid idop = Guid.Empty;

            if (branch.Count() == 1) 
                idop = branch.ToArray<StatesStateMachineBranch>()[0].Operation.GetObjectId();

            return Content(DocsVision.Platform.WebClient.Helpers.JsonHelper.SerializeToJson(idop), "application / json");

        }

           
    }
}