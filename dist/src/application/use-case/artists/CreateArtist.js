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
exports.CreateArtist = void 0;
const joi_1 = __importDefault(require("joi"));
const response_1 = require("../../../shared/utils/response");
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateArtist {
    constructor(artistsRepository) {
        this.artistsRepository = artistsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            try {
                const schemaValidate = joi_1.default.object({
                    name: joi_1.default.string().required(),
                    email: joi_1.default.string().email().required(),
                    password: joi_1.default.string().required()
                });
                const { error } = schemaValidate.validate({ name, email, password });
                if (error) {
                    return response_1.normalizationResponse.notFound('Artist settings');
                }
                // if (!name || !email || !password) {
                //     return normalizationResponse.notFound('Artist settings')
                // }
                const artistEmail = yield this.artistsRepository
                    .findByEmail({ email });
                if (artistEmail) {
                    return response_1.normalizationResponse.conflict('Email already exists');
                }
                const passwordEncrypted = yield bcrypt_1.default.hash(password, 10);
                const createArtist = yield this.artistsRepository.create({
                    data: {
                        name,
                        email,
                        password: passwordEncrypted
                    }
                });
                return response_1.normalizationResponse.ok({ artist: createArtist });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.CreateArtist = CreateArtist;
