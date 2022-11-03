import './main.css'
import { EzMap } from './mapify.js'
import { mapData } from './config.js'

const parNode = document.getElementById('app')
new EzMap(parNode, mapData)