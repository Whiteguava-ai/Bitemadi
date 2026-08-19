import { menuCategories, type MenuItem } from "./data";
import { inr } from "./site";

export type WaiterPick = {
  item: MenuItem;
  qty: number;
  note: string;
  reason: string;
};

export type WaiterResult = {
  reply: string;
  speak?: string;
  picks: WaiterPick[];
  remove?: string[];
};

export const bestsellers = [
  "Crispy Zinger Burger",
  "BBQ Chicken Pizza",
  "French Fries",
  "Classic Milkshake",
  "Chocolate Brownie",
];

const catalog: MenuItem[] = [];
const seen = new Set<string>();
for (const cat of menuCategories) {
  for (const item of cat.items) {
    if (seen.has(item.name)) continue;
    seen.add(item.name);
    catalog.push(item);
  }
}

const vegNames = new Set([
  "Veggie Supreme Burger",
  "Margherita Pizza",
  "Veggie Garden Pizza",
  "Four Cheese Pizza",
  "Tuscan Tomato Pasta",
  "Alfredo Pasta",
  "Pesto Penne",
  "Truffle Risotto",
  "Spicy Arrabbiata",
  "Garden Fresh Bowl",
  "Mediterranean Salad",
  "Avocado Crunch Salad",
  "French Fries",
  "Loaded Nachos",
  "Onion Rings",
  "Sweet Potato Fries",
  "Garlic Bread",
  "Mozzarella Bites",
  "Chocolate Brownie",
  "Classic Milkshake",
  "Fresh Lemonade",
  "Tiramisu Cup",
  "Iced Coffee",
  "Berry Cheesecake",
]);

const jainNames = new Set([
  "Chocolate Brownie",
  "Classic Milkshake",
  "Fresh Lemonade",
  "Tiramisu Cup",
  "Iced Coffee",
  "Berry Cheesecake",
  "Mozzarella Bites",
  "Four Cheese Pizza",
]);

const spicyNames = new Set([
  "Spicy Chicken Burger",
  "BBQ Chicken Burger",
  "Pepperoni Pizza",
  "BBQ Chicken Pizza",
  "Spicy Inferno Pizza",
  "Spicy Arrabbiata",
  "BBQ Chicken Wings",
]);

const aliases: [RegExp, string][] = [
  [/\bzingers?\b|\bzinger burger\b/, "Crispy Zinger Burger"],
  [/\bclassic chicken\b|\bchicken burger\b/, "Classic Chicken Burger"],
  [/\bdouble cheese\b|\bcheese burger\b/, "Double Cheese Chicken Burger"],
  [/\bbbq burger\b|\bbarbeque burger\b/, "BBQ Chicken Burger"],
  [/\bspicy burger\b|\bspicy chicken burger\b/, "Spicy Chicken Burger"],
  [/\bveggie burger\b|\bveg burger\b|\bvegetarian burger\b/, "Veggie Supreme Burger"],
  [/\bmargherita\b/, "Margherita Pizza"],
  [/\bpepperoni\b/, "Pepperoni Pizza"],
  [/\bbbq pizza\b|\bchicken pizza\b/, "BBQ Chicken Pizza"],
  [/\bveggie pizza\b|\bveg pizza\b|\bgarden pizza\b/, "Veggie Garden Pizza"],
  [/\bfour cheese\b|\bcheese pizza\b/, "Four Cheese Pizza"],
  [/\binferno\b|\bspicy pizza\b/, "Spicy Inferno Pizza"],
  [/\barrabbiata\b|\bpasta\b/, "Spicy Arrabbiata"],
  [/\bcarbonara\b/, "Carbonara Pasta"],
  [/\balfredo\b/, "Alfredo Pasta"],
  [/\bpesto\b/, "Pesto Penne"],
  [/\brisotto\b/, "Truffle Risotto"],
  [/\btuscan\b/, "Tuscan Tomato Pasta"],
  [/\bfried chicken\b|\bcrispy chicken\b/, "Crispy Fried Chicken"],
  [/\bwings?\b/, "BBQ Chicken Wings"],
  [/\bsandwich\b/, "Grilled Chicken Sandwich"],
  [/\broast chicken\b|\bherb chicken\b/, "Herb Roast Chicken"],
  [/\bcaesar\b/, "Caesar Salad"],
  [/\bpoke\b|\btuna\b/, "Tuna Poke Bowl"],
  [/\bchicken salad\b/, "Grilled Chicken Salad"],
  [/\bmediterranean\b/, "Mediterranean Salad"],
  [/\bavocado\b/, "Avocado Crunch Salad"],
  [/\bsalad\b|\bbowl\b/, "Garden Fresh Bowl"],
  [/\bsweet potato\b/, "Sweet Potato Fries"],
  [/\bfries\b|\bfinger chips\b|\bchips\b/, "French Fries"],
  [/\bnachos\b/, "Loaded Nachos"],
  [/\bonion rings?\b/, "Onion Rings"],
  [/\bgarlic bread\b/, "Garlic Bread"],
  [/\bmozzarella\b|\bcheese bites\b/, "Mozzarella Bites"],
  [/\bbrownie\b/, "Chocolate Brownie"],
  [/\bmilkshake\b|\bshake\b/, "Classic Milkshake"],
  [/\blemonade\b|\bnimbu\b|\bnimbu pani\b|\blime\b/, "Fresh Lemonade"],
  [/\btiramisu\b/, "Tiramisu Cup"],
  [/\biced coffee\b|\bcold coffee\b|\bcoffee\b|\bkaapi\b/, "Iced Coffee"],
  [/\bcheesecake\b|\bcake\b/, "Berry Cheesecake"],
  [/\bpizza\b/, "Margherita Pizza"],
  [/\bburger\b/, "Crispy Zinger Burger"],
];

