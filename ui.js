import {
    handleClick,
    buyUpgrade,
    openChest,
    toggleEquip,
    subscribe,
    buySkin,
    setSkin,
    getUpgradeCost
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
    document.getElementById("punkty").textContent = "Punkty: " + game.punkty;

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

// ===== UPGRADE UI =====
function renderUpgrades() {
    const container = document.getElementById("upgrades");
    if (!container) return;

    container.innerHTML = "";

    Object.entries(game.upgradey).forEach(([key, u]) => {
        const btn = document.createElement("button");

        const cost = getUpgradeCost(u);

        if (key === "costReducer" && u.count >= 1) {
            btn.textContent = `${key} (MAX)`;
            btn.disabled = true;
        } else {
            btn.textContent = `${key} (${cost})`;
            btn.onclick = () => buyUpgrade(key);
        }

        container.appendChild(btn);
    });
}

// ===== INVENTORY =====
function renderInventory() {
    const inv = document.getElementById("inventory");
    if (!inv) return;

    inv.innerHTML = "";

    game.inventory.forEach(item => {
        const btn = document.createElement("button");

        const isEquipped = game.equipped.some(i => i.id === item.id);

        btn.textContent = item.name + (isEquipped ? " [E]" : "");
        btn.style.background = isEquipped ? "#aaffaa" : "#f2f2f2";

        btn.onclick = () => toggleEquip(item.id);

        inv.appendChild(btn);
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