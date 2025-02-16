#!/usr/bin/env node

const blessed = require("blessed");
const contrib = require("blessed-contrib");

// Create a screen object
const screen = blessed.screen({
  smartCSR: true,
  title: "Developer Dashboard",
});

// Create a grid layout
const grid = new contrib.grid({
  rows: 12,
  cols: 12,
  screen: screen,
});

// CPU Usage Gauge
const cpuGauge = grid.set(0, 0, 4, 4, contrib.gauge, {
  label: "CPU Usage",
  stroke: "green",
  fill: "white",
});

// Memory Usage Donut
const memoryDonut = grid.set(0, 4, 4, 4, contrib.donut, {
  label: "Memory Usage",
  radius: 8,
  arcWidth: 3,
  remainColor: "black",
  yPadding: 2,
});

// Log Display
const logDisplay = grid.set(4, 0, 4, 8, contrib.log, {
  label: "System Logs",
  tags: true,
});

// Git Branch Tree
const gitTree = grid.set(0, 8, 8, 4, contrib.tree, {
  label: "Git Branches",
  template: {
    lines: true,
  },
});

// Process List
const processList = grid.set(8, 0, 4, 12, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Running Processes",
  width: "100%",
  height: "100%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10,
  columnWidth: [20, 10, 10, 10],
});

// Update data periodically
function updateData() {
  // Simulate CPU usage
  cpuGauge.setPercent(Math.random() * 100);

  // Simulate memory usage
  memoryDonut.setData([
    { percent: Math.random() * 100, label: "Used", color: "red" },
    { percent: Math.random() * 100, label: "Free", color: "green" },
  ]);

  // Add sample logs
  logDisplay.log("System event occurred at " + new Date().toISOString());

  // Sample git tree data
  gitTree.setData({
    extended: true,
    children: {
      main: {
        children: {
          "feature-1": {},
          "feature-2": {},
          hotfix: {},
        },
      },
    },
  });

  // Sample process data
  processList.setData({
    headers: ["Process", "PID", "CPU %", "Memory"],
    data: [
      ["node", "1234", "2.5%", "150MB"],
      ["chrome", "5678", "15.0%", "1.2GB"],
      ["vscode", "9012", "5.5%", "400MB"],
    ],
  });

  screen.render();
}

// Update every second
setInterval(updateData, 1000);

// Quit on Escape, q, or Control-C
screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});

// Initial render
updateData();
