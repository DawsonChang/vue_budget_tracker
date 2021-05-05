# Budget-Tracker

#### Stack: Vue.js, json-server, JavaScript, CSS, HTML

![image](https://github.com/DawsonChang/project/blob/master/vue_budget_tracker2.gif)

### Deploy on github (must run db.json on your local machine)
https://dawsonchang.github.io/vue_budget_tracker/#/

~~Deploy on Heroku~~

~~https://budget-tracker-dsc.herokuapp.com/~~


### Database(json-server) on Heroku

https://json-server-budget.herokuapp.com/


## Project setup(clone to localhost)
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
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
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
