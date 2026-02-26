const API_URL = "https://script.google.com/macros/s/AKfycbygG1-fWQ9Z68ixv2ijQzFVx2SxuvjjY1xG3u8sfejNxpkD3O8RaEk1USUG1agZbDiQaA/exec";

async function loadJobs() {
  const container = document.getElementById("jobsContainer");

  try {
    container.innerHTML = "<p>Loading jobs...</p>";
    console.log("Fetching jobs from API...");

    const res = await fetch(API_URL);
    const jobs = await res.json();
    console.log("Jobs received:", jobs);

    if (!jobs || jobs.length === 0) {
      container.innerHTML = "<p>No jobs available.</p>";
      return;
    }

    // Filter only OPEN jobs first
    const openJobs = jobs.filter(job =>
      String(job.Status).trim().toLowerCase() === "open"
    );

    if (openJobs.length === 0) {
      container.innerHTML = "<p>No open roles right now.</p>";
      return;
    }

    // Clear loading text
    container.innerHTML = "";

    openJobs.forEach(job => {
      const card = document.createElement("div");
      card.className = "job-card";

      card.innerHTML = `
        <h3>${job.Title}</h3>
        <p><strong>Department:</strong> ${job.Department}</p>
        <p><strong>Experience:</strong> ${job.Experience}</p>
        <p><strong>Location:</strong> ${job.Location}</p>
        <p>${job.ShortDesc || ""}</p>
        <a class="apply-btn" href="job.html?id=${job.JobID}">
          View Details
        </a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading jobs:", err);
    container.innerHTML = "<p>Error loading jobs. Check console.</p>";
  }
}

loadJobs();
