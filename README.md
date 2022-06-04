# Wetube Clone

### Using:

- VanillaJS
- ExpressJS
- MongoDB
- Pug

## Added function ⇒ checking users/edit-profile exists

- find username, email from session and current username,email from current body (form) and check it is alreday exist and return to edit-profile and return errormessage

## Change Password

## chage_password

- find password from loggedin user's password from session and save the changed password and destroy session and redirect to /login

```jsx
user.password = newPassword;
await user.save();
// send notification
req.session.destroy();
return res.redirect("/login");
// notification : "password changed successfully"
```

## File Upload ⇒ Avatar

1. Make input at `edit-profile`

   - Only allowed to upload png, jpg, jpeg

   ```jsx
   label(for="avatar") Avatar
   input(type="file", id="avatar", name="avatar", accept=".png, .jpg, .jpeg")
   ```

2. middleware `multer`

   **NOTE**
   : Multer will not process any form which is not multipart (`multipart/form-data`

   ```jsx
   form((method = "POST"), (enctype = "multipart/form-data"));
   ```

   ```jsx
   app.post("/profile", upload.single("avatar"), function (req, res, next) {
     // req.file is the `avatar` file
     // req.body will hold the text fields, if there were any
   });
   ```

   ```jsx
   {
     fieldname: 'avatar',
     originalname: 'sumbo.jpg',
     encoding: '7bit',
     mimetype: 'image/jpeg',
     destination: 'uploads/',
     filename: 'bd15e689b104a3b719680b08ac95b14e',
     path: 'uploads/bd15e689b104a3b719680b08ac95b14e',
     size: 65113
   }
   ```

# Today I learn

# 03.29.2022

- unique: true ⇒ 하나씩만 존재하도록
- A unique index ensures that the indexed fields do not store duplicate values; i.e. enforces uniqueness for the indexed fields. By default, MongoDB creates a unique index on the [\_id](https://www.mongodb.com/docs/manual/core/document/#std-label-document-id-field)
   field during the creation of a collection.

```jsx
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});
```

- Password Hashing :

![Untitled](Today%20I%20learn%203d8f159673ba4b15993523adceae40c1/Untitled.png)

even though you don’t know password you can check

## MERN STACK :

MongoDB

ExpressJS

React

NodeJS

## Deterministic Function (결정적 함수)

like hashed password ⇒ with same input ⇒ always same output

## To hash password

- bcrypt
  - saltRounds ⇒ how many times you would hash the Password
  ```jsx
  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    // Store hash in your password DB.
  });
  ```
- to hack hashed password ⇒ rainbow table

## Pre.(save) and This

In [mongoose 5.x](http://thecodebarbarian.com/introducing-mongoose-5.html#promises-and-async-await-with-middleware)
, instead of calling `next()`
 manually, you can use a function that returns a promise. In particular, you can use `[async/await](http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html)`
.

```jsx
// Or, in Node.js >= 7.6.0:
schema.pre("save", async function () {
  await doStuff();
  await doMoreStuff();
});
```

## This

in this context this means in userSchema when new user is save ⇒ that user === this

```jsx
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password);
});
```

## What if someone join with unique value (email, username)

![Untitled](Today%20I%20learn%203d8f159673ba4b15993523adceae40c1/Untitled%201.png)

E11000 duplicate key error collection

when error occur catch before it saved to database.

```jsx
const usernameExists = await User.exists({ username: username });
if (usernameExists) {
  return res.render("Join", {
    pageTitle: "Join",
    errorMessage: "This username is already taken.",
  });
}
```

`username: username` can be like `username`

so this way if you have to check different unique value ( username, email) you can do this

## $or operator

The `[$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/#mongodb-query-op.-or)`operator performs a logical `OR` operation on an array of *two or more*`<expressions>`and selects the documents that satisfy *at least*
 one of the `<expressions>.` The `[$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/#mongodb-query-op.-or)` has the following syntax:

```jsx
db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] });
```

This query will select all documents in the `inventory`collection where either the `quantity`field value is less than `20` **or** the `price` field value equals `10`.

## Confirm Password

```jsx
if (password !== password2) {
  return res.render("Join", {
    pageTitle,
    errorMessage: "Password confirmation does not match",
  });
}
```

## Status Code

![Untitled](Today%20I%20learn%203d8f159673ba4b15993523adceae40c1/Untitled%202.png)

200 mean OK so Chrome will consider successfully join and start to ask me to save the id and password

Also res.render will automatically send 200 to the browser.

Status code 400 ⇒ Bad request

```jsx
if (password !== password2) {
  return res.status(400).render("Join", {
    pageTitle,
    errorMessage: "Password confirmation does not match",
  });
}
```

## try .. catch

The **`try...catch`**statement marks a `try` block and a `catch` block. If the code in the `try` block throws an exception then the code in the `catch` block will be executed.

```jsx
try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
```

## <hr>

**The Thematic Break (Horizontal Rule) element**

## Login link 랑 오른쪽 화살표

a(_href_="/login") Log in now &rarr;

## Login

- 처음으로 폼을 만든다 (GET ⇒ Route)
- ID 있으면 Login link, ID 없으면 Join으로 링크 설정
- ID 입력후 입력한 ID가 있나 확인해야한다. ⇒ 이후 비밀번호 확인

```jsx
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.exists({ username: username });
  if (!exists) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists.",
    });
  }
  // check if account exists
  // check if password correct
  res.end();
};
```

## const {username, password} = req.body

?? 이거 머지 알아보고 지나가자

## POST Method

- handle data
- show errors
- validation

talk to DB

## Login -2 Password

- compare hashed password in the db with hashed password that user typed in login input

bcrypt.compare

```jsx
async function checkUser(username, pasEsword) {
  //... fetch user from a db etc.

  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
    //login
  }

  //...
}
```

- first you need to know useraccount that user trying to login

`const user = *await* User.findOne({ username: username });`

```jsx
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username: username });
  // check if account exists
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong Password.",
    });
  }
  // check if password correct
  res.end();
};
```

After login ⇒ keep the login status ⇒ session, cookie

## Session

Session is like memory history between backend and browser.

with session backend can remember user when user request to backend

### Stateless and State

## Express-session

`npm i express-session`

Anytime browser interact with our backend this middleware is sending to browser a cookie.

cookie is a piece of information that backend can give to browser for idenfication.

an because there are rules of cookies, everytime

```jsx
import session from "express-session";
.
.
.
app.use(
  session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
  })
);
```

you can go to [inspect] ⇒ [Application] ⇒ [Cookie]

Backend is remembering everyone with sessions(id) that given per browser

express-session

Express용 세션 미들웨어

세션 데이터는 쿠키 자체에 저장되지 않고 세션 ID에만 저장됩니다. 세션 데이터는 서버 측에 저장됩니다.

npm i express-session

https://www.npmjs.com/package/express-session

Session 사용 예시

https://github.com/expressjs/session#example

req.session.id 또는 req.sessionID

브라우저가 request할 때 같이 보내는 session id

resave (변경 사항이 없어도 저장)

request하는 동안 세션이 수정되지 않은 경우에도 세션이 세션 저장소에 다시 저장되도록 합니다.

https://github.com/expressjs/session#resave

saveUninitialized (세션 초기화 전에도 저장)

"초기화되지 않은" 세션을 저장소에 강제로 저장합니다.

https://github.com/expressjs/session#saveuninitialized

basically session store id data to memory,, so everytime server reload will erase session data. so we will store this to Mongodb later.

Brower sending id that we(server,,, express-session) gave them on the every request.

Every time I in the Browser visit website if we find session middleware

express will automatically create session id for the browser, and will give it to the browser.

## Logged in User.

When user login, going to add infomation about user to session.

we are adding information to request.session object whether you logged in or not

```jsx
req.session.loggedIn = true;
req.session.user = user; // user is the one we found from mongodb
```

pug and express can share `res.local` (object)(and its global so any template can use this)

### New middleware.js

```jsx
export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
};
```

## res.local

res.locals

request 범위가 지정된 response 로컬 변수를 포함하는 객체이므로 request, response 주기동안 렌더링된 view에서만 사용할 수 있습니다.

(Pug나 EJS같은 템플릿 엔진에서 사용 가능하다는 의미)

이 속성은 request path, 인증된 사용자, 사용자 설정 등과 같은 request level의 정보를 노출하는 데 유용합니다.

```

// 사용 예시

app.use(function (req, res, next) {

res.locals.user = req.user

res.locals.authenticated = !req.user.anonymous

next()

})

```

https://expressjs.com/ko/api.html#res.locals

## Connect-mongo

MongoDB session store for **[Connect](https://github.com/senchalabs/connect)** and **[Express](http://expressjs.com/)** written in Typescript.

`npm install connect-mongo`

Session data is *not*
 saved in the cookie itself, just the session ID. Session data is stored server-side.

**Warning**
 The default server-side session storage, `MemoryStore`is *purposely*
 not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

```
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'foo',
  store: MongoStore.create(options)
}));
```

![Untitled](Today%20I%20learn%203d8f159673ba4b15993523adceae40c1/Untitled%203.png)

you can see the expires date too.

# Uninitialized Sessions

These two line actually initialize the sessions.

```jsx
req.session.loggedIn = true;
req.session.user = user;
```

When IOS, Androis app are using token because they don’t have a cookies

at session secret and mongoURL are not allowed to visible.

because db has id and password such as

- resave : 모든 request마다 세션의 변경사항이 있든 없든 세션을 다시 저장한다.
- true:

* 스토어에서 세션 만료일자를 업데이트 해주는 기능이 따로 없으면 true로 설정하여 매 request마다 세션을 업데이트 해주게 한다.

- false:

* 변경사항이 없음에도 세션을 저장하면 비효율적이므로 동작 효율을 높이기 위해 사용한다.

* 각각 다른 변경사항을 요구하는 두 가지 request를 동시에 처리할때 세션을 저장하는 과정에서 충돌이 발생할 수 있는데 이를 방지하기위해 사용한다.

- saveUninitialized : uninitialized 상태인 세션을 저장한다. 여기서 uninitialized 상태인 세션이란 request 때 생성된 이후로 아무런 작업이 가해지지않는 초기상태의 세션을 말한다.
- true:

* 클라이언트들이 서버에 방문한 총 횟수를 알고자 할때 사용한다.

- false:

* uninitialized 상태인 세션을 강제로 저장하면 내용도 없는 빈 세션이 스토리지에 계속 쌓일수 있다. 이를 방지, 저장공간을 아끼기 위해 사용한다.

## Expiration and Secrets

```jsx
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
  })
);
```

secret is string of text we use to sign the cookie, so we able to validate backend gave cookie, because there is attack called session hijack

### Expiration

maxage : 1/1000 this allows how long cookie will remain.

To protect some sensitive information like (secret, dbUrl) we use Environment Variable so, make `.env` and add `.env` to `.gitignore`.

Conventionally everything inside of .env goes to Uppercase.

`secret: process.env.COOKIE_SECRET,`

## Environment Variable

`dotenv` : It will read your env file and put each of variables to inside of process.env.

`npm i dotenv`

`require('dotenv').config()`

it has to be first place server start ( like init.js)

dotenv

Dotenv는 .env 파일에서 process.env로 환경 변수를 로드하는 제로 종속성 모듈입니다.

npm i dotenv

https://www.npmjs.com/package/dotenv

방법1. import dotenv from "dotenv", dotenv.config()

방법2. import "dotenv/config"

[https://kwoncheol.me/posts/dotenv-and-module](https://kwoncheol.me/posts/dotenv-and-module)

⇒ hoisting ?? 공부할것.

## Github Login

The web application flow to authorize users for your app is:

1. Users are redirected to request their GitHub identity
2. Users are redirected back to your site by GitHub
3. Your app accesses the API with the user's access token

### **1. Request a user's GitHub identity**

```
GET https://github.com/login/oauth/authorize
```

```jsx
a(href="https://github.com/login/oauth/authorize?client_id=a52cc9009b364eb2c6cf") Continue with Github &rarr;
```

1. github로 보낼때 쓸수 있는 기능

client_id = ID

scope : is the how many user information do you want

allow_signup = false -> github 사용자만 true -> github사용자가 아니여도 가능.

`userController.js` 에 `startGithubLogin` function created.

```jsx
export const startGithubLogin = (req, res) => {
  const config = {
    clientId: "a52cc9009b364eb2c6cf",
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config);
  const baseUrl = "https://github.com/login/oauth/authorize";
};
```

```jsx
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    clientId: "a52cc9009b364eb2c6cf",
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
```

Scopes for OAuth Apps

OAuth 앱은 초기 리디렉션에서 범위를 요청할 수 있습니다. %20을 사용하여 공백으로 구분하여 여러 범위를 지정할 수 있습니다.

// 사용 예시

```

https://github.com/login/oauth/authorize?client_id=...&scope=user%20repo_deployment

```

https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps

URLSearchParams

URLSearchParams 인터페이스는 URL의 쿼리 문자열에 대해 작업할 수 있는 유틸리티 메서드를 정의합니다.

https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams

URLSearchParams.toString()

`toString()` 은 URLSearchParams 인터페이스의 메소드로서, URL에서 사용할 수 있는 쿼리 문자열을 리턴합니다.

https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams/toString

## Github Login-2

For second step User are redirected back to your site by GitHub.

You need to exchange temporary code to access token

```jsx
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application / json",
    },
  });
  const json = await data.json();
  console.log(json);
};
```

with`fetch(”url”)` you can get the data from other server.

but with raw url in the `res.body` can’t get proper object.

so `.json` function get the res stream and read and interpret text of `res.body` as promise and get the data as object.

You can use fetch in the browser but nodejs can’t .. so `node-fetch` invented.

`npm i node-fetch` ⇒ doesn’t work after 3.0 version need to require for ESM so i change to `npm i cross-fetch` and `res.send(JSON.stringfy(json)` stringfy converts a Javascript object or value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

```jsx
console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// expected output: ""2006-01-02T15:04:05.000Z""
```

```jsx
const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await data.json();
  console.log(json);
  res.send(JSON.stringify(json) );
};
```

![Untitled](Today%20I%20learn%203d8f159673ba4b15993523adceae40c1/Untitled%204.png)

1. Use the access token to access the API

`fetch .then`

### Promise.prototype.then()

```jsx
p.then(onFulfilled, onRejected);

p.then(
  function (value) {
    // 이행
  },
  function (reason) {
    // 거부
  }
);
```

이미 이메일을 만들었지만 깃허브로 로그인을 시도 하는경우 로그인화면에서 이메일은 있지만 비밀번호는 없다고 알려야하나?

```jsx
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});
```

socialOnly ⇒ only allow to login with social login.

```jsx
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username: username, socialOnly: false });
  // check if account exists
```

because many people will forget they’re account is join with password or social login

## Log Out

```jsx
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
```

## Avatar Url

## StartGithubLogin

with configuration parameter you make url to redirect.

`baseUrl` + `parameter` reason we set url because URL can tell information(for example like client_id) to github.

If `socialOnly` is true that account is made out from Github login. and there are no password .

If you login through github, you have a avatarUrl but if you join with form. so you implement `edit_profile` and how we send file to our backend

## How to imprelemnt email-only system

Get the email

Check for email on db.

Create a one time password (new mongo model)

Send an email with the one time password on the URL.

When the user goes to the website with that url, grab the OTP on the url.

Check on your DB for that OTP and log the user in :)

## Edit Profile

if you don’t put action, browser knows post request to same url

There are few regulations that first, if your are not loggedIn you should not able to approach the loggedInUser. they should to redirect to root.

another middleware name as `protectorMiddleware` check user is loggedIn and if not redirect to login page. if user is loggedIn keep request.

To use any http method ( get, post) stick with this middleware

`userRouter.route("/edit").get(getEdit).post(postEdit);`

`userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);`

and add publicOnlyMiddleware to githublogin

```jsx
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { id },
    },
    body: { name, email, username, password },
  } = req;
  // const id = req.session.user.id
  await User.findByIdAndUpdate();
  return res.render("edit-profile");
};
```

```jsx
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("Join", {
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("Join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({ name, username, email, password, location });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
```

## Added function ⇒ checking users/edit-profile exists

## chage_password

```jsx
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  const pageTitle = "Change Password";
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle,
      errorMessage: "The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle,
      errorMessage: "The password does not match the confirmation",
    });
  }
  if (oldPassword === newPassword) {
    return res.status(400).render("users/change-password", {
      pageTitle,
      errorMessage: "The old password equals new password",
    });
  }
  user.password = newPassword;
  await user.save();
  // send notification
  req.session.destroy();
  return res.redirect("/login");
  // notification : "password changed successfully"
};
```

## File Upload ⇒ Avatar

1. Make input at `edit-profile`

   ```jsx
   label(for="avatar") Avatar
   input(type="file", id="avatar", name="avatar", accept="image/*")
   ```

2. middleware `multer`

   **NOTE**
   : Multer will not process any form which is not multipart (`multipart/form-data`)

   Multer also provide path of the uploaded file and create file name randomly.
   Give file information to controller

   ```jsx
   form((method = "POST"), (enctype = "multipart/form-data"));
   ```

   ```jsx
   app.post("/profile", upload.single("avatar"), function (req, res, next) {
     // req.file is the `avatar` file
     // req.body will hold the text fields, if there were any
   });
   ```

   ```jsx
   {
     fieldname: 'avatar',
     originalname: 'sumbo.jpg',
     encoding: '7bit',
     mimetype: 'image/jpeg',
     destination: 'uploads/',
     filename: 'bd15e689b104a3b719680b08ac95b14e',
     path: 'uploads/bd15e689b104a3b719680b08ac95b14e',
     size: 65113
   }
   ```

   If User didn’t change avatar and update should not send `undefined` avatar to backend.

   `user.js` userSchema has `avatarUrl`.

   if user has file `findByIdUpdate` to `file.path` else keep the `avatarUrl`

   ```jsx

   avatarUrl: file ? file.path : avatarUrl,
   ```

   add /uploads folder to .gitignore.

   Only save path of file to DB, not the file itself

   ```jsx
   img((src = "/" + loggedInUser.avatarUrl), (width = "100"), (height = "100"));
   ```

   ## Static File serving

   expose whold folder to browser.

   `server.js`

   ```jsx
   app.use("/uploads", express.static("uploads"));
   ```

   ## Video Uploading

   make a input at upload.js and chage videoRouter.js

   ```jsx
   .post(uploadFiles.single("video"), postUpload);
   ```

   and make 2 middlewares for uploading files size restriction.

   ```jsx
   export const avatarUpload = multer({
     dest: "uploads/avatars/",
     limits: {
       fileSize: 3000000,
     },
   });

   export const videoUpload = multer({
     dest: "uploads/videos/",
     limits: {
       fileSize: 10000000,
     },
   });
   ```

   ## Use Profile

   for the video we’d like to show who uploaded.

   we want to show `Edit-video`, `Delete-video` button to uploaded person only.

   User should have the list uploaded by user.

   Recap

   req.params are the variables in a URL.

   /movies/:id can be found in req.params.id

   req.query is the data on the query of the URL

   /movies?filter=views can be found in req.query.filter

   ## Video Owner

   benefit of save user_id to video.

   but you have to request DB twice.

   ```jsx
   const video = await Video.findById(id);
   const owner = await User.findById(video.owner);
   ```

   ```jsx
   div
           small Uploaded by #{owner.name}
       if loggedInUser && (String(loggedInUser._id) === String(video.owner))
   ```

   ## Poplulate

   Object를 실제 객체로 치환해준다.

   ```jsx
   populate
   Mongoose에는 populate()를 통해 다른 컬렉션의 문서를 참조할 수 있습니다. Population은 문서의 지정된 경로를 다른 컬렉션의 문서로 자동 교체하는 프로세스입니다. 단일 문서, 여러 문서, 일반 개체, 여러 일반 개체 또는 쿼리에서 반환된 모든 개체를 채울 수 있습니다.
   const story = await Story.findOne({ title: 'Casino Royale' }).populate('author');
   https://mongoosejs.com/docs/populate.html

   Population
   https://mongoosejs.com/docs/populate.html#population
   .
   .
   .
   populate는 ref:"User"에서 참조된 schema의 타입에 userSchema를 넣어준다
   ```

   with `populate` we albe to put owner objectid to video db , and put video object_id to user db.

## Problem

```jsx
/// User.js

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
```

Everytime `save` happens password will change(hashing), so After user upload new video and `user.save()` and then user can’s login again.

⇒ change to password will `hash` at only certain condition.

### isModified()

- return True if any of given path is modified

Type =⇒ careful sometimes `!`== doesn’t work because type is different String()

```jsx
Document.prototype.isModified()
주어진 경로 중 하나라도 수정되면 true를 반환하고, 그렇지 않으면 false를 반환합니다. 인수가 없으면 이 문서의 경로가 수정되면 true를 반환합니다. 경로가 제공되면 경로 또는 경로 체인의 일부로 경로를 포함하는 전체 경로가 수정되었는지 확인합니다.
```

### thing to do

frontend css

Implement video plater (not basic google chrome video player)

video ⇒ view counts

comment function

record video

### Webpack

- npm install -D babel-loader

```jsx
const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};
```

- to allows browser to read the assets/js.main.js add express.static("assets") to the server.js

### sass-loader

- Loads a Sass/SCSS file and compiles it to CSS.

### css-loader

- interprets @import and url() like import/require() and will resolve them.

### style-loader

- Inject CSS into the DOM.

### webpack

webpack execute backwards.

```jsx
      {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
```

### mini-css-extract-plugin

- extract css from js file and with filename property you can put css file inside of foler like css/styles.css

### Fix repeating task

- To avoid type "npm run aseets" and delete assets folder everytime when you update the code inside you can use function "watch"

```jsx
  watch: true,
```

- clean output folder before start build

```jsx
  clean: true,
```

- Now you have two console terminal one for backend, one for webpack. you need to maintain both

### 웹팩 개별 엔트리 설정 방법

2개의 개별 엔트리 포인트를 원한다고 webpack에게 알려줍니다.

```
// 사용 예시
module.exports = {
entry: {
main: './src/app.js',
vendor: './src/vendor.js',
},
output: {
filename: '[name].bundle.js',
},
};
```

https://webpack.kr/concepts/entry-points/#separate-app-and-vendor-entries

## JS time format tip

```jsx
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);
```

## FullScreen

- Fullscreen API
- Element.requestFullscreen
- Document.exitFullscreen
- DocumentOrShadowRoot.fullscreenElement

## Controls Event

- how to catch the state when mouse placed inside of video_container

```jsx
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
```

- when user move on top of video adding a class, when the user leave a video remove a class after 3seconds.
  when user enter a video and leave timeout starts but when user's mouse enter video again previous timeout should cancel.
  but when user stop mouse then create timeout for remove a class.
  becuase timeout only when user move mouse.

- videoplayer control with "keydown" - space key is keycode 32... wow and click the video to fire handlePlayClick() function.

## Interactivity: Changing a page without changing the url

- data attribute : you can store any data that starts with "data-".
- and you can access with element.dataset
