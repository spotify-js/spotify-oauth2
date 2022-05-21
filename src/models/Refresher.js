const fetch = require('node-fetch');
const qs = require('querystring');

const API = 'https://accounts.spotify.com/api/token?';

class Refresher {
    /**
     * The refresher for requesting Spotify access tokens.
     * @param {string} client_id - The client's id.
     * @param {string} client_secret - The client's secret.
     */
    constructor(client_id, client_secret) {
        /**
         * The client's id.
         * @type {string}
         */
        this.client_id = client_id;

        /**
         * The client's secret.
         * @type {string}
         */
        this.client_secret = client_secret;

        /**
         * The client's refresh token.
         * @type {string|null}
         */
        this.refresh_token = null;
    }

    /**
     * Set a property of the Refresher.
     * @param {string} key - The key of the Refresher to set.
     * @param {string} value - The value to set to.
     * @returns {void}
     * @example
     * refresher.set('refresh_token', 'xxx');
     */
    set(key, value) {
        if (this[key] === undefined) {
            throw new Error(`${key} is not a key of Refresher.`);
        }

        this[key] = value;
    }

    /**
     * Request an access token for making Spotify requests.
     * @returns {Response}
     * @example
     * refresher.request();
     */
    async request() {
        if (!this.refresh_token) {
            throw new Error('No refresh token was provided during requesting.');
        }

        const options = qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: this.refresh_token,
        });

        const path = API + options;
        const oauth = btoa(this.client_id + ':' + this.client_secret);

        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + oauth,
            },
        });

        const body = await response.json();
        return body;
    }
}

module.exports = Refresher;

/**
 * @typedef {Object} Response
 * @property {string} access_token - The access token for making requests.
 * @property {string} token_type - The type of token returned.
 * @property {number} expires_in - The time till the access token expires in seconds.
 * @property {string} scope - The scopes the access token has joined via space.
 */
