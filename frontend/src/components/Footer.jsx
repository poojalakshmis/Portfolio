export default function Footer({ profile }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-8 text-center text-xs text-slate-500">
      <p className="text-slate-400">
        © {new Date().getFullYear()} {profile.fullName}. Crafted with React, Tailwind CSS, and Spring
        Boot microservices.
      </p>
    </footer>
  );
}
