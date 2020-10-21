import './ESHOP.css';
import {IProduct, Product} from "./Product";
import {IProductGroupItem, ProductGroupItem} from "./ProductGroupItem";
import {Catalog, ICatalog} from "./Catalog";
import {Basket, basketAddItemsModes, IBasket} from "./Basket";


let rootCatalogArea: HTMLDivElement;
let rootBasketArea: HTMLDivElement;

const catalog: ICatalog = new Catalog();
const basket: IBasket = new Basket();
enum ShopModes {
    CATALOG = 'CATALOG',
    BASKET = 'BASKET'
}
type ISelectedPage = {
    [key in ShopModes]: number;
};
let selectedPageNum: ISelectedPage = {
    CATALOG: 1,
    BASKET: 1,
};
function initializeShop(): void {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('container');

    const tabPanel: HTMLDivElement = document.createElement('div');
    tabPanel.classList.add('tabPanel');

    rootCatalogArea = document.createElement('div');
    rootBasketArea = document.createElement('div');

    rootCatalogArea.classList.add('rootArea');
    rootBasketArea.classList.add('rootArea', 'hideClass', 'closeClass');

    const tabToggleButton: HTMLDivElement= document.createElement('div');
    const tagCatalog: HTMLDivElement = document.createElement('div');
    const tagBasket: HTMLDivElement = document.createElement('div');

    tagCatalog.classList.add('tagArea', 'selectedArea');
    tagCatalog.innerHTML = `Каталог`;
    tagBasket.classList.add('tagArea');
    tagBasket.innerHTML = `Корзина`;
    tabToggleButton.classList.add('tabToggleButton', 'tabToggleButtonLeft');
    tabToggleButton.innerHTML = 'ТЫК';

    tabToggleButton.onmousedown = ((): void => {
        tabToggleButton.classList.toggle('disableBtn');

        tabToggleButton.classList.toggle('tabToggleButtonLeft');
        tabToggleButton.classList.toggle('tabToggleButtonRight');
        tagCatalog.classList.toggle('selectedArea');
        tagBasket.classList.toggle('selectedArea');

        rootCatalogArea.classList.toggle('closeClass');
        rootBasketArea.classList.toggle('closeClass');
        setTimeout((): void => {
            tabToggleButton.classList.toggle('disableBtn');
        }, 2000);

        const mode: ShopModes = tagCatalog.classList.contains('selectedArea') ? ShopModes.CATALOG: ShopModes.BASKET;
        createOrUpdateItemsView(mode, selectedPageNum[mode]);

    });
    createOrUpdateItemsView(ShopModes.CATALOG, selectedPageNum[ShopModes.CATALOG]);

    tabPanel.append(tagCatalog, tabToggleButton, tagBasket);
    container.append(tabPanel, rootBasketArea, rootCatalogArea);
    document.body.append(container);
}

