export default function ExperienceSection({ entries, loading, error }) {
  return (
    <section id="experience" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Career timeline
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Experience across telecom, insurance, and platform engineering
          </h2>
        </div>

        {loading && (
          <p className="mt-10 text-sm font-medium text-slate-500">Loading experience from the API…</p>
        )}
        {error && (
          <p className="mt-10 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </p>
        )}

        <div className="relative mt-14 pl-4 md:pl-8">
          <div className="absolute left-3 top-2 bottom-4 w-px bg-gradient-to-b from-teal-400 via-indigo-300 to-slate-200 md:left-5" />
          <ol className="space-y-10">
            {(entries || []).map((job, idx) => (
              <li key={`${job.company}-${idx}`} className="relative pl-10 md:pl-14">
                <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-teal-400 shadow md:left-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
                </span>
                <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{job.role}</h3>
                      <p className="text-sm font-medium text-indigo-800">{job.company}</p>
                    </div>
                    <div className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500 md:text-sm">
                      <p>{job.period}</p>
                      {job.location && <p className="mt-1 text-slate-400">{job.location}</p>}
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                    {job.achievements.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-teal-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
