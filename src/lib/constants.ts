export const IPL_YEARS = [
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
  2024, 2025
] as const;

export type IplYear = typeof IPL_YEARS[number];

export interface IplTeam {
  name: string;
  shortName: string;
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  aliases: string[];
}

export const IPL_TEAMS: Record<string, IplTeam> = {
  mi: {
    name: 'Mumbai Indians',
    shortName: 'MI',
    slug: 'mi',
    primaryColor: '#004BA0',
    secondaryColor: '#FFD700',
    aliases: ['Mumbai Indians', 'MI'],
  },
  csk: {
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    slug: 'csk',
    primaryColor: '#FDB913',
    secondaryColor: '#00AEEF',
    aliases: ['Chennai Super Kings', 'CSK'],
  },
  rcb: {
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    slug: 'rcb',
    primaryColor: '#EC1C24',
    secondaryColor: '#000000',
    aliases: ['Royal Challengers Bangalore', 'RCB', 'Royal Challengers Bengaluru'],
  },
  kkr: {
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    slug: 'kkr',
    primaryColor: '#3A225D',
    secondaryColor: '#D4AC0D',
    aliases: ['Kolkata Knight Riders', 'KKR'],
  },
  dc: {
    name: 'Delhi Capitals',
    shortName: 'DC',
    slug: 'dc',
    primaryColor: '#00008B',
    secondaryColor: '#EF1B23',
    aliases: ['Delhi Capitals', 'DC', 'Delhi Daredevils', 'DD'],
  },
  srh: {
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    slug: 'srh',
    primaryColor: '#FF822A',
    secondaryColor: '#000000',
    aliases: ['Sunrisers Hyderabad', 'SRH'],
  },
  rr: {
    name: 'Rajasthan Royals',
    shortName: 'RR',
    slug: 'rr',
    primaryColor: '#254AA5',
    secondaryColor: '#E91C8C',
    aliases: ['Rajasthan Royals', 'RR'],
  },
  pbks: {
    name: 'Punjab Kings',
    shortName: 'PBKS',
    slug: 'pbks',
    primaryColor: '#ED1B24',
    secondaryColor: '#A7A9AC',
    aliases: ['Punjab Kings', 'PBKS', 'Kings XI Punjab', 'KXIP'],
  },
  gt: {
    name: 'Gujarat Titans',
    shortName: 'GT',
    slug: 'gt',
    primaryColor: '#1B2133',
    secondaryColor: '#C8A84B',
    aliases: ['Gujarat Titans', 'GT'],
  },
  lsg: {
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    slug: 'lsg',
    primaryColor: '#A0C4FF',
    secondaryColor: '#2596be',
    aliases: ['Lucknow Super Giants', 'LSG'],
  },
  dh: {
    name: 'Deccan Chargers',
    shortName: 'DC',
    slug: 'dh',
    primaryColor: '#0000FF',
    secondaryColor: '#FFD700',
    aliases: ['Deccan Chargers', 'DC (Deccan)'],
  },
  pw: {
    name: 'Pune Warriors',
    shortName: 'PW',
    slug: 'pw',
    primaryColor: '#1CA2DD',
    secondaryColor: '#FFB300',
    aliases: ['Pune Warriors', 'PW', 'Pune Warriors India'],
  },
  kochi: {
    name: 'Kochi Tuskers Kerala',
    shortName: 'KTK',
    slug: 'kochi',
    primaryColor: '#FF5733',
    secondaryColor: '#F5C518',
    aliases: ['Kochi Tuskers Kerala', 'KTK'],
  },
  rps: {
    name: 'Rising Pune Supergiant',
    shortName: 'RPS',
    slug: 'rps',
    primaryColor: '#6C3483',
    secondaryColor: '#E74C3C',
    aliases: ['Rising Pune Supergiant', 'RPS', 'Rising Pune Supergiants'],
  },
  gl: {
    name: 'Gujarat Lions',
    shortName: 'GL',
    slug: 'gl',
    primaryColor: '#E35C1E',
    secondaryColor: '#F0B323',
    aliases: ['Gujarat Lions', 'GL'],
  },
};

export const TEAM_NAME_TO_SLUG: Record<string, string> = {};
for (const [slug, team] of Object.entries(IPL_TEAMS)) {
  for (const alias of team.aliases) {
    TEAM_NAME_TO_SLUG[alias.toLowerCase()] = slug;
  }
}
