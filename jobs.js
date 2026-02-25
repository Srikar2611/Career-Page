const API_URL = "https://script.google.com/macros/s/AKfycbygG1-fWQ9Z68ixv2ijQzFVx2SxuvjjY1xG3u8sfejNxpkD3O8RaEk1USUG1agZbDiQaA/exec";

async function loadJobs() {
  try {
    const res = await fetch(API_URL);
    const jobs = await res.json();

    const container = document.getElementById("jobsContainer");
    container.innerHTML = "";

    if (!jobs.length) {
      container.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    jobs.forEach(job => {

      if (String(job.Status).trim().toLowerCase() !== "open") return;

      const card = document.createElement("div");
      card.className = "job-card";

      card.innerHTML = `
        <h3>${job.Title}</h3>
        <p><b>Department:</b> ${job.Department}</p>
        <p><b>Experience:</b> ${job.Experience}</p>
        <p><b>Skills:</b> ${job.Skills}</p>
        <p>${job.ShortDesc}</p>
        <a class="btn" href="job.html?id=${job.JobID}">More Details</a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    document.getElementById("jobsContainer").innerHTML = "Error loading jobs.";
    console.error(err);
  }
}

loadJobs();
