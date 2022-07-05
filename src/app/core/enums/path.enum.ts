export enum Path {
    // Public
    Home = '',
    Support = 'support',
    contact = "contact-us",
    About = 'about-us',
    OurPartner = 'our-partners',
    NewsRoom = 'news-room',
    NewsDetail = "news-detail/:id",
    Network = 'network',
    NotFound = '404',
    MaladyNetwork = 'malady-network',
    Blog1 = 'blog1',
    Blog2 = 'blog2',
    Blog3 = 'blog3',

    // Auth
    Auth = 'auth',
    Login = 'login',
    SignUp = 'signup',
    ForgotPassword = 'auth/forgot-password',
    ResetPassword = 'auth/reset-password',

    // patient login
    LoginPatient = "patient-login",
    SignUpPatient = "patient-signup",
    Patient = "patient",
    ChangePassword = 'user/change-password',
    UserDashboard = 'user/user-dashboard',
    KycUpload = 'user/kyc-upload', 
    // App base url
    Website = "",

    // centre
    Dashboard = 'dashboard',
    User = 'user',
    Centre = 'centre',
    CreateNewAppoinment = 'create-new-appoinment'



}
