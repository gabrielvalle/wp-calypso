/**
 * Internal dependencies
 */
import {
	TIMEZONES_RECEIVE,
	TIMEZONES_REQUEST,
	TIMEZONES_REQUEST_FAILURE,
	TIMEZONES_REQUEST_SUCCESS
} from 'state/action-types';

export const timezonesRequestAction = () => ( {
	type: TIMEZONES_REQUEST
} );

export const timezonesRequestSuccessAction = () => ( {
	type: TIMEZONES_REQUEST_SUCCESS
} );

export const timezonesRequestFailureAction = error => ( {
	type: TIMEZONES_REQUEST_FAILURE,
	error
} );

export const timezonesReceiveAction = ( { manual_utc_offsets, timezones_by_continent } ) => ( {
	type: TIMEZONES_RECEIVE,
	manual_utc_offsets,
	timezones_by_continent
} );
