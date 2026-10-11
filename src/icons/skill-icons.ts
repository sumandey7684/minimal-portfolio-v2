import { addCollection } from "@iconify/react";
import logos from "./logos.json";
import simpleIcons from "./simple-icons.json";
import lucide from "./lucide.json";
import vscodeIcons from "./vscode-icons.json";

for (const data of [logos, simpleIcons, lucide, vscodeIcons]) {
  addCollection(data);
}
