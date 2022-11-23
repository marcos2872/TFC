import Matches from '../database/models/Matches';
import { getIdTeamsServices } from './teamsServices';

const getAllMatchesServices = async () => {
  const matches = await Matches.findAll();

  const junt = Promise.all(matches.map(async ({ dataValues }) => {
    const home = await getIdTeamsServices(dataValues.homeTeam);
    const away = await getIdTeamsServices(dataValues.awayTeam);
    return {
      ...dataValues,
      teamHome: {
        teamName: home.message.teamName,
      },
      teamAway: {
        teamName: away.message.teamName,
      },
    };
  }));

  return { statusCode: 200, message: await junt };
};

export default getAllMatchesServices;
