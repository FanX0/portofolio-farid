import NavbarClient from "./Navbar.client";

type NavbarProps = {
  onToggle: () => void;
};

export default function Navbar({ onToggle }: NavbarProps) {
  return <NavbarClient onToggle={onToggle} />;
}
