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
exports.UseCaseHandler = void 0;
const response_1 = require("./response");
/**
 * Represents a handler for executing use cases.
 * @template T The input data type for the use case.
 * @template K The output data type for the use case.
 */
class UseCaseHandler {
    constructor(useCase) {
        this.useCase = useCase;
    }
    /**
     * Handles the internal calls of the use case.
     * @param data The input data for the use case.
     * @returns A promise that resolves to the response from the use case execution.
     */
    handle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validated = this.useCase.validate !== undefined
                ? yield this.useCase.validate(data)
                : response_1.normalizationResponse.ok(data);
            if (validated.process !== 'success')
                return validated;
            return this.useCase.execute(validated.body);
        });
    }
}
exports.UseCaseHandler = UseCaseHandler;
