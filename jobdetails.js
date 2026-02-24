const sheetURL = "https://docs.google.com/spreadsheets/d/17qPQSZ18pB8ayPIP2yb_jxRLznWno8ypa9gCnBVpjFk/edit?usp=sharing";
const params = new URLSearchParams(window.location.search);
const jobID = params.get("id");

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {

    const rows = csv.split("\n").slice(1);

    rows.forEach(row => {
      const cols = row.split(",");

      if(cols[0] !== jobID) return;

      const title = cols[1];
      const dept = cols[2];
      const exp = cols[3];
      const loc = cols[4];
      const type = cols[5];
      const skills = cols[6];
      const fullDesc = cols[8];

      document.getElementById("jobDetails").innerHTML = `
        <h1>${title}</h1>
        <p><b>Department:</b> ${dept}</p>
        <p><b>Experience:</b> ${exp}</p>
        <p><b>Location:</b> ${loc}</p>
        <p><b>Job Type:</b> ${type}</p>
        <p><b>Skills:</b> ${skills}</p>
        <hr>
        <p>${fullDesc}</p>
        <a class="btn" href="PASTE_GOOGLE_FORM_LINK">Apply Now</a>
      `;
    });

  });
