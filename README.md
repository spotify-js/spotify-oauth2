# spotify-oauth2

This is a simple node package to request new Spotify access tokens with your refresh token.

```js
const Refresher = require('spotify-oauth2');
/* Paremeters here are the client id and the client secret */
const refresher = new Refresher('xxx', 'xxx');

/* Replace 'xxx' with your refresh token */
refresher.set('refresh_token', 'xxx');

/* Will return an object of your updated access token. */
refresher.request();
```
