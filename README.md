
# PasteKey - Secure and Private Paste Service (UI)

PasteKey is a secure and private paste service that allows you to store and share text online. It is built using Node.js, Express.js, MongoDB, and Redis.

## Features

- Code Sharing (Public and Private)
- Syntax highlighting (10+ languages)
- AES-256 Encryption
- View-based expiration
- Time-based expiration
- Dark mode

## License

Read The License [Here](https://github.com/KailasMahavarkar/pastekey_ui/blob/main/LICENSE)

We are using the MIT license with Commons Clause Restriction, meaning you can use this project for free, but you can't sell it or use it commercially.

# Installation

## Prerequisites

- Node.js (v16+)
- MongoDB 
- Redis
- Pastekey API server configured and running [here](https://github.com/KailasMahavarkar/pastekey_api.git)

## Setup

1. Clone the repository
    
    ```bash
    https://github.com/KailasMahavarkar/pastekey_ui.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the environment variables

4. Start the dev server

    ```bash
    npm run dev
    ```


## Environment Variables

```txt
NEXT_PUBLIC_MODE=DEV
NEXT_PUBLIC_LOCAL_SERVER_URL=http://localhost:2000
NEXT_PUBLIC_SERVER_URL=your-server-url
NEXT_PUBLIC_GA_TRACKING_ID=UA-XXXXXXXXX-X
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_MAINTAINANCE=false

```