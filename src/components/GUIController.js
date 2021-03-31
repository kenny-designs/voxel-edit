import React from "react";
import Viewport from "./Viewport";
import Brush from "./Brush";
import ColorPalette from "./ColorPalette";
import "./GUIController.css";
import {
  Modal,
  Button,
  Grid,
  Sidebar,
  Segment,
  Menu,
  Accordion,
} from "semantic-ui-react";

/**
 * Handles switching between both desktop and mobile versions of the
 * UI. Whenever one of its chidlren updates, it will pass that data
 * up to its parent component.
 * @extends React.Component
 */
class GUIController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      isColorModalOpen: false,
      desktop: {
        brushSettings: {
          activeIndices: [0],
        },
      },
    };
  }

  /**
   * Handler for screen resize events that updates whether or not the application
   * should currently be using the mobile or desktop GUI.
   */
  updateMobileState = () => {
    // If width below 768, use mobile GUI
    const isMobile = window.innerWidth < 768;
    this.setState({ isMobile });
  };

  /**
   * Handler for when an accordion on the brush settings is clicked.
   * @param {*} e
   * @param {*} titleProps
   */
  handleBrushAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndices } = this.state.desktop.brushSettings;

    // Make a copy of the array to avoid mutating the original
    const newActiveIndices = [...activeIndices];

    // If index is present, remove it. Otherwise, add to indices
    const pos = newActiveIndices.indexOf(index);
    if (pos !== -1) {
      newActiveIndices.splice(pos, 1);
    } else {
      newActiveIndices.push(index);
    }

    this.setState({
      desktop: {
        brushSettings: {
          ...this.state.desktop.brushSettings,
          activeIndices: newActiveIndices,
        },
      },
    });
  };

  componentDidMount() {
    // Perform initial check for mobile device
    this.updateMobileState();
    window.addEventListener("resize", this.updateMobileState);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMobileState);
  }

  /**
   * Creates the JSX for the desktop version of the viewport.
   * @returns {JSX}
   */
  createDesktopViewport() {
    return (
      <Sidebar.Pushable
        as={Segment}
        style={{ border: "none", borderRadius: "0" }}
      >
        <Sidebar as={Menu} inverted direction="top" visible width="very thin">
          <Menu.Item as="a">Undo</Menu.Item>
          <Menu.Item as="a">Redo</Menu.Item>
        </Sidebar>
        <Viewport onCanvasCreation={this.props.onCanvasCreation} />
      </Sidebar.Pushable>
    );
  }

  /**
   * Create the desktop version of the UI.
   * @returns {JSX}
   */
  createDesktopGUI() {
    const { activeIndices } = this.state.desktop.brushSettings;

    return (
      <Grid celled className={"desktopGrid"}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Accordion as={Menu} inverted vertical fluid exclusive={false}>
              <Menu.Item header>Brush Settings</Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  active={activeIndices.includes(0)}
                  content="Voxel"
                  index={0}
                  onClick={this.handleBrushAccordionClick}
                />
                <Accordion.Content active={activeIndices.includes(0)}>
                  <Brush onBrushChange={this.props.onBrushChange} />
                </Accordion.Content>
              </Menu.Item>
            </Accordion>

            <ColorPalette
              onGetColorData={this.props.onGetColorData}
              onSelectedColorChange={this.props.onSelectedColorChange}
              onNewSelectedColor={this.props.onNewSelectedColor}
            />
          </Grid.Column>

          <Grid.Column width={11} style={{ padding: "0" }}>
            {this.createDesktopViewport()}
          </Grid.Column>

          <Grid.Column width={2}>
            <h1>Right Panel</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  /**
   * Create the mobile version of the UI.
   * @returns {JSX}
   */
  createMobileGUI() {
    return (
      <div style={{ height: window.innerHeight }}>
        <Sidebar.Pushable
          as={Segment}
          style={{ border: "none", borderRadius: "0" }}
        >
          <Sidebar as={Menu} inverted direction="top" visible width="very thin">
            <Menu.Item
              as="a"
              onClick={() => this.setState({ isColorModalOpen: true })}
            >
              Color Palette
            </Menu.Item>
            <Menu.Item as="a">Edit</Menu.Item>
            <Menu.Item as="a">Camera</Menu.Item>
            <Menu.Item as="a">Project</Menu.Item>
          </Sidebar>

          {/* Color Selection Modal */}
          <Modal
            open={this.state.isColorModalOpen}
            onClose={() => this.setState({ isColorModalOpen: false })}
            onOpen={() => this.setState({ isColorModalOpen: true })}
          >
            <Modal.Header>Color Palette</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>
                <ColorPalette
                  onGetColorData={this.props.onGetColorData}
                  onSelectedColorChange={this.props.onSelectedColorChange}
                  onNewSelectedColor={this.props.onNewSelectedColor}
                />
              </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
              <Button
                onClick={() => this.setState({ isColorModalOpen: false })}
                primary
              >
                Close
              </Button>
            </Modal.Actions>
          </Modal>

          <Sidebar as={Menu} inverted direction="bottom" visible width="thin">
            <Brush onBrushChange={this.props.onBrushChange} />
          </Sidebar>

          <Viewport onCanvasCreation={this.props.onCanvasCreation} />
        </Sidebar.Pushable>
      </div>
    );
  }

  render() {
    // TODO: Change from arbitrary number
    return this.state.isMobile
      ? this.createMobileGUI()
      : this.createDesktopGUI();
  }
}

export default GUIController;
