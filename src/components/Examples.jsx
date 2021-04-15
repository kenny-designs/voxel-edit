import React from "react";
import { Dropdown } from "semantic-ui-react";

/**
 * Gives the user several example projects to load into their scene and
 * play with.
 */
class Examples extends React.Component {
  render() {
    return (
      <Dropdown text="Examples" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>Earthbound</Dropdown.Item>
          <Dropdown.Item>Red Mage</Dropdown.Item>
          <Dropdown.Item>Samus</Dropdown.Item>
          <Dropdown.Item>Super Meat Boy</Dropdown.Item>
          <Dropdown.Item>Zombie</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Examples;
