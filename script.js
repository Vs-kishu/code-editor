const html_code = document.querySelector(".html-code textarea");
const css_code = document.querySelector(".css-code textarea");
const js_code = document.querySelector(".js-code textarea");
const result = document.querySelector("#result");

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
html_code.value = localStorage.html_code;
css_code.value = localStorage.css_code;
js_code.value = localStorage.js_code;

run();
