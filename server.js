const express = require("express");

const app = express();

// ✅ FIX: support JSON + form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_ID = "test_client_id";
const CLIENT_SECRET = "test_client_secret";

app.post("/oauth/token", (req, res) => {
    const { client_id, client_secret, grant_type, scope } = req.body;

    if (
        client_id === CLIENT_ID &&
        client_secret === CLIENT_SECRET &&
        grant_type === "client_credentials"
    ) {
        return res.json({
            access_token: "mock_access_token_12345",
            token_type: "bearer",
            expires_in: 3600,
            scope: scope || "default"
        });
    }

    return res.status(401).json({ error: "invalid_client" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

app.get("/getCourseDetails", (req, res) => {
    const token = req.query.access_token;

    // Validate token (same as before)
    if (token !== "mock_access_token_12345") {
        return res.status(401).json({
            error: "Unauthorized - invalid token"
        });
    }

    // Mock response (similar to your screenshot)
    res.json({
        instructor: "Rahul Shetty",
        url: "rahulshettyacademy.com",
        services: "projectSupport",
        expertise: "Automation",
        courses: {
            webAutomation: [
                {
                    courseTitle: "Selenium WebDriver Java",
                    price: "50"
                },
                {
                    courseTitle: "Cypress",
                    price: "40"
                },
                {
                    courseTitle: "Protractor",
                    price: "40"
                }
            ],
            api: [
                {
                    courseTitle: "Rest Assured Automation using Java",
                    price: "50"
                },
                {
                    courseTitle: "SoapUI Webservices testing",
                    price: "40"
                }
            ],
            mobile: [
                {
                    courseTitle: "Appium-Mobile Automation using Java",
                    price: "50"
                }
            ]
        }
    });
});