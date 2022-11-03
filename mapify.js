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
    this.metaData = mapData[this.mapConfig.mainSettings.mapShell].USMetadata
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

      this.inactiveFragments.forEach(fragment => {
        fragment.addEventListener('click', event => window.location.href = this.mainSettings.url)
        fragment.addEventListener('mouseover', event => {
          this.inactiveFragments.forEach(frag => frag.style.fill = this.mainSettings.stateHoverColor)
        })
        fragment.addEventListener('mouseout', event => {
          this.inactiveFragments.forEach(frag => frag.style.fill = '')
        })
      })
  
      this.svgNode.appendChild(mapFragment)
    }
  }

  createMapFragment(el, classNames, name, path) {
    let activeStates = Object.keys(this.activeSettings.states)
    let allStateSettings = this.activeSettings.mainSettings

    if ( activeStates.includes(name) ) {
      let currentStateSettings = this.activeSettings.states[name]

      setAttrs(el, {
        fill: allStateSettings.stateColor,
        stroke: allStateSettings.strokeColor,
        strokeWidth: allStateSettings.strokeWidth,
      })

      this.activeFragments.push(el)

      el.addEventListener('click', event => this.createFragmentLink(event, currentStateSettings.url))
      el.addEventListener('mouseover', event => this.handleFragmentHover(event, el, this.activeSettings))
      el.addEventListener('mouseout', event => this.handleFragmentHover(event, el))
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
    const allFragments = this.svgNode.querySelectorAll('path')
    
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