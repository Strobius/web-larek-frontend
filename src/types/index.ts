export interface IProduct  {
    name: string;
    id: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
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
}

export interface IPage {
    catalog: HTMLElement[];
    locked: boolean;
    counter: number;
}

export interface IBascket { 
    selected: string[];
    totalPrice: number;
    items: HTMLElement[];
}

export interface ISuccess {
    totalPrice: number;
}

export interface IOrder {
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IWLApi {
    ProductCatalog: () => Promise<IProduct[]>;
    getProduct: (id: string) => Promise<IProduct>;
	createOrder: (order: IOrder) => Promise<IOrderResult>;
}