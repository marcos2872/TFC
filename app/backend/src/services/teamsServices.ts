import Teams from '../database/models/Teams';

const getAllTeamsServices = async () => {
  const teams = await Teams.findAll();

  return { statusCode: 200, message: teams };
};

export default getAllTeamsServices;
