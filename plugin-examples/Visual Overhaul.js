/**
 * Plugin Name: Visual Overhaul Toolkit
 * Description: Applies a global lime color and a tricolor linear gradient background to all elements.
 */

(function() {
    const Toolkit = {
        addStyles: (css) => {
            const styleSheet = document.createElement("style");
            styleSheet.innerText = css;
            document.head.appendChild(styleSheet);
        }
    };

    Toolkit.addStyles(`
        * {
            color: lime !important;
            background: linear-gradient(white, blue, red) !important;
        }
    `);
})();
