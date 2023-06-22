const mapping: Record<string, string> = {
  attendances: 'attendance',
  clubs: 'club',
  events: 'event',
  'swim-meets': 'swim_meet',
  swimmers: 'swimmer',
  teams: 'team',
  'training-plans': 'training_plan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
