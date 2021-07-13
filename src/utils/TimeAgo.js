import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = date => {
  const timePeriod = formatDistanceToNow(parseISO(date));
  return timePeriod;
};
export default TimeAgo;
