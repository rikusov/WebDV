import * as DVEventHandler from "./EventHandlers/DVEventHandler";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.
// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "DVEventHandler",
    version: "1.0.0",
    globalEventHandlers: [DVEventHandler]
});
//# sourceMappingURL=Index.js.map