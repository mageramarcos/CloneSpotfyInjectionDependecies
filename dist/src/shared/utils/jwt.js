"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAppTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const generateAppTokens = ({ user_id }) => {
    const token = jsonwebtoken_1.default.sign({ user_id }, process.env.AUTH_ACCESS_SECRET || '', { expiresIn: process.env.AUTH_ACCESS_EXPIRES });
    return { token };
};
exports.generateAppTokens = generateAppTokens;
const verifyToken = (bearerToken) => {
    return jsonwebtoken_1.default.verify(bearerToken, process.env.AUTH_ACCESS_SECRET || '');
};
exports.verifyToken = verifyToken;
