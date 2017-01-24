/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	timezonesRequestAction,
	timezonesRequestSuccessAction,
	timezonesReceiveAction,
} from '../actions';

/**
 * Fixture data
 */
import {
	ACTION_TIMEZONES_RECEIVE,
	ACTION_TIMEZONES_REQUEST,
	ACTION_TIMEZONES_REQUEST_SUCCESS,
	TIMEZONES_DATA,
} from './fixture';

describe( 'actions', () => {
	describe( 'creators functions', () => {
		it( '#timezonesRequestAction()', () => {
			expect( timezonesRequestAction() ).to.eql( ACTION_TIMEZONES_REQUEST );
		} );

		it( '#timezonesRequestSuccessAction()', () => {
			expect( timezonesRequestSuccessAction() ).to.eql( ACTION_TIMEZONES_REQUEST_SUCCESS );
		} );

		it( '#timezonesReceiveAction()', () => {
			expect( timezonesReceiveAction( TIMEZONES_DATA ) ).to.eql( ACTION_TIMEZONES_RECEIVE );
		} );
	} );
} );
