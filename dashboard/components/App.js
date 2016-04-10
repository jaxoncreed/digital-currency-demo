import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { MemberListContainer } from './MemberList';

export default React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    return (
      <div className="app">
        <header className="header">
        	<h1>Text these commands to <strong>678-993-0489</strong></h1>
        	<div className="commands">
	        	<div><strong>commands</strong> - get a list of available commands.</div>
	        	<div><strong>join [username]</strong> - Join the community</div>
	        	<div><strong>account</strong> - Check your account balance</div>
	        	<div><strong>list</strong> - List all members</div>
	        	<div><strong>send [receiver's name] [amount]</strong> - Send to a member</div>
	        </div>
        </header>
        <div className="content">
        	<MemberListContainer />
        </div>
      </div>
    );
  }
});