export default function EducationSection({ entries, loading, error }) {
  return (
    <section id="education" className="bg-slate-950 py-20 text-slate-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
            Education
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Degrees, credentials, and continuous learning
          </h2>
        </div>

        {loading && (
          <p className="mt-10 text-sm font-medium text-slate-400">Loading education…</p>
        )}
        {error && (
          <p className="mt-10 rounded-2xl border border-rose-400/40 bg-rose-950/40 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {(entries || []).map((edu) => (
            <article
              key={edu.degree}
              className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-300">
                {edu.period}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{edu.degree}</h3>
              <p className="mt-2 text-sm text-slate-300">{edu.institution}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {edu.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-indigo-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
