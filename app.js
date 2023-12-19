const express = require("express");
const connection = require("./database");

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const wishListRoutes = require("./api/wishList/wishList.routes");
const itemRoutes = require("./api/item/item.routes");
const categoryRoutes = require("./api/explore/category/category.routes");
const brandRoutes = require("./api/explore/brand/brand.routes");
const profileRoutes = require("./api/profile/profile.routes");

const path = require("path");
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://192.168.8.106:8081",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/profile", profileRoutes);

// app.use("/media", express.static(path.join(__dirname, "media")));

app.use(errorHandler);
app.use(notFound);
connection();
app.listen(process.env.PORT, () => {
  console.log(`The app is running on port ${process.env.PORT}`);
});
