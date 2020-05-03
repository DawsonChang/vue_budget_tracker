# Budget-Tracker

### Deploy on Heroku

https://budget-tracker-dsc.herokuapp.com/


### Database(json-server) on Heroku

https://json-server-budget.herokuapp.com/


## Project setup(clone to localhost)
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
##### Don't forget to go to root directory -> /src/services/EventService.js
##### Change 
```baseURL: "https://json-server-budget.herokuapp.com"```
##### to 
```baseURL: "http://localhost:3000"``` 
##### And run:
```
json-server --watch db.json
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
