import express from "express"
import { query } from "../config/database.js"
import {authenticateToken} from "../middleware/auth.js"

const productRouter = express.Router()

productRouter.get("/",authenticateToken,async (req, res) => {
    try {
        const result = await query("SELECT * FROM products ORDER BY article_no ASC")
        res.json(result.rows)
    } catch (error) {
        console.error("Error ", error)
        res.status(500).json({ error: "internal server error"  })
    }
})

export default productRouter
