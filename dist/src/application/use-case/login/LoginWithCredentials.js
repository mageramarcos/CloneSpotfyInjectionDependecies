"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginWithCredentials = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = require("../../../shared/utils/response");
const jwt_1 = require("../../../shared/utils/jwt");
class LoginWithCredentials {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            try {
                const user = yield this.usersRepository
                    .findByEmail({ email });
                if (user !== null) {
                    const passwordMatch = yield bcrypt_1.default
                        .compare(password, user.password);
                    if (passwordMatch) {
                        const tokens = (0, jwt_1.generateAppTokens)({
                            user_id: user.id
                        });
                        return response_1.normalizationResponse.ok(tokens);
                    }
                }
                return response_1.normalizationResponse.unauthorized();
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.LoginWithCredentials = LoginWithCredentials;