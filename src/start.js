import { artboardName, groupName } from './config'
import sketch from 'sketch'
import UI from 'sketch/ui'
import sizes from './sizes.json'

/**
 * Clear selection of all Layers
 * @param {Object} document
 */
const cleanAllLayers = document => {
  var selection = document.selectedLayers
  selection.clear()
}

/**
 * Define alignment action
 * @param {Object} context
 * @param {String} alignment
 */
const alignLayers = (context, alignment) => {
  var doc = context.document
  var action = doc.actionsController().actionForID(alignment);

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
      formats: 'png',
      scales: '1',
      overwriting: true,
      output
    })
    layer.name = groupName
  })
}

export default function(context) {
  if (!sizes.length) {
    UI.message('You need to specifiy some images sizes in the sizes.json file.')
    return false
  }
  const output = UI.getStringFromUser('Folder images path', '~/')
  if (!output) {
    return false
  }
  const document = sketch.fromNative(context.document)
  cleanAllLayers(document)
  Object.keys(sizes[0]).forEach(key => {
    resizeGroup(document, sizes[0][key])
    resizeArtboard(document, sizes[0][key])
    alignGroupCenter(context, document)
    exportImage(document, sizes[0][key], output)
  })
}