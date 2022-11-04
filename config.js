const baseColor = "#000C2F";
const activeColor = "#A52170";
const activeHoverColor = "#FCB61A";
const baseHoverColor = "#0199AD";

const config = {
  mainSettings: {
    mapShell: "US",
    mapWidth: "1000",
    mapHeight: "600",
    stateColor: baseColor,
    stateHoverColor: baseHoverColor,
    strokeColor: "#ffffff",
    strokeHoverColor: "#ffffff",
    strokeWidth: "2",
    strokeHoverWidth: "3",
    labelColor: "white",
    url: "https://www.google.com",
  },
  activePaths: {
    mainSettings: {
      stateColor: activeColor,
      stateHoverColor: activeHoverColor,
      strokeColor: "#ffffff",
      strokeHoverColor: "#ffffff",
      strokeWidth: "2",
      strokeHoverWidth: "2",
      labelColor: "white",
    },
    states: {
      IL: {
        url: "https://www.google.com",
        description: "Illinois",
      },
      MN: {
        url: "https://highbridgepremium.com/minnesota/",
        description: "Buy Highbridge in Minnesota",
      },
      CA: {
        url: "https://highbridgepremium.com/california/",
        description: "Buy Highbridge in California",
      },
      TX: {
        url: "https://highbridgepremium.com/texas/",
        description: "Buy Highbridge in Texas",
      },
    },
  },
};

export default config;
