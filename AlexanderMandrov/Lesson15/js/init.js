import ItemsList from './ItemsList.js'
import initCanvasDrawing from  './canvas.js';

initCanvasDrawing();
(new ItemsList()).fetchItems();