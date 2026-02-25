const API_URL = "https://script.google.com/macros/s/AKfycbwj29oK28hyl7jqRL5gKyHgjIMZuA9PTiVtetX_80pY8f1SWHtnmCwvBmJp02heD7PcYg/exec";

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
