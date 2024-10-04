# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# MVP

Проект выполнен в соответствии с архитектурным паттерном `MVP` 

`MVP` — это архитектурный паттерн, который разделяет приложение на три основных компонента:

- `Model`: Управляет данными, логикой и правилами работы с данными.
- `View`: Отвечает за отображение данных и получение пользовательского ввода. 
- `Presenter`: Посредник между Model и View. Обрабатывает пользовательский ввод, запрашивает данные у Model и обновляет View.
- Использование MVP позволяет упростить тестирование и поддержку кода, а также делает код более модульным и расширяемым.

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.
 
# Базовые классы 

### 1. Класс EventEmitter  

Класс, предназначенный для работы с событиями. Обеспечивает функциональность по добавлению и удалению слушателей событий, а также по их обработке.

`constructor()` - инициализирует брокер событий

Поля: 
- `_events` - Map, состоящий из ивентов и подписчиков

Методы: 
- `on` - устанавливает обработчик на событие 
- `off` - сбрасывает обработчик с события 
- `emit` - уведомление подписчика о наступлении события 
- `onAll` - устанавливает обработчик на все события 
- `offAll` - сбрасывает обработчик на всех событиях 
- `trigger` - сделать коллбек триггер, генерирующий событие при вызове

### 2. Класс Api

Базовый класс для работы с API, реализует методы для выполнения HTTP-запросов к переданному базовуму URL.

`constructor(baseUrl: string, options: RequestInit = {})` - принимает базовый URL и глобальные опции для всех запросов(опционально).

Поля: 
- `baseUrl` - базовый адрес сервера, 
- `options` - объект с заголовками запросов.

Методы:
  - `handleResponse` - отрабатывает ответы от сервера, преобразуя их в json и управляя ошибками.
  - `get` - выполняет GET запросы к предоставленному URL.
  - `post` - выполняет запрос к API с использованием предоставленного метода(POST|PUT|DELETE) и предоставленными данными. 

### 3. Класс Component<T>

Базовый абстрактный класс для компонентов пользовательского интерфейса. Отвечает за отрисовку элементов интерфейса и предоставляет базовую функциональность для работы с DOM, которая может быть расширена дочерними компонентами.

`constructor(container: HTMLElement)` - принимает элемент контейнера, в который будет помещен компонент

Методы: 
- `toggleClass` - переключает класс компонента 
- `setText` - устанавливает текстовое содержимое для компонента 
- `setDisabled` - меняет статус блокировки компонента 
- `setHidden` - скрывает компонент 
- `setVisible` - делает компонент видимым 
- `setImage` - устанавливает для компонента изображение с альтернативным текстом 
- `render` - возвращает корневой DOM-элемент

### 4. Класс Model 

Класс, отвечающий за уведомление других компонентов о изменениях в данных. Обеспечивает функционал наблюдателя, позволяя подписчикам получать уведомления о событиях изменения данных.

Методы: 
- `emitChanges` - сообщает всем, о изменении данных.

# Общие классы 

### 1. Класс Data 

Класс, отвечающий за хранение и управление данными. Предоставляет интерфейс для доступа к данным другим компонентам системы. Наследуется от класса Model, что позволяет уведомлять другие компоненты об изменениях в данных.

поля: 
- `basket` - данные о товарах в корзине;
- `order` - данные заказа;
- `preview` - октрытый товар;
- `formerrors` - данные валидации форм;

методы:
- `catalog` - каталог товаров
- `getTotalResult` - получение итоговой суммы заказов
- `removeFromBasket` и `addToBasket` - удаление и добавление товаров в корзину
- `clearBasket` - очистка корзины 
- `updateBasket` - обновление корзины 
- `validateAddress` - валидация формы адреса 
- `validateContacts` - валидация формы котактов 


### 2. Класс WLApi

Класс для работы с API проекта. Реалезует методы получения списка товаров с сервера  и отправки заказа на сервер. Наследуется от класса Api. 

`constructor(cdn: string, baseUrl: string, options?: RequestInit)` - принимает url сервера с контентом, url сервера, по которому будут совершаться запросы, и общие опции для этих запросов

поля: 
- `cdn` - url сервера 

методы: 
- `getProductCatalog` - возвращает массив продуктов с сервера 
- `getProduct` - возвращает продукт с сервера по переданному id, 
- `createOrder` - отправляет переданный заказ на сервер и возвращает результат


# Компоненты 

### 1. Класс Card

Класс для отображения данных карточки товара. Реализует функционал для отрисовки цены, описания, названия, изображения и категории товара. Наследуется от класса Component.

