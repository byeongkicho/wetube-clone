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
