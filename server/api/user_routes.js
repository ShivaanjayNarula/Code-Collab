import express from "express";
import userModel from "./models/userModel.js";
import bcrypt from "bcrypt";
import sendGreetMail from "../helper/mailService.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: email });

    // If user exists, return early with a 409 Conflict status
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    if (email && name) {
      try {
        await sendGreetMail(email, name);
        console.log("Greeting email sent!");
      } catch (error) {
        console.error("Error sending email:", error);
        // Don't fail the signup if email fails
        console.log("Email sending failed, but signup completed successfully");
      }
    }

    // Send successful response
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the signup process
    console.error("Signup error:", error);

    // Check for specific mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid user data",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Handle duplicate key errors (if you have unique constraints)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Generic server error for any other unexpected errors
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const existingUser = await userModel.findOne({ email: email });

    // Check if user exists
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, existingUser.password);

    // Check if password is correct
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    // Successful signin
    res.status(200).json({
      message: "Signin successful",
      userName: existingUser.name,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

const otp = generateOTP();
userRouter.post("/sendotp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amber1251.be22@chitkara.edu.in",
        pass: "dhamaamber@5678",
      },
    });

    const mailOptions = {
      from: "amber1251.be22@chitkara.edu.in",
      to: email,
      subject: "Password Reset",
      html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            border-top: 10px solid #ff6600;
            transition: box-shadow 0.3s ease;
        }

        .email-container:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .email-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .email-header h2 {
            color: #333;
            font-size: 28px;
            margin: 0;
            font-weight: 700;
            letter-spacing: 1px;
        }

        .email-body {
            line-height: 1.8;
            color: #555;
            font-size: 16px;
        }

        .email-body p {
            margin: 14px 0;
        }

        .otp-code {
            font-size: 32px;
            color: #ff6600;
            font-weight: bold;
            text-align: center;
            margin: 30px 0;
            letter-spacing: 2px;
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 8px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .email-button {
            display: block;
            width: 100%;
            max-width: 250px;
            margin: 30px auto;
            text-align: center;
            background-color: #ff6600;
            color: #ffffff;
            padding: 14px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(255, 102, 0, 0.2);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .email-button:hover {
            background-color: #e55a00;
            box-shadow: 0 6px 14px rgba(255, 102, 0, 0.3);
        }

        .email-footer {
            margin-top: 40px;
            text-align: center;
            padding-top: 20px;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #e2e2e2;
        }

        .email-footer a {
            color: #ff6600;
            text-decoration: none;
        }

        @media (max-width: 600px) {
            .email-container {
                padding: 20px;
            }

            .email-header h2 {
                font-size: 24px;
            }

            .otp-code {
                font-size: 28px;
            }

            .email-button {
                padding: 12px;
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Password Reset Request</h2>
        </div>
        <div class="email-body">
            <p>Dear user},</p>
            <p>We received a request to reset your password. Please use the OTP below to reset your password:</p>
            <div id="otpCode" class="otp-code">${otp}</div>
            <p>This OTP is valid for the next 15 minutes.</p>
            <p>If you did not request a password reset, please ignore this email or <a href="mailto:support@yourcompany.com">contact support</a>.</p>
        </div>
        <button class="email-button">Copy OTP</button>
        <div class="email-footer">
            <p>Best regards,<br>Your Company Name</p>
            <p>If you have any questions, feel free to <a href="mailto:support@yourcompany.com">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Failed to send email ",
        });
      }

      res.status(200).json({
        msg: "Otp send successfully",
        otp,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

userRouter.post("/resetPassword", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP, and new password are required",
      });
    }

    // Find user by email
    const existingUser = await userModel.findOne({ email: email });

    // Check if user exists
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    existingUser.password = hashedPassword;
    await existingUser.save();

    // Send successful response
    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

userRouter.post("/verifyotp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log(otp, otp);
    if (otp === otp) {
      res.status(200).json({
        message: "OTP verified successfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default userRouter;
