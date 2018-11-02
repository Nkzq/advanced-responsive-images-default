import { artboardName, groupName } from './config'
import sketch from 'sketch'
import UI from 'sketch/ui'
const fs = require('@skpm/fs')
const sizes = []

/**
 * Extract array of sizes from json file
 * @param {String} path
 */
const getSizes = path => {
  // Get content from file
  const contents = fs.readFileSync(path)
  // Define to JSON type
  const jsonContent = JSON.parse(contents)
  for(const val in jsonContent[0]) {
    const tmp = sizes
    const regex = /\d+/g
    const found = jsonContent[0][val][0].default_img.match(regex)
    const size = {width: found[0], height: found[1]}
    const isExist = tmp.filter(e => e.width === size.width && e.height === size.height).length
    if (!isExist) {
      sizes.push(size)
    }
  }
}

// /Users/beapi/Documents/projets/beapi-frontend-framework/src/conf-img/image-locations.json

/**
 * Clear selection of all Layers
 * @param {Object} document
 */
const cleanAllLayers = document => {
  const selection = document.selectedLayers
  selection.clear()
}

/**
 * Define alignment action
 * @param {Object} context
 * @param {String} alignment
 */
const alignLayers = (context, alignment) => {
  const doc = context.document
  const action = doc.actionsController().actionForID(alignment);

  if(action.validate()) {
      action.doPerformAction(null);
  }
}

/**
 * Resize the selected Group according to the size params and keep the ratio
 * @param {Object} document
 * @param {Object} size
 */
const resizeGroup = (document, size) => {
  const groups = document.getLayersNamed(groupName)
  const group = groups[0]
  group.selected = true
  const selection = document.selectedLayers
  selection.forEach(layer => {
    const frame = layer.sketchObject.frame()
    if (size.height > size.width) {
      const ratio = frame.width() / size.width
      frame.setRect_(NSMakeRect(frame.x(), frame.y(), size.width, frame.height() / ratio))
    } else {
      const ratio = frame.height() / size.height
      frame.setRect_(NSMakeRect(frame.x(), frame.y(), frame.width() / ratio, size.height))
    }
  })
  cleanAllLayers(document)
}

/**
 * Resize the selected Artboard according to the size params
 * @param {Object} document
 * @param {Object} size
 */
const resizeArtboard = (document, size) => {
  const artboards = document.getLayersNamed(artboardName)
  const artboard = artboards[0]
  artboard.selected = true
  const selection = document.selectedLayers
  selection.forEach(layer => {
    const frame = layer.sketchObject.frame()
    frame.setRect_(NSMakeRect(frame.x(), frame.y(), size.width, size.height))
  })
  cleanAllLayers(document)
}

/**
 * Set middle alignment to the selected Group
 * @param {Object} context
 * @param {Object} document
 */
const alignGroupCenter = (context, document) => {
  const groups = document.getLayersNamed(groupName)
  const group = groups[0]
  group.selected = true
  const selection = document.selectedLayers
  selection.forEach(() => {
    alignLayers(context, 'MSAlignLayersMiddleAction')
  })
  cleanAllLayers(document)
}

/**
 * Export the resized default image
 * @param {Object} document
 * @param {Object} size
 * @param {String} output
 */
const exportImage = (document, size, output) => {
  const groups = document.getLayersNamed(groupName)
  const group = groups[0]
  group.selected = true
  const selection = document.selectedLayers
  selection.forEach(layer => {
    layer.name = `${layer.name}-${size.width}-${size.height}`
    sketch.export(layer, {
      formats: 'jpg',
      scales: '1',
      overwriting: true,
      output
    })
    layer.name = groupName
  })
}

export default function(context) {
  const sizesPath = UI.getStringFromUser('Path of your images location json', '')
  if (!sizesPath || !fs.existsSync(sizesPath)) {
    UI.message('No file found')
    return false
  }
  const output = UI.getStringFromUser('Folder images path', '')
  if (!output || !fs.existsSync(output)) {
    UI.message('No output folder specified')
    return false
  }
  getSizes(sizesPath)
  const document = sketch.fromNative(context.document)
  cleanAllLayers(document)
  Object.keys(sizes).forEach(key => {
    resizeGroup(document, sizes[key])
    resizeArtboard(document, sizes[key])
    alignGroupCenter(context, document)
    exportImage(document, sizes[key], output)
  })
}