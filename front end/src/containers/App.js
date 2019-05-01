import React from "react";

import LoginPage from "../components/pages/LoginPage";
import Test from "../components/pages/Test"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginPage/>
    );
  }
}

export default App;
