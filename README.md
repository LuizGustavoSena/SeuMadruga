# Seu Barriga

<div align="center">
<img height="400" src="assets/seubarriga.jpg" />
</div>
</br>
Is a financial manager where you can create any accounts in your user and transfer money between them. The project has error handling about any action to another user's account for example get balance, put values or delete some account. Have unit test in service, controllers and infrastructure.

## Table of Contents

- [Stack](#Stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contributor](#contributor)

---

## Stack
<div style="display: inline_block">
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
    <img height="40" width="40" src="https://img.icons8.com/?size=100&id=9Gfx4Dfxl0JK&format=png&color=000000" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
    <img height="40" width="50"src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/knexjs/knexjs-original.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
</div>

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LuizGustavoSena/SeuMadruga.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SeuMadruga
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start PostgreSQL:
   ```bash
   docker-compose up --build
   ```

---

## Usage

### Run the Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

---

## API Documentation

### Auth
- Endpoint: `POST /auth/signup`
  - Description: Create a user
  - Body parameters: `name: string; email: string; password: string;`
  - Error handling: Create a user with an existing email
- Endpoint: `POST /auth/signin`
  - Description: Login a user
  - Body parameters: `email: string; password: string;`
### Account
- Endpoint: `POST /v1/accounts`
  - Description: Create a account
  - Error handling: Create a account with an existing name
  - Body parameters: `name: string;`
- Endpoint: `GET /v1/accounts`
  - Description: Get all user's accounts 
- Endpoint: `GET /v1/accounts/{id}`
  - Description: Get account by id
  - Error handling: Get a account with another user's account
- Endpoint: `PUT /v1/accounts/{id}`
  - Description: Put account by id
  - Body parameters: `name: string;`
  - Error handling: Put a account with another user's account
- Endpoint: `DELETE /v1/accounts/{id}`
  - Description: Delete account by id
  - Error handling: Delete a account with another user's account and Delete a account with transaction inside them
### Transaction
- Endpoint: `POST /v1/transactions`
  - Description: Create a transaction
  - Error handling: Create a transaction with another user's account
  - Body parameters: `ammount: number; description: string; acc_id: number; type: 'I' | 'O';`
- Endpoint: `GET /v1/transactions`
  - Description: Get all user's transactions
- Endpoint: `GET /v1/transactions/{id}`
  - Description: Get transaction by id
  - Error handling: Get a transaction with another user's id
- Endpoint: `PUT /v1/transactions/{id}`
  - Description: Put transaction by id
  - Body parameters: `ammount?: number; description?: string; date?: Date; type?: 'I' | 'O'; transfer_id?: number; status?: boolean`
  - Error handling: PUT a transaction with another user's id
- Endpoint: `DELETE /v1/transactions/{id}`
  - Description: Delete transaction by id
  - Error handling: Delete a transaction with another user's id
### Transfer
- Endpoint: `POST /v1/transfers`
  - Description: Create a transfer
  - Body parameters: `ammount: number; description: string; acc_ori_id: number; acc_dest_id: number`
  - Error handling: Create a transfer with the same value in acc_ori_id and acc_dest_id, another acount's origin or destination user
- Endpoint: `GET /v1/transfers`
  - Description: Get all user's transfers
- Endpoint: `GET /v1/transfers/{id}`
  - Description: Get transfer by id
  - Error handling: Get a transfer with another user's id
- Endpoint: `PUT /v1/transfers/{id}`
  - Description: Put transfer by id
  - Body parameters: `ammount?: number; description?: string; acc_ori_id?: number; acc_dest_id?: number, user_id?: number;`
  - Error handling: PUT a transfer with another user's id
- Endpoint: `DELETE /v1/transfers/{id}`
  - Description: Delete transfer by id
  - Error handling: Get a transfer with another user's id
### Balance
- Endpoint: `GET /v1/balance`
  - Description: Get a user's balance

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add a meaningful message'
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## Contributor

<a href="https://github.com/LuizGustavoSena">
  <img height="60" width="60" style="border-radius: 50px" src="https://avatars.githubusercontent.com/u/69394005?v=4" alt="contrib.rocks image" />
</a>