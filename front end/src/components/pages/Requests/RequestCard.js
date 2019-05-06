import React from "react";

import './RequestCard.css'

class RequestCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (        
        <div class="w3-row w3-card-2 w3-round-xlarge requestCard-comp1">

            <div class="w3-col w3-center requestCard-comp2">
                <img class="w3-card-2 requestCard-comp3" src="profile.png"/>
                <div class="w3-large requestCard-comp4">Amr Hendi</div>
            </div>

            <div class="w3-col w3-large requestCard-comp5">
                <div class="w3-row">
                    <div class="w3-col requestCard-comp6">Position</div>
                    <div class="w3-col requestCard-comp7"> : </div>
                    <div class="w3-col requestCard-comp8">full-stack developer</div>
                </div>
                <div class="w3-row">
                    <div class="w3-col requestCard-comp6">Company</div>
                    <div class="w3-col requestCard-comp7"> : </div>
                    <div class="w3-col requestCard-comp8">Google</div>
                </div>
                <div class="w3-row">
                    <div class="w3-col requestCard-comp6">Office</div>
                    <div class="w3-col requestCard-comp7"> : </div>
                    <div class="w3-col requestCard-comp8">Menlo Park</div>
                </div>
            </div>

            <div class="w3-col w3-small requestCard-comp9">
                <div>
                    <button class="w3-btn w3-teal w3-round-large requestCard-comp10">
                    view resume
                    </button>
                </div>
                <div>
                    <button class="w3-btn w3-green w3-round-large requestCard-comp10">
                    confirm application
                    </button>
                </div>
                <div>
                    <button class="w3-btn w3-red w3-round-large requestCard-comp11">
                    reject application
                    </button>
                </div>
            </div>
        </div>
    );
  }
}

export default RequestCard;
