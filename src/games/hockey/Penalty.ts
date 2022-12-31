import moment from 'moment';
import { createTickListener } from 'src/lib/timer.context';
import type { GameState } from 'src/types/game';
import type { Penalty, PenaltyType, Infraction, HockeyGameState } from './HockeyGame';
import { hockeyGame } from './hockeyGame.store';

export function penaltyDurationFor(penaltyType: PenaltyType): moment.Duration {
  switch (penaltyType) {
    case 'minor':
      return moment.duration(2, 'minutes');
    case 'double minor':
      return moment.duration(4, 'minutes');
    case 'major':
    case 'match':
      return moment.duration(5, 'minutes');
    case 'misconduct':
    case 'game misconduct':
      return moment.duration(10, 'minutes');
    default:
      throw new Error('Invalid penaltyType: ' + penaltyType);
  }
}

export const penaltyTypes = [
  'minor',
  'double minor',
  'major',
  'misconduct',
  'game misconduct',
  'match'
];

export const infractions: Infraction[] = [
  'unsportsmanlike',
  'hooking',
  'slashing',
  'cross-checking',
  'delay of game',
  'equipment violation',
  'illegal substitution',
  'charging',
  'holding',
  'holding the stick',
  'tripping',
  'elbowing',
  'spearing',
  'roughing',
  'boarding',
  'too many men',
  'interference',
  'goaltender interference',
  'check to the head',
  'high-sticking',
  'abuse of officials',
  'instigating',
  'embellishment',
  'fighting',
  'intent to injure'
];

export function penaltyController() {
  let $hockeyGame: HockeyGameState | undefined;
  hockeyGame.subscribe((game) => ($hockeyGame = game));
  createTickListener((sinceLastTickMs) => {
    $hockeyGame?.teams.forEach((team) => {
      team.activePenalties = team.activePenalties.filter((p) => {
        p.timeRemaining -= sinceLastTickMs;
        return p.timeRemaining > 0;
      });
      return team;
    });
  });
}
