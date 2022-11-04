import { setAttrs, addStyles, defaultConfig, createConfig } from './utils.js'
import { mapData } from './maps.js'

export class EzMap {
  vers = '1.1'
  ns = 'http://www.w3.org/2000/svg'
  xmls = 'http://www.w3.org/2000/svg'
  svgNode = document.createElementNS(this.ns, 'svg')
  activeFragments = []
  inactiveFragments = []

  constructor(mapWrapper, mapConfig) {
    this.wrapper = mapWrapper
    this.mapConfig = mapConfig
    this.mainSettings = mapConfig.mainSettings
    this.activeSettings = mapConfig.activePaths
    this.activeStates = Object.keys(this.activeSettings.states)
    this.metaData = mapData[this.mapConfig.mainSettings.mapShell].USMetadata
    this.hoverInactive = this.mainSettings.hoverInactive
    this.hoverInactiveAsRegion = this.mainSettings.hoverInactiveAsRegion
    this.pathArray = Object.entries(mapData[this.mapConfig.mainSettings.mapShell].USPaths)
    this.initMap()
  }

  createMapShell() {
    setAttrs(this.svgNode, {
      version: this.vers,
      xmlns: this.xmls,
      height: this.mainSettings.mapHeight,
      width: this.mainSettings.mapWidth
    })

    for ( const [key, val] of this.pathArray) {
      let fragment = document.createElementNS(this.ns, 'path')
      let identifier = ['em__state', `em__state--${key}`]
      let name = key
      let path = val
  
      const mapFragment = this.createMapFragment(fragment, identifier, name, path)

      this.svgNode.appendChild(mapFragment)
    }
    
    const allPaths = this.svgNode.querySelectorAll('path')
    allPaths.forEach(path => {

    })

    //loop through activeFragments
    //check activeSettings
    //is showLabel true?
    //yes: create text elements and place them over the states
    //no: move on
    //check activeSettings
    //is showDescription true?
    //yes: create DOM element to hold description
    //set mouseover event listener on active states
    //get pointer x & y coords
    //use coords to position description DOM element
    //no: move on
    //set mouseover and mouseout event listeners to handle hover color change
    //set click event listener to handle url navigation

    //loop thorugh inactiveFragments
    //same process as above, except how they hover will depend on the hoverActive and hoverInactiveAsRegion properties in mainSettings
  }

  createMapFragment(el, classNames, name, path) {
    if ( this.activeStates.includes(name) ) {

      setAttrs(el, {
        fill: this.activeSettings.mainSettings.stateColor,
        stroke: this.activeSettings.mainSettings.strokeColor,
        strokeWidth: this.activeSettings.mainSettings.strokeWidth,
      })

      this.activeFragments.push(el)
    } else {
      setAttrs(el, {
        fill: this.mainSettings.stateColor,
        stroke: this.mainSettings.strokeColor,
        strokeWidth: this.mainSettings.strokeWidth,
      })
      this.inactiveFragments.push(el)
    }

    setAttrs(el, {
      strokeLinejoin: 'round',
      transform: 'matrix(1,0,0,1,0,0)',
      dataName: this.metaData[name].name,
      dataLabel: name,
      d: path,
    })

    el.classList.add(...classNames)
    
    return el
  }

  configureMapFragments() {
    console.log(this.hoverInactive, this.hoverInactiveAsRegion)
  }

  initMap() {
    this.createMapShell()
    this.wrapper.appendChild(this.svgNode)
  }

  createFragmentLink(event, config) {
    window.location.href = config
  }

  handleFragmentHover(event, el, config) {
    if ( event.type === 'mouseover' ) {
      addStyles(el, {
        fill: config.mainSettings.stateHoverColor,
      })
    }
    if ( event.type === 'mouseout' ) {
      el.style.fill = ''
    }
  }

  log() {
    console.log(this.wrapper, this.pathsArray)
  }
}