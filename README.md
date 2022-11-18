<!-- HEADER -->
<div>
<div align="center">
  <img  src="https://i.imgur.com/E8H0GaC.png"
    width=100%" >
</div>
<br>
<h1 align="center">
  Boardcamp - API
</h1>
<div align="center">
  <h3>Built With</h3>
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img alt="ExpressJS badge" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img alt="MongoDB badge" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img alt="Heroku badge" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>
<br/>
</div>

<!-- CONTENT -->
## Description

Boardcamp is an API for a board games rental store. 

It was the 15ᵗʰ project of the Driven Full Stack Bootcamp and the 1ˢᵗ to use a SQL database.

## Features

- All data stored in a SQL database (PostgreSQL)
- List and game categories and games available
- See all info about the games available:
  - Name
  - Image
  - Amount available
  - Category
  - Rent price per days
  - Rentals count
- Insert, list and edit customers and customers details
- All searchs can be done with query strings
- Responsabilities divided between routes and controllers
- All the entries are validated against schemas

## API Reference

### Categories

* #### Create new category
  
  ```http
  POST /categories
  ```

  ##### Request body:

  | Body   | Type     | Description                         |
  | :----- | :------- | :---------------------------------- |
  | `name` | `string` | **Required** - Unique category name |


  ##### Example: 

  ```json
  {
    "name": "string"
  }
  ```

* #### Get all categories

  ```http
  GET /categories
  ```
  ##### Query strings:

  | Parameter | Type      | Description           |
  | :-------- | :-------- | :-------------------- |
  | `order`   | `string`  | Property to order     |
  | `desc`    | `boolean` | Descending order      |
  | `limit`   | `number`  | Limit response amount |
  | `offset`  | `number`  | Skip `n` results      |

  ##### Response:

  ```json
  [
    {
      "id": 1,
      "name": "string",
    },
    {
      "id": 2,
      "name": "string",
    }
  ]
  ```

### Games

* #### Insert a new game
  
  ```http
  POST /games
  ```

  ##### Request body:

  | Body          | Type     | Description                           |
  | :------------ | :------- | :------------------------------------ |
  | `name`        | `string` | **Required** - Unique name name       |
  | `image`       | `string` | **Required** - Valid image URL        |
  | `stockTotal`  | `number` | **Required** - Stock amount           |
  | `categoryId`  | `number` | **Required** - Existing category ID   |
  | `pricePerDay` | `number` | **Required** - Price per day in cents |

  ##### Example: 

  ```json
  {
    "name": "string",
    "image": "http://...",
    "stockTotal": 1,
    "categoryId": 1,
    "pricePerDay": 1500,
  }
  ```

* #### Get all games

  ```http
  GET /games
  ```
  ##### Query strings:

  | Parameter | Type      | Description           |
  | :-------- | :-------- | :-------------------- |
  | `name`    | `string`  | Filter by name        |
  | `order`   | `string`  | Property to order     |
  | `desc`    | `boolean` | Descending order      |
  | `limit`   | `number`  | Limit response amount |
  | `offset`  | `number`  | Skip `n` results      |

  ##### Response:

  ```json
  [
    {
      "id": 1,
      "name": "Monopoly",
      "image": "http://",
      "stockTotal": 3,
      "categoryId": 1,
      "pricePerDay": 1500,
      "categoryName": "Strategy",
      "rentalsCount": "0"
    },
    {
      "id": 2,
      "name": "Clue",
      "image": "http://",
      "stockTotal": 1,
      "categoryId": 2,
      "pricePerDay": 2500,
      "categoryName": "Mistery",
      "rentalsCount": "0"
    },
  ]
  ```

### Customers

* #### Insert new customer

  ```http
  POST /customers
  ```

  ##### Request:

  | Body       | Type     | Description                               |
  | :--------- | :------- | :---------------------------------------- |
  | `name`     | `String` | **Required** - Valid name                 |
  | `phone`    | `String` | **Required** - Valid phone                |
  | `cpf`      | `String` | **Required** - Valid unique social number |
  | `birthday` | `String` | **Required** - Valid birthday             |

  `phone length: 10 to 11 number characters`

  `cpf length: 11 number characters`

  `birthday format: "YYYY-MM-DD"`

  ##### Example: 

    ```json
    {
      "name": "João Alfredo",
      "phone": "21998899222",
      "cpf": "01234567890",
      "birthday": "1992-10-05"
    }
    ```