function createCatalogCard(productGroupItem: IProductGroupItem, mode: ShopModes): HTMLDivElement {
    const productCard: HTMLDivElement = document.createElement('div');
    productCard.classList.add('productCard');
    productCard.setAttribute('data-cardname', `${productGroupItem.product.name}_${mode}`);

    const productName: HTMLDivElement = document.createElement('div');
    productName.classList.add('productName');
    productName.innerHTML = productGroupItem.product.name;

    const imageCarousel: HTMLDivElement = createImageCarousel(productGroupItem);
    (imageCarousel.childNodes.item(2) as HTMLElement).onclick = (): void => {
        const modalPhoto: IModalWindow = createModalWindowWithContent(createImageCarousel(productGroupItem));
        modalPhoto.openModal();
    };

    const productDescription: HTMLDivElement = document.createElement('div');
    productDescription.classList.add('productDescription');
    productDescription.innerHTML = `${productGroupItem.product.description}<br><br>${productGroupItem.product.price}р`;

    const productCatalogTotal: HTMLDivElement = document.createElement('div');
    productCatalogTotal.classList.add('productCatalogTotal');

    const onAmountPlus = (): void => {
        const productCount: HTMLDivElement | null = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productCount`);
        const productPrice: HTMLDivElement | null = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productPrice`);

        if (productCount){
            productCount.innerHTML = `${+productCount.innerHTML + 1}`;
            productGroupItem.amount += 1;
        }
        if (productPrice) {
            productPrice.innerHTML = `${productGroupItem.countItemTotalPriceWithSale()}р`;
        }
        if (mode === ShopModes.BASKET) {
            const totalInfoPanel: HTMLDivElement | null = document.querySelector(`.totalInfoPanel`);
            if (totalInfoPanel){
                totalInfoPanel.remove();
            }
            rootBasketArea.append(createBasketTotalInfo(basket));
        }
    };
    const onAmountMinus = () => {
        const productCount: HTMLDivElement | null = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productCount`);
        const productPrice: HTMLDivElement | null = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productPrice`);
        if (productPrice && productCount && productCount.innerHTML !== '0') {
            productCount.innerHTML = `${+productCount.innerHTML - 1}`;
            productGroupItem.amount -= 1;
            productPrice.innerHTML = `${productGroupItem.countItemTotalPriceWithSale()}р`;
        }
        if (mode === ShopModes.BASKET) {
            if (productCount && productCount.innerHTML === '0') {
                productCard.remove();
                basket.removeItem(productGroupItem.product);
            }
            const totalInfoPanel: HTMLDivElement | null = document.querySelector(`.totalInfoPanel`);
            if (totalInfoPanel){
                totalInfoPanel.remove();
            }
            if (basket.items.length !== 0) {
                rootBasketArea.append(createBasketTotalInfo(basket));
            }
            createOrUpdateItemsView(ShopModes.BASKET, selectedPageNum[ShopModes.BASKET]);
        }
    };

    const productCountMinus: HTMLDivElement = document.createElement('div');
    productCountMinus.classList.add('productCountMinus');
    productCountMinus.innerHTML = '-';
    productCountMinus.onclick = onAmountMinus;

    const productCount: HTMLDivElement = document.createElement('div');
    productCount.classList.add('productCount');
    productCount.innerHTML = mode === ShopModes.CATALOG ? '0' : productGroupItem.amount.toString();

    const productCountPlus: HTMLDivElement = document.createElement('div');
    productCountPlus.classList.add('productCountPlus');
    productCountPlus.innerHTML = '+';
    productCountPlus.onclick = onAmountPlus;

    const productPrice: HTMLDivElement = document.createElement('div');
    productPrice.classList.add('productPrice');
    productPrice.innerHTML = productGroupItem.countItemTotalPriceWithSale() + '  р';

    if (mode === ShopModes.CATALOG) {
        const toBasketBtn: HTMLDivElement = document.createElement('div');
        toBasketBtn.classList.add('toBasketBtn');
        toBasketBtn.innerHTML = 'В корзину';
        toBasketBtn.onclick = (): void => {
            if (productGroupItem.amount > 0) {
                productCount.innerHTML = '0';
                basket.addItem(productGroupItem.product, productGroupItem.amount, basketAddItemsModes.MERGE);
            }
        };
        productCatalogTotal.append(productCountMinus, productCount, productCountPlus, toBasketBtn, productPrice);
    }
    if (mode === ShopModes.BASKET) {
        productCatalogTotal.append(productCountMinus, productCount, productCountPlus, productPrice);
    }

    productCard.append(productName, imageCarousel, productDescription, productCatalogTotal);

    return productCard;
}

