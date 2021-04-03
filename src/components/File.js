import React from "react";
import { Dropdown, Modal, Input } from "semantic-ui-react";
import FileSaver from "file-saver";

/**
 * Allows the user to perform file related actions such as save their
 * project or load one.
 * @TODO File is already a class used within the browser. Rename this! It might
 * be time to start referring to all components as just SomethingComponent or similar.
 *
 * @property {Input} loadFileInput - Input used for selecting project file to load
 * @property {FileReader} loadFileReader - Reads data from selected project file
 * @extends React.Component
 */
class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaveModalOpen: false,
      saveInputValue: "",
    };

    // Create input for allowing users to select their project to load
    this.loadFileInput = document.createElement("input");
    this.loadFileInput.type = "file";
    this.loadFileInput.accept = ".json";
    this.loadFileInput.addEventListener("change", this.handleFileSelected);

    // Create FileReader for loading user projects
    this.loadFileReader = new FileReader();
    this.loadFileReader.addEventListener("load", this.handleFileRead);
  }

  /**
   * Callback for when users wish to save their project. Creates a JSON file
   * with the contents of the 3D scene then saves locally to the user's device.
   */
  onSaveProject = () => {
    this.setState({ isSaveModalOpen: true });

    /*
    // Get JSON that represents the project
    const projectJSON = JSON.stringify(this.props.callbacks.onGetProjectData());

    // Create the blob to download project json
    let blob = new Blob([projectJSON], {
      type: "application/json",
    });

    // Download it
    FileSaver.saveAs(blob, "voxel-edit-project.json");
    */
  };

  /**
   * Callback for when users wish to load a pre-existing project.
   */
  onLoadProject = () => {
    this.loadFileInput.click();
  };

  /**
   * Handler for when the users selects the file they wish to load.
   * @param {Event} e
   */
  handleFileSelected = (e) => {
    this.loadFileReader.readAsText(this.loadFileInput.files[0]);
  };

  /**
   * Handler for reading the data from the user's selected project file.
   * @param {Event} e
   */
  handleFileRead = (e) => {
    // Convert JSON file into JavaScript object
    const projectData = JSON.parse(e.target.result);

    // Load project into the scene
    this.props.callbacks.onLoadProjectData(projectData);
  };

  /**
   * Handler for changes in the save input. Helps to maintain a controlled input.
   * @param {Event} e
   */
  handleSaveInputChange = (e) => {
    this.setState({ saveInputValue: e.target.value });
  };

  createSaveModal = () => {
    // True is empty, false otherwise
    const isSaveInputEmpty = this.state.saveInputValue.length === 0;

    return (
      <Modal
        onClose={() => this.setState({ isSaveModalOpen: false })}
        onOpen={() => this.setState({ isSaveModalOpen: true })}
        open={this.state.isSaveModalOpen}
        closeIcon
        size="mini"
      >
        <Modal.Content>
          <Input
            action={{
              content: "Save Project",
              disabled: isSaveInputEmpty,
            }}
            value={this.state.saveInputValue}
            onChange={this.handleSaveInputChange}
            error={isSaveInputEmpty}
            placeholder="Enter project name..."
          />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.createSaveModal()}
        <Dropdown text="File" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.onSaveProject}>
              Save Project
            </Dropdown.Item>
            <Dropdown.Item onClick={this.onLoadProject}>
              Load Project
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default File;
