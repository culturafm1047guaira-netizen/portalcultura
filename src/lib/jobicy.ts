export type JobicyJob = {
  id: number;
  url: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobIndustry: string;
  jobType: string;
  jobGeo: string;
  jobLevel: string;
  jobExcerpt: string;
  annualSalaryMin: string;
  annualSalaryMax: string;
  salaryCurrency: string;
};

export async function getRemoteJobs(
  count = 5,
  geo = "brazil"
): Promise<JobicyJob[]> {
  try {
    const res = await fetch(
      `https://jobicy.com/api/v2/remote-jobs?count=${count}&geo=${geo}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    if (!data.jobs) return [];

    return data.jobs.map((j: any) => ({
      id: j.id,
      url: j.url,
      jobTitle: j.jobTitle,
      companyName: j.companyName,
      companyLogo: j.companyLogo || "",
      jobIndustry: j.jobIndustry,
      jobType: j.jobType,
      jobGeo: j.jobGeo,
      jobLevel: j.jobLevel,
      jobExcerpt: j.jobExcerpt,
      annualSalaryMin: j.annualSalaryMin || "",
      annualSalaryMax: j.annualSalaryMax || "",
      salaryCurrency: j.salaryCurrency || "",
    }));
  } catch {
    return [];
  }
}
