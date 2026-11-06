function sendWelcomeEmail(email, fullname) {

    console.log("\n====================================");
    console.log("📨 Background Job Started...");
    console.log("Preparing Welcome Email...");
    console.log("====================================");

    setTimeout(() => {

        console.log(`✅ Welcome Email Sent Successfully!`);
        console.log(`👤 User : ${fullname}`);
        console.log(`📧 Email : ${email}`);
        console.log("====================================\n");

    }, 3000);

}

module.exports = {
    sendWelcomeEmail
};