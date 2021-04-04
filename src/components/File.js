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
 * @property {number} maxNameLength - Max chars a user can enter for their filename. Default 100
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

    // Maximum number of characters the user can enter into the save input
    this.maxNameLength = 100;
  }

  /**
   * Callback for when users wish to save their project. Creates a JSON file
   * with the contents of the 3D scene then saves locally to the user's device.
   */
  handleSaveProject = (e) => {
    const { saveInputValue } = this.state;

    // Prevent users from saving an empty filename
    if (saveInputValue.length === 0) return;

    // Get JSON that represents the project
    const projectJSON = JSON.stringify(this.props.callbacks.onGetProjectData());

    // Create the blob to download project json
    let blob = new Blob([projectJSON], {
      type: "application/json",
    });

    // Download it
    FileSaver.saveAs(blob, saveInputValue + ".json");

    // Save complete, close modal
    this.setState({ isSaveModalOpen: false });
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
    // Get the file to load
    const file = this.loadFileInput.files[0];

    // If no file found, return
    if (!file) return;

    // Read the file
    this.loadFileReader.readAsText(file);

    // Make the name of the file the new saveInputValue
    const saveInputValue = file.name.replace(/(.json)$/, "");
    this.setState({ saveInputValue });
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
    let { value } = e.target;

    // Trim any excess white-space
    value = value.trim();

    if (value.length <= this.maxNameLength) {
      this.setState({ saveInputValue: value });
    }
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
        <Modal.Header>Save Project As...</Modal.Header>
        <Modal.Content>
          <Input
            action={{
              content: "Save Project",
              disabled: isSaveInputEmpty,
              onClick: this.handleSaveProject,
            }}
            fluid
            value={this.state.saveInputValue}
            onChange={this.handleSaveInputChange}
            error={isSaveInputEmpty}
            placeholder="Enter project name..."
          />
        </Modal.Content>
      </Modal>
    );
  };

  createExportSubMenu = () => {
    return (
      <Dropdown text="Export" pointing="left" className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>Collada (.dae)</Dropdown.Item>
          <Dropdown.Item>Stanford (.ply)</Dropdown.Item>
          <Dropdown.Item>Stl (.stl)</Dropdown.Item>

          <Dropdown.Item onClick={this.onExportObj}>
            Wavefront (.obj)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  /**
   * Exports the voxel model to an Obj file.
   */
  onExportObj = () => {
    this.props.callbacks.onExportObj();
  };

  render() {
    return (
      <React.Fragment>
        {this.createSaveModal()}
        <Dropdown text="File" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => this.setState({ isSaveModalOpen: true })}
            >
              Save Project
            </Dropdown.Item>
            <Dropdown.Item onClick={this.onLoadProject}>
              Load Project
            </Dropdown.Item>

            {this.createExportSubMenu()}
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default File;
