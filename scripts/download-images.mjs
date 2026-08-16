import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve("public/images");

const urls = [
  "https://framerusercontent.com/images/2JfKHabipTPU2CIGv3YaX0fug.png",
  "https://framerusercontent.com/images/3opAQeDEqKqptq03v7eAfIGhRc.png",
  "https://framerusercontent.com/images/3Pzdh2wAuyNnoARYxr1z1XxY.png",
  "https://framerusercontent.com/images/4V0XvuRqNZgZlZ6hbED1Lm2yt9I.png",
  "https://framerusercontent.com/images/65ZGFUlSRLqb6eeHaxmW5fxyvWk.png",
  "https://framerusercontent.com/images/6D7zmtTd4AHxZM1n4eo8EJrK6g.png",
  "https://framerusercontent.com/images/6dqy5LkEKH2ubWVihNvsUo6pZJ0.png",
  "https://framerusercontent.com/images/7AilhkeRKXGe30uL97uTydB4sHg.png",
  "https://framerusercontent.com/images/7eAUx8kImfdcQpJqaksx6qQVjQ.png",
  "https://framerusercontent.com/images/7GDW1CAgGBe6PE4M0SHwZzm085I.png",
  "https://framerusercontent.com/images/7nv5vQHZkqrq2M6lOicVkvy692Q.png",
  "https://framerusercontent.com/images/7vZWZAEixuocByUxRoq7wJUzgG0.png",
  "https://framerusercontent.com/images/88MPTeWoZPXJQAtG5sf59gE45JE.png",
  "https://framerusercontent.com/images/8tMesCqfxibAU0g4xn1Jtzp67fU.png",
  "https://framerusercontent.com/images/AfWmhe5Si1qX9RYIAuuxyHrdtng.png",
  "https://framerusercontent.com/images/BAruMtP09ylMxhxVyDeiWUp9Jks.svg",
  "https://framerusercontent.com/images/BjQ35XHUZ3SuDS5VRdh0Dike9eo.png",
  "https://framerusercontent.com/images/bjVo0RR01HqcLUOo3OaCT2SJU.png",
  "https://framerusercontent.com/images/D1nlLCDD3pQ23pTdOO68vg1Z2aQ.png",
  "https://framerusercontent.com/images/DTyEWjgxXVHiprhDicjOkSY6r0.png",
  "https://framerusercontent.com/images/Dysv83hSR9nnEHr6aWRexPubX74.png",
  "https://framerusercontent.com/images/dZVXVXh1CfukyFMs1CWSSHW8RQ.png",
  "https://framerusercontent.com/images/EAXMpVOGAzqBvjaoLmAgV2N1E.png",
  "https://framerusercontent.com/images/Eb7M05XvDgIq6BvR0VVIk7fm8c.png",
  "https://framerusercontent.com/images/efZbiaxkt4S7qZOEiT35wKtzlA.png",
  "https://framerusercontent.com/images/egmqsnkCPbkqWBi6grH37s18ULA.png",
  "https://framerusercontent.com/images/g70d44oB1EZTQu5yrXJS82KQ5bU.png",
  "https://framerusercontent.com/images/G9pCFoPAGXfnPwcyrzkEgyB4F8.png",
  "https://framerusercontent.com/images/geEkFrxRCXme0xk2fVivVmvVLA.png",
  "https://framerusercontent.com/images/GFKcZBjOIWmkTPX6PGWoAkB06o.png",
  "https://framerusercontent.com/images/Gh2gXbOR2Pvjew720RvD22MiNs.png",
  "https://framerusercontent.com/images/GXekj0nub3e6eQ5Xb4mKxEYdvk.png",
  "https://framerusercontent.com/images/HcdoOTSZPp3kFCnrIHCaHJKTdUo.png",
  "https://framerusercontent.com/images/hQFDHwF7zFZ7JlpTobXqYhj55Dg.png",
  "https://framerusercontent.com/images/hXqR9wP2PmGMjgu4zIGdxkTbiRw.png",
  "https://framerusercontent.com/images/ICyn0FPUmpNqP38T2ia4eQwUo.png",
  "https://framerusercontent.com/images/ip6hODQlZ4bcT0m5xtEix4CaZ0c.png",
  "https://framerusercontent.com/images/JKxdyAqYY4I9jDd959ZmvZUAOX8.png",
  "https://framerusercontent.com/images/jLzwVdVTfCYGhAkibhFFjTUYK5Q.png",
  "https://framerusercontent.com/images/JzXalahHuUh5P17Hvh92YtKXrPw.png",
  "https://framerusercontent.com/images/kvPVAAWFeVR4t13Jrj2VdVIIu8w.png",
  "https://framerusercontent.com/images/kXOJ3Fxb7dGBgj7T6WW2Uk4PaY.png",
  "https://framerusercontent.com/images/kZ1AHLZFQ9NSUnVYH0vsag03Cvk.png",
  "https://framerusercontent.com/images/lLgVuH0b05INFT57guXDCC0Jw.png",
  "https://framerusercontent.com/images/LSG8mgoQxRghiP10xoZP88BBmec.png",
  "https://framerusercontent.com/images/m4adLnumDxTnaHZbopp6fqixYg.png",
  "https://framerusercontent.com/images/mFLw1mionxQN9EW131GWS2Xf8.png",
  "https://framerusercontent.com/images/MI9CJPJjOLwLa8oeaVKPWbwChzM.png",
  "https://framerusercontent.com/images/mj9oqRFzQQHMxHfuJGwvP7RVqs.png",
  "https://framerusercontent.com/images/mT85liBc3WncZAZjOYPm0hxwqw.png",
  "https://framerusercontent.com/images/MTMqdglCS4lnccrM6MYyMHoonOw.png",
  "https://framerusercontent.com/images/MYzH9eyGRtT91VQNZEz9lrtUAUA.png",
  "https://framerusercontent.com/images/MzwaY3mYVxJm5xCnwxTJZ6hGiX8.png",
  "https://framerusercontent.com/images/n2bjxGaQ2NJtR3Gj9yY0pjd0o.png",
  "https://framerusercontent.com/images/NCWICeXYtqPRSXmWJNA8wwxvyTc.png",
  "https://framerusercontent.com/images/NHQ5ZzlijebHkXFfxy5LOFx83Gs.png",
  "https://framerusercontent.com/images/oLgh5qLEZk1Z56ZHctTJR2hEFkI.png",
  "https://framerusercontent.com/images/olua11LiLGixBmZar3RLrl6Of0.png",
  "https://framerusercontent.com/images/PdOkbbnJb9s1oLRaHZs17983bs.png",
  "https://framerusercontent.com/images/PDrjHbZPzqvaYnSBHOi3BevkHEA.png",
  "https://framerusercontent.com/images/PEIaKZmokBZL3azMPlOEfpvyrA.png",
  "https://framerusercontent.com/images/PLXvjMmngrz0fgkQnl4tbWtlWtE.png",
  "https://framerusercontent.com/images/PmQVJbMvQ8GtFyaC3n7xN53ZQ.png",
  "https://framerusercontent.com/images/poobInRUbwqttLcHTGWuxC2Xgj0.png",
  "https://framerusercontent.com/images/poWpuvm8Y7LquNolHShRIkBnKAk.png",
  "https://framerusercontent.com/images/pZQYV6u2cKzqxQTKuJp3yzETCY.png",
  "https://framerusercontent.com/images/Q7SrMMajZKsExYsR1AGymr6olwU.png",
  "https://framerusercontent.com/images/qEq4OOzgjjfINR2LMhbSG60PVs.png",
  "https://framerusercontent.com/images/qFIsrQ6Eexp8gkw7o8nj2XgmtaA.png",
  "https://framerusercontent.com/images/QmoKQcOr0nr3XAFcXOM7yBYwU.svg",
  "https://framerusercontent.com/images/R3hDGTxsRwb7RxBngwboES0Mm10.png",
  "https://framerusercontent.com/images/rajT3ykS2nZOMcmFbyOUMvQDnY.png",
  "https://framerusercontent.com/images/RvErjLzvutZQvmxKLQRzIUShRs.png",
  "https://framerusercontent.com/images/rwUFDwCrMcIRGeKwZUgXQAT6rjM.png",
  "https://framerusercontent.com/images/rwuiZgFnQOwvF0OJSq0FrL7lX8.png",
  "https://framerusercontent.com/images/SrOPdSnp63uTPEeW9kKGOrQxU.png",
  "https://framerusercontent.com/images/SXpxP4p7RRgl4JfVSbOBbMrCc.png",
  "https://framerusercontent.com/images/t6Vc8Uf3xdcgamma35bup6Posk.png",
  "https://framerusercontent.com/images/t7O6pbw05MR4c8nExI16tMxQxs.png",
  "https://framerusercontent.com/images/uZMAxPZBjYD24RPz01MHKlQcgQ.png",
  "https://framerusercontent.com/images/Vgx372HTrjvNBEzuhNnem5XzVY.png",
  "https://framerusercontent.com/images/vMlRBvVBiaQP9bCGW3buSkae80Y.png",
  "https://framerusercontent.com/images/VY6Uau6ieVPpq9Qp2rvLMUaOo.png",
  "https://framerusercontent.com/images/WaUcPXj1Lw9rC3n3HkJdwyGF8U.png",
  "https://framerusercontent.com/images/wChvTwcwhi1FeaZRWz4TbSBQYXo.png",
  "https://framerusercontent.com/images/WdYDoXsCRF182zo0nlTq93LyZ94.png",
  "https://framerusercontent.com/images/Wvz5rHszpWMVdEoB1YekAC17uE.png",
  "https://framerusercontent.com/images/x1VCnHkFbz5Kldkca9QS5GmvHA.png",
  "https://framerusercontent.com/images/X5hDat06E74iJTnTptDu3q5suYg.png",
  "https://framerusercontent.com/images/XDhymzkEA6AaDsbEusR7acKypTQ.svg",
  "https://framerusercontent.com/images/xRP0oIAwmCNvXrW406NjtJkZk.png",
  "https://framerusercontent.com/images/yBpDxeFHBzSGgy8HDjSPCQLxo.png",
  "https://framerusercontent.com/images/yiKoj1dHI5eWJkn415Gt5eCcc.png",
  "https://framerusercontent.com/images/YS9LRJXwyDIUYf5hPzuiiZXXqIU.png",
  "https://framerusercontent.com/images/yt66gj5vWeZVujdBkvD4Ty5u0.png",
  "https://framerusercontent.com/images/zOewDJhXAeRdBt4kpWy6aStvzg.png",
];

await mkdir(outDir, { recursive: true });

async function download(url) {
  const file = path.join(outDir, decodeURIComponent(url.split("/").pop()));
  if (existsSync(file)) return `${path.basename(file)} skip`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(file, buf);
  return `${path.basename(file)} ${buf.length}`;
}

const results = await Promise.allSettled(urls.map(download));
let ok = 0;
for (const r of results) {
  if (r.status === "fulfilled") {
    ok++;
    console.log("ok", r.value);
  } else {
    console.error("fail", r.reason?.message || r.reason);
  }
}
console.log(`done ${ok}/${urls.length}`);
