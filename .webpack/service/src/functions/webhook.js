module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/functions/webhook.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/ApiTelegramMessage.ts":
/*!***************************************!*\
  !*** ./src/api/ApiTelegramMessage.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
class ApiTelegramMessage {
    async sendToUser(chat_id, text) {
        const baseURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        const result = await axios_1.default.get(baseURL, {
            params: {
                chat_id,
                text
            }
        });
        return result.data;
    }
}
exports.default = ApiTelegramMessage;


/***/ }),

/***/ "./src/controllers/messageHandler.ts":
/*!*******************************************!*\
  !*** ./src/controllers/messageHandler.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandlerController = void 0;
class MessageHandlerController {
    constructor(ApiTelegramMessage, TaskRepository) {
        this.ApiTelegramMessage = ApiTelegramMessage;
        this.TaskRepository = TaskRepository;
    }
    async handler(message) {
        if (message.edited_message != null) {
            const { chat } = message.edited_message;
            await this.ApiTelegramMessage.sendToUser(chat.id, 'voce editou uma mensagem');
        }
        else if (message.message != null) {
            const { chat, text } = message.message;
            const command = message.message.text.split(' ');
            const [action] = command;
            if (action === 'task') {
                const task = command.slice(1).join(' ');
                const savedTask = await this.TaskRepository.create(String(chat.id), task.toString());
                await this.ApiTelegramMessage.sendToUser(chat.id, JSON.stringify(savedTask));
            }
            else if (action === 'list') {
                const tarefas = await this.TaskRepository.findAll();
                await this.ApiTelegramMessage.sendToUser(chat.id, tarefas);
            }
            else {
                await this.ApiTelegramMessage.sendToUser(chat.id, `você enviou a mensagem ${text}`);
            }
        }
    }
}
exports.MessageHandlerController = MessageHandlerController;


/***/ }),

/***/ "./src/factory/index.ts":
/*!******************************!*\
  !*** ./src/factory/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./messageHandleFactory */ "./src/factory/messageHandleFactory.ts"), exports);


/***/ }),

/***/ "./src/factory/messageHandleFactory.ts":
/*!*********************************************!*\
  !*** ./src/factory/messageHandleFactory.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandlerFactory = void 0;
const ApiTelegramMessage_1 = __importDefault(__webpack_require__(/*! ../api/ApiTelegramMessage */ "./src/api/ApiTelegramMessage.ts"));
const messageHandler_1 = __webpack_require__(/*! ../controllers/messageHandler */ "./src/controllers/messageHandler.ts");
const TaskRepository_1 = __importDefault(__webpack_require__(/*! ../repository/TaskRepository */ "./src/repository/TaskRepository.ts"));
const messageHandlerFactory = () => {
    const taskRepository = new TaskRepository_1.default();
    const apiTelegramMessage = new ApiTelegramMessage_1.default();
    return new messageHandler_1.MessageHandlerController(apiTelegramMessage, taskRepository);
};
exports.messageHandlerFactory = messageHandlerFactory;


/***/ }),

/***/ "./src/functions/webhook.ts":
/*!**********************************!*\
  !*** ./src/functions/webhook.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
__webpack_require__(/*! source-map-support/register */ "source-map-support/register");
const factory_1 = __webpack_require__(/*! ../factory */ "./src/factory/index.ts");
const httpResponse_1 = __webpack_require__(/*! ../helpers/httpResponse */ "./src/helpers/httpResponse.ts");
const messageHandle = factory_1.messageHandlerFactory();
const handler = async (event) => {
    try {
        console.log('event', event);
        if (!event.body) {
            return httpResponse_1.badRequest('body not found');
        }
        const body = JSON.parse(event.body);
        await messageHandle.handler(body);
        return httpResponse_1.sucess('');
    }
    catch (error) {
        console.error('webhook', error);
        return httpResponse_1.serverError(error);
    }
};
exports.handler = handler;


/***/ }),

/***/ "./src/helpers/httpResponse.ts":
/*!*************************************!*\
  !*** ./src/helpers/httpResponse.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = exports.serverError = exports.sucess = void 0;
const sucess = (message) => {
    return {
        body: JSON.stringify(message),
        statusCode: 200
    };
};
exports.sucess = sucess;
const serverError = (message) => {
    return {
        body: JSON.stringify(message),
        statusCode: 500
    };
};
exports.serverError = serverError;
const badRequest = (message) => {
    return {
        body: JSON.stringify(message),
        statusCode: 400
    };
};
exports.badRequest = badRequest;


/***/ }),

/***/ "./src/model/Tarefas.ts":
/*!******************************!*\
  !*** ./src/model/Tarefas.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose = __importStar(__webpack_require__(/*! dynamoose */ "dynamoose"));
const schema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true
    },
    task: String,
    chat_id: String,
    timestamp: {
        type: Number,
        default: Date.now()
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    saveUnknown: true,
    timestamps: true
});
const Tarefas = dynamoose.model(process.env.DYNAMODB_TABLE, schema, { create: false });
exports.default = Tarefas;


/***/ }),

/***/ "./src/repository/TaskRepository.ts":
/*!******************************************!*\
  !*** ./src/repository/TaskRepository.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const Tarefas_1 = __importDefault(__webpack_require__(/*! ../model/Tarefas */ "./src/model/Tarefas.ts"));
class TaskRepository {
    async create(chatId, task) {
        const id = uuid_1.v4();
        const tarefa = Tarefas_1.default.create({ id, chat_id: chatId, task });
        return await tarefa;
    }
    async findAll() {
        const tarefas = await Tarefas_1.default.scan().exec();
        return tarefas.map(item => `tarefa: ${item.task}`).join('\r\n');
    }
}
exports.default = TaskRepository;


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "dynamoose":
/*!****************************!*\
  !*** external "dynamoose" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dynamoose");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=webhook.js.map