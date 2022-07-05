export const AUTH_ERROR_MESSAGES = {
    email: [
        { type: "required", message: "Email is required" },
        { type: "pattern", message: "Please enter valid email id" }
    ],
    password: [
        { type: "required", message: "Password is required" },
        // {type:"pattern",message:"Please enter valid email id"} 
    ],
    fullname: [
        { type: "required", message: "Full Name is required" },
        // {type:"pattern",message:"Please enter valid email id"} 
    ],
    mobile: [
        { type: "required", message: "Mobile is required" },
        { type: "pattern", message: "Please enter valid mobile no" }
    ],
    address: [
        { type: "required", message: "Address is required" },
        // {type:"pattern",message:"Please enter valid email id"} 
    ],
    roles: [
        { type: "required", message: "Roles is required" },
        // {type:"pattern",message:"Please enter valid email id"} 
    ],
    username: [
        { type: "required", message: "Username is required" },
        // {type:"pattern",message:"Please enter valid email id"} 
    ],

    name: [
        { type: "required", message: "Name is required" },
    ],

    captcha: [
        { type: "required", message: "Captcha is required" },
    ],
    companyname: [
        { type: "required", message: "Company Name is required" },
    ],
    accountno: [
        { type: "required", message: "Account No. is required" },
    ],
}
