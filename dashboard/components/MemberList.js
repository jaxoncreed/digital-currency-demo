import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {List} from 'immutable';
import Member from './Member';

const MemberList = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <div className="memberList">
        <ul className="memberUl">
          {this.props.members.map((member, index) => {
            return (
              <Member name={member.get('name')} amount={member.get('amount')} key={index} />
            )
          })}
        </ul>
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