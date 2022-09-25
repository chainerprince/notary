module.exports = {
  reactStrictMode: true,
  env:{
    LOCAL_DB_URL:"mongodb://localhost:27017/bookit",
    DB_URL:"mongodb+srv://admin:bookit@bookit.v9kl4.mongodb.net/?retryWrites=true&w=majority",
    CLOUDINARY_CLOUD_NAME:"blocker",
    CLOUDINARY_API_KEY:"396142776597681",
    CLOUDINARY_SECRET_KEY:"OUIwZiaXiyXdaojfQetOOQGGotg",
    SMTP_HOST : "smtp.mailtrap.io",
    SMTP_PORT : 2525,
    SMTP_USER : "c52bc649e7c69f",
    SMTP_PASSWORD: "1f5b4d2d04989b",
    SMTP_FROM_NAME:'Bookit',
    SMTP_FROM_EMAIL:'noreply@gmail.com',   
    // WEB_HOOK_SECRET : 'whsec_awczvWmm3tx9GZOUT4EpxJEGlEEseJD0',
    NEXTAUTH_URL:"https://bookhotel.vercel.app"

  },
 
  images:{
    domains:['res.cloudinary.com','images.unsplash.com'],
  }
  
}
