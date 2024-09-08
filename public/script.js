document.getElementById("runButton").addEventListener("click", () => {
  // Get HTML, CSS, and JavaScript content from the textareas
  const htmlContent = document.getElementById("htmlEditor").value;
  const cssContent =
    "<style>" + document.getElementById("cssEditor").value + "</style>";
  const jsContent = document.getElementById("jsEditor").value;

  // Inject the HTML, CSS, and JS into the iframe
  const outputWindow =
    document.getElementById("outputWindow").contentWindow.document;
  outputWindow.open();
  outputWindow.write(
    htmlContent + cssContent + "<script>" + jsContent + "</script>"
  );
  outputWindow.close();

  // Capture console.log outputs
  const consoleOutput = document.getElementById("consoleOutput");
  consoleOutput.innerHTML = ""; // Clear the console
  try {
    // Redirect console.log to display output in console window
    const consoleLog = console.log;
    console.log = function (message) {
      consoleOutput.innerHTML += message + "<br>";
      consoleLog.apply(console, arguments);
    };
    eval(jsContent); // Execute JS code
    console.log = consoleLog; // Restore the original console.log
  } catch (error) {
    consoleOutput.innerHTML += "Error: " + error + "<br>";
  }
});
