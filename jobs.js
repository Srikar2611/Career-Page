const API_URL = "https://script.google.com/macros/s/AKfycbwj29oK28hyl7jqRL5gKyHgjIMZuA9PTiVtetX_80pY8f1SWHtnmCwvBmJp02heD7PcYg/exec";

async function loadJobs() {
    try {
        const response = await fetch(API_URL);
        const jobs = await response.json();

        const container = document.getElementById("jobsContainer");
        container.innerHTML = "";

        if (!jobs.length) {
            container.innerHTML = "<p>No open positions right now.</p>";
            return;
        }

        jobs.forEach(job => {

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

    } catch (error) {
        document.getElementById("jobsContainer").innerHTML =
            "<p>Error loading jobs.</p>";
        console.error(error);
    }
}

loadJobs();
