let plugins = [];

function loadPlugins() {
  const saved = localStorage.getItem("calculator-plugins");
  if (saved) {
    plugins = JSON.parse(saved);
  }
}

function savePlugins() {
  localStorage.setItem("calculator-plugins", JSON.stringify(plugins));
}

function addPlugin(name, code) {
  const id = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  plugins.push({ id, name, code });
  savePlugins();
  renderPluginList();
}

function removePlugin(id) {
  plugins = plugins.filter(p => p.id !== id);
  savePlugins();
  renderPluginList();
}

function runAllPlugins() {
  plugins.forEach(plugin => {
    try {
      new Function(plugin.code)();
      console.log(`Plugin ${plugin.name} has been launched`);
    } catch (err) {
      console.error(`Error in plugin ${plugin.name}:`, err);
    }
  });
}

loadPlugins();
runAllPlugins();
