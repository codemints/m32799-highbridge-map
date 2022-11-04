import "./main.css";
import { EzMap } from "./mapify.js";
import config from "./config";

const entryNode = document.getElementById("app");
new EzMap(entryNode, config).initMap();
