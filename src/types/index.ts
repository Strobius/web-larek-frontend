export interface IProduct  {
    name: string;
    id: string;
    description: string;
    price: number;
    image: string;
    category: string;
    title: string;
    index: number;
    buttonText?: string;
};

export interface IData {
    productCatalog: IProduct[];
    basket: IProduct[];
    Contacts: IContactForm;
    Adress:  IAdress;
    preview: string | null;
}

export interface IContactForm {
    email: string;
    phone: string;
}

export interface IAdress {
    address: string;
    payment: string;
}

export interface IPage {
    catalog: HTMLElement[];
    locked: boolean;
    counter: number;
}

export interface IBasket { 
    selected: string[];
    total: number;
    items: HTMLElement[];
}

export interface ISuccess {
    total: number | null;
}

export interface ISuccessActions {
	onClick: () => void;
}

export interface IOrder extends IAdress, IContactForm {
    total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IWLApi {
    ProductCatalog: () => Promise<IProduct[]>;
	createOrder: (order: IOrder) => Promise<IOrderResult>;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
