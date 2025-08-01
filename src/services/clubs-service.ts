import * as HttpResponse from "../utils/http-helper";
import * as repository from "../repositories/clubs-repository"

export const getClubsService = async () => {
    const data = await repository.findAllClubs();
    const response = HttpResponse.ok(data);
    return response;
};