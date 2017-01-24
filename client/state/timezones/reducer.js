/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	TIMEZONES_RECEIVE,
	TIMEZONES_REQUEST,
	TIMEZONES_REQUEST_FAILURE,
	TIMEZONES_REQUEST_SUCCESS
} from 'state/action-types';
import { timezonesSchema } from './schema';
import { createReducer } from 'state/utils';

/**
 * Collect and store timezones data
 *
 * @param  {Object} state - Current state
 * @param  {Object} action - action payload
 * @return {Object} updated state
 */
export const items = createReducer( {}, {
	[ TIMEZONES_RECEIVE ]: ( state, {
		manual_utc_offsets,
		timezones_by_continent,
	} ) => ( { manual_utc_offsets, timezones_by_continent } ),
}, timezonesSchema );

/**
 * Track the timezones requesting process
 *
 * @param  {Object} state - current state
 * @param  {Object} action - action payload
 * @return {Object} updated state
 */
export const requesting = createReducer( false, {
	[ TIMEZONES_REQUEST ]: () => true,
	[ TIMEZONES_REQUEST_FAILURE ]: () => false,
	[ TIMEZONES_REQUEST_SUCCESS ]: () => false,
} );

export default combineReducers( {
	items,
	requesting,
} );
