import RestaurantCategoryController from '../controllers/RestaurantCategoryController.js'
import * as RestaurantCategoryMiddleware from '../middlewares/RestaurantCategoryMiddleware.js'
import * as RestaurantCategoryValidation from '../controllers/validation/RestaurantCategoryValidation.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'

const loadFileRoutes = function (app) {
  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.index)
    .post(
      isLoggedIn,
      hasRole('owner'),
      RestaurantCategoryValidation.create,
      handleValidation,
      //RestaurantCategoryMiddleware.checkName,
      RestaurantCategoryController.create
    )


}
export default loadFileRoutes
