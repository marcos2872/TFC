import Matches from '../database/models/Matches';
import { getIdTeamsServices } from './teamsServices';

const getAll = async () => {
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
  return junt;
};

const getAllMatchesServices = async () => ({ statusCode: 200, message: await getAll() });

const getFilterMatchesServices = async (matches: boolean) => {
  const filter = (await getAll()).filter(({ inProgress }) => inProgress === matches);
  return { statusCode: 200, message: filter };
};

export { getAllMatchesServices, getFilterMatchesServices };
