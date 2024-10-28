## Contacts Management System

### Project Overview

The Contacts Management System is a backend application developed using Next.js for handling contacts with robust user authentication and data management features. This project provides secure user registration and login, comprehensive contact management capabilities, and timezone-based data retrieval.

## Features

#### 1. User Authentication

- JWT Authentication: Users can register, verify their email, and log in with JSON Web Tokens.
- Email Verification: Requires email verification upon registration for enhanced security.

#### 2. Contact Management

- Create Contact: Add contacts with details including name, email, phone, address, and timezone.
- Retrieve Contacts: Fetch contacts with filtering options (e.g., by name, email, timezone) and sorting capabilities.
- Update Contact: Modify contact information.
- Delete Contact: Soft delete functionality for marking contacts as deleted without permanent removal.

#### 3. Data Validation

- Validates input data with Joi or Yup, ensuring unique email addresses for both users and contacts.

#### 4. Date-Time Handling

- UTC Storage: Stores timestamps in UTC and converts them to the user's timezone for retrieval.
- Date Range Filtering: Retrieve contacts created within a specific date range.

#### 5. Security

- Password Hashing: Hashes passwords before storing them securely.
- Data Encryption: Implements best practices for securing sensitive data.

## Run Locally

Clone the project

```bash
  git clonehttps://github.com/Rajkumar-Khothapalli/ Admitspot-Assignment.git
```

Go to the project directory

```bash
  cd contact-management-system
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Run the backend server

required below environment variables and i ahve used the aivencloud.com for my sql database.

```bash
MYSQL_HOST
MYSQL_USER
MYSQL_PORT
MYSQL_PASSWORD
MYSQL_DATABASE
```

## Database Schema

```bash
USERS TABLE:
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NULL,
	is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

CONTACTS TABLE
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    address VARCHAR(255),
    timezone VARCHAR(50) DEFAULT 'UTC',
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

## API Documentation

### Postman:

Use a Postman collection to document and test API endpoints.

#### Import the provided Postman collection:

https://documenter.getpostman.com/view/22333762/2sAY4uBNUr for detailed endpoint documentation.

## API Reference

#### BASE URL

```http
  admitspot-assignment.vercel.app
```

| Endpoint                                                                         | Method   | Description                   |
| :------------------------------------------------------------------------------- | :------- | :---------------------------- |
| `admitspot-assignment.vercel.app/api/signup`                                     | `POST`   | Register a new user           |
| `admitspot-assignment.vercel.app/api/verify-email?verifyToken&userId`            | `GET`    | Verify new user               |
| `admitspot-assignment.vercel.app/api/login`                                      | `POST`   | Login new user                |
| `admitspot-assignment.vercel.app/api/contacts/add-contact`                       | `POST`   | Create a new contact          |
| `admitspot-assignment.vercel.app/api/contacts/get-contacts/?userId`              | `POST`   | Get all contacts with user ID |
| `admitspot-assignment.vercel.app/api/contacts/get-filter-contacts?"ADD-FILTERS"` | `POST`   | Fetch contacts with filters   |
| `admitspot-assignment.vercel.app/api/contacts/delete-contact?userId&contactId`   | `DELETE` | Soft delete a contact         |
| `admitspot-assignment.vercel.app/api/contacts/update-contact?userId&contactId`   | `PUT`    | Update contact details        |

For detailed API request and response formats, refer to the Postman documentation.

## Additional information

- if the deployed url doesn't work try use the app.http file to test out the api end points.
