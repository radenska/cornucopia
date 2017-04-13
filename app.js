{
  "environments": {
    "test": {
      "scripts": {
        "test": "npm run test"
      },
      "buildpacks": [
        {
          "url": "https://github.com/heroku/heroku-buildpack-google-chrome"
        },
        {
          "url": "heroku/node"
        }
      ],
      "env": {
        "API_URL": "https://cornucopia-app.herokuapp.com"
      }
    }
  }
}
