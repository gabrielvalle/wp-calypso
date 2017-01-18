/**
 * External dependencies
 */
import React, { Component } from 'react';
import page from 'page';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import viewport from 'lib/viewport';
import { openChat } from 'state/ui/happychat/actions';
import Button from 'components/button';
import Gridicon from 'components/gridicon';
import Sound from 'components/sound';
import { getCurrentUserId } from 'state/current-user/selectors';
import { getLastMessageExcludingUser } from 'state/happychat/selectors';

class HappychatButton extends Component {
	onOpenChat = () => {
		const { onOpenChat } = this.props;
		if ( viewport.isMobile() ) {
			// For mobile clients, happychat will always use the page compoent instead of the sidebar
			page( '/me/chat' );
		} else {
			onOpenChat();
		}
	}

	render() {
		const {
			translate,
			lastOperatorMessage,
		} = this.props;
		return (
			<Button
				className="sidebar__footer-chat"
				borderless
				onClick={ this.onOpenChat }
				title={ translate( 'Support Chat' ) }>
				<Sound src="/calypso/audio/chat-pling.wav" trigger={ lastOperatorMessage } />
				<Gridicon icon="chat" />
			</Button>
		);
	}
}

const mapState = state => ( {
	lastOperatorMessage: getLastMessageExcludingUser( state, getCurrentUserId( state ) ),
} );

export default connect( mapState, { onOpenChat: openChat } )( localize( HappychatButton ) );
