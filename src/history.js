import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';

export const basename = '';

const history = useRouterHistory(createHistory)({
  basename: basename
});

export default history;
