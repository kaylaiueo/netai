![Netai logo](public/logo.png)

# Netai

Netai is a social media platform for sharing photos, your feelings, connecting
with friends, and discovering new contents.

## Tech Stack

- Next.js
- React
- TypeScript
- MongoDB
- Express.js
- Tailwind CSS
- Cloudinary

## Features

- Create post with text and upload images
- Commenting some posts
- Like and delete posts
- Edit your own profile
- Search, follow, and mention other users
- Explore page with text and media posts
- Notification for like, comment, reply, follow, and mentions

## Installation & Usage Instructions

Clone the project:

```sh
git clone https://github.com/kaylaiueo/netai.git
```

Open the directory and install the dependencies with the one of your favorite
package manager:

```sh
cd netai

# Node.js package manager
npm install

# Yarn package manager
yarn install

# pnpm package manager
pnpm install

# Bun runtime
bun install
```

Copy the [`.env.example`](.env.example) file into `.env.local` in the root
directory:

```sh
cp .env.example .env.local
```

You need to have [Cloudinary](https://cloudinary.com/) account to get every
essential local environment for `.env.local`:

- Cloud name, API key, and API secret are available at dashboard page.
- Upload preset name are available at settings -> product environment settings
  -> upload -> upload presets.

To get the API URL for `.env.local`, you need to set up the back-end. See
[netai-api repository](https://github.com/kaylaiueo/netai-api) for
more detail instructions.

Start the build process:

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the development instance of the app |
| `npm run build` | Build the app for production              |
| `npm start`     | Start the app in production mode          |

## UI/UX References

- Instagram
- Threads
- Twitter
- Discord
- YouTube
- TikTok
- My brain

## Known Issues

- Error often occurs with `Application error: a server-side exception has
  occurred` message. It need to restart the page.
- Data or activity not updated (liked or commented some posts) because of caches.

## License

Netai source code is licensed under the [MIT license](LICENSE).
