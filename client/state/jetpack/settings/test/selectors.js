/**
 * External dependencies
 */
import { expect } from 'chai';

import {
	getJetpackSettingsSaveRequestStatus,
	isJetpackSettingsSaveSuccessful,
	getJetpackSettingsSaveError,
} from '../selectors';

describe( 'selectors', () => {
	describe( '#getJetpackSettingsSaveRequestStatus()', () => {
		it( 'should return undefined if the site is not attached', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: true, status: 'pending' }
						}
					}
				}
			};
			const status = getJetpackSettingsSaveRequestStatus( state, 87654321 );

			expect( status ).to.be.undefined;
		} );

		it( 'should return success if the save request status is success', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: false, status: 'success' }
						}
					}
				}
			};
			const status = getJetpackSettingsSaveRequestStatus( state, 12345678 );

			expect( status ).to.eql( 'success' );
		} );

		it( 'should return error if the save request status is error', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: false, status: 'error' }
						}
					}
				}
			};
			const status = getJetpackSettingsSaveRequestStatus( state, 12345678 );

			expect( status ).to.eql( 'error' );
		} );

		it( 'should return pending if the save request status is pending', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: true, status: 'pending' }
						}
					}
				}
			};
			const status = getJetpackSettingsSaveRequestStatus( state, 12345678 );

			expect( status ).to.eql( 'pending' );
		} );
	} );

	describe( 'isJetpackSettingsSaveSuccessful()', () => {
		it( 'should return false if the site is not attached', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: true, status: 'pending' }
						}
					}
				}
			};
			const isSuccessful = isJetpackSettingsSaveSuccessful( state, 87654321 );

			expect( isSuccessful ).to.be.false;
		} );

		it( 'should return true if the save request status is success', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: false, status: 'success' }
						}
					}
				}
			};
			const isSuccessful = isJetpackSettingsSaveSuccessful( state, 12345678 );

			expect( isSuccessful ).to.be.true;
		} );

		it( 'should return false if the save request status is error', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: false, status: 'error' }
						}
					}
				}
			};
			const isSuccessful = isJetpackSettingsSaveSuccessful( state, 12345678 );

			expect( isSuccessful ).to.be.false;
		} );
	} );

	describe( 'getJetpackSettingsSaveError()', () => {
		it( 'should return false if the site is not attached', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: true, status: 'pending', error: false }
						}
					}
				}
			};
			const error = getJetpackSettingsSaveError( state, 87654321 );

			expect( error ).to.be.false;
		} );

		it( 'should return false if the save the last request has no error', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: false, status: 'success', error: false }
						}
					}
				}
			};
			const error = getJetpackSettingsSaveError( state, 12345678 );

			expect( error ).to.be.false;
		} );

		it( 'should return the error if the save request status has an error', () => {
			const state = {
				jetpack: {
					settings: {
						saveRequests: {
							12345678: { saving: false, status: 'error', error: 'my Error' }
						}
					}
				}
			};
			const error = getJetpackSettingsSaveError( state, 12345678 );

			expect( error ).to.eql( 'my Error' );
		} );
	} );
} );
