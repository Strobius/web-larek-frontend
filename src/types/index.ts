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
    numberPosition: number;
    totalPrice: number;
    selected: HTMLElement[];
}