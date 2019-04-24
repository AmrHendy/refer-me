import React from "react";

import './PositionCard.css'

class PostionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let {imagePath, company, office, position, date} = this.props.items;

    return (
    
        <div className="w3-row w3-card-2 w3-round-xlarge positionCard-comp3">
            <div className="w3-col positionCard-comp4"> 
                <img className="w3-card-2 positionCard-comp5" src={imagePath || 'http://localhost:8000/profile.png' }/>
            </div>

            <div className="w3-col positionCard-comp6">
                <div className="w3-row">
                    <div className="w3-col positionCard-comp7">Company:</div>
                    <div className="w3-col positionCard-comp8">{company}</div>
                </div>
                <div className="w3-row">
                    <div className="w3-col positionCard-comp7">Office:</div>
                    <div className="w3-col positionCard-comp8">{office}</div>
                </div>
                <div className="w3-row">
                    <div className="w3-col positionCard-comp7">Position:</div>
                    <div className="w3-col positionCard-comp8">{position}</div>
                </div>
            </div>

            <div className="w3-col positionCard-comp9">
                {date}
            </div>
        </div>
    );
  }
}

export default PostionCard;
