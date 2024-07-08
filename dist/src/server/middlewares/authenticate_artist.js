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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const response_1 = require("../../shared/utils/response");
const jwt_1 = require("../../shared/utils/jwt");
const DrizzleArtistsRepository_1 = require("src/application/repository/implementations/DrizzleArtistsRepository");
const authenticate = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer = req.headers.authorization || '';
    const token = bearer.split(' ')[1];
    try {
        if (token) {
            const decoded = (0, jwt_1.verifyToken)(token);
            let hasUser = false;
            const usersRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
            hasUser = (yield usersRepository.findUnique({
                id: decoded.user_id
            })) !== null;
            if (!hasUser) {
                return Promise.reject(reply.status(401).send(response_1.normalizationResponse.unauthorized()));
            }
            if (typeof req.body === 'object' && req.body !== null) {
                req.body = Object.assign(Object.assign({}, req.body), { artistId: decoded.user_id });
            }
            else {
                req.body = { artistId: decoded.user_id };
            }
            return Promise.resolve();
        }
    }
    catch (e) {
        if (e.name !== 'TokenExpiredError' && e.name !== 'JsonWebTokenError') {
            console.log(e);
        }
    }
    return Promise.reject(reply.status(401).send(response_1.normalizationResponse.unauthorized()));
});
exports.authenticate = authenticate;
