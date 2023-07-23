const fs = require('fs');
const path = require('path');


const development = {
    name: 'development',
    assert_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'placementCellDB',
    google_client_id: "759440711652-stoud97ik1b44jmjpq4hcv6ukmobusrf.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
}

const production = {
    name: 'production',
    assert_path: "./assets",
    session_cookie_key: "tFBrlF6qvHh8FZjJM9N6JZNwRuqmpuuF",
    db: "tFBrlF6qvHh8FZjJM9N6JZNwRuqmpuuF",
    google_client_id: "759440711652-stoud97ik1b44jmjpq4hcv6ukmobusrf.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "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",
}
module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);