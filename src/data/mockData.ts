export interface UserImpact {
  id: string;
  name: string;
  referrals: number;
  points: number;
  rank: number;
  badge: 'Spark' | 'Catalyst' | 'Guardian';
  image: string;
}

export const leaderboardData: UserImpact[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    referrals: 52,
    points: 5200,
    rank: 1,
    badge: 'Guardian',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    name: 'Krishna', // Your profile!
    referrals: 38,
    points: 3800,
    rank: 2,
    badge: 'Catalyst',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna'
  },
  {
    id: '3',
    name: 'Alex Chen',
    referrals: 29,
    points: 2900,
    rank: 3,
    badge: 'Catalyst',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  {
    id: '4',
    name: 'James Wilson',
    referrals: 12,
    points: 1200,
    rank: 4,
    badge: 'Spark',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  },
  {
    id: '5',
    name: 'Maria Garcia',
    referrals: 8,
    points: 800,
    rank: 5,
    badge: 'Spark',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  }
];

export const currentUser = leaderboardData[1]; // Setting you as the active user