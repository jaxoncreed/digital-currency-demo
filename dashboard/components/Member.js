import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    console.log(this.props);
    return (
      <li className="memberLi">
        <div className="memberCover">
          <span className="memberName">{this.props.name}</span><span className="memberAmount">{this.props.amount}</span>
        </div>
      </li>
    );
  }
});