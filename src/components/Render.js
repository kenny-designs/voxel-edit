import React from "react";
import SubmitTextModal from "./SubmitTextModal";
import { Dropdown, Modal, Input } from "semantic-ui-react";

/**
 * Allows the user to perform rendering related actions. Mostly, saving
 * their work to a .png file.
 *
 * @property {number} maxNameLength - Max chars a user can enter for their render file name
 * @extends React.Component
 */
class Render extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExportModalOpen: false,
      exportInputValue: "",
    };

    // Maximum number of characters the user can enter into the export input
    this.maxNameLength = 100;
  }

  /**
   * Exports current frame of canvas to an image and closes the export modal.
   */
  onExportImage = (filename) => {
    // Export the image
    this.props.callbacks.onExportImage(filename);

    // Close the modal
    this.setState({ isExportModalOpen: false });
  };

  /**
   * Handler for changes in the export input.
   * @param {Event} e
   */
  handleExportInputChange = (e) => {
    let { value } = e.target;

    // Trim any excess white-space
    value = value.trim();

    if (value.length <= this.maxNameLength) {
      this.setState({ exportInputValue: value });
    }
  };

  createExportModal = () => {
    // True is empty, false otherwise
    const isExportInputEmpty = this.state.exportInputValue.length === 0;

    return (
      <Modal
        onClose={() => this.setState({ isExportModalOpen: false })}
        onOpen={() => this.setState({ isExportModalOpen: true })}
        open={this.state.isExportModalOpen}
        closeIcon
        size="mini"
      >
        <Modal.Header>Export Image As...</Modal.Header>
        <Modal.Content>
          <Input
            action={{
              content: "Export Image",
              disabled: isExportInputEmpty,
              onClick: this.onExportImage,
            }}
            fluid
            value={this.state.exportInputValue}
            onChange={this.handleExportInputChange}
            error={isExportInputEmpty}
            placeholder="Enter image name..."
          />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    return (
      <React.Fragment>
        {/*this.createExportModal()*/}

        <SubmitTextModal
          onClose={() => this.setState({ isExportModalOpen: false })}
          onOpen={() => this.setState({ isExportModalOpen: true })}
          open={this.state.isExportModalOpen}
          onSubmit={this.onExportImage}
          header="Export Image As..."
          button="Export Image"
          placeholder="Enter image name..."
        />

        <Dropdown text="Render" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => this.setState({ isExportModalOpen: true })}
            >
              Export Scene to Image
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default Render;
