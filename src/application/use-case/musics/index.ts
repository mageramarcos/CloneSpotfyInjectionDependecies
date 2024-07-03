import { DrizzleMusicsRepository } from "src/application/repository/implementations/DrizzleMusicsRepository"
import { CreateMusic } from "./CreateMusic"
import { UseCaseHandler } from "src/shared/utils/use_cases"
import { DrizzleArtistsRepository } from "src/application/repository/implementations/DrizzleArtistsRepository"
import { ListMusic } from "./ListMusics"
import { GetUniqueMusic } from "./GetUniqueMusic"
import { UpdateMusic } from "./UpdateMusic"
import { DeleteMusic } from "./DeleteMusic"

const createMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository()
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new CreateMusic(musicsRepository, artistsRepository))
}

const listMusics = () => {
    const musicsRepository = new DrizzleMusicsRepository()
    return new UseCaseHandler(new ListMusic(musicsRepository))
}

const getUniqueMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository()
    return new UseCaseHandler(new GetUniqueMusic(musicsRepository))
}

const updateMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository()
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new UpdateMusic(musicsRepository, artistsRepository))
}

const deleteMusic = () => {
    const musicsRepository = new DrizzleMusicsRepository()
    return new UseCaseHandler(new DeleteMusic(musicsRepository))
}

export {
    createMusic,
    listMusics,
    getUniqueMusic,
    updateMusic,
    deleteMusic
}