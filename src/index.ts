import './scss/styles.scss';
import { WLApi } from './components/WLApi';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/card';
import { Data, CatalogChangeEvent } from './components/data';
import { Page } from './components/page';
import { Modal } from './components/modal';
import { IProduct, IAdress, IContactForm } from './types';
import { Basket } from './components/basket';
import { Address } from './components/address';
import { Contacts } from './components/contacts';
import { Success } from './components/success';

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success')


const api = new WLApi(CDN_URL, API_URL);
const events = new EventEmitter();
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const addressForm = new Address(cloneTemplate(orderTemplate), events);
const contactsForm = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
    onClick: () => {
        modal.close();
        data.clearBasket();
    }
});



const data = new Data({}, events);


events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
})

// Отоброжение карточек
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = data.productCatalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

events.on('card:select', (item: IProduct) => {
	data.setPreview(item);
});

// Получение карточек с сервера
api.ProductCatalog()
	.then(data.setCatalog.bind(data))
	.catch((err) => {
		console.error(err);
	});

// Открытие корзины
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// Блокировка и разблокировка прокрутки страницы
events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

// Открыть товар
events.on('preview:changed', (item: IProduct) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (data.isInBasket(item)) {
				data.removeFromBasket(item);
				card.buttonText = 'Добавить в корзину';
			} else {
				data.addToBasket(item);
				card.buttonText = 'Удалить из корзины';
			}
			events.emit('basket:changed');
		}
	});
	modal.render({
		content: card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			buttonText: data.isInBasket(item)? 'Удалить из корзины' : 'Добавить',
		})
	});
});

// Открыть корзину
events.on('basket:changed', () => {
	page.counter = data.basket.length
	basket.total = data.getTotal();
    basket.items = data.basket.map((item, index) => {
        const card = new Card(cloneTemplate(cardBasketTemplate), {
            onClick: () => data.removeFromBasket(item)
        });
        return card.render({
			title: item.title,
            price: item.price,
			index: index + 1,
		});
    });
})

// Открыть форму с адресом
events.on('order:open', () => {
    modal.render({
        content: addressForm.render({
            payment: '',
            address: '',
            valid: false,
            errors: [],
          })
    });
});

// Изменения в поле с адресом 
events.on(/^order\..*:change/, (payload: { field: keyof IAdress, value: string }) => {
    data.setAddress(payload.field, payload.value);
});

// Показ ошибок валидации поля с адресом 
events.on('formErrors:change', (errors: Partial<IAdress>) => {
	const {payment, address,} = errors;
	addressForm.valid = !payment && !address;
	addressForm.errors = Object.values({payment, address}).filter((i) => !!i).join('; ');
});

// Открыть форму с контактными данными 
events.on('order:submit', () => {
    data.order.items = data.basket.map((item) => item.id);
    modal.render({
        content: contactsForm.render({
            phone: '',
            email: '',
            valid: false,
            errors: []
        })
    });
});

// Изменения полей почты и телефона
events.on(/^contacts\..*:change/, (payload: { field: keyof IContactForm, value: string }) => {
    data.setContactsForm(payload.field, payload.value);
});

// Показ ошибок валидации формы с полями телефона и почты 
events.on('formErrors:change', (errors: Partial<IContactForm>) => {
	const {email, phone} = errors;
	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({phone, email}).filter((i) => !!i).join('; ');
});

// Отслеживание выбранного способа оплаты 
events.on('payment:change', (item: HTMLButtonElement) => {
	data.order.payment = item.name;
	data.validateAddressForm();
});

// Отправка заказа на сервер
events.on('contacts:submit', () => {
    data.order.total = data.getTotal();            

    api.createOrder(data.order)
        .then((result) => {
            success.total = result.total;

            modal.render({
                content: success.render()
            });

            data.clearBasket();
        })
        .catch(err => {
            console.error(err);
        });
});
