import { FaGithub } from "react-icons/fa";

export default function DynamicIcon(props: any) {
  const { icon, size } = props;

  switch (icon) {
    case "GitHub":
      return (
        <span className="text-center self-center ml-2">
          <FaGithub size={size} className="text-white" />
        </span>
      );

    default:
      return <span>no icon</span>;
  }
}