* #### Get all Customers

  ```http
  GET /customers
  ```

  ##### Query strings:

  | Parameter | Type      | Description                 |
  | :-------- | :-------- | :-------------------------- |
  | `cpf`     | `string`  | Filter by CPF (starts with) |
  | `order`   | `string`  | Property to order           |
  | `desc`    | `boolean` | Descending order            |
  | `limit`   | `number`  | Limit response amount       |
  | `offset`  | `number`  | Skip `n` results            |

  ##### Response

  ```json
  [
    {
      "id": 1,
      "name": "João Alfredo",
      "phone": "21998899222",
      "cpf": "01234567890",
      "birthday": "1992-10-05",
      "rentalsCount": "0"
    },
    {
      "id": 2,
      "name": "Maria Alfreda",
      "phone": "21998899221",
      "cpf": "12345678910",
      "birthday": "1994-12-25",
      "rentalsCount": "0"
    },
  ]
  ```

* #### Get customer by customer id

  ```http
  GET /customers:{id}
  ```

  `id must be from an existing customer`

  ##### Response

  ```json
  {
    "id": 1,
    "name": "João Alfredo",
    "phone": "21998899222",
    "cpf": "01234567890",
    "birthday": "1992-10-05",
    "rentalsCount": "0"
  }
  ```

* #### Edit a customer
  
  ```http
  PUT /customers:{id}
  ```

  ##### Request:

  | Body       | Type     | Description                               |
  | :--------- | :------- | :---------------------------------------- |
  | `name`     | `String` | **Required** - Valid name                 |
  | `phone`    | `String` | **Required** - Valid phone                |
  | `cpf`      | `String` | **Required** - Valid unique social number |
  | `birthday` | `String` | **Required** - Valid birthday             |

  `phone length: 10 to 11 number characters`

  `cpf length: 11 number characters`

  `birthday format: "YYYY-MM-DD"`

  ##### Example:

    ```json
    {
      "name": "João Alfredo",
      "phone": "21998899222",
      "cpf": "01234567890",
      "birthday": "1992-10-05"
    }
  ```

### Rentals

* #### Add a new rental entry

  ```http
  POST /rentals
  ```

  ##### Request:

  | Body         | Type     | Description                            |
  | :----------- | :------- | :------------------------------------- |
  | `customerId` | `number` | **Required** - Valid customer ID       |
  | `gameId`     | `number` | **Required** - Valid in-stock game ID  |
  | `daysRented` | `number` | **Required** - Quantity of rented days |

  ##### Example:

  ```json
  {
    "customerId": 1,
    "gameId": 1,
    "daysRented": 3
  }
  ```

* #### List all rentals

  ```http
  GET /rentals
  ```

  ##### Query strings:

  | Parameter     | Type      | Description                                 |
  | :------------ | :-------- | :------------------------------------------ |
  | `customerId ` | `number`  | Filter by customer ID                       |
  | `gameId `     | `number`  | Filter by game ID                           |
  | `order`       | `string`  | Property to order                           |
  | `desc`        | `boolean` | Descending order                            |
  | `limit`       | `number`  | Limit response amount                       |
  | `offset`      | `number`  | Skip `n` results                            |
  | `status`      | `enum`    | Filter by status: `open` or `close`         |
  | `startDate`   | `date`    | Format: `"YYYY-MM-DD"`. Filter by rent date |

  ##### Response:

  ```json
  [
    {
      "id": 1,
      "customerId": 1,
      "gameId": 1,
      "rentDate": "2021-06-20",
      "daysRented": 3,
      "returnDate": null,
      "originalPrice": 4500,
      "delayFee": null,
      "customer": {
      "id": 1,
      "name": "João Alfredo"
      },
      "game": {
        "id": 1,
        "name": "Monopoly",
        "categoryId": 1,
        "categoryName": "Strategy"
      }
    }
  ]
  ```

  `if the game was already returned, 'returnDate' will be a Date`

* #### Set rental as finished

  ```http
  POST /rentals/{id}/return
  ```

  `id must be an existing rental ID`

* #### Delete a rental

  ```http
  DELETE /rentals/{id}
  ```

  `id must be an existing rental ID`

## Run Locally

Clone the project:

```bash
git clone https://github.com/lemoscaio/boardcamp-api.git
```

Go to the project directory:

```bash
cd boardcamp-api
```

Install dependencies:

```bash
npm install
```

Set up the environment variables in the `.env` file, using the `.env.example`.

Make sure the PostgreSQL server is running and available.

Start the server:

```bash
node index.js
```

## Lessons Learned

In this project I learned the following:

* to use a SQL database and persist relational data between tables
* to build a rental store and manipulate data such as dates and fees related to this kind of comerce
* to use the PG library for PostgreSQL on Node.js

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)
