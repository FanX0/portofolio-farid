import NavbarClient from "./Navbar.client";

type NavbarProps = {
  onToggle: () => void;
  isOpen: boolean;
};

export default function Navbar({ onToggle, isOpen }: NavbarProps) {
  return <NavbarClient onToggle={onToggle} isOpen={isOpen} />;
}
