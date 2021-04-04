import React from "react";
import { Dropdown } from "semantic-ui-react";

class Render extends React.Component {
  onExportImage = () => {
    console.log("Now exporting...");
  };

  render() {
    return (
      <Dropdown text="Render" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.onExportImage}>
            Export Scene to Image
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Render;