function createImageCarousel(productGroupItem: IProductGroupItem): HTMLDivElement {
    const imageCarousel: HTMLDivElement = document.createElement('div');
    imageCarousel.classList.add('imageCarousel');

    const imageCarouselContainer: HTMLDivElement = document.createElement('div');
    imageCarouselContainer.classList.add('imageCarouselContainer');

    const imageSelectorContainer: HTMLDivElement = document.createElement('div');
    imageSelectorContainer.classList.add('imageSelectorContainer');

    const slideLeft: HTMLDivElement = document.createElement('div');
    slideLeft.innerHTML = '<';
    slideLeft.classList.add('slideLeft');
    const slideRight: HTMLDivElement = document.createElement('div');
    slideRight.innerHTML = '>';
    slideRight.classList.add('slideRight');

    let curPhotoInx: number = 0;
    let lastSelected: number = 0;

    function checkSelectPhotoInx(): void {
        slideRight.classList.remove('slideBlock');
        slideLeft.classList.remove('slideBlock');
        if (curPhotoInx === 0) {
            slideLeft.classList.add('slideBlock');
        }
        if (productGroupItem.product.imgURLsArr.length === curPhotoInx + 1) {
            slideRight.classList.add('slideBlock');
        }

        imgsSelectors[lastSelected].classList.remove('imgSelectorSelected');
        imgsSelectors[curPhotoInx].classList.add('imgSelectorSelected');
        imageCarouselContainer.style.marginLeft = `${-curPhotoInx * 100}%`;
        lastSelected = curPhotoInx;
    }

    slideLeft.onclick = (): void => {
        curPhotoInx--;
        checkSelectPhotoInx();
    };
    slideRight.onclick = (): void => {
        curPhotoInx++;
        checkSelectPhotoInx();
    };

    const imgsArr: HTMLDivElement[] = productGroupItem.product.imgURLsArr.map(url => {
        const img: HTMLDivElement = document.createElement('div');
        img.style.backgroundImage = `url(${url})`;
        img.classList.add('imageCarouselElement');
        return img;
    });
    const imgsSelectors: HTMLDivElement[] = productGroupItem.product.imgURLsArr.map((url, inx) => {
        const imgSelector: HTMLDivElement = document.createElement('div');
        imgSelector.classList.add('imgSelector');
        imgSelector.onclick = (): void => {
            curPhotoInx = inx;
            checkSelectPhotoInx();
        };
        return imgSelector;
    });
    checkSelectPhotoInx();

    imageSelectorContainer.append(...imgsSelectors);
    imageCarouselContainer.append(...imgsArr);
    imageCarousel.append(slideLeft, slideRight, imageCarouselContainer, imageSelectorContainer);
    return imageCarousel;
}

interface IModalWindow {
    openModal():void;
    closeModal():void;
}
function createModalWindowWithContent(content: HTMLDivElement): IModalWindow {
    const popper: HTMLDivElement = document.createElement('div');
    popper.classList.add('popper');

    const modalWindow: HTMLDivElement = document.createElement('div');
    modalWindow.classList.add('modalWindow');

    const modalWindowTopPanel: HTMLDivElement = document.createElement('div');
    modalWindowTopPanel.classList.add('modalWindowTopPanel');

    const modalWindowBottomPanel: HTMLDivElement = document.createElement('div');
    modalWindowBottomPanel.classList.add('modalWindowBottomPanel');

    const modalWindowContentContainer: HTMLDivElement = document.createElement('div');
    modalWindowContentContainer.classList.add('modalWindowContentContainer');

    const OkButton: HTMLDivElement = document.createElement('div');
    OkButton.classList.add('OkButton');
    OkButton.innerHTML = 'Ok';

    const exitButton: HTMLDivElement = document.createElement('div');
    exitButton.classList.add('exitButton');
    exitButton.innerHTML = 'x';

    content.style.height = '90%';
    modalWindowContentContainer.append(content);
    modalWindowTopPanel.append(exitButton);
    modalWindowBottomPanel.append(OkButton);
    modalWindow.append(modalWindowTopPanel, modalWindowContentContainer, modalWindowBottomPanel);
    popper.append(modalWindow);

    const closeModal = (): void => {
        modalWindow.classList.remove('modalWindowOpen');
        setTimeout((): void => popper.remove(), 500);
    };
    const openModal = (): void => {
        document.body.append(popper);
        setTimeout((): void => modalWindow.classList.add('modalWindowOpen'), 0);
    };

    exitButton.onclick = closeModal;
    OkButton.onclick = closeModal;
    popper.onclick = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest('.modalWindow')) {
            closeModal();
        }
    };

    return {
        openModal,
        closeModal,
    };
}

function createEmptyLabel(mode: ShopModes): void {
    const emptyLabel: HTMLDivElement = document.createElement('div');
    emptyLabel.classList.add('emptyBasketLabel');
    emptyLabel.innerHTML = 'Пустота';
    if (mode === ShopModes.BASKET) {
        rootBasketArea.append(emptyLabel);
    } else if (mode === ShopModes.CATALOG) {
        rootCatalogArea.append(emptyLabel);
    }
}

