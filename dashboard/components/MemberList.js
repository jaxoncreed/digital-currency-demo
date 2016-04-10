import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

const MemberList = React.createClass({
  mixins: [PureRenderMixin],

  test: function() {
    console.log(this.props);
    return this.props.state.get('vote').get('tally').get('Sunshine');
  },

  render: function() {
    return (
      <div className="memberList">
        <h1>{this.test()}</h1>
      </div>
    );
  }
});

function mapStateToProps(state) {
  console.log("state", state);
  return {
    state: state
  };
}

export const MemberListContainer = connect(mapStateToProps)(MemberList);