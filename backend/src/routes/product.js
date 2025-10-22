import express from "express"
import { query } from "../config/database.js"
import { authenticateToken } from "../middleware/auth.js"

const productRouter = express.Router()

productRouter.get("/", authenticateToken, async (req, res) => {
    try {
        const result = await query("SELECT * FROM products ORDER BY article_no ASC")
        res.json(result.rows)
    } catch (error) {
        console.error("Error ", error)
        res.status(500).json({ error: "internal server error" })
    }
})

productRouter.get('/:id',authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'SELECT id, name, in_price, price, description, created_at, updated_at FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'product not found' });
        }

        res.json({ product: result.rows[0] });

    } catch (error) {
        console.error('Product fetch error:', error);
        res.status(500).json({ error: 'internal server error' });
    }
});


productRouter.put('/:id',authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, in_price, price, description, article_no, unit, in_stock } = req.body;

        if (!name && in_price === undefined && price === undefined &&
            !description && !article_no && !unit && in_stock === undefined) {
            return res.status(400).json({ error: 'At least one field is required' });
        }

        const updates = [];
        const values = [];
        let paramCount = 1;

        if (name !== undefined) {
            updates.push(`name = $${paramCount++}`);
            values.push(name);
        }
        if (in_price !== undefined) {
            updates.push(`in_price = $${paramCount++}`);
            values.push(parseFloat(in_price) || 0);
        }
        if (price !== undefined) {
            updates.push(`price = $${paramCount++}`);
            values.push(parseFloat(price) || 0);
        }
        if (description !== undefined) {
            updates.push(`description = $${paramCount++}`);
            values.push(description || null);
        }
        if (article_no !== undefined) {
            updates.push(`article_no = $${paramCount++}`);
            values.push(article_no);
        }
        if (unit !== undefined) {
            updates.push(`unit = $${paramCount++}`);
            values.push(unit);
        }
        if (in_stock !== undefined) {
            updates.push(`in_stock = $${paramCount++}`);
            values.push(parseInt(in_stock) || 0);
        }

        updates.push('updated_at = CURRENT_TIMESTAMP');

        values.push(id);

        const result = await query(
            `UPDATE products 
         SET ${updates.join(', ')}
         WHERE id = $${paramCount}
         RETURNING id, name, in_price, price, description, article_no, unit, in_stock, updated_at`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            message: 'Product updated successfully',
            product: result.rows[0]
        });

    } catch (error) {
        console.error('Product update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default productRouter
