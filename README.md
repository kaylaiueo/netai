<p align="center">
  <img src="./public/logo.png">
</p>

# Netai

Netai is a social media platform for sharing photos, your feelings, connecting with friends, and discovering new content.

## Tech Stack

- Next js
- React
- Typescript
- MongoDB
- Express js
- Tailwind CSS
- Cloudinary

## Features

- Create post
  - Media upload (For now you can only upload images)
  - Text only
- Mentions
- Delete post
- Comment
- Reply comment
- Like post
- Follow User
- Notifications
  - Like
  - Comment
  - Reply
  - Follow
  - Mentions
- Search user
- Explore page
  - Text only post
  - With media post
- Edit Profile
- Profile
  - Posts
  - Likes
  - Media
- Infinite scroll
- Full responsivity and mobile UI

## UI/UX Reference

- Instagram
- Threads
- Twitter
- Discord
- Youtube
- Tiktok
- My brain

## Usage Instructions for Contributors

Clone the project:

```
git clone https://github.com/kaylaiueo/netai.git
cd netai
```

Install packages

```
npm install
yarn install
pnpm install
bun install
```

Setup .env file, check file [.env.example](./.env.example) to see what you need. and create an `.env.local` file in the root folder.

For backend setup see here [Netai-api](https://github.com/kaylaiueo/netai-api)

And start your build process:

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Starts a development instance of the app |
| `npm run build` | Builds the app for production            |
| `npm start`     | Starts the app in production mode        |

## License

Netai is licensed under the terms of the [MIT license](./LICENSE).
