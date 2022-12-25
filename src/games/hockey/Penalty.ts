import moment from 'moment';
import type { PenaltyType } from './HockeyGame';

export function penaltyDurationFor(penaltyType: PenaltyType): moment.Duration {
  switch (penaltyType) {
    case 'minor':
      return moment.duration(2, 'minutes');
    case 'major':
    case 'match':
      return moment.duration(5, 'minutes');
    case 'misconduct':
      // case 'game misconduct':
      return moment.duration(10, 'minutes');
    default:
      throw new Error('Invalid penaltyType: ' + penaltyType);
  }
}
