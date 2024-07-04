import { UseCaseHandler } from "src/shared/utils/use_cases"
import { DrizzleArtistsRepository } from "src/application/repository/implementations/DrizzleArtistsRepository"
import { CreateArtist } from "./CreateArtist"
import { ListArtists } from "./ListArtists"
import { GetUniqueArtist } from "./GetUniqueArtist"
import { UpdateArtist } from "./UpdateArtist"
import { DeleteArtist } from "./DeleteArtist"
import { LoginWithCredentials } from "../login/LoginWithCredentials"

const createArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new CreateArtist(artistsRepository))
}

const listArtists = () => {
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new ListArtists(artistsRepository))
}

const getUniqueArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new GetUniqueArtist(artistsRepository))
}

const updateArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new UpdateArtist(artistsRepository))
}

const deleteArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new DeleteArtist(artistsRepository))
}

const loginArtist = () => {
    const artistsRepository = new DrizzleArtistsRepository()
    return new UseCaseHandler(new LoginWithCredentials(artistsRepository))
}

export {
    createArtist,
    listArtists,
    getUniqueArtist,
    updateArtist,
    deleteArtist,
    loginArtist
}