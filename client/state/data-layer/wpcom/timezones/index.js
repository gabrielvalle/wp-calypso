/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';

import { TIMEZONES_REQUEST } from 'state/action-types';

import {
	timezonesRequestSuccessAction,
	timezonesRequestFailureAction,
	timezonesReceiveAction,
} from 'state/timezones/actions';

const undocumented = wpcom.undocumented();

/*
 * Start a request to WordPress.com server to get the timezones data
 */
export const requestTimezones = ( { dispatch } ) => (
	undocumented
		.timezones()
		.then( zones => {
			dispatch( timezonesRequestSuccessAction() );
			dispatch( timezonesReceiveAction( zones ) );
		} )
		.catch( error => {
			dispatch( timezonesRequestFailureAction( error ) );
		} )
);

export default {
	[ TIMEZONES_REQUEST ]: [ requestTimezones ],
};
