/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { useSandbox } from 'test/helpers/use-sinon';

// Reducers
import timezonesReducer, {
	items as itemsReducer,
	requesting as requestReducer
} from '../reducer';

/**
 * Actions creators functions
 */
import {
	timezonesReceiveAction,
	timezonesRequestSuccessAction,
	timezonesRequestFailureAction,
	timezonesRequestAction,
} from '../actions';

/**
 * Fixture data
 */
import { TIMEZONES_SYNC_DATA } from './fixture';

describe( 'reducer', () => {
	let sandbox;

	useSandbox( newSandbox => {
		sandbox = newSandbox;
		sandbox.stub( console, 'warn' );
	} );

	it( 'should export expected reducer keys', () => {
		expect( timezonesReducer( undefined, {} ) ).to.have.keys( [
			'items',
			'requesting'
		] );
	} );

	describe( '#items()', () => {
		it( 'should default to an empty Array', () => {
			expect( itemsReducer( undefined, {} ) ).to.eql( {} );
		} );

		it( 'should index items state', () => {
			const initialState = undefined;
			const timezones = TIMEZONES_SYNC_DATA;
			const action = timezonesReceiveAction( timezones );

			const expectedState = timezones;
			deepFreeze( expectedState );

			const newState = itemsReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should override timezones', () => {
			const timezones = TIMEZONES_SYNC_DATA;
			const initialState = timezones;
			const action = timezonesReceiveAction( timezones );
			const expectedState = timezones;

			deepFreeze( initialState );
			deepFreeze( expectedState );

			const newState = itemsReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should persist state', () => {
			const timezones = TIMEZONES_SYNC_DATA;
			const initialState = timezones;
			const action = { type: 'SERIALIZE' };
			const expectedState = timezones;

			deepFreeze( initialState );
			deepFreeze( expectedState );

			const newState = itemsReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should load persisted state', () => {
			const timezones = TIMEZONES_SYNC_DATA;
			const initialState = timezones;
			const action = { type: 'DESERIALIZE' };
			const expectedState = timezones;
			deepFreeze( initialState );
			deepFreeze( expectedState );

			const newState = itemsReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should not load invalid persisted state', () => {
			// product_id should be `Number`
			const timezones = [ { foo: 'bar' } ];
			const initialState = timezones;
			const action = { type: 'DESERIALIZE' };
			deepFreeze( initialState );

			const newState = itemsReducer( initialState, action );

			expect( newState ).to.eql( {} );
		} );
	} );

	describe( '#requesting()', () => {
		it( 'should return FALSE when initial state is undefined and action is unknown', () => {
			expect( requestReducer( undefined, {} ) ).to.eql( false );
		} );

		it( 'should return TRUE when initial state is undefined and action is REQUEST', () => {
			const initialState = undefined;
			const action = timezonesRequestAction();
			const expectedState = true;
			deepFreeze( expectedState );

			const newState = requestReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should update `requesting` state on SUCCESS', () => {
			const initialState = true;
			const action = timezonesRequestSuccessAction();
			const expectedState = false;

			deepFreeze( initialState );
			deepFreeze( expectedState );

			const newState = requestReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should update `requesting` state on FAILURE', () => {
			const initialState = true;
			const action = timezonesRequestFailureAction();
			const expectedState = false;

			deepFreeze( initialState );
			deepFreeze( expectedState );

			const newState = requestReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );
	} );
} );
