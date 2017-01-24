/**
 * Internal dependencies
 */
import { mergeHandlers } from 'state/data-layer/utils';
import plans from './plans';
import reader from './reader';
import sites from './sites';

export const handlers = mergeHandlers(
	plans,
	reader,
	sites,
);

export default handlers;
