const numpad = document.getElementById("numpad");
const input = document.getElementById("input");
const darkThemToggler = document.getElementById("darkThemToggler");

const items = ["(",")","⌫","/",
              "7","8","9","*",
              "4","5","6","-",
              "1","2","3","+",
              "C","0",".","="];

items.forEach(item => {
  const button = document.createElement("button");
  button.textContent = item;
  button.className = "np-button";
  button.addEventListener("click", (event) => {
    buttonClick(item);
  });
  numpad.appendChild(button);
});

function buttonClick(button) {
  if(button === "=") {
    input.value = eval(input.value);
  } else if(button === "C") {
    input.value = "";
  } else if(button === "⌫") {
    input.value = input.value.slice(0, -1);
  } else {
    input.value = input.value + button;
  }
}

function darkToggle() {
  document.body.classList.toggle("dark-theme");
  input.classList.toggle("dark-theme");
  darkThemToggler.classList.toggle("dark-theme");
  document.querySelectorAll(".np-button").forEach(button => {
      button.classList.toggle("dark-theme")
    });
}

darkThemToggler.addEventListener("click", darkToggle);