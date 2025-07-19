import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";

const database: PlayerModel[] =[
    {
        id: 1,
        name: "Lionel Messi",
        club: "Paris Saint-Germain",
        nationality: "Argentina",
        position: "Forward",
        statistics: {
            Overall: 93,
            Pace: 85,
            Shooting: 94,
            Passing: 91,
            Dribbling: 95,
            Defending: 38,
            Physical: 65,
        }
    }
];

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
    return database;
};

export const findPlayerById = async (
    id: number
): Promise<PlayerModel | undefined> => {
    return database.find((player) => player.id === id);
};

export const insertPlayer = async (player: PlayerModel) => {
    database.push(player);
};

export const deleteOnePlayer = async (id: number) => {
    const index = database.findIndex(p => p.id === id);

    if(index !== -1){
        database.splice(index, 1);
        return true;
    }

    return false;
};

export const findAndModifyPlayer = async (id: number, statistics: StatisticsModel): Promise<PlayerModel> => {
    const playerIndex = database.findIndex(p => p.id === id);

    if(playerIndex !== -1){
        database[playerIndex].statistics = statistics;
    }

    return database[playerIndex];
};