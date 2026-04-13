const links = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
  { href: "#share", label: "Share" },
];

export default function Navbar({ profile }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-white md:text-base"
        >
          {profile.fullName}
          <span className="ml-2 hidden text-teal-300 sm:inline">· Portfolio</span>
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-slate-200 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition hover:text-teal-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 text-xs font-semibold text-teal-200 transition hover:border-teal-300 hover:bg-teal-500/20 md:text-sm"
        >
          LinkedIn
        </a>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-white/5 px-6 py-2 text-xs font-medium text-slate-300 md:hidden">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="whitespace-nowrap hover:text-teal-300">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
