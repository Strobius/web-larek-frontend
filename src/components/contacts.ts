import { ensureElement } from "../utils/utils";
import { IContactForm } from "../types";
import { Form } from "./form";
import { IEvents } from "./base/events";

export class Contacts extends Form<IContactForm> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events)

        this._email = ensureElement<HTMLInputElement>('.form__input[name=email]', this.container);
		    this._phone = ensureElement<HTMLInputElement>('.form__input[name=phone]', this.container);
    }

    set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}

}