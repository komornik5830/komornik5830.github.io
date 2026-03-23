// ===== STATE =====
window.game = {
    punkty: 0,
    poziom: 1,
    klikAktualne: 0,
    klikDoNastepnego: 2,

    upgradey: {
        auto: { count: 0, baseCost: 100, type: "auto", value: 5, interval: 5000 },
        klik2: { count: 0, baseCost: 200, type: "clickMultiplier", value: 2 },
        klik3: { count: 0, baseCost: 350, type: "clickMultiplier", value: 3 },
        lvlBoost: { count: 0, baseCost: 450, type: "levelBonus", value: 10 },
        superClick: { count: 0, baseCost: 2000, type: "clickMultiplier", value: 4 },

        // 🔥 NOWY UPGRADE
        costReducer: { count: 0, baseCost: 5000, type: "static" }
    },

    chestCost: 100,
    inventory: [],
    equipped: [],
    discoveredItems: [],

    skin: {
        owned: [],
        active: "default"
    },

    itemsPool: [
        { id: "x2", name: "x2 klik", type: "multiplier", multiplier: 2 },
        { id: "x3", name: "x3 klik", type: "multiplier", multiplier: 3 },
        { id: "crit", name: "crit x5", type: "crit", chance: 0.1, value: 5 },
        { id: "boost", name: "+50%", type: "multiplier", multiplier: 1.5 },
        { id: "mega", name: "x10", type: "multiplier", multiplier: 10 },
        { id: "auto", name: "+auto", type: "auto", value: 5 }
    ]
};

const game = window.game;

// 🔥 GLOBAL COST MULTIPLIER
window.gameUpgradeCostMultiplier = 1.25;

// ===== EVENT SYSTEM =====
const listeners = [];

export function subscribe(fn) {
    listeners.push(fn);
}

function notify() {
    listeners.forEach(fn => fn());
}

// ===== COST HELPER =====
export function getUpgradeCost(upg) {
    const mult = window.gameUpgradeCostMultiplier || 1.25;
    return Math.floor(upg.baseCost * Math.pow(mult, upg.count));
}

// ===== ITEM MULTIPLIER =====
export function getItemMultiplier() {
    let mult = 1;

    game.equipped.forEach(i => {
        if (i.type === "multiplier" && i.multiplier) {
            mult *= i.multiplier;
        }
    });

    return mult;
}

// ===== CRIT =====
function getCritMultiplier() {
    let critChance = 0;
    let critMult = 1;

    game.equipped.forEach(i => {
        if (i.type === "crit") {
            critChance += i.chance;
            critMult = Math.max(critMult, i.value);
        }
    });

    if (Math.random() < critChance) {
        return critMult;
    }

    return 1;
}

// ===== CLICK CALC =====
export function calculateClickGain() {
    let base = 1;

    Object.values(game.upgradey).forEach(u => {
        if (u.type === "clickMultiplier" && u.count > 0) {
            base *= Math.pow(u.value, u.count);
        }
    });

    base *= getItemMultiplier();
    base *= getCritMultiplier();

    return base;
}

// ===== GAMEPLAY =====
export function handleClick() {
    const gain = calculateClickGain();

    game.punkty += gain;
    game.klikAktualne += 1;

    if (game.klikAktualne >= game.klikDoNastepnego) {
        game.poziom += 1;
        game.klikAktualne = 0;
        game.klikDoNastepnego += 2;

        let bonus = 1;

        Object.values(game.upgradey).forEach(u => {
            if (u.type === "levelBonus" && u.count > 0) {
                bonus += u.value * u.count;
            }
        });

        game.punkty += bonus;
    }

    notify();
    return gain;
}

// ===== UPGRADE =====
export function buyUpgrade(key) {
    const upg = game.upgradey[key];
    if (!upg) return;

    // 🔒 jednorazowy upgrade
    if (key === "costReducer" && upg.count >= 1) return;

    const cost = getUpgradeCost(upg);

    if (game.punkty >= cost) {
        game.punkty -= cost;
        upg.count++;

        // 🔥 aktywacja efektu
        if (key === "costReducer" && upg.count === 1) {
            window.gameUpgradeCostMultiplier = 1.10;
        }

        notify();
    }

    return cost;
}

// ===== AUTO =====
setInterval(() => {
    let totalAuto = 0;

    Object.values(game.upgradey).forEach(u => {
        if (u.type === "auto" && u.count > 0) {
            totalAuto += u.value * u.count;
        }
    });

    game.equipped.forEach(i => {
        if (i.type === "auto" && i.value) {
            totalAuto += i.value;
        }
    });

    if (totalAuto > 0) {
        game.punkty += totalAuto;
        notify();
    }
}, 5000);

// ===== CHEST =====
export function openChest() {
    if (game.punkty < game.chestCost) return;

    game.punkty -= game.chestCost;
    game.chestCost = Math.floor(game.chestCost * 1.4);

    if (game.discoveredItems.length >= game.itemsPool.length) {
        game.discoveredItems = [];
    }

    const available = game.itemsPool.filter(
        i => !game.inventory.some(inv => inv.id === i.id)
    );

    if (available.length === 0) {
        alert("Brak nowych itemów!");
        return;
    }

    const drop = available[Math.floor(Math.random() * available.length)];

    game.discoveredItems.push(drop.id);

    if (!game.inventory.some(i => i.id === drop.id)) {
        game.inventory.push({ ...drop });
    }

    notify();
}

// ===== EQUIP =====
export function toggleEquip(id) {
    const item = game.inventory.find(i => i.id === id);
    if (!item) return;

    const isEquipped = game.equipped.some(i => i.id === id);

    if (isEquipped) {
        game.equipped = game.equipped.filter(i => i.id !== id);
    } else {
        if (game.equipped.length >= 2) return;
        game.equipped.push({ ...item });
    }

    notify();
}

// ===== SKINS =====
export function buySkin(color, cost) {
    if (game.punkty < cost) return;

    game.punkty -= cost;

    if (!game.skin.owned.includes(color)) {
        game.skin.owned.push(color);
    }

    game.skin.active = color;

    notify();
}

export function setSkin(color) {
    if (!game.skin.owned.includes(color) && color !== "default") return;

    game.skin.active = color;
    notify();
}