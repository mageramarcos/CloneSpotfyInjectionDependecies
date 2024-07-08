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
exports.GetUniqueArtist = void 0;
const joi_1 = __importDefault(require("joi"));
const response_1 = require("../../../shared/utils/response");
class GetUniqueArtist {
    constructor(artistsRepository) {
        this.artistsRepository = artistsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const schemaValidate = joi_1.default.object({
                    id: joi_1.default.string().required()
                });
                const { error } = schemaValidate.validate({ id });
                if (error) {
                    return response_1.normalizationResponse.notFound('Artist');
                }
                // if (!id) {
                //     return normalizationResponse.notFound('Artist')
                // }
                const getUniqueArtist = yield this.artistsRepository.findUnique({ id });
                if (!getUniqueArtist) {
                    return response_1.normalizationResponse.notFound('Artist');
                }
                return response_1.normalizationResponse.ok({ artist: getUniqueArtist });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.GetUniqueArtist = GetUniqueArtist;
