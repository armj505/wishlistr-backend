const express = require("express");
const connection = require("./database");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const wishListRoutes = require("./api/wishList/wishList.routes");
const itemRoutes = require("./api/item/item.routes");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");

const port = 7000;
const app = express();
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", wishListRoutes);
app.use("/api", itemRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use(errorHandler);
app.use(notFound);
connection();
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
