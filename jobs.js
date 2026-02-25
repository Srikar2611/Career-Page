const API_URL = "https://script.google.com/macros/s/AKfycbwj29oK28hyl7jqRL5gKyHgjIMZuA9PTiVtetX_80pY8f1SWHtnmCwvBmJp02heD7PcYg/exec";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {

    const jobs = data;   // API returns array now
    const container = document.getElementById("jobsContainer");

    container.innerHTML = ""; // clear loading text

    jobs.forEach(job => {

      const card = `
        <div class="job-card">
          <h3>${job.Title}</h3>
          <p><b>Department:</b> ${job.Department}</p>
          <p><b>Experience:</b> ${job.Experience}</p>
          <p><b>Skills:</b> ${job.Skills}</p>
          <p>${job.ShortDesc}</p>
          <a class="btn" href="job.html?id=${job.JobID}">More Details</a>
        </div>
      `;

      container.innerHTML += card;
    });

  })
  .catch(err => console.error("API ERROR:", err));
