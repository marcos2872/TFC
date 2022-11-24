/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
import { getAll } from './matchesServices';
import { getAllTeamsServices } from './teamsServices';

type teamsType = { id: number, teamName: string };
type matchesType = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: { teamName: string },
  teamAway: { teamName: string }
};
type accType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};

const infoTeam = (teams: teamsType[], matches: matchesType[]) => {
  const teste = teams.reduce((acc: accType[], curr) => {
    const teamInf = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0 };
    matches.forEach((curr2) => {
      if (curr.id === curr2.homeTeam) {
        teamInf.name = curr.teamName;
        teamInf.goalsFavor += curr2.homeTeamGoals;
        teamInf.goalsOwn += curr2.awayTeamGoals;
        teamInf.totalGames += 1;
        if (curr2.awayTeamGoals < curr2.homeTeamGoals) {
          teamInf.totalPoints += 3;
          teamInf.totalVictories += 1;
        }
        if (curr2.awayTeamGoals === curr2.homeTeamGoals) {
          teamInf.totalPoints += 1;
          teamInf.totalDraws += 1;
        }
        if (curr2.awayTeamGoals > curr2.homeTeamGoals) {
          teamInf.totalLosses += 1;
        }
      }
    });
    return [...acc, teamInf];
  }, []);

  return teste.map((curr) => ({
    ...curr,
    goalsBalance: curr.goalsFavor - curr.goalsOwn,
    efficiency: Number(((curr.totalPoints / (curr.totalGames * 3)) * 100).toFixed(2)),
  }));
};

const getAllLeaderboardServices = async () => {
  const { message: teamsData } = await getAllTeamsServices();
  const teams = teamsData.map(({ dataValues }) => dataValues);
  const matches = await getAll();
  const matchesFinish = matches.filter(({ inProgress }) => inProgress === false);

  const teamsInfo = infoTeam(teams, matchesFinish);

  const teste = teamsInfo.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  });

  return { statusCode: 200, message: teste };
};
export default getAllLeaderboardServices;
