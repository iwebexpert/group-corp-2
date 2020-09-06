class Validator {
    static basePatternsName = {
        name: 'name',
        phone: 'phone',
        email: 'email',
        house: 'house',
        street: 'street',
        city: 'city',
        comment: 'comment'
    };
    constructor() {
        this.patterns = {};
        this.initBasePatterns();
    }
    initBasePatterns() {
        this.patterns[Validator.basePatternsName.name] = /^[A-Za-zА-Яа-яЁё\s-]+$/;
        this.patterns[Validator.basePatternsName.phone] = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
        this.patterns[Validator.basePatternsName.email] = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/;
        this.patterns[Validator.basePatternsName.house] = /^[A-Za-z0-9А-Яа-яЁё\s-]+$/;
        this.patterns[Validator.basePatternsName.street] = /^[A-Za-zА-Яа-яЁё\d\s-]+$/;
        this.patterns[Validator.basePatternsName.city] = /^[A-Za-zА-Яа-яЁё\s-]+$/;
        this.patterns[Validator.basePatternsName.comment] = /^[\w\sА-Яа-яЁё.,!?;:-]*$/;

    }
    validate(string, patternName) {
        this.patterns[patternName].lastIndex = 0;
        return this.patterns[patternName].test(string);
    }
}
class BasketView {
    static basketSteps = {
        goodsReview: 'goodsReview',
        address: 'address',
        comments: 'comments'
    };

    constructor(initializatorDOM){
        this.initializatorDOM = initializatorDOM;
        this.basket = initializatorDOM.basket;
        this.createOrUpdateItemsView = initializatorDOM.createOrUpdateItemsView;
        this.currentBasketStep = BasketView.basketSteps.goodsReview;

        this.basketStatusIcons = this.initIcons();
        this.basketStatusWindow = this.initStatusWindow();
        this.clearBasketButton = this.createClearBasketButton();
        this.addressWindow = this.createAddressWindow();
        this.commentsWindow = this.createCommentsWindow();
        this.prevStepBasketButton = this.createPrevStepBasketButton();
        this.nextStepBasketButton = this.createNextStepBasketButton();
        this.initSaveBtnHandler();

        this.validator = new Validator();

        this.formsValid = {
            contacts: {
                city: {
                    isValid: false,
                    errorMessage: 'Требуется: латиница,кириллица, -, пробел, без пробелов по краям'
                },
                street: {
                    isValid: false,
                    errorMessage: 'Требуется: латиница,кириллица, цифрыб -, пробел, без пробелов по краям'
                },
                house: {
                    isValid: false,
                    errorMessage: 'Требуется: латиница,кириллица, цифры, -, пробел, без пробелов по краям'
                },
                phone: {
                    isValid: false,
                    errorMessage: 'Требуется: цифры, формат +7(000)000-0000'
                },
                email: {
                    isValid: false,
                    errorMessage: 'Требуется: латиница, . , - , _ , @ ,  пробел'
                },
                name: {
                    isValid: false,
                    errorMessage: 'Требуется: латиница,кириллица, -, пробел, без пробелов по краям'
                }
            },
            more: {
                comment: {
                    isValid: false,
                    errorMessage: 'Требуется: латиница,кириллица, -, пробел'
                }
            }
        };
    }
    initStatusWindow() {
        const basketStatusWindow = document.createElement('div');
        basketStatusWindow.classList.add('basketPreferences');
        basketStatusWindow.classList.add('basketPreferencesClosed');
        return basketStatusWindow;
    }
    initIcons(){
        const basketIcon = document.createElement('img');
        const firstArrow = document.createElement('img');
        const secondArrow = document.createElement('img');
        const addressIcon = document.createElement('img');
        const commentsIcon = document.createElement('img');

        basketIcon.src = 'img/basket.png';
        firstArrow.src = 'img/arrow.png';
        secondArrow.src = 'img/arrow.png';
        addressIcon.src = 'img/address.png';
        commentsIcon.src = 'img/comment.png';

        basketIcon.classList.add('basketPrefStatusIcon');
        firstArrow.classList.add('basketPrefStatusIcon');
        secondArrow.classList.add('basketPrefStatusIcon');
        addressIcon.classList.add('basketPrefStatusIcon');
        commentsIcon.classList.add('basketPrefStatusIcon');

       return [basketIcon, firstArrow, addressIcon, secondArrow, commentsIcon];
    }
    createClearBasketButton() {
        const clearBasketButton = document.createElement('div');
        clearBasketButton.classList.add('clearBasketButton');
        clearBasketButton.innerHTML = 'Очистить';
        clearBasketButton.addEventListener('click', () => {
            this.basketStatusWindow.innerHTML = '';
            this.basket.clearBasket();
            this.createOrUpdateItemsView('BASKET', 1);
        });
        return clearBasketButton;
    }
    hideBasketStatusWindow() {
        this.basketStatusWindow.classList.add('basketPreferencesClosed');
    }
    isNextStepBasketAllowed() {
        switch (this.currentBasketStep) {
            case 'goodsReview': {
                return this.basket.items.length > 0;
            }
            case 'address': {
                return Object.values(this.formsValid.contacts).every(x => x.isValid === true);
            }
            case 'comments': {
                return Object.values(this.formsValid.more).every(x => x.isValid === true);
            }
        }
    }
    isPrevStepBasketAllowed() {
        return (this.currentBasketStep !== 'goodsReview');
    }
    finishBuying() {
        const successLabel = document.createElement('div');
        successLabel.innerHTML = 'Ждите доставочку!!!';
        successLabel.classList.add('successBuyLabel');
        this.basket.clearBasket();
        this.currentBasketStep = BasketView.basketSteps.goodsReview;
        const popper = this.initializatorDOM.createModalWindowWithContent(successLabel);
        popper.openModal();
    }
    alertInput(input, message) {
        if (!input.classList.contains('validationError')){
            const validationErrorMessage = document.createElement('div');
            validationErrorMessage.innerHTML = message;
            validationErrorMessage.classList.add('validationErrorMessage');
            validationErrorMessage.id = `errorMessage_${input.name}`;
            input.classList.add('validationError');
            input.after(validationErrorMessage);
        }
    }
    unAlertInput(input) {
        input.classList.remove('validationError');
        const errMes = document.querySelector(`#errorMessage_${input.name}`);
        if (errMes){
            errMes.remove();
        }
    }
    validateInput(inputsArr, category) {
        inputsArr.forEach((input) => {
            if (this.validator.validate(input.value, input.name)){
                this.formsValid[category][input.name].isValid = true;
                this.unAlertInput(input);
            } else {
                this.formsValid[category][input.name].isValid = false;
                this.alertInput(input, this.formsValid[category][input.name].errorMessage);
            }
        });
    }
    initSaveBtnHandler() {
        document.body.addEventListener('click', (e) => {
            switch (e.target.id) {
                case 'addressSaveButton': {
                    const arr = Object.values(this.addressWindow.elements);
                    arr.forEach(x => x.value = x.value.trim());
                    this.validateInput(arr, 'contacts');
                    break;
                }
                case 'commentsSaveButton': {
                    const arr = Object.values(this.commentsWindow.elements);
                    arr.forEach(x => x.value = x.value.trim());
                    this.validateInput(arr, 'more');
                    break;
                }
                default: return;
            }
            this.render();
        });
    }
    createSaveButton(id) {
        const saveBtn = document.createElement('div');
        saveBtn.classList.add('sendAddressButton');
        saveBtn.innerHTML = 'Сохранить';
        saveBtn.id =id;
        return saveBtn;
    }
    createAddressWindow() {
        const form = document.createElement('form');
        form.onsubmit = (e) => e.preventDefault();
        form.classList.add('addressForm');
        const addressHTML = `   
                <p class="addressLabel">Куда привезти вкуснятину?</p>
                <input name="city" placeholder="Город" type="text" class="addressField">
                <input name="street" placeholder="Улица"  class="addressField">
                <input name="house" placeholder="Дом" class="addressField">
                <input name="phone" placeholder="Телефон" class="addressField">
                <input name="email" placeholder="email" class="addressField">
                <input name="name" placeholder="имя" class="addressField">
            `;
        form.insertAdjacentHTML('afterbegin', addressHTML);
        form.append(this.createSaveButton('addressSaveButton'));
        return form;
    }
    createCommentsWindow() {
        const form = document.createElement('form');
        form.onsubmit = (e) => e.preventDefault();
        form.classList.add('commentsForm');
        const commentsHTML = `
                <p class="commentsLabel">Еще пожелания?</p>
                <input name="comment" placeholder="Писать здесь" class="commentsField">
            `;
        form.insertAdjacentHTML("afterbegin", commentsHTML);
        form.append(this.createSaveButton('commentsSaveButton'));
        return form;
    }
    createNextStepBasketButton() {
        const nextStepButton = document.createElement('div');
        nextStepButton.classList.add('nextStepButton');
        nextStepButton.innerHTML = 'Дальше';
        nextStepButton.addEventListener('click', () => {
            this.basketStatusWindow.innerHTML = '';
            switch (this.currentBasketStep) {
                case 'goodsReview': {
                    this.currentBasketStep = BasketView.basketSteps.address;
                    this.createOrUpdateItemsView('BASKET', 1);
                    break;
                }
                case 'address': {
                    this.currentBasketStep = BasketView.basketSteps.comments;
                    this.createOrUpdateItemsView('BASKET', 1);
                    break;
                }
                case 'comments': {
                    this.finishBuying();
                    this.createOrUpdateItemsView('BASKET', 1);
                    break;
                }
            }
        });
        return nextStepButton;
    }

