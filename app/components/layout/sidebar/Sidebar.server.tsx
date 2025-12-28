import SidebarClient from "./Sidebar.Client";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  return <SidebarClient isOpen={isOpen} />;
}
