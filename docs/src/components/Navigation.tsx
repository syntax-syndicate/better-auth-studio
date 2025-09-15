import Link from "next/link";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'INSTALLATION', href: '/installation' },
    { name: 'CHANGELOG', href: '/changelog' },
    { name: 'GITHUB', href: 'https://github.com/Kinfe123/better-auth-studio' }
  ];

  return (
    <nav className="absolute top-4 left-4 right-4 md:top-10 md:left-10 md:right-10 z-30">
      <ul className="hidden md:flex gap-8 lg:gap-12">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`text-sm font-light tracking-[0.2em] mix-blend-difference text-white hover:opacity-70 transition-opacity duration-300 ${
                currentPage === item.name.toLowerCase() || (currentPage === 'home' && item.name === 'HOME') ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
      <ul className="md:hidden flex flex-col gap-3 items-end">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`text-xs font-light tracking-[0.15em] mix-blend-difference text-white hover:opacity-70 transition-opacity duration-300 ${
                currentPage === item.name.toLowerCase() || (currentPage === 'home' && item.name === 'HOME') ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
