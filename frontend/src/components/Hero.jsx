function publicAssetUrl(fileName) {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = base.endsWith("/") ? base : `${base}/`;
  return `${normalized}${fileName.replace(/^\//, "")}`;
}

export default function Hero({ profile }) {
  const resumeHref = publicAssetUrl(profile.resumeFileName);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
            {profile.location}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {profile.fullName}
          </h1>
          <p className="mt-3 text-lg font-medium text-teal-200 md:text-xl">
            {profile.heroTitle}
          </p>
          <p className="mt-2 text-sm text-slate-300">{profile.currentRoleTitle}</p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">
            {profile.heroLead}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100"
              >
                {lang}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={resumeHref}
              download={profile.resumeFileName}
              className="inline-flex items-center justify-center rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-teal-300"
            >
              Download ATS-Friendly Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300/60 hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Word format for broad ATS compatibility. For PDF, open the file in Word →{" "}
            <span className="text-slate-300">Save As → PDF</span>, then replace{" "}
            <span className="font-mono text-teal-200">public/{profile.resumeFileName}</span> or add a second link in{" "}
            <span className="font-mono text-teal-200">profile.js</span>.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white">Snapshot</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                Open to opportunities
              </span>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-slate-400">Email</dt>
                <dd className="text-right font-medium text-white">{profile.email}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-slate-400">Phone</dt>
                <dd className="text-right font-medium text-white">{profile.phone}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-slate-400">Core stack</dt>
                <dd className="max-w-[60%] text-right font-medium text-teal-100">
                  Java · Spring Boot · Microservices · React · Cloud-native delivery
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Focus</dt>
                <dd className="max-w-[60%] text-right font-medium text-slate-100">
                  Reliable backends, measurable observability, and mentor-led engineering culture.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
