/**
 * External dependencies
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

/**
 * Internal dependencies
 */
import feedStreamFactory from 'lib/feed-stream-store';
import { recordTrack } from 'reader/stats';
import { ensureStoreLoading, trackPageLoad, trackUpdatesLoaded, trackScrollPage } from 'reader/controller-helper';

const analyticsPageTitle = 'Reader';

export default {
	listListing( context ) {
		const ListStream = require( 'reader/list-stream' ),
			basePath = '/read/list/:owner/:slug',
			fullAnalyticsPageTitle = analyticsPageTitle + ' > List > ' + context.params.user + ' - ' + context.params.list,
			listStore = feedStreamFactory( 'list:' + context.params.user + '-' + context.params.list ),
			mcKey = 'list';

		ensureStoreLoading( listStore, context );

		trackPageLoad( basePath, fullAnalyticsPageTitle, mcKey );
		recordTrack( 'calypso_reader_list_loaded', {
			list_owner: context.params.user,
			list_slug: context.params.list
		} );

		ReactDom.render(
			React.createElement( ReduxProvider, { store: context.store },
				React.createElement( ListStream, {
					key: 'tag-' + context.params.user + '-' + context.params.list,
					postStore: listStore,
					owner: encodeURIComponent( context.params.user ),
					slug: encodeURIComponent( context.params.list ),
					showPrimaryFollowButtonOnCards: false,
					trackScrollPage: trackScrollPage.bind(
						null,
						basePath,
						fullAnalyticsPageTitle,
						analyticsPageTitle,
						mcKey
					),
					onUpdatesShown: trackUpdatesLoaded.bind( null, mcKey )
				} )
			),
			document.getElementById( 'primary' )
		);
	}
};
