const baseColor = '#000C2F'
const activeColor = '#A52170'
const activeHoverColor = '#FCB61A'
const baseHoverColor = '#0199AD'
const baseHoverAlt = '#f2f2f2'

export const mapData = {
  mainSettings: {
    mapShell: 'US',
    mapWidth: '1000',
    mapHeight: '600',
    stateColor: baseColor,
    stateHoverColor: baseHoverColor,
    strokeColor: '#ffffff',
    strokeHoverColor: '#ffffff',
    strokeWidth: '2',
    strokeHoverWidth: '3',
    showLabel: false,
    showDescription: false,
    labelColor: 'white',
    url: 'https://www.google.com',
    hoverInactive: true,
    hoverInactiveAsRegion: true,
  },
  activePaths: {
    mainSettings: {
      stateColor: activeColor,
      stateHoverColor: activeHoverColor,
      strokeColor: '#ffffff',
      strokeHoverColor: '#ffffff',
      strokeWidth: '2',
      strokeHoverWidth: '2',
      showLabel: true,
      showDescription: true,
      labelColor: 'white',
    },
    states: {
      MN: {
        url: 'https://highbridgepremium.com/minnesota/',
        description: 'Buy Highbridge in Minnesota',
      },
      CA: {
        url: 'https://highbridgepremium.com/california/',
        description: 'Buy Highbridge in California',
      },
      TX: {
        url: 'https://highbridgepremium.com/texas/',
        description: 'Buy Highbridge in Texas'
      }
    }
  }
}