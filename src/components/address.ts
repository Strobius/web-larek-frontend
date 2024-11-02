import { Form } from './form';
import { IAdress,  } from '../types';
import { IEvents } from './base/events';
import { ensureAllElements, ensureElement } from '../utils/utils';


export class Address extends Form<IAdress> {
	protected _address: HTMLInputElement;
    protected _buttons: HTMLButtonElement[];

    constructor (container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._buttons = ensureAllElements<HTMLButtonElement>('.button_alt', container); 

		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				this.payment = button.name;
				events.emit('payment:change', button);
			});
		});

        this._address = ensureElement<HTMLInputElement>('.form__input[name=address]', this.container);
    }

	set payment(name: string) {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

    set address(value: string) {
		this._address.value = value;
	}
}