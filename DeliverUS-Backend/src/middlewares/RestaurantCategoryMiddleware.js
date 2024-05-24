import { RestaurantCategory} from '../models/models.js'

const checkName = async (req, res, next) => {
    try {
      const restaurantCategories = await RestaurantCategory.findOne({where:{name:req.params.name}})
        if(restaurantCategories){
            return res.status(400).send('There is alredy a restaurant category equal named')
        }
      return next()
    } catch (err) {
      return res.status(500).send(err)
    }
  }

  export {checkName}