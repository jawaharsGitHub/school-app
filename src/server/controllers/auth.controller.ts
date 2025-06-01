import express, { Router } from "express";
import { UserInfo } from "../../shared/entities/UserInfo";
import { remult, withRemult } from 'remult'




export const authRouter: Router = express.Router();
authRouter.use(express.json());


authRouter.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    await withRemult(async () => {
      const user = await remult.repo(UserInfo).findFirst({
        email: String(username),
        password: String(password),
      });

      if (!user) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      //req.session!["user"] = user;
      res.json(user);
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});


authRouter.post("api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await withRemult(async () => {
      const userRepo = remult.repo(UserInfo);

      if (await userRepo.findFirst({ email })) {
        res.status(400).json({ message: 'Email already registered' });
        return;
      }

      const newUser = await userRepo.insert({
        firstName,
        lastName,
        email,
        password // ⚠️ Hash in real apps
      });

      res.status(201).json({ message: 'User registered', user: newUser });
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});


authRouter.get("/api/currentUser", (req, res) => {
    console.log("Current user request:", req.session);
    res.json(req.session!["user"]);
});

authRouter.post("/api/logout", (req, res) => {
  // In a real application, you would clear the session or token
  // Here we just send a success response
  req.session!["user"] = null; // Clear user session
  res.json({ message: "Logged out successfully" });
});

