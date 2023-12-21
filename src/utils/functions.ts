import path from "node:path";
import fs from 'node:fs';

function levenshteinDistance(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  return a[0] === b[0]
    ? levenshteinDistance(a.slice(1), b.slice(1))
    : Math.min(
        levenshteinDistance(a.slice(1), b),
        levenshteinDistance(a, b.slice(1)),
        levenshteinDistance(a.slice(1), b.slice(1))
      ) + 1;
}

export function findClosestCommand(command: string, validCommands: any) {
  let closestCommand = '';
  let shortestDistance = Infinity;

  for (const validCommand of validCommands) {
    const distance = levenshteinDistance(command, validCommand);
    if (distance < shortestDistance) {
      closestCommand = validCommand;
      shortestDistance = distance;
    }
  }
  return closestCommand;
}

export function generateFolderTree(folderPath: any) {
  const stats = fs.statSync(folderPath);
  if (!stats.isDirectory()) {
    return null;
  }

  const folderName = path.basename(folderPath);
  const folderObject = { name: folderName, children: [] };

  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileStats = fs.statSync(filePath);
    if (fileStats.isDirectory()) {
      const childFolder = generateFolderTree(filePath);
      if (childFolder) {
        folderObject.children.push(childFolder as never);
      }
    }
  });

  return folderObject;
}
