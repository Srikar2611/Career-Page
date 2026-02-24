const sheetURL = "https://docs.google.com/spreadsheets/d/17qPQSZ18pB8ayPIP2yb_jxRLznWno8ypa9gCnBVpjFk/edit?resourcekey=&gid=1149977252#gid=1149977252";

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {

    const rows = csv.split("\n").slice(1);
    const container = document.getElementById("jobsContainer");

    rows.forEach(row => {
      const cols = row.split(",");

      const jobID = cols[0];
      const title = cols[1];
      const dept = cols[2];
      const exp = cols[3];
      const skills = cols[6];
      const shortDesc = cols[7];
      const status = cols[9];

      if(status !== "Open") return;

      const card = `
        <div class="job-card">
          <h3>${title}</h3>
          <p><b>Department:</b> ${dept}</p>
          <p><b>Experience:</b> ${exp}</p>
          <p><b>Skills:</b> ${skills}</p>
          <p>${shortDesc}</p>
          <a class="btn" href="job.html?id=${jobID}">More Details</a>
        </div>
      `;

      container.innerHTML += card;
    });
  });
