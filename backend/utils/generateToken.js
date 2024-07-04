import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days 24 hours 60 minutes 60 seconds 1000 milliseconds
    httpOnly: true, //prevent XSS attack also known as cross site scripting attack
    sameSite: "none", //prevent CSRF attack also known as cross site request forgery
    secure:process.env.NODE_ENV === "development" ? false : true,
  });
};

export default generateTokenAndSetCookie;
