import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const matrixPath = path.join(root, "content", "game-opportunity-matrix.json");
const games = JSON.parse(fs.readFileSync(matrixPath, "utf8"));

const statusScore = {
  active: 25,
  next: 18,
  watchlist: 8,
};

function scoreGame(game) {
  const freeDepth = Math.min(game.free_content.length, 6) * 5;
  const paidDepth = Math.min(game.paid_products.length, 5) * 8;
  const updateNeed = Math.min(game.update_triggers.length, 6) * 4;
  const priorityBoost = Math.max(0, 6 - game.priority) * 3;
  const base = statusScore[game.status] || 0;
  const riskPenalty = game.risk.toLowerCase().includes("high") ? 8 : 3;

  return base + freeDepth + paidDepth + updateNeed + priorityBoost - riskPenalty;
}

const scored = games
  .map((game) => ({
    game: game.game,
    track: game.track,
    status: game.status,
    priority: game.priority,
    score: scoreGame(game),
    paidProducts: game.paid_products.length,
    updateTriggers: game.update_triggers.length,
  }))
  .sort((a, b) => b.score - a.score || a.priority - b.priority);

console.table(scored);

const outPath = path.join(root, "content", "inbox", "game-opportunity-score.json");
fs.writeFileSync(outPath, `${JSON.stringify(scored, null, 2)}\n`);
console.log(`Wrote ${outPath}`);