    createPrevStepBasketButton() {
        const prevStepButton = document.createElement('div');
        prevStepButton.classList.add('nextStepButton');
        prevStepButton.innerHTML = 'Назад';
        prevStepButton.addEventListener('click', () => {
            this.basketStatusWindow.innerHTML = '';
            switch (this.currentBasketStep) {
                case 'goodsReview': {
                    break;
                }
                case 'address': {
                    this.currentBasketStep = BasketView.basketSteps.goodsReview;
                    this.createOrUpdateItemsView('BASKET', 1);
                    break;
                }
                case 'comments': {
                    this.currentBasketStep = BasketView.basketSteps.address;
                    this.createOrUpdateItemsView('BASKET', 1);
                    break;
                }
            }
        });
        return prevStepButton;
    }
    renderAddressWindow() {
        return this.addressWindow;
    }
    renderCommentsWindow() {
        return this.commentsWindow;
    }
    render() {
        this.basketStatusIcons.forEach(val => val.classList.remove('disableButton'));
        this.clearBasketButton.classList.add('disableButton');

        switch (this.currentBasketStep) {
            case 'goodsReview': {
                this.clearBasketButton.classList.remove('disableButton');
                this.basketStatusIcons.slice(1).forEach(val => val.classList.add('disableButton'));
                break;
            }
            case 'address': {
                this.basketStatusIcons.slice(3).forEach(val => val.classList.add('disableButton'));
                break;
            }
            case 'comments': {
                this.basketStatusIcons.slice(5).forEach(val => val.classList.add('disableButton'));
                break;
            }
        }
        if (this.isNextStepBasketAllowed()) {
            this.nextStepBasketButton.classList.remove('disableButton');
        } else {
            this.nextStepBasketButton.classList.add('disableButton');
        }
        if (this.isPrevStepBasketAllowed()) {
            this.prevStepBasketButton.classList.remove('disableButton');
        } else {
            this.prevStepBasketButton.classList.add('disableButton');
        }

        this.basketStatusWindow.innerHTML = '';
        this.basketStatusWindow.append(this.clearBasketButton, ...this.basketStatusIcons, this.prevStepBasketButton, this.nextStepBasketButton);
        this.basketStatusWindow.classList.remove('basketPreferencesClosed');

        return this.basketStatusWindow;
    }
}

