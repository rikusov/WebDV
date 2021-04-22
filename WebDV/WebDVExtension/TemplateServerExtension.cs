using DocsVision.BackOffice.WebClient.Services;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingConverters;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingResolvers;
using DocsVision.WebClientLibrary.ObjectModel.Services.LayoutModel;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using WebDVExtension.Contrrollers;
using WebDVExtension.Services;

namespace WebDVExtension{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class WebDVExtension : WebClientExtension{
        /// <summary>
        /// Создаёт новый экземпляр <see cref="WebDVExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public WebDVExtension(IServiceProvider serviceProvider): base(serviceProvider){}
        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName{
            get { return Assembly.GetAssembly(typeof(WebDVExtension)).GetName().Name; }
        }
        /// <summary>
        /// Получить пространство имён расширения
        /// </summary>
        public override string Namespace { get { return Constants.Namespace; } }
        /// <summary>
        /// Получить версию расширения
        /// </summary>
        public override Version ExtensionVersion{
            get { return new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion); }
        }
        #region WebClientExtension Overrides
        /// <summary>
        /// Gets registered service activators
        /// </summary>
        /// <param name="serviceProvider">service provider</param>
        /// <returns>service type/activator mappings</returns>
        protected override Dictionary<Type, Func<object>> GetServiceActivators(IServiceProvider serviceProvider){
            Dictionary<Type, Func<object>> baseServiceActivator = base.GetServiceActivators(serviceProvider);
            baseServiceActivator.Add(typeof(IGetDirectorService), () => new GetDirectorService());
            baseServiceActivator.Add(typeof(IGetEmployeesSecretary), () => new GetEmployeesSecretary());

            return baseServiceActivator;
        }
        /// <summary>
        /// Gets registered MVC controller activators
        /// </summary>
        /// <param name="serviceProvider">service provider</param>
        /// <returns>MVC controller type/activator mappings</returns>
        protected override Dictionary<Type, Func<IController>> GetControllerActivators(IServiceProvider serviceProvider){
            Dictionary<Type, Func<IController>> baseControllers = base.GetControllerActivators(serviceProvider);
            baseControllers.Add(typeof(DVController), () => new DVController(serviceProvider));

            return baseControllers;
        }
        /// <summary>
        /// Gets registered WebApi controller activators
        /// </summary>
        /// <param name="serviceProvider">service provider</param>
        /// <returns>WebApi controller type/activator mappings</returns>
        protected override Dictionary<Type, Func<IHttpController>> GetApiControllerActivators(IServiceProvider serviceProvider){
            return new Dictionary<Type, Func<IHttpController>>{};
        }
        /// <summary>
        /// Gets resource managers for layout extension
        /// </summary>
        /// <returns></returns>
        protected override List<ResourceManager> GetLayoutExtensionResourceManagers(){ return new List<ResourceManager>{}; }
        /// <summary>
        /// Gets binding converters
        /// </summary>
        /// <returns>a list of binding converters</returns>
        protected override List<IBindingConverter> GetBindingConverters(){ return new List<IBindingConverter>{}; }
        /// <summary>
        /// Gets binding resolvers
        /// </summary>
        /// <returns>a list of binding resolvers</returns>
        protected override List<IBindingResolver> GetBindingResolvers(){ return new List<IBindingResolver>{}; }
        /// <summary>
        /// Gets control resolvers
        /// </summary>
        /// <returns>a list of control resolvers</returns>
        protected override List<IControlResolver> GetControlResolvers(){ return new List<IControlResolver>{}; }
        /// <summary>
        /// Gets property resolvers
        /// </summary>
        /// <returns>a list of property resolvers</returns>
        protected override List<IPropertyResolver> GetPropertyResolvers(){ return new List<IPropertyResolver>{}; }
        /// <summary>
        /// Gets card factories
        /// </summary>
        /// <returns>a dictionaty of card factories</returns>
        protected override Dictionary<Guid, Func<ICardFactory>> GetCardFactories(){ return new Dictionary<Guid, Func<ICardFactory>>{}; }
        /// <summary>
        /// Возвращает имя и версию серверного расширения
        /// </summary>
        protected override WebClientNavigatorExtension GetNavigatorExtension(){
            return new WebClientNavigatorExtension( new WebClientNavigatorExtensionInitInfo { ExtensionName = ExtensionName, ExtensionVersion = ExtensionVersion});
        }
        #endregion
    }
}