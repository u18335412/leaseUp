import { FC } from "react";
import Link from "next/link";
import { ChevronRight, LayoutDashboard } from "lucide-react";

export const Breadcrumb: FC<{
  links: { name: string; href: string; current: boolean }[];
}> = ({ links }) => {
  return (
    <nav className="flex pt-3 md:pt-6" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <LayoutDashboard
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Dashboard</span>
            </a>
          </div>
        </li>
        {links.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRight
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
