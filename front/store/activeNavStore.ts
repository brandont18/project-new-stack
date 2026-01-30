import { usePathname } from "next/navigation";

export function useActiveNav(paths: string[]) {
  const pathname = usePathname();
  return (target: string) => {
    if (target === "/" && pathname === "/dashboard") return true;
    if (target === pathname) return true;
    if (target !== "/" && pathname.startsWith(target)) return true;
    return false;
  };
}
