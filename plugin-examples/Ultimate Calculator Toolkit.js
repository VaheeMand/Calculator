/**
 * Plugin Name: Ultimate Calculator Toolkit
 * Description: A comprehensive wrapper/example for adding UI elements, styles, and logic.
 */

(function() {
    // --- 1. ACCESS EXISTING ELEMENTS ---
    // We grab the main components of your calculator
    const ui = {
        numpad: document.getElementById("numpad"),
        input: document.getElementById("input"),
        menu: document.getElementById("pluginsMenu"),
        body: document.body
    };

    // --- 2. HELPER FUNCTIONS (The Wrapper) ---
    const Toolkit = {
        // Easily add a new button to the grid
        addButton: (label, onClick, customClass = "") => {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.className = "np-button " + customClass;
            btn.style.backgroundColor = "var(--btn-hover)"; // Visual distinction
            btn.onclick = onClick;
            ui.numpad.appendChild(btn);
            return btn;
        },

        // Inject custom CSS into the page
        addStyles: (css) => {
            const styleSheet = document.createElement("style");
            styleSheet.innerText = css;
            document.head.appendChild(styleSheet);
        },

        // Append text or elements to the plugin menu
        addToMenu: (htmlContent) => {
            const div = document.createElement("div");
            div.style.padding = "10px";
            div.innerHTML = htmlContent;
            ui.menu.appendChild(div);
        }
    };

    // --- 3. DEMONSTRATING CAPABILITIES ---

    // A. Add a custom style (changing the input glow)
    Toolkit.addStyles(`
        #input:focus {
            box-shadow: 0 0 15px rgba(0, 255, 127, 0.5);
            color: #00ff7f;
        }
        .plugin-btn-special {
            border: 2px solid #636366 !important;
            font-style: italic;
        }
    `);

    // B. Add a functional button: "Pi"
    Toolkit.addButton("π", () => {
        ui.input.value += Math.PI.toFixed(5);
    });

    // C. Add a utility button: "Clear Last Char" (Alternative to ⌫)
    Toolkit.addButton("DEL", () => {
        ui.input.value = ui.input.value.slice(0, -1);
    }, "plugin-btn-special");

    // D. Add a "Greet" functionality to the Plugin Menu
    Toolkit.addToMenu(`
        <hr style="width: 80%; opacity: 0.2">
        <p style="font-size: 0.8rem; color: var(--accent-text)">
            SDK Active: V1.0 <br>
            User: Explorer
        </p>
    `);

    // E. Intercept or Modify Behavior
    // Example: Let's log every time the user types in the input
    ui.input.addEventListener('input', (e) => {
        console.log("Current calculation: ", e.target.value);
    });

    console.log("Ultimate Toolkit Plugin Loaded Successfully.");
})();
