import React from "react";
import { Modal, Input } from "semantic-ui-react";

/**
 * Full page modal with a single controlled input and
 * a submit button.
 * @extends React.Component
 */
class SubmitTextModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
    };

    // Default max chars
    this.maxNameLength = 100;
  }

  /**
   * Handler for changes in the input.
   * @function
   * @param {Event} e
   */
  handleInputChange = (e) => {
    let { value } = e.target;

    // Trim any excess white-space
    value = value.trim();

    if (value.length <= this.maxNameLength) {
      this.setState({ inputValue: value });
    }
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.inputValue);
  };

  createModal = () => {
    // True if empty, false otherwise
    const isInputEmpty = this.state.inputValue.length === 0;

    return (
      <Modal
        onClose={this.props.onClose}
        onOpen={this.props.onOpen}
        open={this.props.open}
        closeIcon
        size="mini"
      >
        <Modal.Header>{this.props.header}</Modal.Header>
        <Modal.Content>
          <Input
            action={{
              content: this.props.submit,
              disabled: isInputEmpty,
              onClick: this.onSubmit,
            }}
            fluid
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            error={isInputEmpty}
            placeholder={this.props.placeholder}
          />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    return this.createModal();
  }
}

export default SubmitTextModal;
