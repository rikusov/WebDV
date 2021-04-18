using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebDVExtension.Contrrollers {
    /// <summary>
    /// Тестовый контроллер 
    /// </summary>
    public class TestController: Controller {
        private readonly IServiceProvider _serviceProvider;
        /// <summary>
        /// конструктор <see cref="TestController"/>
        /// </summary>
        /// <param name="serviceProvider"></param>
        public TestController(IServiceProvider serviceProvider) {
            _serviceProvider = serviceProvider;
        }
        /// <summary>
        /// тестовый метод
        /// </summary>
        /// <returns></returns>
        public ActionResult TestMethod() {
            return Content("Hello world!");
        }

    }
}