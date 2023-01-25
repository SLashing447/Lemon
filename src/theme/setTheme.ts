export default function _setTheme(theme: string | null) {
    localStorage.setItem("lemon-web-theme", theme ? theme : "");

    const style = document.getElementById("theme-style");
    if (style === null) {
        return;
    }
    switch (theme) {
        case "dark":
            style!.innerHTML = "@import url('./src/style/theme/dark.css')";
            break;
        case "obsidian":
            style!.innerHTML = "@import url('./src/style/theme/obsidian.css')";
            break;
        case "m-light":
            style!.innerHTML = "@import url('./src/style/theme/moonLight.css')";
            break;
        default:
            // falback
            style!.innerHTML = "@import url('./src/style/theme/dark.css')";
            break;
    }

    // const head = document.head;
    // head.appendChild
}
