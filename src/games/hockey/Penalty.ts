import moment from 'moment';
import { game } from 'src/lib/game.store';
import type { GameState } from 'src/types/game';
import type { Penalty, PenaltyType, Infraction } from './HockeyGame';
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

export function penaltyTimeRemaining(game: GameState, penalty: Penalty): moment.Duration {
  let samePeriod = game.periodNumber === penalty.periodAt;
  const penaltyDuration = penaltyDurationFor(penalty.type);
  if (samePeriod) {
    return penaltyDuration.subtract(penalty.timeAt.clone().subtract(game.periodTimeRemaing));
  }
  return penaltyDuration
    .subtract(moment.duration(20, 'minute').subtract(penalty.timeAt))
    .subtract(moment.duration(20, 'minute').subtract(game.periodTimeRemaing));
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
  'fighting'
];

export function penaltyController() {
  let runCount = 0;

  return hockeyGame.subscribe(($hockeyGame) => {
    ++runCount;
    if (runCount % 100 !== 0) {
      return;
    }
    $hockeyGame?.teams.forEach((team) => {
      team.activePenalties = team.activePenalties.filter(
        (p) => penaltyTimeRemaining($hockeyGame, p).asMilliseconds() > 0
      );
    });
  });
}
