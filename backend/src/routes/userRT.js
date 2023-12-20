// const router = express.Router();
const router = require("express").Router();
const auth = require("../middleware/auth.js")

const {login, signup, getUser, addFavoriteCoin, removeFavoriteCoin, getFavoriteCoins} = require("../controllers/auth/userController.js")

router.post("/login", login);
router.post("/signup", signup);
router.get("/get-user",auth, getUser);
router.get("/getFavoriteCoins",auth, getFavoriteCoins);
router.put("/addToFavorite",auth, addFavoriteCoin);
router.delete("/removeFavorite",auth, removeFavoriteCoin);

module.exports = router;