function createBasketTotalInfo(basket: IBasket): HTMLDivElement {
    const totalInfoPanel: HTMLDivElement = document.createElement('div');
    totalInfoPanel.classList.add('totalInfoPanel');
    totalInfoPanel.innerHTML = `В корзине<strong>&nbsp;${basket.items.length}&nbsp;</strong>товаров на сумму <strong>&nbsp;${basket.countBasketPrice()}&nbsp;</strong>рублей`;
    return totalInfoPanel;
}

function createOrUpdateItemsView(mode: ShopModes, selectedPage: number = 1): void {
    const productGroupItems: IProductGroupItem[] = mode === ShopModes.CATALOG ? catalog.productList : basket.items;
    const paginator: HTMLDivElement = document.createElement('div');
    paginator.classList.add('paginator');
    const pageCount: number = Math.ceil(productGroupItems.length / 3);
    if (selectedPage > pageCount) {
        selectedPage = 1;
    }
    selectedPageNum = {
        ...selectedPageNum,
        [mode]: selectedPage
    };
    rootCatalogArea.innerHTML = '';
    rootBasketArea.innerHTML = '';
    if (!productGroupItems.length) {
        createEmptyLabel(mode);
        return;
    }

    const startCount: number = 3 * (selectedPageNum[mode] - 1);
    if (mode === ShopModes.BASKET) {
        basket.items.slice(startCount, startCount + 3).forEach(prItem => {
            rootBasketArea.append(createCatalogCard(prItem, ShopModes.BASKET));
        });
        rootBasketArea.append(createBasketTotalInfo(basket));
    } else if (mode === ShopModes.CATALOG)
        catalog.productList.slice(startCount, startCount + 3).forEach(prItem => {
            rootCatalogArea.append(createCatalogCard(prItem, ShopModes.CATALOG));
        });

    for (let i = 0; i < pageCount; i++) {
        const pageSelector: HTMLDivElement = document.createElement('div');
        pageSelector.classList.add('pageSelector');
        pageSelector.innerHTML = `${i + 1}`;
        if (i === selectedPage - 1) {
            pageSelector.classList.add('pageSelectorSelected');
        }
        const buf: number = i;
        pageSelector.onclick = (): void => {
            paginator.remove();
            createOrUpdateItemsView(mode, buf + 1)
        };
        paginator.append(pageSelector);
    }
    if (mode === ShopModes.CATALOG) {
        rootCatalogArea.prepend(paginator);
    } else if (mode === ShopModes.BASKET) {
        rootBasketArea.prepend(paginator);
    }
}

const pr1: IProduct = new Product('Хачапури', 100, 'Пальчики оближешь', '100g',
    ['https://static.1000.menu/img/content-v2/51/8f/43277/xachapuri-s-syrom-suluguni_1581752500_17_max.jpg',
        'https://rutxt.ru/files/12177/original/f79cb5878c.JPG'
    ]);
const pr2: IProduct  = new Product('Шашлык', 200, 'Не из собак', '100g',
    ['https://www.patee.ru/r/x6/15/f9/7f/960m.jpg',
        'https://kopilka-kulinara.ru/upload/information_system_52/2/5/3/item_2537/item_2537.jpg',
        'https://www.povarenok.ru/data/cache/2016jun/25/46/1624257_55566-710x550x.jpg'
    ]);
const pr3: IProduct  = new Product('Шаурма', 150, 'Не из кошек', '100g',
    ['https://static.1000.menu/img/content-v2/05/d8/21554/klassicheskaya-shaurma_1589963797_11_max.jpg',
        'https://images.cdn.inmyroom.ru/inmyroom/thumb/940x600/jpg:85/uploads/food_recipe/teaser/0b/0b0e/jpg_1000_0b0e915f-1dc7-41e9-a778-d3ac20d2e1b6.jpg?sign=7ac4ef5cd67b307374e0680358426af931bbb3bded2650d26b79b21ceeba74b5',
        'https://www.recept.ua/files/uploads/rec_img/schaurma-s-kuricey.jpg'
    ]);
const pr4: IProduct  = new Product('Котяра', 1, 'Осторожно, кот', '100g',
    ['https://swan-swan.ru/sites/default/files/articles/11.jpg',
        'https://cdnmyslo.ru/BlogArticle/02/16/0216f815-4d2a-40a7-a84e-40d408f8987f_1.jpg'
    ]);

catalog.addProductToCatalog(new ProductGroupItem(pr1, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr2, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr3, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr4, 0));
initializeShop();
