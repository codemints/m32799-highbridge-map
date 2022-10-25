import './main.css'
import { EasyMap as Map } from './mapify.js'
import { maps } from './maps.js'

const parNode = document.getElementById('app')

const setAttrs = (el, attrs) => {
  for ( const key in attrs ) {
    el.setAttribute(key.replace(/[A-Z]/g, (str) => `-${str.toLowerCase()}`), attrs[key])
  }
}
const createMap = (parNode) => {
  const nS = 'http://www.w3.org/2000/svg'
  const svgNode = document.createElementNS(nS, 'svg')
  setAttrs(svgNode, {
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    height: '600',
    width: '1000'
  })
  parNode.appendChild(svgNode)

  for ( const [key, val] of Object.entries(maps.US)) {
    let path = document.createElementNS(nS, 'path')
    let classNames = ['em__state', `em__state--${key}`]
    setAttrs(path, {
      fill: '#88a4bc',
      stroke: '#ffffff',
      strokeWidth: '2',
      strokeLinejoin: 'round',
      transform: 'matrix(1,0,0,1,0,0)',
      d: val
    })
    path.classList.add(...classNames)
    svgNode.appendChild(path)
  }
}

createMap(parNode)