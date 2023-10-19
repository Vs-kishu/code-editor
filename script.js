const html_code = document.querySelector(".html-code textarea");
const css_code = document.querySelector(".css-code textarea");
const js_code = document.querySelector(".js-code textarea");
const result = document.querySelector("#result");

const saveButton = document.querySelector("#save-button");
const lockButton = document.querySelector("#lock-button");

const copyHtmlButton = document.querySelector("#copy-html-button");
const copyCssButton = document.querySelector("#copy-css-button");
const copyJsButton = document.querySelector("#copy-js-button");

copyHtmlButton.addEventListener("click", () => {
  navigator.clipboard.writeText(html_code.value);
  alert("HTML code copied to clipboard");
});

copyCssButton.addEventListener("click", () => {
  navigator.clipboard.writeText(css_code.value);
  alert("CSS code copied to clipboard");
});

copyJsButton.addEventListener("click", () => {
  navigator.clipboard.writeText(js_code.value);
  alert("JavaScript code copied to clipboard");
});

// Function to save the code to local storage
saveButton.addEventListener("click", () => {
  localStorage.setItem("html_code", html_code.value);
  localStorage.setItem("css_code", css_code.value);
  localStorage.setItem("js_code", js_code.value);
  alert("Code saved to local storage");
});

// Function to toggle the lock/unlock state
let isLocked = false;
lockButton.addEventListener("click", () => {
  isLocked = !isLocked;
  lockButton.textContent = isLocked ? "Unlock" : "Lock";
  html_code.disabled = isLocked;
  css_code.disabled = isLocked;
  js_code.disabled = isLocked;
});
const styleType = document.querySelector("#style-type");
styleType.addEventListener("change", run);
function run() {
  const styleType = document.querySelector("#style-type").value;
  if (styleType === "css") {
    result.contentDocument.body.innerHTML =
      `<style>${css_code.value}</style>` + html_code.value;
  } else if (styleType === "scss") {
    // Compile SCSS to CSS using Sass.js
    const scssCode = css_code.value;

    Sass.compile(scssCode, function (res) {
      if (res.status === 0) {
        const compiledCss = res.text;

        result.contentDocument.body.innerHTML =
          `<style>${compiledCss}</style>` + html_code.value;
      } else {
        console.error("SCSS compilation error:", result.formatted);
      }
    });
  }

  result.contentWindow.eval(js_code.value);
}

// Checking if the user is typing anything in the input field
html_code.onkeyup = () => run();
css_code.onkeyup = () => run();
js_code.onkeyup = () => run();

// Accessing data stored in Local Storage. To make it more advanced, you could check if there is any data stored in Local Storage.
html_code.value = localStorage.html_code || "";
css_code.value = localStorage.css_code || "";
js_code.value = localStorage.js_code || "";

run();
