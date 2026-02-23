"use client";
import { useBreakpointReload } from "@/hooks/useBreakpointReload";

export default function GlobalBreakpointReload() {
  useBreakpointReload("(min-width: 80rem)");
  return null;
}
