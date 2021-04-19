using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebDVExtension.Models;

namespace WebDVExtension.Contrrollers {
    /// <summary>
    /// Тестовый контроллер 
    /// </summary>
    public class TestController: Controller {
        private readonly IServiceProvider _serviceProvider;
        private readonly Helpers.ServiceHelper _serviceHelper;
        /// <summary>
        /// конструктор <see cref="TestController"/>
        /// </summary>
        /// <param name="serviceProvider"></param>
        public TestController(IServiceProvider serviceProvider) {
            _serviceProvider = serviceProvider;
            _serviceHelper = new Helpers.ServiceHelper(serviceProvider);
        }
        /// <summary>
        /// тестовый метод
        /// </summary>
        /// <returns></returns>
        public ActionResult TestMethod() {
            return Content(JsonHelper.SerializeToJson("Hello world!"),"application/json");
        }
        /// <summary>
        /// Получения данных сотрудника
        /// </summary>
        /// <param name="employeeUd"> id сотрудника</param>
        /// <returns></returns>
        public ActionResult GetEmployeeData(Guid employeeId) {
            SessionContext context = _serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            CustomEmployeeData model = _serviceHelper.CustomEmployeeService.GetEmployeeData(context, employeeId);

            CommonResponse<CustomEmployeeData> response = new CommonResponse<CustomEmployeeData>();

            response.InitializeSuccess(model);

            return Content(JsonHelper.SerializeToJson(response), "application/json");


            //context.ObjectContext

        }

    }
}