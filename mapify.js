import { setAttrs, addStyles, defaultConfig, createConfig } from "./utils.js";
import { mapData } from "./maps.js";

export class EzMap {
  vers = "1.1";
  ns = "http://www.w3.org/2000/svg";
  xmls = "http://www.w3.org/2000/svg";
  svgNode = document.createElementNS(this.ns, "svg");
  activeFragments = [];
  inactiveFragments = [];

  constructor(entryPointElement, mapConfig) {
    this.entryPointElement = entryPointElement;
    this.mainSettings = mapConfig.mainSettings;
    this.activeSettings = mapConfig.activePaths.mainSettings;
    this.activePaths = mapConfig.activePaths;
    this.activeStates = [];
    this.inactiveStates = [];
    this.activeStatesList = Object.keys(mapConfig.activePaths.states);
    this.inactiveStatesList = Object.keys(
      mapData[this.mainSettings.mapShell]
    ).filter((state) => !this.activeStatesList.includes(state));
  }

  createWrapperSvg() {
    let svg = document.createElementNS(this.ns, "svg");
    setAttrs(svg, {
      version: this.vers,
      xmlns: this.xmls,
      height: this.mainSettings.mapHeight,
      width: this.mainSettings.mapWidth,
    });
    return svg;
  }

  createStatePath(state) {
    let statePath = document.createElementNS(this.ns, "path");

    const pathData = mapData[this.mainSettings.mapShell][state].path;

    let identifier = ["em__state", `em__state--${state}`];

    setAttrs(statePath, {
      strokeLinejoin: "round",
      transform: "matrix(1,0,0,1,0,0)",
      dataName: mapData[this.mainSettings.mapShell][state].name,
      dataLabel: state,
      d: pathData,
    });

    statePath.classList.add(...identifier);

    return statePath;
  }

  setAttrsAndListeners(state, statePath) {
    const {
      mainSettings: {
        stateColor: activeStateColor,
        strokeColor: activeStrokeColor,
        strokeWidth: activeStrokeWidth,
      },
      states: activeStatesConfigs,
    } = this.activePaths;

    const {
      stateColor: inactiveStateColor,
      strokeColor: inactiveStrokeColor,
      strokeWidth: inactiveStrokeWidth,
    } = this.mainSettings;

    const a = this.isStateActive(state);

    setAttrs(statePath, {
      fill: a ? activeStateColor : inactiveStateColor,
      stroke: a ? activeStrokeColor : inactiveStrokeColor,
      strokeWidth: a ? activeStrokeWidth : inactiveStrokeWidth,
    });

    if (a) {
      this.setActiveListeners(state, statePath, activeStatesConfigs);
    } else {
      this.setInactiveListeners(statePath);
    }

    return statePath;
  }

  setActiveListeners(state, statePath, states) {
    const linkUrl = states?.[state]?.url;

    if (linkUrl) {
      statePath.addEventListener("click", (event) => {
        window.location.href = linkUrl;
      });
    }

    statePath.addEventListener("mouseover", (event) =>
      this.handleFragmentHover(
        event,
        statePath,
        this.activeSettings.stateHoverColor
      )
    );

    statePath.addEventListener("mouseout", (event) =>
      this.handleFragmentHover(event, statePath)
    );
  }

  setInactiveListeners(statePath) {
    statePath.addEventListener("mouseover", (event) => {
      this.inactiveStates.forEach(
        ({ state, path }) =>
          (path.style.fill = this.mainSettings.stateHoverColor)
      );
    });

    statePath.addEventListener("mouseout", (event) => {
      this.inactiveStates.forEach(({ state, path }) => (path.style.fill = ""));
    });

    return statePath;
  }

  initMap() {
    this.container = this.createWrapperSvg();

    this.activeStates = this.activeStatesList.map((state) => {
      return {
        state,
        path: this.setAttrsAndListeners(state, this.createStatePath(state)),
      };
    });

    this.inactiveStates = this.inactiveStatesList.map((state) => {
      return {
        state,
        path: this.setAttrsAndListeners(state, this.createStatePath(state)),
      };
    });

    [...this.activeStates, ...this.inactiveStates].forEach(
      ({ state, path }) => {
        this.container.appendChild(path);
      }
    );

    this.entryPointElement.appendChild(this.container);
  }

  handleFragmentHover(event, el, stateHoverColor) {
    if (event.type === "mouseout") {
      el.style.fill = "";
      return;
    }

    if (event.type === "mouseover") {
      addStyles(el, {
        fill: stateHoverColor,
      });
    }
  }

  isStateActive(state) {
    return this.activeStatesList.includes(state);
  }

  log() {
    console.log(this.wrapper, this.pathsArray);
  }
}
