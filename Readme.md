






# Full Application Setup Guide

This guide provides detailed steps to set up, configure, and run the full-stack application consisting of **NestJS** backend services and a **Next.js** frontend.

## Prerequisites

Before setting up the app, ensure the following are installed:

- **Node.js** (v16.x or higher) - [Install Node.js](https://nodejs.org/)
- **Yarn** (recommended) or **npm** - [Install Yarn](https://yarnpkg.com/)
- **PostgreSQL** (for the databases) - [Install PostgreSQL](https://www.postgresql.org/download/)
- **Docker** (optional for containerization) - [Install 

## 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

## 2. Set Up Databases

### 2.1 Create PostgreSQL Databases

You will need to create two databases for the app: one for the Product & Order Service and another for the Customer Service.

Run the following commands to create the databases (replace `your_db_user` and `your_db_password` with your PostgreSQL user credentials):

```bash
psql -U your_db_user -c "CREATE DATABASE product_order_db;"
psql -U your_db_user -c "CREATE DATABASE customer_db;"
```

Make sure you have the required privileges to create databases in PostgreSQL.

## 3. Set Up Environment Files

Each service in the backend requires an environment file to configure the database connection and other settings.

### 3.1 Order Service Environment Configuration

Navigate to the `product-order-service` directory:

```bash
cd backend/product-order-service
```

Copy the example environment file to create your `.env` file:

```bash
cp .env.example .env
```

Edit the `.env` file to configure the database connection:

```bash
sed -i "s/DB_NAME=your_db_name/DB_NAME=product_order_db/" .env
sed -i "s/DB_USER=your_db_user/DB_USER=your_db_user/" .env
sed -i "s/DB_PASSWORD=your_db_password/DB_PASSWORD=your_db_password/" .env
```

### 3.2 Customer Service Environment Configuration

Next, set up the environment for the `customer-service`:

```bash
cd ../customer-service
```

Copy the example environment file to create your `.env` file:

```bash
cp .env.example .env
```

Edit the `.env` file to configure the database connection:

```bash
sed -i "s/DB_NAME=your_db_name/DB_NAME=customer_db/" .env
sed -i "s/DB_USER=your_db_user/DB_USER=your_db_user/" .env
sed -i "s/DB_PASSWORD=your_db_password/DB_PASSWORD=your_db_password/" .env
```

Replace `your_db_user` and `your_db_password` with the appropriate values.

## 4. Install Dependencies
```bash

run the start-services.sh file 

```

## 5. Start the Services

### 5.1 Start Backend Services(if cript not work )

You can now start the backend services. Each service will run in the background.

#### Start the Product/Order Service:

```bash
cd backend/product-order-service
yarn start &
```

#### Start the Customer Service:

```bash
cd ../customer-service
yarn start &
```

### 5.2 Start Frontend

Finally, start the frontend (Next.js) service:

```bash
cd ../project-23
yarn dev
```

## 6. Access the Services

- **Backend** services will be running on:
  - Product/Order Service: `http://localhost:3001`
  - Customer Service: `http://localhost:3002`

- **Frontend** will be available at:
  - Frontend: `http://localhost:3000`

## 7. Troubleshooting

### Port Already in Use (EADDRINUSE)

If you encounter a port conflict (e.g., `EADDRINUSE`), you can identify the process using the port and terminate it:

```bash
lsof -i :3001
kill -9 <PID>
```

Alternatively, you can change the ports in the `.env` files or `src/main.ts` of the backend services.

### Missing Dependencies

Ensure all dependencies are installed by running:

```bash
yarn install
```

in the respective directories (`backend/product-order-service`, `backend/customer-service`, `project-23`).


## 9. Contributing

Feel free to fork the repository, create new branches, and submit pull requests. Contributions are welcome!

## 10. License

Include your project license here (e.g., MIT License, Apache License, etc.).

---

Thank you for setting up the full-stack application! If you encounter any issues, please reach out or check the issues section for solutions.
