import { Menu } from "semantic-ui-react";

/**
 * Returns JSX with a link to the project's GitHub repo.
 * @TODO This component will likely be replaced when a Help dropdown is added.
 * Place the contents into there and remove this component when it is created.
 * @returns {JSX}
 */
const GitHubLink = () => {
  return (
    <Menu.Item
      href="https://github.com/kenny-designs/voxel-edit"
      target="_blank"
    >
      GitHub
    </Menu.Item>
  );
};

export default GitHubLink;
