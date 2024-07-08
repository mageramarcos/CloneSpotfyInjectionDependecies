"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginArtist = exports.deleteArtist = exports.updateArtist = exports.getUniqueArtist = exports.listArtists = exports.createArtist = void 0;
const use_cases_1 = require("src/shared/utils/use_cases");
const DrizzleArtistsRepository_1 = require("src/application/repository/implementations/DrizzleArtistsRepository");
const CreateArtist_1 = require("./CreateArtist");
const ListArtists_1 = require("./ListArtists");
const GetUniqueArtist_1 = require("./GetUniqueArtist");
const UpdateArtist_1 = require("./UpdateArtist");
const DeleteArtist_1 = require("./DeleteArtist");
const LoginWithCredentials_1 = require("../login/LoginWithCredentials");
const createArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new CreateArtist_1.CreateArtist(artistsRepository));
};
exports.createArtist = createArtist;
const listArtists = () => {
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new ListArtists_1.ListArtists(artistsRepository));
};
exports.listArtists = listArtists;
const getUniqueArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new GetUniqueArtist_1.GetUniqueArtist(artistsRepository));
};
exports.getUniqueArtist = getUniqueArtist;
const updateArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new UpdateArtist_1.UpdateArtist(artistsRepository));
};
exports.updateArtist = updateArtist;
const deleteArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new DeleteArtist_1.DeleteArtist(artistsRepository));
};
exports.deleteArtist = deleteArtist;
const loginArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new LoginWithCredentials_1.LoginWithCredentials(artistsRepository));
};
exports.loginArtist = loginArtist;