class DatabaseManager {
    constructor(basePath){
        this.basePath = basePath;
    }
    async changePath(path){
        const res = await this.validatePath();
        if (res){
            this.basePath = path;
        }
    }
    async validatePath(path){
        return await this.getMethod(path, () => true, () => false);
    }
    getMethod(params,resolveCallback, rejectCallback){
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', this.basePath + params);
                xhr.onreadystatechange = () => {
                    if(xhr.readyState === XMLHttpRequest.DONE){
                        if(xhr.status !== 200){
                            if (rejectCallback){
                                const res = rejectCallback(xhr);
                                reject(res);
                            } else {
                                reject(xhr.status);
                            }
                        }
                        const res = resolveCallback(xhr);
                        resolve(res);
                    }
                };
                xhr.send();
            });
    }
}
class GoodsDatabaseManager extends DatabaseManager{
    constructor(){
        super('http://localhost:3000/goods?');

        this.getSorted = this.getSorted.bind(this);
        this.getByName = this.getByName.bind(this);
        this.get = this.get.bind(this);
        this.getSortedParams = this.getSortedParams.bind(this);
        this.getLikeParams = this.getLikeParams.bind(this);
        this.getByComplexParams = this.getByComplexParams.bind(this);
    }
    async get(){
        return await this.getMethod('', (xhr) => JSON.parse(xhr.responseText), () => null);
    }
    getSortedParams(paramsArr){
        if (!paramsArr.length){
            return '';
        }
        return `_sort=${paramsArr.map(x => x[0]).join(',')}&_order=${paramsArr.map(x => x[1]).join(',')}`;
    }
    getLikeParams(name){
        if (!name){
            return '';
        }
        return `name_like=${name}`;
    }
    async getSorted(paramsArr){//[[name, 'asc' | 'desc'], [name, 'asc' | 'desc']]
        return await this.getMethod(this.getSortedParams(paramsArr), (xhr) => JSON.parse(xhr.responseText), () => null);
    }
    async getByName(name){
        return await this.getMethod(this.getLikeParams(name), (xhr) => JSON.parse(xhr.responseText), () => null);
    }
    async getByComplexParams(paramsObj){ //{sorted: [[name, 'asc' | 'desc'], [name, 'asc' | 'desc']], like: str}
        let params = '';
        Object.entries(paramsObj).forEach(val=>{
            switch (val[0]) {
                case 'sorted': {
                    params += `&${this.getSortedParams(paramsObj['sorted'])}`;
                    break;
                }
                case 'like': {
                    params += `&${this.getLikeParams(paramsObj['like'])}`;
                    break;
                }
                default: throw new Error('getByComplexParams throws error');
            }
        });
        return await this.getMethod(params, (xhr) => JSON.parse(xhr.responseText), () => null);
    }
}
class ShopInitializator{
    constructor(){
        this.goodsDatabaseManager = new GoodsDatabaseManager();
        this.catalog = new Catalog();
        this.basket = new Basket();
        this.initializatorDOM = new InitializatorDOM();
        this.converter = new Converter();
    }
    async init(){
        const productsParams = await this.goodsDatabaseManager.get();
        const products = productsParams.map(x => new ProductToEat(x.name, x.price, x.description, x.features, x.imgURLsArr, x.ingredientsArr.map((x) => this.converter.convertProductNameToProduct(x)), x.size, x.baseCalories));
        products.forEach(pr => this.catalog.addProductToCatalog(new ProductGroupItem(pr, 0)));

        this.initializatorDOM.initializeShop(this.catalog, this.basket);
    }
}
class SearchFilters {
    constructor(initializatorDOM) {
        this.initDOM();
        this.initializatorDOM = initializatorDOM;
        this.goodsDatabaseManager = new GoodsDatabaseManager();
        this.isShown = false;
        this.converter = new Converter();

        this.setNewSortedProductsToCatalog = this.setNewSortedProductsToCatalog.bind(this);
    }
    createLabel(HtmlFor, className, innerHTML) {
        const label = document.createElement('label');
        label.setAttribute('for', HtmlFor);
        label.classList.add(className);
        label.innerHTML = innerHTML;
        return label;
    }
    createRadio(name, id) {
        const radio = document.createElement('input');
        radio.classList.add('sortRadio');
        radio.setAttribute('name', name);
        radio.setAttribute('id', id);
        radio.setAttribute('type', 'radio');
        return radio;
    }

