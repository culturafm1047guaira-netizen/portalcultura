import React from "react";
import { getRemoteJobs } from "@/lib/jobicy";

const jobTypeLabels: Record<string, string> = {
  "full-time": "Integral",
  freelance: "Freelance",
  contract: "Contrato",
  "part-time": "Meio Período",
};

const JobicySection = async () => {
  const jobs = await getRemoteJobs(8, "brazil");

  if (jobs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color: "#0d9488" }}>
          💼 Vagas Remotas
        </h2>
        <div className="flex-1 border-b border-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <a
            key={job.id}
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-slate-800 border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              {job.companyLogo && (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-8 h-8 rounded object-contain"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-dark-bg dark:text-white truncate">
                  {job.jobTitle}
                </p>
                <p className="text-[10px] text-text-muted truncate">
                  {job.companyName}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-[8px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 px-1.5 py-0.5 rounded">
                {jobTypeLabels[job.jobType] || job.jobType}
              </span>
              {job.jobLevel && (
                <span className="text-[8px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 px-1.5 py-0.5 rounded">
                  {job.jobLevel}
                </span>
              )}
            </div>
            {(job.annualSalaryMin || job.annualSalaryMax) && (
              <p className="text-[10px] font-bold text-teal-700 dark:text-teal-300 mt-auto">
                {job.annualSalaryMin && `$${job.annualSalaryMin}`}
                {job.annualSalaryMin && job.annualSalaryMax && " - "}
                {job.annualSalaryMax && `$${job.annualSalaryMax}`}
                {job.salaryCurrency && ` ${job.salaryCurrency}`}
              </p>
            )}
          </a>
        ))}
      </div>

      <div className="mt-4 text-right">
        <a
          href="https://jobicy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 transition-colors"
        >
          via Jobicy →
        </a>
      </div>
    </div>
  );
};

export default JobicySection;
