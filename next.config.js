module.exports = {
  reactStrictMode: true,
  env:{
    LOCAL_DB_URL:"mongodb://localhost:27017/bookit",
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
    WEB_HOOK_SECRET : 'whsec_Y33keCIQStInV0YroJf9MzDCm2JtFJHU'

  },
  images:{
    domains:['res.cloudinary.com'],
  }
  
}
