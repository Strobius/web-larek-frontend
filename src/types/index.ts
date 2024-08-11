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
}

export interface IBascket { 
    Position: number;
    totalPrice: number;
    products: HTMLElement[];
}

export interface ISuccess {
    totalPrice: number;
}

export interface IWLApi {
    ProductCatalog: () => Promise<IProduct[]>;
}