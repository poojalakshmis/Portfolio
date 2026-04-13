function barColor(p) {
  if (p >= 90) return "from-teal-400 to-emerald-400";
  if (p >= 80) return "from-sky-400 to-teal-400";
  return "from-indigo-400 to-sky-400";
}

export default function SkillsSection({ categories, softSkills, loading, error }) {
  return (
    <section id="skills" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
            Technical depth
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Skills that ship resilient software
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Pulled from your live portfolio API so recruiters always see the same JSON your services
            expose—swap data in the Java repository when your resume evolves.
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-sm font-medium text-slate-500">Loading skills from the API…</p>
        )}
        {error && (
          <p className="mt-10 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </p>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {(categories || []).map((cat) => (
            <article
              key={cat.category}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-indigo-950">{cat.category}</h3>
              <div className="mt-5 space-y-4">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>{s.name}</span>
                      <span className="tabular-nums text-slate-400">{s.proficiency}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${barColor(s.proficiency)}`}
                        style={{ width: `${s.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-semibold text-slate-900">Collaboration & leadership</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
