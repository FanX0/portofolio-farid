"use client";
import { useBreakpointReload } from "@/app/hooks/useBreakpointReload";

export default function GlobalBreakpointReload() {
  useBreakpointReload("(min-width: 80rem)");
  return null;
}
