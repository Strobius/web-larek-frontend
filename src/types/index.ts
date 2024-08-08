interface Tovar  {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
};

interface UserData {
    paymentMethod: string;
    deliveryAddress: string;
    email: string;
    phone: string;
}