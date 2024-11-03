import { IData, IProduct, IContactForm, IAdress, FormErrors, IOrder } from '../types'
import { Model } from './base/model';


export type CatalogChangeEvent = {
    catalog: IProduct[]
  };
  
export class Data extends Model<IData> {
    productCatalog: IProduct[];
    basket: IProduct[] = [];
    Contacts: IContactForm;
    preview: string | null;
    formErrors: FormErrors = {};
    order: IOrder = {
        address: '',
        email: '',
        phone: '',
        items: [],
        total: 0,
        payment: ''
    }


    setCatalog(items: IProduct[]) {
        this.productCatalog = items;    
        this.emitChanges('items:changed', { catalog: this.productCatalog });
    }

    setPreview(item: IProduct) {
        this.preview = item.id
        this.emitChanges('preview:changed', item);
    }

    updateBasket() {
	    this.emitChanges('counter:changed', this.basket);
        this.emitChanges('basket:changed', this.basket);
	}

    clearBasket() {
	    this.basket = [];
        this.updateBasket();
	}

    addToBasket(item: IProduct) {
	    this.basket.push(item);
        
	    this.updateBasket();
    }

    removeFromBasket(item: IProduct) {
	    this.basket = this.basket.filter((product) => product.id != item.id);
	    this.updateBasket();
	}

    isInBasket (item: IProduct) {
        return this.basket.includes(item);
    }

    getTotal(): number {
		return this.basket.reduce((a, b) => {
			return a + b.price;
		}, 0);
	}

    setAddress(field: keyof IAdress, value: string) {
		this.order[field] = value;

		if (this.validateAddressForm()) {
			this.events.emit('order:ready', this.order);
		}
	}

    validateAddressForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

        if (!this.order.payment) {
			errors.address = 'Необходимо выбрать способ оплаты';
		}


		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

    setContactsForm(field: keyof IContactForm, value: string) {
        this.order[field] = value;

        if (this.validateContactForm()) {
            this.events.emit('contacts:ready', this.order);
        }
    }

    validateContactForm() {
        const errors: typeof this.formErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/; 
    
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        } else if (!emailPattern.test(this.order.email)) {
            errors.email = 'Неверный формат email';
        }
    
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        } else if (!phonePattern.test(this.order.phone)) {
            errors.phone = 'Неверный формат телефона';
        }
    
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

}