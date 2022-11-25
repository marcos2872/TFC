/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/cognitive-complexity */
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

const teamRef = {
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

const forHome = (matches: matchesType[], curr: teamsType) => {
  const teamInf = { ...teamRef };
  matches.forEach((curr2) => {
    if (curr.id === curr2.homeTeam) {
      teamInf.name = curr.teamName; teamInf.goalsFavor += curr2.homeTeamGoals;
      teamInf.goalsOwn += curr2.awayTeamGoals; teamInf.totalGames += 1;

      if (curr2.awayTeamGoals < curr2.homeTeamGoals) {
        teamInf.totalPoints += 3; teamInf.totalVictories += 1;
      }

      if (curr2.awayTeamGoals === curr2.homeTeamGoals) {
        teamInf.totalPoints += 1; teamInf.totalDraws += 1;
      }

      if (curr2.awayTeamGoals > curr2.homeTeamGoals) teamInf.totalLosses += 1;
    }
  });
  return teamInf;
};

const forAway = (matches: matchesType[], curr: teamsType) => {
  const teamInf = { ...teamRef };
  matches.forEach((curr2) => {
    if (curr.id === curr2.awayTeam) {
      teamInf.name = curr.teamName; teamInf.goalsFavor += curr2.awayTeamGoals;
      teamInf.goalsOwn += curr2.homeTeamGoals; teamInf.totalGames += 1;

      if (curr2.awayTeamGoals > curr2.homeTeamGoals) {
        teamInf.totalPoints += 3; teamInf.totalVictories += 1;
      }

      if (curr2.awayTeamGoals === curr2.homeTeamGoals) {
        teamInf.totalPoints += 1; teamInf.totalDraws += 1;
      }

      if (curr2.awayTeamGoals < curr2.homeTeamGoals) teamInf.totalLosses += 1;
    }
  });
  return teamInf;
};

const forAll = (matches: matchesType[], curr: teamsType) => {
  const teamInf = { ...teamRef };
  matches.forEach((curr2) => {
    if (curr.id === curr2.awayTeam) {
      teamInf.name = curr.teamName; teamInf.goalsFavor += curr2.awayTeamGoals;
      teamInf.goalsOwn += curr2.homeTeamGoals; teamInf.totalGames += 1;
      if (curr2.awayTeamGoals > curr2.homeTeamGoals) {
        teamInf.totalPoints += 3; teamInf.totalVictories += 1;
      }
      if (curr2.awayTeamGoals === curr2.homeTeamGoals) {
        teamInf.totalPoints += 1; teamInf.totalDraws += 1;
      }

      if (curr2.awayTeamGoals < curr2.homeTeamGoals) teamInf.totalLosses += 1;
    }
    if (curr.id === curr2.homeTeam) {
      teamInf.name = curr.teamName; teamInf.goalsFavor += curr2.homeTeamGoals;
      teamInf.goalsOwn += curr2.awayTeamGoals; teamInf.totalGames += 1;

      if (curr2.awayTeamGoals < curr2.homeTeamGoals) {
        teamInf.totalPoints += 3; teamInf.totalVictories += 1;
      }
      if (curr2.awayTeamGoals === curr2.homeTeamGoals) {
        teamInf.totalPoints += 1; teamInf.totalDraws += 1;
      }
      if (curr2.awayTeamGoals > curr2.homeTeamGoals) teamInf.totalLosses += 1;
    }
  });
  return teamInf;
};

const infoTeam = (teams: teamsType[], matches: matchesType[], local: string) => {
  const teste = teams.reduce((acc: accType[], curr) => {
    const teamInf = local === 'home' ? forHome(matches, curr) : forAway(matches, curr);
    const teamAll = forAll(matches, curr);

    return [...acc, (local === 'all' ? teamAll : teamInf)];
  }, []);

  return teste.map((curr) => ({
    ...curr,
    goalsBalance: curr.goalsFavor - curr.goalsOwn,
    efficiency: Number(((curr.totalPoints / (curr.totalGames * 3)) * 100).toFixed(2)),
  }));
};

const getAllLeaderboardServices = async (local: string) => {
  const { message: teamsData } = await getAllTeamsServices();
  const teams = teamsData.map(({ dataValues }) => dataValues);
  const matches = await getAll();
  const matchesFinish = matches.filter(({ inProgress }) => inProgress === false);

  const teamsInfo = infoTeam(teams, matchesFinish, local);

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

const leaderboardServicesAway = async (local: string) => {
  const { message } = await getAllLeaderboardServices(local);

  const filt = message;
  return { statusCode: 200, message: filt };
};

const leaderboardServices = async () => {
  const { message } = await getAllLeaderboardServices('all');

  const filt = message;
  return { statusCode: 200, message: filt };
};

export { getAllLeaderboardServices, leaderboardServicesAway, leaderboardServices };
