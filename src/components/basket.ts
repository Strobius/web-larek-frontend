import { Component } from "./base/component";
import { createElement, ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { IBasket } from "../types";

export class Basket extends Component<IBasket> {
    protected _price: HTMLElement;
    protected _list: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._price = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        this.items = [];
    }

    toggleButton(state: boolean) {
        this.setDisabled(this._button, state);
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this.toggleButton(false); 
        } else {
            this._list.replaceChildren(
                createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })
            );
            this.toggleButton(true); 
        }
    }

    set total(total: number) {
        this.setText(this._price, `${total.toString()} синапсов`);
    }

}