import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {List} from 'immutable';

const MemberList = React.createClass({
  mixins: [PureRenderMixin],

  test: function() {
    console.log(JSON.stringify(this.props.members));
    return this.props.members;
  },

  render: function() {
    return (
      <div className="memberList">
        <ul>
          {this.props.members.map(member => {
            console.log(member.get('name'));
            return (
              <li>{member.get('name')} - {member.get('amount')}</li>
            )
          })}
        </ul>
        <p>{ this.props.members }</p>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    members: state.get('members') || new List()
  };
}

export const MemberListContainer = connect(mapStateToProps)(MemberList);