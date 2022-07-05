export enum Url {
    // Token Free
    login = '/test-center/login',
    getProfile = '/getProfile',
    signup = '/users/registration',

    // patient login
    patientLogin = '/user/mobile-login',
    getAppointment = '/appointment/list',

    // test center
    upcomingAppoinment = "/appointment/upcoming",
    sendOTP = "/user/send-otp",
    verifyOtp = "/test-center/verify-user",
    allReason = '/test/reason/all',
    allTestType = '/test-type/all',
    testTypeMCQ = '/test-type/mcq',
    bookAppoinment = '/appointment/book',
    appoinmentDetail = '/appointment/details?appointmentId=',
    verifyInsurence = '/appointment/verify-insurance',
    cancelAppoinment = '/appointment/changeStatus',
    testResultStatus = '/test-center/changeResultStatus',
    dasboardData = '/test-center/dashboard',
    centreProfile = '/test-center/profile',
    logoutCentre = '/user/logout',
    listAppointment = '/appointment/list',
    uploadReport = '/test-center/uploadResult',
    testResultList = '/appointment/testResult/list',
    // website
    contactUs = "/user/contactUs",
    cityAll = "/city/all",
    centerByCity = "/test-center/all?city=",
    patientProfile = "/user/profile",
    patientForgotPasswordMobile = "/user/forgotPassword/mobile",
    patientForgotPasswordMobileOTP = "/user/forgotPassword/verifyOTP",
    sendPasswordForgotPassword = "/user/setNewPassword",
    patientChangePassword = '/user/changePassword',


    otpConnector = '/otp-connector/',
    kycUpload = '/users/kyc/upload',
    userLogin = '/users/login',
    resetPassword = '/users/sub/forget-passoword',
    resetPasswordWithoutLogin ='/users/password-reset-without-login',
    subAccountList = '/users/sub-profile/list/',
    bulkActiveInactiveUsersStatus = '/users/update/bulk/users/status',
    //users = '/users/list',
    users = '/affiliates/list',
    usersProfile = '/affiliates/profile',
    kycStatusList = '/kyc-connector/kyc/list/'
}
