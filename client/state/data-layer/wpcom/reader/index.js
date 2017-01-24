/**
 * Internal dependencies
 */
import { mergeHandlers } from 'state/data-layer/utils';
import streams from './streams';

export default mergeHandlers(
	streams,
);
