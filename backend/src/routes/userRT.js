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

/**
 * @swagger
 * /auth-user/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

* /auth-user/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

* /auth-user/get-user:
 *   get:
 *     summary: Get user Details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

* /auth-user/getFavoriteCoins:
 *   get:
 *     summary: Get user favorite coins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

* /auth-user/addToFavorite:
 *   put:
 *     summary: Add user favorite coins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                coin:
 *                  type: object
 *                  properties:
 *                       id:
 *                        type: string
 *                       name:
 *                        type: string
 *                       symbol:
 *                        type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

* /auth-user/removeFavorite:
 *   delete:
 *     summary: Remove user favorite coins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                coin:
 *                  type: object
 *                  properties:
 *                       id:
 *                        type: string
 *                       name:
 *                        type: string
 *                       symbol:
 *                        type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

module.exports = router;