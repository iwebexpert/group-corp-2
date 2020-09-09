"use strict";

let basket = new Basket();
let catalog = new Catalog();
let message = new Messages();

message.init();

//*****CATALOG PROCESSING*****
catalog.init();

//*****BASKET PROCESSING*****
basket.init();
basket.drawHead();
basket.drawAdditionalBlocks();
basket.showComment();
