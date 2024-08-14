# [HopeFund](https://hope-fund.vercel.app/)

**HopeFund** is a platform dedicated to empowering individuals to raise funds for their needs. The platform supports two primary user roles:
- **Donor**: Explore and contribute to various verified causes.
- **Fundraiser**: Create and manage fundraisers to gather support for personal or community needs.

## Features
- **User Authentication**: Secure registration and login for users.
- **Fundraising Management**: Simple tools to create and track fundraisers.
- **Verified Causes**: Ensure that all listed fundraisers are legitimate and trustworthy.

## Prerequisites
- Node.js
- npm

## Setup Instructions

### 1. Download the Source Code
- Clone the repository or download the ZIP file:
    ```bash
    git clone https://github.com/Mohit-Kukreja-2002/HopeFund.git
    ```
- If you downloaded the ZIP file, extract its contents.

### 2. Open the Project
- Open the project directory in your preferred code editor.

### 3. Install Dependencies
- In the project directory, install the necessary dependencies by running:
    ```bash
    npm install
    ```

### 4. Configure Environment Variables
- Create a `.env` file in the client directory with the following content:
    ```plaintext
    # Server Configuration
    NEXT_PUBLIC_SERVER_URI="your_server_uri_here"

    # Google OAuth Configuration
    GOOGLE_CLIENT_ID=your_google_client_id_here
    GOOGLE_CLIENT_SECRET=your_google_client_secret_here
    
    # GitHub OAuth Configuration
    GITHUB_CLIENT_ID=your_github_client_id_here
    GITHUB_CLIENT_SECRET=your_github_client_secret_here
    
    # Application Secret Key
    SECRET=your_secret_key_here
    ```

- Create a `.env` file in the server directory with the following content:
    ```plaintext
    # Server Configuration
    NEXT_PUBLIC_SERVER_URI="your_server_uri_here"

    # Google OAuth Configuration
    GOOGLE_CLIENT_ID="your_google_client_id_here"
    GOOGLE_CLIENT_SECRET="your_google_client_secret_here"

    # GitHub OAuth Configuration
    GITHUB_CLIENT_ID="your_github_client_id_here"
    GITHUB_CLIENT_SECRET="your_github_client_secret_here"

    # Application Secret Key
    SECRET="your_secret_key_here"

    # Application Port and Environment
    PORT=8000
    ORIGIN=['http://localhost:3000/']
    NODE_ENV=development

    # JWT Tokens
    ACCESS_TOKEN="your_access_token_here"
    REFRESH_TOKEN="your_refresh_token_here"

    # Database Configuration
    DB_URL="your_mongodb_connection_string_here"

    # Cloudinary Configuration
    CLOUD_NAME="your_cloud_name_here"
    CLOUD_API_KEY="your_cloud_api_key_here"
    CLOUD_SECRET_KEY="your_cloud_secret_key_here"

    # SMTP Configuration
    SMTP_HOST="smtp.gmail.com"
    SMTP_PORT=465
    SMTP_SERVICE="gmail"
    SMTP_MAIL="your_email_here"
    SMTP_PASSWORD="your_smtp_password_here"

    # Token Expiration
    ACTIVATION_SECRET="your_activation_secret_here"
    ACCESS_TOKEN_EXPIRE=5
    REFRESH_TOKEN_EXPIRE=3

    # TLS Configuration
    NODE_TLS_REJECT_UNAUTHORIZED=0

    # Redis Configuration
    REDIS_URL="your_redis_url_here"

    # Stripe Configuration
    STRIPE_SECRET_KEY="your_stripe_secret_key_here"
    STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key_here"
    ```

### 5. Launch the Application
- Start the development server in both client and server directory by running:
    ```bash
    npm run start
    ```

### 6. Access the Application
- Open your web browser and navigate to `http://localhost:3000` to use the application.

## Contributing
We welcome contributions! To get started, please fork the repository and submit a pull request with your changes.
