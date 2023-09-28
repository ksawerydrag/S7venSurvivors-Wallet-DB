/**
* @swagger
* /api/transactions:
 *   get:
 *     summary: All user's transactions
 *     description: User see all transactions.
 *     responses:
 *       200:
 *         description: OK
 */

/**
* @swagger
* /api/transactions/categories/:category:
 *   get:
 *     summary: Filtering by categories
 *     description: User filter its transactions by categories.
 *     responses:
 *       200:
 *         description: OK
 */

/**
* @swagger
* /api/transactions/:year:
 *   get:
 *     summary: Filtering by year
 *     description: User filter its transactions by year.
 *     responses:
 *       200:
 *         description: OK
 */

/**
* @swagger
* /api/transactions/:year/:month:
 *   get:
 *     summary: Filtering by year and month
 *     description: User filter its transactions by year and month.
 *     responses:
 *       200:
 *         description: OK
 */

/**
* @swagger
* /api/transactions:
 *   post:
 *     summary: Create new transactions
 *     description: User create and add new transaction to its list.
 *     responses:
 *       201:
 *         description: Created
 */