    initDOM() {
        this.searchPanel = document.createElement('form');
        this.searchPanel.classList.add('searchPanel');

        const searchInput = document.createElement('input');
        searchInput.classList.add('searchInput');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('id', 'searchInput');
        searchInput.setAttribute('placeholder', 'имя товара');
        searchInput.autocomplete="off";
        this.searchInput = searchInput;

        const sortByPriceHeader = document.createElement('div');
        sortByPriceHeader.classList.add('sortHeader');
        sortByPriceHeader.innerHTML ='По цене';

        const sortByPriceLabelAsc = this.createLabel('sortByPriceRadioAsc','sortLabel',  'Возрастание');
        this.sortByPriceRadioAsc = this.createRadio('sortByPriceRadio', 'sortByPriceRadioAsc');

        const sortByPriceLabelDesc = this.createLabel('sortByPriceRadioDesc','sortLabel',  'Убывание');
        this.sortByPriceRadioDesc = this.createRadio('sortByPriceRadio', 'sortByPriceRadioDesc');

        const sortByPriceLabelNull = this.createLabel('sortByPriceRadioNull','sortLabel',  'Не выбрано');
        this.sortByPriceRadioNull = this.createRadio('sortByPriceRadio', 'sortByPriceRadioNull');
        this.sortByPriceRadioNull.checked = true;

        const sortByCaloriesHeader = document.createElement('div');
        sortByCaloriesHeader.classList.add('sortHeader');
        sortByCaloriesHeader.innerHTML ='По Калориям';

        const sortByCaloriesLabelAsc = this.createLabel('sortByCaloriesRadioAsc','sortLabel',  'Возрастание');
        this.sortByCaloriesRadioAsc = this.createRadio('sortByCaloriesRadio', 'sortByCaloriesRadioAsc');

        const sortByCaloriesLabelDesc = this.createLabel('sortByCaloriesRadioDesc','sortLabel',  'Убывание');
        this.sortByCaloriesRadioDesc = this.createRadio('sortByCaloriesRadio', 'sortByCaloriesRadioDesc');

        const sortByCaloriesLabelNull = this.createLabel('sortByCaloriesRadioNull','sortLabel',  'Не выбрано');
        this.sortByCaloriesRadioNull = this.createRadio('sortByCaloriesRadio', 'sortByCaloriesRadioNull');
            this.sortByCaloriesRadioNull.checked = true;

        this.searchPanel.append(
            searchInput,
            sortByPriceHeader,
            this.sortByPriceRadioAsc, sortByPriceLabelAsc,
            this.sortByPriceRadioDesc, sortByPriceLabelDesc,
            this.sortByPriceRadioNull, sortByPriceLabelNull,
            sortByCaloriesHeader,
            this.sortByCaloriesRadioAsc, sortByCaloriesLabelAsc,
            this.sortByCaloriesRadioDesc, sortByCaloriesLabelDesc,
            this.sortByCaloriesRadioNull, sortByCaloriesLabelNull,
        );
        this.initHandlers();
    }
    async setNewSortedProductsToCatalog(fetcher, paramsArr){
        this.initializatorDOM.catalog.clearCatalog();
        const productsParams = await fetcher(paramsArr);
        const products = productsParams.map(x => new ProductToEat(x.name, x.price, x.description, x.features, x.imgURLsArr, x.ingredientsArr.map(x => this.converter.convertProductNameToProduct(x)), x.size, x.baseCalories));
        products.forEach(pr => this.initializatorDOM.catalog.addProductToCatalog(new ProductGroupItem(pr, 0)));

        this.initializatorDOM.createOrUpdateItemsView('CATALOG');
    }
    async createInputRequest() {
        const paramsObj = {};
        const paramsForSort = [];
        if (this.sortByPriceRadioAsc.checked){
            paramsForSort.push(['price','asc']);
        }
        if (this.sortByPriceRadioDesc.checked){
            paramsForSort.push(['price','desc']);
        }
        if (this.sortByCaloriesRadioAsc.checked){
            paramsForSort.push(['baseCalories','asc']);
        }
        if (this.sortByCaloriesRadioDesc.checked){
            paramsForSort.push(['baseCalories','desc']);
        }
        if (this.searchInput.value){
            paramsObj.like = this.searchInput.value;
        }
        paramsObj.sorted = paramsForSort;
        await this.setNewSortedProductsToCatalog(this.goodsDatabaseManager.getByComplexParams,paramsObj);
    }
    initHandlers() {
        let lastSearchInput = performance.now();
        let lastTimeout = 0;
        this.searchPanel.addEventListener('input', async (e) => {
            const now = performance.now();
            if (now - lastSearchInput > 500) {
                this.createInputRequest();
            } else {
                clearTimeout(lastTimeout);
                lastTimeout = setTimeout(()=>this.createInputRequest(), 500);
            }
            lastSearchInput = now;
        });
        this.searchPanel.addEventListener('submit', (e) =>e.preventDefault());
    }
    toggleShow(container) {
        if (this.isShown) {
            this.searchPanel.remove();
        } else {
            container.append(this.searchPanel);
        }
        this.isShown = !this.isShown;
    }
    render() {
        return this.searchPanel;
    }
}
class Converter {
    convertProductNameToProduct(name) {
        switch (name) {
            case 'CHEESE': return new Cheese();
            case 'SALAD':  return new Salad();
            case 'POTATO': return new Potato();
            case 'SPICES': return new Spices();
            case 'MAYO': return new Mayo();
        }
    }
}
class SizeAndToppingSelector{
    constructor(productGroupItem, productPriceLabel, initializatorDOM){
        this.requiredToppings = {
            CHEESE: new Cheese(),
            SALAD: new Salad(),
            POTATO: new Potato()
        };
        this.optionalToppings = {
            SPICES: new Spices(),
            MAYO: new Mayo()
        };
        this.initializatorDOM = initializatorDOM;
        this.productPriceLabel = productPriceLabel;
        this.product = productGroupItem.product;
        this.productGroupItem = productGroupItem;

        this.productGroupItem.product.selectedRequiredTopping = this.productGroupItem.product.selectedRequiredTopping || this.requiredToppings.CHEESE;
        this.productGroupItem.product.selectedOptionalTopping = this.productGroupItem.product.selectedOptionalTopping || [];
        this.productGroupItem.product.lastSelectedRequiredSelector = this.productGroupItem.product.lastSelectedRequiredSelector ||  null;
        this.productGroupItem.product.lastSelectedSizeSelector = this.productGroupItem.product.lastSelectedSizeSelector || null;
        this.productGroupItem.product.lastSelectedOptionalSelectors = this.productGroupItem.product.lastSelectedOptionalSelectors || [];

        this.element = document.createElement('div');
        this.element.classList.add('selectorToppingArea');
        this.initHandlers();
    }
    createSelector(status, label, name){
        const selector = document.createElement('div');
        selector.classList.add('toppingSelector');

        const icon = document.createElement('div');
        icon.classList.add((status === 'required' && (this.productGroupItem.product.selectedRequiredTopping.name === name || name === this.product.size)) ? 'checkedIcon' : 'uncheckedIcon');

        const labelSelector = document.createElement('div');
        labelSelector.classList.add('toppingLabel');
        labelSelector.innerHTML = label;

        if (status === 'required' && this.productGroupItem.product.selectedRequiredTopping.name === name){
            this.lastSelectedRequired = selector;
            labelSelector.classList.add('checkedToppingLabel');
        }

        if (status === 'required' && name === this.product.size){
            this.productGroupItem.product.lastSelectedSizeSelector = selector;
            labelSelector.classList.add('checkedToppingLabel');
        }

        if (status === 'optional' && this.product.selectedOptionalTopping.map(x=>x.name).includes(name)){
            labelSelector.classList.add('checkedToppingLabel');
        }

        selector.toppingType = status;
        selector.name = name;

        selector.append(icon, labelSelector);

        return selector;
    }
    uncheckSelector(realTarget){
        realTarget.childNodes[0].classList.remove('checkedIcon');
        realTarget.childNodes[0].classList.add('uncheckedIcon');
        realTarget.childNodes[1].classList.remove('checkedToppingLabel');
    }
    checkSelector(realTarget){
        realTarget.childNodes[0].classList.add('checkedIcon');
        realTarget.childNodes[0].classList.remove('uncheckedIcon');
        realTarget.childNodes[1].classList.add('checkedToppingLabel');
    }
    initHandlers(){
        this.element.addEventListener('click', (e) => {
            const realTarget = e.target.closest('.toppingSelector');
            if (realTarget && realTarget.toppingType === 'required' && Object.values(ProductToEat.productSizes).includes(realTarget.name)) {
                if (this.productGroupItem.product.lastSelectedSizeSelector){
                    this.uncheckSelector(this.productGroupItem.product.lastSelectedSizeSelector);
                }
                this.checkSelector(realTarget);
                this.product.size = realTarget.name;
                this.productGroupItem.product.lastSelectedSizeSelector = realTarget;
            } else
            if (realTarget && realTarget.toppingType === 'required') {
                if (this.lastSelectedRequired){
                    this.uncheckSelector(this.lastSelectedRequired);
                    this.product.removeIngredient(this.requiredToppings[this.lastSelectedRequired.name.toUpperCase()]);
                }
                this.checkSelector(realTarget);
                this.product.addIngredient(this.requiredToppings[realTarget.name.toUpperCase()]);
                this.lastSelectedRequired = realTarget;
                this.productGroupItem.product.selectedRequiredTopping = this.requiredToppings[realTarget.name.toUpperCase()];
            } else
            if (realTarget && realTarget.toppingType === 'optional') {
                if (this.productGroupItem.product.lastSelectedOptionalSelectors.includes(realTarget)){
                    this.uncheckSelector(realTarget);
                    this.product.removeIngredient(this.optionalToppings[realTarget.name.toUpperCase()]);
                    this.productGroupItem.product.lastSelectedOptionalSelectors = this.productGroupItem.product.lastSelectedOptionalSelectors.filter(x => x!==realTarget);
                    this.productGroupItem.product.selectedOptionalTopping = this.productGroupItem.product.selectedOptionalTopping.filter(x => x!==this.optionalToppings[realTarget.name.toUpperCase()]);
                } else {
                    this.checkSelector(realTarget);
                    this.product.addIngredient(this.optionalToppings[realTarget.name.toUpperCase()]);
                    this.productGroupItem.product.lastSelectedOptionalSelectors.push(realTarget);
                    this.productGroupItem.product.selectedOptionalTopping.push(this.optionalToppings[realTarget.name.toUpperCase()]);
                }
            }
            this.caloriesLabel.innerHTML = `${this.product.countCalories()}ккал`;
            this.productPriceLabel.innerHTML = this.productGroupItem.countItemTotalPriceWithSale() + '  р';

            if (this.initializatorDOM.totalInfoPanel) {
                this.initializatorDOM.totalInfoPanel.innerHTML = `В корзине<strong>&nbsp;${this.initializatorDOM.basket.items.length}&nbsp;</strong>товаров на сумму <strong>&nbsp;${  this.initializatorDOM.basket.countBasketPrice()}&nbsp;</strong>рублей`;
            }
        });
    }
    render(){
        this.requiredArea = document.createElement('div');
        this.requiredArea.classList.add('requiredToppingsArea');

        this.optionalArea = document.createElement('div');
        this.optionalArea.classList.add('optionalToppingsArea');

        this.sizesArea = document.createElement('div');
        this.sizesArea.classList.add('requiredToppingsArea');

        this.caloriesLabel = document.createElement('div');
        this.caloriesLabel.classList.add('caloriesLabel');
        this.caloriesLabel.innerHTML = `${this.product.countCalories()} ккал`;

        Object.values(ProductToEat.productSizes).forEach(x =>{
            const selector = this.createSelector('required', x, x);
            this.sizesArea.append(selector);
        });
        Object.values(this.requiredToppings).forEach(x =>{
            const selector = this.createSelector('required', x.label, x.name);
            this.requiredArea.append(selector);
        });
        Object.values(this.optionalToppings).forEach(x =>{
            const selector = this.createSelector('optional', x.label, x.name);
            this.optionalArea.append(selector);
        });

        this.element.append(this. sizesArea,this.optionalArea, this.requiredArea , this.caloriesLabel);
        return this.element;
    }
}
class Ingredient {
    constructor ({name, label, calories}) {
        this._name = name;
        this._label = label;
        this._calories = calories;
    }
    get calories() {
        return this._calories;
    }
    set calories(val) {
        this._calories = val;
    }
    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }
    get label() {
        return this._label;
    }
    set label(val) {
        this._label = val;
    }
}
class Topping extends Ingredient{
    constructor({price, ...rest}){
        super(rest);
        this._price = price;
    }
    get price() {
        return this._price;
    }
    set price(val) {
        this._price = val;
    }
}
class OptionalTopping extends Topping{
    constructor(params){
        super(params);
        this.isRequired = false;
    }
}
class RequiredTopping extends Topping{
    constructor(params){
        super(params);
        this.isRequired = true;
    }
}
class Cheese extends RequiredTopping{
    constructor(){
        super({name:'cheese', label:'сыр', calories: 20, price: 10});
    }
}
class Salad extends RequiredTopping{
    constructor(){
        super({name:'salad', label:'салат', calories: 5, price: 20});
    }
}
class Potato extends RequiredTopping{
    constructor(){
        super({name:'potato', label:'картошка', calories: 10, price: 15});
    }
}
class Mayo extends OptionalTopping{
    constructor(){
        super({name:'mayo', label:'майонез', calories: 5, price: 20});
    }
}
class Spices extends OptionalTopping{
    constructor(){
        super({name:'spices', label:'специи', calories: 0, price: 15 });
    }
}
class InitializatorDOM {
    constructor() {
        this.createOrUpdateItemsView = this.createOrUpdateItemsView.bind(this);
    }
    initializeShop(catalog, basket) {
        const container = document.createElement('div');
        container.classList.add('container');
        this.container = container;

        const tabPanel = document.createElement('div');
        tabPanel.classList.add('tabPanel');

        const rootCatalogArea = document.createElement('div');
        const rootBasketArea = document.createElement('div');
        this.rootCatalogArea = rootCatalogArea;
        this.rootBasketArea = rootBasketArea;
        this.catalog = catalog;
        this.basket = basket;

        rootCatalogArea.classList.add('rootArea');
        rootBasketArea.classList.add('rootArea', 'hideClass', 'closeClass');

        const tabToggleButton = document.createElement('div');
        const tagCatalog = document.createElement('div');
        const tagBasket = document.createElement('div');

        tagCatalog.classList.add('tagArea', 'selectedArea');
        tagCatalog.innerHTML = `Каталог`;
        tagBasket.classList.add('tagArea');
        tagBasket.innerHTML = `Корзина`;
        tabToggleButton.classList.add('tabToggleButton', 'tabToggleButtonLeft');
        tabToggleButton.innerHTML = 'ТЫК';

        this.selectedPageNum = {
            'CATALOG': 1,
            'BASKET': 1,
        };

        this.basketView = new BasketView(this);
        const searchFilters = new SearchFilters(this);
        searchFilters.toggleShow(container);

        tabToggleButton.onmousedown = (() => {
            tabToggleButton.classList.toggle('disableBtn');

            tabToggleButton.classList.toggle('tabToggleButtonLeft');
            tabToggleButton.classList.toggle('tabToggleButtonRight');
            tagCatalog.classList.toggle('selectedArea');
            tagBasket.classList.toggle('selectedArea');

            rootCatalogArea.classList.toggle('closeClass');
            rootBasketArea.classList.toggle('closeClass');
            searchFilters.toggleShow(container);

            setTimeout(() => {
                tabToggleButton.classList.toggle('disableBtn');
            }, 2000);

            const mode = tagCatalog.classList.contains('selectedArea') ? 'CATALOG' : 'BASKET';
            this.createOrUpdateItemsView(mode, this.selectedPageNum[mode]);
        });
        this.createOrUpdateItemsView('CATALOG', this.selectedPageNum['CATALOG']);

        this.narrowBasketMode = false;

        tabPanel.append(tagCatalog, tabToggleButton, tagBasket);
        container.append(tabPanel, rootBasketArea, rootCatalogArea/*, this.basketPreferences*/, this.basketView.basketStatusWindow);
        document.body.append(container);
    }

