import {
    handleClick,
    buyUpgrade,
    openChest,
    toggleEquip,
    subscribe,
    buySkin,
    setSkin,
    getUpgradeCost,
    getAutoPerSecond
} from "./game.js";

const zamknieta = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢏⠳⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣠⠞⠉⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⠈⠑⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠁⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀⠀⠀⠀⠈⠑⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠁⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⠀⠀⠀⠉⠒⢤⣀⠀⢌⡴⠋⠀⠀⠀⠀⠀⠀⢰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀⠀⣠⠤⠤⣀⠀⠀⠁⠋⠁⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⡴⠁⠀⠀⣾⡆⠀⠀⠀⡞⠉⠉⣲⠀⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⢸⠀⠀⠀⣿⡇⠀⠀⠀⡏⠀⠀⣿⡇⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⠀⠈⠀⠀⠀⠉⠁⠀⠀⠀⠓⠀⠀⠻⠃⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⢠⠏⣧⠖⠒⠒⣆⡀⠀⠀⠀⠀⠀⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⢱⠀⠀⠀⠀⠀⠀⠈⢣⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠧⣀⣀⠀⠀⠀⠀⣸⢀⡰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠁⠀⠀⠀
`;

const otwarta = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢏⠳⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣠⠞⠉⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⠈⠑⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠁⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀⠀⠀⠀⠈⠑⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠁⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⠀⠀⠀⠉⠒⢤⣀ ⢌⡴⠋⠀⠀⠀⠀⠀⠀⢰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀⠀      ⠀⠁ ⠁ ⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠉⠳⢄⡀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡔⠊⠉⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠉⠙⢲⠄⠀⠀⠺⣍⠁⠀⠀⠀⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⠀⣀⡠⠖⠋⠉⠀⠀⠀⠀⠈⠓⢤⡀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠈⠁⠀⠀⣤⠀⣀⣀⣀⣀⠀⡄⠀⠀⠀⠀⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⢠⠏⠛⠀⠀⠀⠀⠛⢹⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠧⣀⣀⠀⠀⠀⠀⠀⣇⡰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠈⠉⠉⠉⠉⠁⠀
`;

const game = window.game;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {

    const postac = document.getElementById("postac");

    if (postac) {
        postac.textContent = zamknieta;

        postac.onclick = (e) => {
            const gain = handleClick();

            postac.textContent = otwarta;

            setTimeout(() => {
                postac.textContent = zamknieta;
            }, 150);

            pokazPunktyKlikniecia(e.pageX, e.pageY, gain);
        };
    }

    document.getElementById("chestBtn").onclick = () => openChest();

    subscribe(render);
    render();
});

// ===== RENDER =====
function render() {
    document.getElementById("punkty").textContent =
        "Punkty: " + Math.floor(game.punkty) +
        " | " + getAutoPerSecond().toFixed(1) + "/s";

    document.getElementById("poziom").textContent =
        "Poziom kota: " + game.poziom +
        " (" + game.klikAktualne + "/" + game.klikDoNastepnego + ")";

    renderInventory();
    renderSkins();
    renderUpgrades();
    applySkin();

    document.getElementById("chestBtn").textContent =
        "Skrzynka (" + game.chestCost + ")";
}

// ===== UPGRADE UI (FIXED) =====
function renderUpgrades() {
    const container = document.getElementById("upgrades");
    if (!container) return;

    Object.entries(game.upgradey).forEach(([key, u]) => {
        let btn = document.getElementById("upg_" + key);

        const cost = getUpgradeCost(u);

        let desc = "";
        if (u.type === "auto") desc = `(+${u.value}/s)`;
        if (u.type === "clickMultiplier") desc = `(x${u.value})`;
        if (u.type === "levelBonus") desc = `(+${u.value} lvl)`;
        if (key === "costReducer") desc = "(tańsze)";

        if (!btn) {
            btn = document.createElement("button");
            btn.id = "upg_" + key;
            container.appendChild(btn);
        }

        if (key === "costReducer" && u.count >= 1) {
            btn.textContent = `${key} ${desc} (MAX)`;
            btn.disabled = true;
            btn.onclick = null;
        } else {
            btn.textContent = `${key} ${desc} (${cost})`;
            btn.disabled = false;
            btn.onclick = () => buyUpgrade(key);
        }
    });
}

// ===== INVENTORY (FIXED) =====
function renderInventory() {
    const inv = document.getElementById("inventory");
    if (!inv) return;

    game.inventory.forEach(item => {
        let btn = document.getElementById("inv_" + item.id);

        if (!btn) {
            btn = document.createElement("button");
            btn.id = "inv_" + item.id;
            inv.appendChild(btn);
        }

        const isEquipped = game.equipped.some(i => i.id === item.id);

        btn.textContent = item.name + (isEquipped ? " [E]" : "");
        btn.style.background = isEquipped ? "#aaffaa" : "#f2f2f2";

        btn.onclick = () => toggleEquip(item.id);
    });
}

// ===== SKINS =====
function renderSkins() {
    const btns = [
        ["redSkin", "red", 500],
        ["greenSkin", "green", 500],
        ["blueSkin", "blue", 500],
        ["yellowSkin", "yellow", 1000]
    ];

    btns.forEach(([id, color, cost]) => {
        const btn = document.getElementById(id);
        if (!btn) return;

        const owned = game.skin.owned.includes(color);

        btn.textContent = owned
            ? color + " (wybierz)"
            : color + " (" + cost + ")";

        btn.onclick = () => {
            if (owned) setSkin(color);
            else buySkin(color, cost);
        };

        btn.style.background = game.skin.active === color ? "#aaffaa" : "";
    });
}

// ===== APPLY SKIN =====
function applySkin() {
    const postac = document.getElementById("postac");
    if (!postac) return;

    let color = "black";

    if (game.skin.active === "red") color = "red";
    if (game.skin.active === "green") color = "green";
    if (game.skin.active === "blue") color = "blue";
    if (game.skin.active === "yellow") color = "gold";

    postac.style.color = color;
    postac.style.textShadow = "0 0 8px " + color;
}

// ===== EFFECT =====
function pokazPunktyKlikniecia(x, y, ilosc) {
    const efekt = document.createElement("div");
    efekt.textContent = "+" + ilosc;
    efekt.classList.add("punktEfekt");

    document.body.appendChild(efekt);

    efekt.style.left = x + "px";
    efekt.style.top = y + "px";

    setTimeout(() => {
        efekt.style.transform = "translateY(-50px)";
        efekt.style.opacity = "0";
    }, 10);

    setTimeout(() => efekt.remove(), 1000);
}