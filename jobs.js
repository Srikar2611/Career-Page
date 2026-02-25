const API_URL = "https://script.google.com/macros/s/AKfycbygG1-fWQ9Z68ixv2ijQzFVx2SxuvjjY1xG3u8sfejNxpkD3O8RaEk1USUG1agZbDiQaA/exec";

async function loadJobs() {
  try {
    console.log("Fetching jobs from API...");
    const res = await fetch(API_URL);
    const jobs = await res.json();
    console.log("Jobs received:", jobs);

    const container = document.getElementById("jobsContainer");

    if (!container) {
      console.error("jobsContainer not found in HTML");
      return;
    }

    container.innerHTML = "";

    // If no rows exist in sheet
    if (!jobs || jobs.length === 0) {
      container.innerHTML = "<p>No jobs available.</p>";
      return;
    }

    // Create job cards
    jobs.forEach(job => {

      // Only show OPEN jobs
      if (String(job.Status).trim().toLowerCase() !== "open") return;

      const card = document.createElement("div");
      card.className = "job-card";

      card.innerHTML = `
        <h3>${job.Title}</h3>
        <p><strong>Department:</strong> ${job.Department}</p>
        <p><strong>Experience:</strong> ${job.Experience}</p>
        <p><strong>Location:</strong> ${job.Location}</p>
        <p>${job.ShortDesc}</p>
        <a class="btn" href="job.html?id=${job.JobID}">More Details</a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading jobs:", err);
    document.getElementById("jobsContainer").innerHTML =
      "<p>Error loading jobs. Check console.</p>";
  }
}

loadJobs();
