// CONFIG
const SERVICE_ID = "service_69pvhtw";
const TEMPLATE_ID = "template_nsxk8z2";
const PUBLIC_KEY = "3PGD4_JDq_A-EH3hl";

// INTERNAL STORAGE
let generatedOTP = null;
let otpExpiryTime = null;

// LOAD EMAILJS
(function(){
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
    script.onload = () => emailjs.init(PUBLIC_KEY);
    document.body.appendChild(script);
})();

// SEND OTP
function sendOTP() {
    let email = document.getElementById("email").value;

    if (!email) {
        alert("Please enter email");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires in 24 hrs
    otpExpiryTime = Date.now() + (24 * 60 * 60 * 1000);

    let params = {
        to_email: email,
        message: `Your OTP code is: ${generatedOTP}. This OTP will expire in 24 hours.`
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
        .then(() => {
            alert("OTP sent successfully!");
        })
        .catch(err => {
            alert("Error sending OTP");
            console.log(err);
        });
}

// VERIFY OTP
function verifyOTP() {
    let enteredOTP = document.getElementById("otpInput").value;

    if (!generatedOTP) {
        document.getElementById("result").innerText = "OTP not generated yet!";
        return;
    }

    // CHECK EXPIRED
    if (Date.now() > otpExpiryTime) {
        document.getElementById("result").innerText = "❌ OTP expired! Please request a new one.";
        return;
    }

    if (enteredOTP === generatedOTP) {
        document.getElementById("result").innerText = "✅ OTP Verified Successfully!";
    } else {
        document.getElementById("result").innerText = "❌ Incorrect OTP!";
    }
}