const wordQty: Record<string, number> = {
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  ek: 1,
  do: 2,
  teen: 3,
  char: 4,
  paanch: 5,
  eru: 2,
  ondu: 1,
};

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[₹,]/g, " ")
    .replace(/under|below|around|about|max|budget|rupees|rs\.?|inr/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function byName(name: string) {
  return catalog.find((i) => i.name === name);
}

function isVeg(item: MenuItem) {
  return vegNames.has(item.name);
}

function isJain(item: MenuItem) {
  return jainNames.has(item.name);
}

function isSpicy(item: MenuItem) {
  return spicyNames.has(item.name) || /spicy|inferno|arrabbiata/i.test(item.name);
}

function extractQty(text: string, around: string) {
  const i = text.indexOf(around);
  if (i < 0) return 1;
  const before = text.slice(Math.max(0, i - 18), i).trim();
  const m = before.match(/(?:^|\s)(\d+|a|an|one|two|three|four|five|six|ek|do|teen|char|paanch|eru|ondu)\s*$/);
  if (!m) return 1;
  return wordQty[m[1]] ?? Number(m[1]) ?? 1;
}

function extractBudget(raw: string) {
  const m =
    raw.match(/(?:under|below|max|around|about|for|budget)?\s*₹?\s*(\d{2,5})\s*(?:rs|inr|rupees)?/i) ||
    raw.match(/(\d{2,5})\s*(?:rs|inr|rupees|₹)/i);
  if (!m) return undefined;
  const n = Number(m[1]);
  return n >= 50 && n <= 20000 ? n : undefined;
}

function extractPeople(raw: string) {
  const m =
    raw.match(/(\d+|two|three|four|five|six)\s*(?:people|persons|friends|guests|seats|of us)/i) ||
    raw.match(/for\s+(\d+|two|three|four|five|six)\b/i);
  if (!m) return 1;
  return wordQty[m[1].toLowerCase()] ?? Number(m[1]) ?? 1;
}

function kitchenNote(raw: string) {
  const bits: string[] = [];
  if (/no onion|without onion|onion garlic|jain/i.test(raw)) bits.push("no onion");
  if (/no garlic/i.test(raw)) bits.push("no garlic");
  if (/no cheese/i.test(raw)) bits.push("no cheese");
  if (/extra spicy|more spicy|very spicy|teekha|khara/i.test(raw)) bits.push("extra spicy");
  else if (/less spicy|mild|not spicy|no spicy/i.test(raw)) bits.push("mild, less spicy");
  if (/no pickle/i.test(raw)) bits.push("no pickle");
  if (/allergy|peanut|dairy|gluten/i.test(raw)) {
    const a = raw.match(/(.{0,20}allerg[^.]{0,40})/i);
    bits.push(a ? a[1].trim() : "allergy at table");
  }
  return bits.join(", ");
}

function namedPicks(text: string, note: string): WaiterPick[] {
  const used = new Set<string>();
  const picks: WaiterPick[] = [];
  for (const [re, name] of aliases) {
    const hit = text.match(re);
    if (!hit || used.has(name)) continue;
    const item = byName(name);
    if (!item) continue;
    used.add(name);
    const qty = Math.min(8, extractQty(text, hit[0]));
    picks.push({
      item,
      qty,
      note,
      reason: "Matched what you asked for",
    });
  }
  return picks;
}

function filterPool(diet: "any" | "veg" | "jain", avoidSpicy: boolean) {
  return catalog.filter((item) => {
    if (diet === "veg" && !isVeg(item)) return false;
    if (diet === "jain" && !isJain(item)) return false;
    if (avoidSpicy && isSpicy(item)) return false;
    return true;
  });
}

function combo(
  people: number,
  budget: number | undefined,
  diet: "any" | "veg" | "jain",
  wantSpicy: boolean,
  avoidSpicy: boolean,
  mood: "sweet" | "drink" | "light" | "meal",
  note: string,
): WaiterPick[] {
  const pool = filterPool(diet, avoidSpicy);
  const pick = (pred: (i: MenuItem) => boolean, reason: string, qty = 1) => {
    const list = pool.filter(pred).sort((a, b) => a.price - b.price);
    const spicyFirst = wantSpicy
      ? [...list.filter(isSpicy), ...list.filter((i) => !isSpicy(i))]
      : list;
    const item = spicyFirst[0];
    return item ? [{ item, qty, note, reason }] : [];
  };

  if (mood === "sweet") {
    return pick((i) => /brownie|cheesecake|tiramisu/i.test(i.name), "A dessert to finish");
  }
  if (mood === "drink") {
    return pick((i) => /lemonade|coffee|milkshake/i.test(i.name), "A cold drink");
  }
  if (mood === "light") {
    return pick((i) => /salad|bowl|avocado/i.test(i.name), "Something lighter");
  }

  const mains = pool.filter((i) =>
    /burger|pizza|pasta|chicken|sandwich|risotto/i.test(i.name),
  );
  const sides = pool.filter((i) => /fries|nachos|rings|bread|bites/i.test(i.name));
  const drinks = pool.filter((i) => /lemonade|coffee|milkshake/i.test(i.name));

  const chosen: MenuItem[] = [];
  const take = (list: MenuItem[], n: number) => {
    const sorted = [...list].sort((a, b) => {
      if (wantSpicy) return Number(isSpicy(b)) - Number(isSpicy(a)) || a.price - b.price;
      if (avoidSpicy) return Number(isSpicy(a)) - Number(isSpicy(b)) || a.price - b.price;
      return a.price - b.price;
    });
    for (const item of sorted) {
      if (chosen.some((c) => c.name === item.name)) continue;
      chosen.push(item);
      if (chosen.filter((c) => list.includes(c)).length >= n) break;
    }
  };

  take(mains, Math.min(people, 3) || 1);
  if (people >= 2) take(sides, 1);
  take(drinks, people >= 3 ? 2 : 1);
  if (people >= 3) take(pool.filter((i) => /brownie|cheesecake/i.test(i.name)), 1);

  let picks: WaiterPick[] = chosen.map((item, i) => ({
    item,
    qty: /burger|zinger|fries|lemonade|coffee/i.test(item.name)
      ? Math.max(1, Math.round(people / Math.max(1, Math.min(people, 3))))
      : 1,
    note,
    reason: i === 0 ? "Main for the table" : "Rounds out the order",
  }));

  if (budget) {
    const total = () => picks.reduce((s, p) => s + p.item.price * p.qty, 0);
    while (picks.length && total() > budget) {
      const last = picks[picks.length - 1];
      if (last.qty > 1) last.qty -= 1;
      else picks.pop();
    }
    const cheap = pool.filter((i) => i.price <= 130).sort((a, b) => a.price - b.price);
    for (const item of cheap) {
      if (total() + item.price > budget) continue;
      if (picks.some((p) => p.item.name === item.name)) continue;
      picks.push({ item, qty: 1, note, reason: "Fits the budget" });
    }
  }

  if (!picks.length) {
    const fallback =
      diet === "jain"
        ? byName("Fresh Lemonade")
        : diet === "veg"
          ? byName("Margherita Pizza")
          : byName("Crispy Zinger Burger");
    if (fallback) picks = [{ item: fallback, qty: 1, note, reason: "A safe house favourite" }];
  }

  return picks;
}

export function getMenuForAi() {
  return catalog.map((item) => ({
    name: item.name,
    price: item.price,
    desc: item.desc,
    veg: vegNames.has(item.name),
    jain: jainNames.has(item.name),
    spicy: spicyNames.has(item.name),
  }));
}

export function itemByName(name: string) {
  const n = name.trim().toLowerCase();
  return catalog.find((item) => item.name.toLowerCase() === n);
}

export function askWaiter(input: string): WaiterResult {
  const raw = input.trim();
  if (!raw) {
    return { reply: "Tell me what you’re craving — veg, spicy, a budget, or a dish name.", picks: [] };
  }

  const text = norm(raw);
  const diet: "any" | "veg" | "jain" = /jain/.test(text)
    ? "jain"
    : /veg\b|veggie|vegetarian|shakahari|sasyahara/.test(text)
      ? "veg"
      : "any";
  const avoidSpicy = /not spicy|less spicy|mild|no spicy/.test(text);
  const wantSpicy = !avoidSpicy && /spicy|extra spicy|teekha|khara|hot/.test(text);
  const note = kitchenNote(raw);
  const budget = extractBudget(raw);
  const people = extractPeople(raw);
  const mood: "sweet" | "drink" | "light" | "meal" = /dessert|sweet|brownie|cake|tiramisu/.test(text)
    ? "sweet"
    : /thirsty|drink|lemonade|coffee|shake/.test(text) && !/burger|pizza|pasta|chicken|hungry/.test(text)
      ? "drink"
      : /salad|light|healthy|not too heavy/.test(text)
        ? "light"
        : "meal";

  let picks = namedPicks(text, note).filter((p) => {
    if (diet === "veg" && !isVeg(p.item)) return false;
    if (diet === "jain" && !isJain(p.item)) return false;
    if (avoidSpicy && isSpicy(p.item)) return false;
    return true;
  });

  if (!picks.length) {
    picks = combo(people, budget, diet, wantSpicy, avoidSpicy, mood, note);
  }

  if (diet === "veg") {
    const dropped = namedPicks(text, note).filter((p) => !isVeg(p.item));
    if (dropped.length && !picks.some((p) => isVeg(p.item))) {
      picks = combo(people, budget, "veg", wantSpicy, avoidSpicy, mood, note);
    }
  }

  const total = picks.reduce((s, p) => s + p.item.price * p.qty, 0);
  const names = picks.map((p) => `${p.qty}× ${p.item.name}`).join(", ");
  const dietBit = diet === "jain" ? " Jain-friendly" : diet === "veg" ? " vegetarian" : "";
  const reply = picks.length
    ? `I’d send ${names} to the kitchen${dietBit ? ` — all${dietBit}` : ""}. Table total ${inr(total)}. Add it to your order?`
    : "I couldn’t match that. Try “veg under 250”, “2 zingers and a lemonade”, or “spicy for 2”.";

  return { reply, picks };
}

export const waiterPrompts = [
  "What’s selling today?",
  "2 zingers and a lemonade",
  "Add fries with that",
  "Something sweet after",
  "Remove the burger",
];
