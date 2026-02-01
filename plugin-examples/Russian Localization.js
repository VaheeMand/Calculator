/**
 * Plugin Name: Russian Localization
 * Description: Translates the interface, menu titles, and buttons into Russian.
 */

(function() {
    const Toolkit = {
        patchWindow: () => {
            const originalAlert = window.alert;
            window.alert = (message) => {
                if (message.includes("added")) {
                    const name = message.split('"')[1];
                    return originalAlert(`Плагин "${name}" добавлен!`);
                }
                return originalAlert(message);
            };

            const originalConfirm = window.confirm;
            window.confirm = (message) => {
                if (message.includes("Remove")) {
                    const name = message.split('"')[1];
                    return originalConfirm(`Удалить "${name}"?`);
                }
                if (message.includes("already exists")) {
                    const name = message.split('"')[1];
                    return originalConfirm(`Плагин "${name}" уже существует. Перезаписать?`);
                }
                return originalConfirm(message);
            };
        },

        translateUI: () => {
            document.querySelectorAll(".np-button").forEach(btn => {
                const map = {
                    "plug-s": "плаг.",
                    "round": "окр.",
                    "abs": "abs",
                    "pow": "степ.",
                    "exp": "exp",
                    "sin": "sin",
                    "cos": "cos",
                    "tan": "tan",
                    "atan2": "atan2",
                    "log": "log"
                };
                if (map[btn.textContent]) btn.textContent = map[btn.textContent];
            });

            const uploadBtn = document.querySelector(".upload-plugin-btn");
            if (uploadBtn) uploadBtn.textContent = "Загрузить";
            
            const title = document.querySelector("#pluginsMenu h3");
            if (title) title.textContent = "Плагины";
        }
    };

    Toolkit.patchWindow();

    setTimeout(() => Toolkit.translateUI(), 50);

    const originalRender = window.renderPluginList;
    window.renderPluginList = function() {
        if (originalRender) originalRender();
        const container = document.getElementById("plugin-list");
        if (container && container.innerHTML.includes("There are no plugins yet")) {
            container.innerHTML = '<p style="color:#888; text-align:center;">Пусто</p>';
        }
    };
})();
