/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SET_MESSAGE,
	HAPPYCHAT_SEND_MESSAGE,
	HAPPYCHAT_CONNECTION_OPEN
} from 'state/action-types';

export const connectChat = () => ( { type: HAPPYCHAT_CONNECTION_OPEN } );

export const updateChatMessage = message => ( { type: HAPPYCHAT_SET_MESSAGE, message } );

export const sendChatMessage = message => ( {
	type: HAPPYCHAT_SEND_MESSAGE, message
} );
