"use strict";
// back\src\services\credentialsService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentialsService = exports.createCredentialService = void 0;
const AppDataSource_1 = require("../config/AppDataSource ");
const createCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = {
        username: username,
        password: password,
    };
    const createCredential = AppDataSource_1.CredentialModel.create(newCredential);
    const saveCredential = yield AppDataSource_1.CredentialModel.save(createCredential);
    return saveCredential.id;
});
exports.createCredentialService = createCredentialService;
const validateCredentialsService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCredential = yield AppDataSource_1.CredentialModel.findOneBy({ username });
    if (!foundCredential) {
        return null;
    }
    if (foundCredential.password === password) {
        return Number(foundCredential.id);
    }
    else {
        return null;
    }
});
exports.validateCredentialsService = validateCredentialsService;
