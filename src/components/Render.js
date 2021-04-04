import React from "react";
import { Dropdown } from "semantic-ui-react";

class Render extends React.Component {
  render() {
    return (
      <Dropdown text="Render" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>Export Scene to Image</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Render;