`constructor(container: HTMLElement)` - DOM-элемент карточки 

поля: 
- `_price` - цена товара
- `_titile` - заголовок карточки
- `_image` - изображение карточки
- `_category` - категория товара 
- `_button` - кнопка карточки
- `_description` - описание  карточки

Сеттеры:

- `id` - принимает и задает id карточки
- `title` - меняет содержимое заголовка на полученное
- `price` - меняет содержимое контейнера с ценой на полученное
- `category` - меняет содержимое контейнера с категорией на полученное
- `image` - меняет изображение
- `description` - меняет содержимое контейнера с описанием на полученное
- `button` - устанавливает текст на кнопке

### 2. Класс Form

Базовый класс для работы с формами ввода данных. Реализует методы рендера и замены содержимого контейнера с ошибками на переданное. Наследуется от класса Component.

`constructor(protected container: HTMLFormElement, protected events: IEvents)` - принимает контейнер с формой и брокер событий

поля: 
- `_errors` - контейнер для ошибок валидации 
- `submit` - кнопка сабмита формы

сеттеры: 
- `valid` - дизэйблид кнопку сабмита формы в зависимости от переданного состояния
- `errors` - меняет содержмое компонента с ошибками формы на переданное

методы: 
- `render` - рендерит компонент формы, используя переданное состояние

### 3. Класс Address

Класс, отвечающий за форму ввода адреса доставки. Предоставляет пользователю возможность вводить и сохранять информацию об адресе. Наследуется от класса Form.

`constructor(container: HTMLFormElement, events: IEvents)` - принимает контейнер с формой и брокер событий

Поля: 
- `onlinePayment` - кнопка оплаты онлайн
- `cashPayment` - кнопка оплаты при получении
- `addressInput` - инпут ввода адреса

сеттеры: 
- `setAddress` - устанавливает адрес доставки;

Методы: 
- `paymentButtons` - управляет состоянием кнопки оплаты; 

### 4. Класс Contacts

Класс, отвечающий за форму ввода контактных данных. Наследуется от класса Form.

`constructor(container: HTMLFormElement, events: IEvents)` - принимает контейнер с формой и брокер событий

поля: 
- `emailInput` - инпут ввода почты
- `phoneInput` - инпут ввода телефона 

Сеттеры: 
- `phone` - устанавливает номер телефона; 
- `email` - устанавливает email;

### 5. Класс Modal

Класс для работы с модальными окнами. Обеспечивает функционал для открытия, закрытия и рендера модальных окон. Наследуется от класса Component.

`constructor(container: HTMLElement, protected events: IEvents)` - принимает DOM-элемент модального окна и брокер событий

поля: 
- `closeButton` - кнопка закрытия модального окна
- `_content` - содержимое модального окна 

Сеттеры: 
- `content` - меняет модержимое модального окна

методы:
- `open` - открывает модальное окно
- `close` - закрывает и стирает содержимое модального окна,
- `render` - рендерит модальное окно с переданным содержимым и открывает его

### 6. Класс Page

Класс, отвечающий за отображение каталога товаров и управление счетчиком товаров, добавленных в корзину. Наследуется от класса Component.

`constructor(container: HTMLElement, events: IEvents)` - принимает DOM-элемент главной страницы и брокер событий.

поля: 
- `_catalog` - каталог товаров, 
- `_counter` - счетчик товаров, 
- `basket` - корзина. 

сеттеры: 
- `counter` - меняет число на счетчике, 
- `catalog` - меняет содержимое каталога.
 
### 7. Класс Basket

Класс для отображения товаров в корзине и подсчета общей стоимости товаров. Наследуется от класса Component.

`constructor(events: IEvents)` - принимает брокер событий

Поля: 
- `template` - элемент шаблона корзины, 
- `_list` - элемент содержимого корзины (карточек товаров), 
- `_total` - элемент суммы товаров в корзине,
- `_button` - элемент кнопки оформления заказа в корзине

Сеттеры:
- `items` - меняет содержимое в корзине в зависимости от переданных товаров
- `total` - меняет значение в элементе суммы товаров на переданное

### 8. Класс Success

Класс для отображения сообщения об успешном завершении покупки. Наследуется от класса Component.

`constructor (container: HTMLElement, events: IEvents)` - принимает DOM-элемент окна на базе шаблона и брокер событий

Поля: 
- `total` - элемент с суммой заказа 

Методы: 
- `totalPrice` - устанавливает значение общей суммы заказа

## Интерфейсы
```
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
    selected: HTMLElement[];
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


