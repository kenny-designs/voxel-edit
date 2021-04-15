import React from "react";
import { Dropdown, Loader, Modal } from "semantic-ui-react";

/**
 * Gives the user several example projects to load into their scene and
 * play with.
 * @property {Array.<Object>} exampleProjects - Example projects the user can load
 */
class Examples extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

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

  /**
   * Handler for when user wants to load an example project
   * @function
   */
  handleLoadExample = (filename) => {
    // Get the actual location of the file
    const fileLocation =
      process.env.PUBLIC_URL + "/models/" + filename + ".json";

    // Turn on the loader
    this.setState({ isLoading: true });

    // Fetch the file from the public directory
    fetch(fileLocation)
      .then((res) => {
        return res.json();
      })
      // Obtained JSON of file, load the project
      .then(this.props.callbacks.onLoadProjectData)
      .then(() => this.setState({ isLoading: false }));
  };

  /**
   * Generates each example project for the dropdown menu.
   * @function
   * @returns {JSX}
   */
  createExampleProjectMenu = () => {
    // Return an array of JSX dropdown items
    const items = this.exampleProjects.map((project) => {
      // Get the name and filename of the current project
      const { name, filename } = project;

      // Generate a dropdown item based on the given name and filename
      return (
        <Dropdown.Item
          key={name}
          onClick={() => this.handleLoadExample(filename)}
        >
          {name}
        </Dropdown.Item>
      );
    });

    // Return final array of JSX dropdown items
    return items;
  };

  /**
   * Creates a load screen while loading in the chosen example project.
   * @returns {JSX}
   */
  createLoadScreen = () => {
    return (
      <Modal basic open={this.state.isLoading}>
        <Loader size="massive">Loading project...</Loader>
      </Modal>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.createLoadScreen()}
        <Dropdown text="Examples" pointing className="link item">
          <Dropdown.Menu>{this.createExampleProjectMenu()}</Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default Examples;
