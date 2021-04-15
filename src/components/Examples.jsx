import React from "react";
import { Dropdown } from "semantic-ui-react";

/**
 * Gives the user several example projects to load into their scene and
 * play with.
 * @property {Array.<Object>} exampleProjects - Example projects the user can load
 */
class Examples extends React.Component {
  constructor(props) {
    super(props);

    // Array of projects that the user can load
    // @TODO: It would be nice to automatically generate these from
    // the models directory. If possible, try to make that happen
    this.exampleProjects = [
      { name: "EarthBound", filename: "earthbound-voxel" },
      { name: "Red Mage", filename: "redmage" },
      { name: "Samus", filename: "samus-8bit" },
      { name: "Super Meat Boy", filename: "super-meat-boy" },
      { name: "Zombie", filename: "zombie-grave" },
    ];
  }

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
