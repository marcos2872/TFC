import Teams from '../database/models/Teams';

const getAllTeamsServices = async () => {
  const teams = await Teams.findAll();

  return { statusCode: 200, message: teams };
};

const getIdTeamsServices = async (id: number) => {
  const team = await Teams.findOne({
    where: { id },
  });

  return { statusCode: 200, message: team?.dataValues };
};

export { getAllTeamsServices, getIdTeamsServices };
