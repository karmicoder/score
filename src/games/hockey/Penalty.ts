import moment from 'moment';
import type { GameState } from 'src/types/game';
import type { Penalty, PenaltyType } from './HockeyGame';

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
