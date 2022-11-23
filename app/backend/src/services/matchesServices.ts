import Matches from '../database/models/Matches';
import { getIdTeamsServices } from './teamsServices';

import Teams from '../database/models/Teams';

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

const idValidade = async (id: number) => {
  const team = await Teams.findOne({ where: { id } });
  return team;
};

const postMatcheServices = async (
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  if (homeTeam === awayTeam) {
    return { statusCode: 422,
      message: { message: 'It is not possible to create a match with two equal teams' } };
  }

  if (!await idValidade(homeTeam) || !await idValidade(awayTeam)) {
    return { statusCode: 404, message: { message: 'There is no team with such id!' } };
  }

  const matches = await Matches
    .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

  return { statusCode: 201, message: matches.dataValues };
};

const patchMatcherFinishServices = async (id: number) => {
  try {
    await Matches.update({ inProgress: false }, { where: { id } });

    return { statusCode: 200, message: { message: 'Finished' } };
  } catch (error) {
    return { statusCode: 404, message: { message: 'There is no team with such id!' } };
  }
};

export { getAllMatchesServices,
  getFilterMatchesServices, postMatcheServices, patchMatcherFinishServices };
