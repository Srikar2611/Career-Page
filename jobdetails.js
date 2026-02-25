const API_URL = "https://script.google.com/macros/s/AKfycbygG1-fWQ9Z68ixv2ijQzFVx2SxuvjjY1xG3u8sfejNxpkD3O8RaEk1USUG1agZbDiQaA/exec";

const params = new URLSearchParams(window.location.search);
const jobID = params.get("id");

fetch(API_URL)
  .then(res => res.json())
  .then(jobs => {

    const job = jobs.find(j => j.JobID == jobID);

    document.getElementById("jobDetails").innerHTML = `
      <h1>${job.Title}</h1>
      <p><b>Department:</b> ${job.Department}</p>
      <p><b>Experience:</b> ${job.Experience}</p>
      <p><b>Location:</b> ${job.Location}</p>
      <p><b>Job Type:</b> ${job.JobType}</p>
      <p><b>Skills:</b> ${job.Skills}</p>
      <hr>
      <p>${job.FullDescription}</p>
      <a class="btn" href="https://forms.gle/zwUweRbLsiTjsJGk9">Apply Now</a>
    `;
  });