    createCatalogCard(productGroupItem, mode) {
        const rootBasketArea = this.rootBasketArea;
        const basket = this.basket;
        const productCard = document.createElement('div');
        productCard.classList.add('productCard');
        productCard.setAttribute('data-cardname', `${productGroupItem.product.name}_${mode}`);

        const productName = document.createElement('div');
        productName.classList.add('productName');
        productName.innerHTML = productGroupItem.product.name;

        const imageCarousel = this.createImageCarousel(productGroupItem);
        imageCarousel.childNodes.item(2).onclick = () => {
            const modalPhoto = this.createModalWindowWithContent(this.createImageCarousel(productGroupItem));
            modalPhoto.openModal();
        };

        const productDescription = document.createElement('div');
        productDescription.classList.add('productDescription');
        productDescription.innerHTML = `${productGroupItem.product.description}<br><br>/${Object.keys(ProductToEat.productSizes).reduce((acc, val)=> acc + `${ProductToEat.getSizeMultiplier({size:ProductToEat.productSizes[val]}) * productGroupItem.product.getBasePrice()}/`,'')}р без добавок`;

        const productCatalogTotal = document.createElement('div');
        productCatalogTotal.classList.add('productCatalogTotal');

        const onAmountPlus = () => {
            const productCount = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productCount`);
            const productPrice = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productPrice`);
            productCount.innerHTML = `${+productCount.innerHTML + 1}`;
            productGroupItem.amount += 1;
            productPrice.innerHTML = `${productGroupItem.countItemTotalPriceWithSale()}р`;
            if (mode === 'BASKET') {
                const totalInfoPanel = document.querySelector(`.totalInfoPanel`);
                totalInfoPanel.remove();
                rootBasketArea.append(this.createBasketTotalInfo(basket));
            }
        };
        const onAmountMinus = () => {
            const productCount = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productCount`);
            const productPrice = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productPrice`);
            if (productCount.innerHTML !== '0') {
                productCount.innerHTML = `${+productCount.innerHTML - 1}`;
                productGroupItem.amount -= 1;
                productPrice.innerHTML = `${productGroupItem.countItemTotalPriceWithSale()}р`;
            }
            if (mode === 'BASKET') {
                if (productCount.innerHTML === '0') {
                    productCard.remove();
                    basket.removeItem(productGroupItem.product);
                }
                const totalInfoPanel = document.querySelector(`.totalInfoPanel`);
                totalInfoPanel.remove();
                if (basket.items.length) {
                    rootBasketArea.append(this.createBasketTotalInfo(basket));
                }
                this.createOrUpdateItemsView('BASKET', this.selectedPageNum['BASKET']);
            }
        };

        const productCountMinus = document.createElement('div');
        productCountMinus.classList.add('productCountMinus');
        productCountMinus.innerHTML = '-';
        productCountMinus.onclick = onAmountMinus;

        const productCount = document.createElement('div');
        productCount.classList.add('productCount');
        productCount.innerHTML = mode === 'CATALOG' ? '0' : productGroupItem.amount;

        const productCountPlus = document.createElement('div');
        productCountPlus.classList.add('productCountPlus');
        productCountPlus.innerHTML = '+';
        productCountPlus.onclick = onAmountPlus;

        const productPrice = document.createElement('div');
        productPrice.classList.add('productPrice');
        productPrice.innerHTML = productGroupItem.countItemTotalPriceWithSale() + 'р';

        if (mode === 'CATALOG') {
            const toBasketBtn = document.createElement('div');
            toBasketBtn.classList.add('toBasketBtn');
            toBasketBtn.innerHTML = 'В корзину';
            toBasketBtn.onclick = () => {
                if (productGroupItem.amount > 0) {
                    productCount.innerHTML = '0';
                    basket.addItem(productGroupItem.product, productGroupItem.amount, Basket.basketAddItemsModes.MERGE);
                }
            };
            productCatalogTotal.append(productCountMinus, productCount, productCountPlus, toBasketBtn, productPrice);
        }
        if (mode === 'BASKET') {
            productCatalogTotal.append(productCountMinus, productCount, productCountPlus, productPrice);
        }


        const toppingsSelector = new SizeAndToppingSelector(productGroupItem, productPrice, this);
        const toppingsSelectorEl = toppingsSelector.render();


        productCard.append(productName, imageCarousel, productDescription, toppingsSelectorEl, productCatalogTotal);

        return productCard;
    }

    createImageCarousel(productGroupItem) {
        const imageCarousel = document.createElement('div');
        imageCarousel.classList.add('imageCarousel');

        const imageCarouselContainer = document.createElement('div');
        imageCarouselContainer.classList.add('imageCarouselContainer');

        const imageSelectorContainer = document.createElement('div');
        imageSelectorContainer.classList.add('imageSelectorContainer');

        const slideLeft = document.createElement('div');
        slideLeft.innerHTML = '<';
        slideLeft.classList.add('slideLeft');
        const slideRight = document.createElement('div');
        slideRight.innerHTML = '>';
        slideRight.classList.add('slideRight');

        let curPhotoInx = 0;
        let lastSelected = 0;

        function checkSelectPhotoInx() {
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

        slideLeft.onclick = () => {
            curPhotoInx--;
            checkSelectPhotoInx();
        };
        slideRight.onclick = () => {
            curPhotoInx++;
            checkSelectPhotoInx();
        };

        window.addEventListener("keydown", (e) => {
            if (e.code === 'ArrowRight') {
                if (!slideRight.classList.contains('slideBlock')) {
                    curPhotoInx++;
                    checkSelectPhotoInx();
                }
            } else if (e.code === 'ArrowLeft') {
                if (!slideLeft.classList.contains('slideBlock')) {
                    curPhotoInx--;
                    checkSelectPhotoInx();
                }
            }
        });

        const imgsArr = productGroupItem.product.imgURLsArr.map(url => {
            const img = document.createElement('div');
            img.style.backgroundImage = `url(${url})`;
            img.classList.add('imageCarouselElement');

            return img;
        });
        const imgsSelectors = productGroupItem.product.imgURLsArr.map((url, inx) => {
            const imgSelector = document.createElement('div');
            imgSelector.classList.add('imgSelector');
            imgSelector.onclick = () => {
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

    createModalWindowWithContent(content) {
        const popper = document.createElement('div');
        popper.classList.add('popper');

        const modalWindow = document.createElement('div');
        modalWindow.classList.add('modalWindow');

        const modalWindowTopPanel = document.createElement('div');
        modalWindowTopPanel.classList.add('modalWindowTopPanel');

        const modalWindowBottomPanel = document.createElement('div');
        modalWindowBottomPanel.classList.add('modalWindowBottomPanel');

        const modalWindowContentContainer = document.createElement('div');
        modalWindowContentContainer.classList.add('modalWindowContentContainer');

        const OkButton = document.createElement('div');
        OkButton.classList.add('OkButton');
        OkButton.innerHTML = 'Ok';

        const exitButton = document.createElement('div');
        exitButton.classList.add('exitButton');
        exitButton.innerHTML = 'x';

        content.style.height = '90%';
        modalWindowContentContainer.append(content);
        modalWindowTopPanel.append(exitButton);
        modalWindowBottomPanel.append(OkButton);
        modalWindow.append(modalWindowTopPanel, modalWindowContentContainer, modalWindowBottomPanel);
        popper.append(modalWindow);

        const closeModal = () => {
            modalWindow.classList.remove('modalWindowOpen');
            setTimeout(() => popper.remove(), 500);
        };
        const openModal = () => {
            document.body.append(popper);
            setTimeout(() => modalWindow.classList.add('modalWindowOpen'), 0);
        };
        exitButton.onclick = closeModal;
        OkButton.onclick = closeModal;
        popper.onclick = (e) => {
            if (!e.target.closest('.modalWindow')) {
                closeModal();
            }
        };

        return {
            openModal,
            closeModal,
        };
    }

    createEmptyLabel(mode) {
        const emptyLabel = document.createElement('div');
        emptyLabel.classList.add('emptyBasketLabel');
        emptyLabel.innerHTML = 'Пустота';
        if (mode === 'BASKET') {
            this.rootBasketArea.append(emptyLabel);
        } else if (mode === 'CATALOG') {
            this.rootCatalogArea.append(emptyLabel);
        }
    }

    createBasketTotalInfo(basket) {
        const totalInfoPanel = document.createElement('div');
        totalInfoPanel.classList.add('totalInfoPanel');
        totalInfoPanel.innerHTML = `В корзине<strong>&nbsp;${basket.items.length}&nbsp;</strong>товаров на сумму <strong>&nbsp;${basket.countBasketPrice()}&nbsp;</strong>рублей`;
        this.totalInfoPanel = totalInfoPanel;
        return totalInfoPanel;
    }

    createOrUpdateItemsView(mode, selectedPageNum = 1) {
        const productGroupItems = mode === 'CATALOG' ? this.catalog.productList : this.basket.items;
        const paginator = document.createElement('div');
        paginator.classList.add('paginator');
        const pageCount = Math.ceil(productGroupItems.length / 3);
        if (selectedPageNum > pageCount) {
            selectedPageNum = 1;
        }
        this.selectedPageNum = {
            ...this.selectedPageNum,
            [mode]: selectedPageNum
        };
        this.rootCatalogArea.innerHTML = '';
        this.rootBasketArea.innerHTML = '';

        this.narrowBasketPanelSection = document.createElement('div');
        this.narrowBasketPanelSection.classList.add('narrowBasketPanelSection');
        this.narrowBasketPanelSection.innerHTML = ' - ';
        this.rootBasketArea.append(this.narrowBasketPanelSection);
        this.narrowBasketPanelSection.addEventListener("click", () => {
            this.rootBasketArea.innerHTML = '';
            this.rootBasketArea.append(this.narrowBasketPanelSection);
            if (this.narrowBasketMode) {
                this.rootBasketArea.style.height = '70vh';
                this.createOrUpdateItemsView('BASKET', 1);
                this.narrowBasketMode = false;
            } else {
                this.rootBasketArea.style.height = '3vh';
                this.narrowBasketMode = true;
            }
        });

        if (!productGroupItems.length) {
            this.createEmptyLabel(mode);
            this.basketView.hideBasketStatusWindow();
            return;
        }

        const startCount = 3 * (selectedPageNum - 1);

        if (mode === 'BASKET') {
            switch (this.basketView.currentBasketStep) {
                case 'goodsReview': {
                    this.basket.items.slice(startCount, startCount + 3).forEach(prItem => {
                        this.rootBasketArea.append(this.createCatalogCard(prItem, 'BASKET'));
                    });
                    const basketTotalInfo = this.createBasketTotalInfo(this.basket);
                    this.rootBasketArea.append(basketTotalInfo);
                    paginator.style.visibility = 'visible';
                    break;
                }
                case 'address': {
                    this.rootBasketArea.append(this.basketView.renderAddressWindow());
                    paginator.style.visibility = 'hidden';
                    break;
                }
                case 'comments': {
                    this.rootBasketArea.append(this.basketView.renderCommentsWindow());
                    paginator.style.visibility = 'hidden';
                    break;
                }
            }

            this.basketView.render();

        } else if (mode === 'CATALOG') {
            this.basketView.hideBasketStatusWindow();
            this.catalog.productList.slice(startCount, startCount + 3).forEach(prItem => {
                this.rootCatalogArea.append(this.createCatalogCard(prItem, 'CATALOG'));
            });
        }

        for (let i = 0; i < pageCount; i++) {
            const pageSelector = document.createElement('div');
            pageSelector.classList.add('pageSelector');
            pageSelector.innerHTML = `${i + 1}`;
            if (i === selectedPageNum - 1) {
                pageSelector.classList.add('pageSelectorSelected');
            }
            const buf = i;
            pageSelector.onclick = () => {
                paginator.remove();
                this.createOrUpdateItemsView(mode, buf + 1)
            };
            paginator.append(pageSelector);
        }
        if (mode === 'CATALOG') {
            this.rootCatalogArea.prepend(paginator);
        } else if (mode === 'BASKET') {
            this.rootBasketArea.prepend(paginator);
        }
    }
}
class Catalog {
    productList = [];

    addProductToCatalog(productItem) {
        if (!(productItem instanceof ProductGroupItem) || this.productList.map(x => x.name).includes(productItem.product.name)) {
            throw new Error('Некорректные данные');
        }
        this.productList.push(productItem);
    }

    removeProductFromCatalog(productItem) {
        if (!(productItem instanceof ProductGroupItem && this.productList.map(x => x.name).includes(productItem.product.name))) {
            throw new Error('Некорректные данные');
        }
        this.productList = this.productList.filter((x) => x.name !== productItem.product.name);
    }

    clearCatalog() {
        this.productList = [];
    }
}

class Product {
    constructor(name, price, description, features, imgURLsArr) {
        if (name && price && description && features && imgURLsArr
            && typeof name === 'string'
            && typeof description === 'string'
            && typeof features === 'string'
            && typeof price === 'number'
            && Array.isArray(imgURLsArr)
            && price > 0) {
            this._name = name;
            this._price = price;
            this._description = description;
            this._features = features;
            this._imgURLsArr = imgURLsArr.length ? imgURLsArr : ['img/lorem1.jpg'];
        } else {
            throw new Error('некорректные данные при создании продукта');
        }
    }

    set imgURLsArr(val) {
        if (Array.isArray(val) && !val.find(x => !(typeof x === 'string'))) {
            this._imgURLsArr = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get imgURLsArr() {
        return [].concat(this._imgURLsArr);
    }

    set price(val) {
        if (typeof val === 'number' && val > 0) {
            this._price = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get price() {
        return this._price;
    }

    set name(val) {
        if (typeof val === 'string') {
            this._name = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get name() {
        return this._name;
    }

    set description(val) {
        if (typeof val === 'string') {
            this._description = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get description() {
        return this._description;
    }

    set features(val) {
        if (typeof val === 'string') {
            this._features = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get features() {
        return this._features;
    }
}
class ProductToEat extends Product{
    static productSizes = {
        SMALL: 'SMALL',
        MEDIUM: 'MEDIUM',
        LARGE: 'LARGE'
    };
    static getSizeMultiplier({size}){
        if (!(size && size in ProductToEat.productSizes)){
            throw new Error('некорректные данные');
        }
        let multiplier;
        switch (size) {
            case ProductToEat.productSizes.LARGE:
                multiplier = 1.3;
                break;
            case ProductToEat.productSizes.MEDIUM:
                multiplier = 1;
                break;
            case ProductToEat.productSizes.SMALL:
                multiplier = 0.7;
                break;
        }
        return multiplier;
    }
    constructor(name, price, description, features, imgURLsArr, ingredientsArr, size, baseCalories) {
        super(name, price, description, features, imgURLsArr);
        if (!(Array.isArray(ingredientsArr) && size in ProductToEat.productSizes && typeof baseCalories === 'number')){
            throw new Error('некорректные данные');
        }
        this._ingredientsArr = ingredientsArr;
        this._size = size;
        this.baseCalories = baseCalories;
    }
    get size(){
        return this._size;
    }
    set size(val){
        if (!(val && val in ProductToEat.productSizes)){
            throw new Error('некорректные данные');
        }
        this._size = val;
    }
    addIngredient(val){
        if(!(val instanceof Ingredient)){
            throw new Error('некорректные данные');
        }
        this._ingredientsArr.push(val);
    }
    removeIngredient(Ingredient){
        this._ingredientsArr = this._ingredientsArr.filter(x => x.name !==Ingredient.name);
    }
    getIngredients(){
        return this._ingredientsArr.concat([]);
    }
    countCalories() {
        return this.baseCalories*ProductToEat.getSizeMultiplier({size: this._size}) + this._ingredientsArr.reduce((acc, val) => acc + val.calories, 0)
    }
    get price() {
        return (this._price * ProductToEat.getSizeMultiplier({size: this._size}) + this._ingredientsArr.reduce((acc, val) => acc + val.price, 0)).toFixed(2);
    }
    getBasePrice() {
        return  this._price;
    }
}
class ProductGroupItem {
    static saleMode = {
        PERCENTAGE: 'PERCENTAGE',
        RUBLES: 'RUBLES',
    };

    constructor(product, initialAmount, sale, saleMode) {
        if (product && initialAmount >= 0
            && product instanceof Product
            && typeof initialAmount === 'number') {
            this._product = product;
            this._amount = initialAmount;
            if (sale && saleMode) {
                this.setSale(sale, saleMode);
            } else {
                this._sale = {
                    percentage: 0,
                    roubles: 0,
                }
            }
        } else {
            throw new Error('некорректные данные при создании элемента корзины');
        }
    }

    get product() {
        return this._product;
    }

    set product(val) {
        if (val instanceof Product) {
            this._product = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get amount() {
        return this._amount;
    }

    set amount(val) {
        if (typeof val === 'number' && val >= 0) {
            this._amount = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    convertSalePercentageToRubles(salePercentage) {
        return this.product.price * this.amount * salePercentage / 100;
    }

    convertSaleRublesToPercentage(saleRubles) {
        return saleRubles / (this.product.price * this.amount) * 100;
    }

    setSale(sale, saleMode) {
        if (sale && saleMode
            && typeof sale === 'number'
            && sale > 0
            && saleMode in ProductGroupItem.saleMode
            && !(saleMode === ProductGroupItem.saleMode.PERCENTAGE && sale > 100 || saleMode === ProductGroupItem.saleMode.RUBLES && sale > this.product.price * this.amount)
        ) {
            this._sale = {
                percentage: saleMode === ProductGroupItem.saleMode.PERCENTAGE ? sale : this.convertSaleRublesToPercentage(sale),
                roubles: saleMode === ProductGroupItem.saleMode.RUBLES ? sale : this.convertSalePercentageToRubles(sale),
            }
        } else {
            throw new Error('некорректные данные');
        }
    }

    getSale() {
        return this._sale;
    }

    countItemTotalPriceWithSale() {
        return this.product.price * this.amount * (this._sale.percentage ? (1 - this._sale.percentage / 100) : 1);
    }

    countItemTotalPriceWithoutSale() {
        return this.product.price * this.amount;
    }
}

class Basket {
    static basketAddItemsModes = {
        ADD_OR_RESET: 'ADD_OR_RESET',
        MERGE: 'MERGE',
    };
    _items = [];

    addItem(product, amount, mode) { // true если добавили успешно
        try {
            if (!(typeof amount === 'number'
                && mode in Basket.basketAddItemsModes
                && product instanceof Product)) {
                console.log('некорректные данные');
                return false;
            }
            const found = this._items.find(val => val.product === product);
            switch (mode) {
                case Basket.basketAddItemsModes.ADD_OR_RESET: {
                    if (found) {
                        found.amount = amount;
                    } else {
                        this._items.push(new ProductGroupItem(product, amount));
                    }
                    break;
                }
                case Basket.basketAddItemsModes.MERGE: {
                    if (found) {
                        found.amount += amount;
                    } else if (amount > 0) {
                        this.addItem(product, amount, Basket.basketAddItemsModes.ADD_OR_RESET);
                    }
                    break;
                }
                default:
                    console.log('Видимо, все плохо');
            }
            return true;
        } catch (e) {
            console.log('Ошибка при добавлении');
            return false;
        }
    }

    removeItem(product) {
        this._items = this._items.filter(val => val.product !== product);
    }

    clearBasket() {
        this._items = [];
    }

    get items() {
        return this._items;
    }

    countBasketPrice() {
        try {
            return this.items.reduce((acc, val) => acc + val.countItemTotalPriceWithSale(), 0);
        } catch (e) {
            console.log('Ошибка в countBasketPrice');
            return null;
        }
    };
}

const initializator = new ShopInitializator();
initializator.init();
