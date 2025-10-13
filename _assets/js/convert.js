let latestHtml = "";

function convert() {
  const md = document.getElementById("markdown").value;
  const siteName = document.getElementById("name").value.trim() || "site";
  const htmlContent = marked.parse(md);
  const cssContent = document.getElementById("css").value;

  latestHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${siteName}</title>
<style>
  ${cssContent}
</style>
</head>
<body>
${htmlContent}
</body>
</html>`;

  const blob = new Blob([latestHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  document.getElementById("preview").src = url;
  document.getElementById("downloadButton").style.display = "inline-block";
  document.getElementById("viewCodeButton").style.display = "inline-block";
}

function downloadHtml() {
  const siteName = document.getElementById("name").value.trim() || "site";
  const blob = new Blob([latestHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${siteName}-link-in-bio-website.html`;
  a.click();
}

function viewCode() {
  const escaped = latestHtml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const win = window.open("", "_blank");
  win.document.write(`
    <html>
      <head>
        <title>Generated Code</title>
        <style>
          body {
            background: #0d1b2a;
            color: #d5dbdb;
            font-family: monospace;
            padding: 2rem;
          }
          pre {
            white-space: pre-wrap;
            word-break: break-word;
          }
        </style>
      </head>
      <body>
        <h1>Generated HTML</h1>
        <pre>${escaped}</pre>
      </body>
    </html>
  `);
}