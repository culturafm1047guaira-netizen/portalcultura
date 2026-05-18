import React from "react";
import { getRemoteJobs } from "@/lib/jobicy";

const jobTypeLabels: Record<string, string> = {
  "full-time": "Integral",
  freelance: "Freelance",
  contract: "Contrato",
  "part-time": "Meio Período",
};

const JobicyWidget = async () => {
  const jobs = await getRemoteJobs(5, "brazil");

  if (jobs.length === 0) return null;

  return (
    <div className="flex flex-col">
      <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-teal-600 pb-1 inline-block w-fit">
        Vagas Remotas 💼
      </h3>
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-200 dark:border-teal-800/30 rounded-lg shadow-sm hover:shadow-md transition-shadow divide-y divide-teal-200/50 dark:divide-teal-800/30">
        {jobs.map((job) => (
          <a
            key={job.id}
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 hover:bg-teal-100/30 dark:hover:bg-teal-800/20 transition-colors first:rounded-t-lg last:rounded-b-lg"
          >
            <div className="flex items-start gap-2.5">
              {job.companyLogo && (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-8 h-8 rounded object-contain shrink-0 mt-0.5"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-dark-bg dark:text-white leading-tight truncate">
                  {job.jobTitle}
                </p>
                <p className="text-[10px] text-text-muted truncate">
                  {job.companyName}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="text-[8px] font-bold uppercase tracking-wider bg-teal-200/50 dark:bg-teal-800/40 text-teal-800 dark:text-teal-200 px-1.5 py-0.5 rounded">
                    {jobTypeLabels[job.jobType] || job.jobType}
                  </span>
                  {job.jobLevel && (
                    <span className="text-[8px] font-bold uppercase tracking-wider bg-teal-200/50 dark:bg-teal-800/40 text-teal-800 dark:text-teal-200 px-1.5 py-0.5 rounded">
                      {job.jobLevel}
                    </span>
                  )}
                </div>
                {(job.annualSalaryMin || job.annualSalaryMax) && (
                  <p className="text-[9px] font-bold text-teal-700 dark:text-teal-300 mt-1">
                    {job.annualSalaryMin && `$${job.annualSalaryMin}`}
                    {job.annualSalaryMin && job.annualSalaryMax && " - "}
                    {job.annualSalaryMax && `$${job.annualSalaryMax}`}
                    {job.salaryCurrency && ` ${job.salaryCurrency}`}
                  </p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
      <a
        href="https://jobicy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[9px] font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 mt-2 text-right"
      >
        via Jobicy →
      </a>
    </div>
  );
};

export default JobicyWidget;
