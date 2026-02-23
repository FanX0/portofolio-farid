import SidebarClient from "./Sidebar.Client";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return <SidebarClient isOpen={isOpen} onClose={onClose} />;
}
