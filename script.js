const numpad = document.getElementById("numpad");
const numpad2 = document.getElementById("numpad2");
const pluginsMenu = document.getElementById("pluginsMenu");
const overlay = document.getElementById("overlay");
const input = document.getElementById("input");
const fileinput = document.getElementById("fileinput");
const darkThemToggler = document.getElementById("darkThemToggler");

const items = ["(",")","⌫","/",
              "7","8","9","*",
              "4","5","6","-",
              "1","2","3","+",
              "C","0",".","=",
              "√",",","abs",
              "exp","pow","round",
              "sin","cos","tan",
              "atan2","log","plug-s"]

items.forEach(item => {
  const button = document.createElement("button");
  button.textContent = item;
  button.className = "np-button";
  button.addEventListener("click", () => {
    buttonClick(item);
  });
  numpad.appendChild(button);
});

function buttonClick(button) {
  switch(button) {
    case "=":
      input.value = eval(input.value);
      break;
    case "C":
      input.value = "";
      break;
    case "⌫":
      input.value = input.value.slice(0, -1);
      break;
    case "√":
      input.value = input.value + "Math.sqrt(";
      break;
    case "exp":
      input.value = input.value + "Math.exp(";
      break;
    case "pow":
      input.value = input.value + "Math.pow(";
      break;
    case "abs":
      input.value = input.value + "Math.abs(";
      break;
    case "round":
      input.value = input.value + "Math.round(";
      break;
    case "sin":
      input.value = input.value + "Math.sin(";
      break;
    case "cos":
      input.value = input.value + "Math.cos(";
      break;
    case "tan":
      input.value = input.value + "Math.tan(";
      break;
    case "atan2":
      input.value = input.value + "Math.atan2(";
      break;
    case "log":
      input.value = input.value + "Math.log(";
      break;
    case "plug-s":
      togglePlugins();
      break;
    default:
      input.value = input.value + button;
  }
}

function darkToggle() {
  document.documentElement.classList.toggle("dark");
}


function handlefileinput(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const fileContent = e.target.result;
      addPlugin("test", fileContent);
    }
  }
}

darkThemToggler.addEventListener("click", darkToggle);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    togglePlugins();
  }
});

function renderPluginList() {
  const container = document.getElementById("plugin-list");
  if (!container) return;

  container.innerHTML = "";

  if (plugins.length === 0) {
    container.innerHTML = '<p style="color:#888; text-align:center;">There are no plugins yet</p>';
    return;
  }

  plugins.forEach(plugin => {
    const item = document.createElement("div");
    item.className = "plugin-item";
    item.innerHTML = `
      <span>${plugin.name || "No name"}</span>
      <button data-id="${plugin.id}" class="remove-plugin">×</button>
    `;
    container.appendChild(item);
  });

  container.querySelectorAll(".remove-plugin").forEach(btn => {
    btn.onclick = () => {
      if (confirm(`Remove "${plugins.find(p => p.id === btn.dataset.id)?.name}"?`)) {
        removePlugin(btn.dataset.id);
      }
    };
  });
}

fileinput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = evt => {
    const code = evt.target.result;
    const name = file.name.replace(/\.js$/i, "");

    if (plugins.some(p => p.name === name)) {
      if (!confirm(`A plugin named "${name}" already exists. Overwrite it?`)) {
        return;
      }
      plugins = plugins.filter(p => p.name !== name);
    }

    addPlugin(name, code);
    alert(`Plugin "${name}" added!`);
    e.target.value = "";
  };
  reader.readAsText(file);
});

function togglePlugins() {
  overlay.classList.toggle("active");
  pluginsMenu.classList.toggle("active");

  if (pluginsMenu.classList.contains("active")) {
    renderPluginList();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderPluginList();
});
