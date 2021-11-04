module.exports = {
  reactStrictMode: true,
  env:{
    LOCAL_DB_URL:"mongodb://localhost:27017/bookit",
    DB_URL:"mongodb+srv://admin:bookit@bookit.v9kl4.mongodb.net/bookit?retryWrites=true&w=majority",
    CLOUDINARY_CLOUD_NAME:"blocker",
    CLOUDINARY_API_KEY:"396142776597681",
    CLOUDINARY_SECRET_KEY:"OUIwZiaXiyXdaojfQetOOQGGotg",
    SMTP_HOST : "smtp.mailtrap.io",
    SMTP_PORT : 2525,
    SMTP_USER : "c52bc649e7c69f",
    SMTP_PASSWORD: "1f5b4d2d04989b",
    SMTP_FROM_NAME:'Bookit',
    SMTP_FROM_EMAIL:'noreply@gmail.com',
    STRIPE_PUBLIC_KEY:'pk_test_51JFOUzJt8PjGxb7vBnax4XXGVaMf9G78be5UMwj6EotdLe6mOOI6931bptYCxh0hh8ui6fsRHEXHU9u2nMNRiWEQ00GNPHuJFn',
    STRIPE_PRIVATE_KEY:'sk_test_51JFOUzJt8PjGxb7vpU8kzIV8ayFecSJ2JmnIyMAQLknFAAVOe3V4SRHOoQIUimpdhTb7q31B5i5jkeIj8FXvPHlC00mpH0aw9E',
    FLW_PUBLIC_KEY: 'FLWPUBK_TEST-7e3b392887a3d66706517a0d8f871607-X',
    FLW_PRIVATE_KEY: 'FLWSECK_TEST-ee5ab6a7c167c319bd2b281fbca0bc5e-X',
    WEB_HOOK_SECRET : 'whsec_awczvWmm3tx9GZOUT4EpxJEGlEEseJD0'
    // NEXTAUTH_URL:"https://bookhotel.vercel.app"

  },
  images:{
    domains:['res.cloudinary.com'],
  }
  
}
