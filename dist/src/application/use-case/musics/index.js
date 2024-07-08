"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMusic = exports.updateMusic = exports.getUniqueMusic = exports.listMusics = exports.createMusic = void 0;
const DrizzleMusicsRepository_1 = require("src/application/repository/implementations/DrizzleMusicsRepository");
const CreateMusic_1 = require("./CreateMusic");
const use_cases_1 = require("src/shared/utils/use_cases");
const DrizzleArtistsRepository_1 = require("src/application/repository/implementations/DrizzleArtistsRepository");
const ListMusics_1 = require("./ListMusics");
const GetUniqueMusic_1 = require("./GetUniqueMusic");
const UpdateMusic_1 = require("./UpdateMusic");
const DeleteMusic_1 = require("./DeleteMusic");
const createMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository_1.DrizzleMusicsRepository();
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new CreateMusic_1.CreateMusic(musicsRepository, artistsRepository));
};
exports.createMusic = createMusic;
const listMusics = () => {
    const musicsRepository = new DrizzleMusicsRepository_1.DrizzleMusicsRepository();
    return new use_cases_1.UseCaseHandler(new ListMusics_1.ListMusic(musicsRepository));
};
exports.listMusics = listMusics;
const getUniqueMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository_1.DrizzleMusicsRepository();
    return new use_cases_1.UseCaseHandler(new GetUniqueMusic_1.GetUniqueMusic(musicsRepository));
};
exports.getUniqueMusic = getUniqueMusic;
const updateMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository_1.DrizzleMusicsRepository();
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    return new use_cases_1.UseCaseHandler(new UpdateMusic_1.UpdateMusic(musicsRepository, artistsRepository));
};
exports.updateMusic = updateMusic;
const deleteMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository_1.DrizzleMusicsRepository();
    return new use_cases_1.UseCaseHandler(new DeleteMusic_1.DeleteMusic(musicsRepository));
};
exports.deleteMusic = deleteMusic;
