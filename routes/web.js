const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/depot/cartController')
const fileController = require('../app/http/controllers/manufacturer/fileController')
const mHomeController = require('../app/http/controllers/manufacturer/mHomeController')
const keyController = require('../app/http/controllers/manufacturer/keyController')
const orderController = require('../app/http/controllers/depot/orderController')
const manufacturerOrderController = require('../app/http/controllers/manufacturer/manufacturerOrderController')
const statusController = require('../app/http/controllers/manufacturer/statusController')
const locationController = require('../app/http/controllers/locationController')
const transactionController = require('../app/http/controllers/transactionController')
const drugController = require('../app/http/controllers/manufacturer/drugController')

//------------------Middlewares---------------
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const manufacturer = require('../app/http/middlewares/manufacturer')
const order = require('../app/models/order')

function initRoutes(app){
    //----------- Depot In-charge Routes---------------
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)  
    app.get('/register', guest, authController().register)
    app.get('/drop', auth, homeController().dropFile)

   

    app.post('/login', authController().postLogin)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', auth, cartController().cart)
    app.post('/update_cart', cartController().update)
    app.get('/transaction',transactionController().depotTransaction)
    app.get('/profiles', auth, homeController().getProfiles)

    //---------------Depot Order Control Routes---------
    app.post('/orders', auth, orderController().store)
    app.get('/depot/orders', auth, orderController().orderControl)
    app.get('/depot/orders/:id', auth, orderController().showStatus)

    //----------------Manufacturer Routes-------------
    app.get('/manufacturer/home', manufacturer, mHomeController().home)
    app.get('/manufacturer/accounts', manufacturer, mHomeController().accounts)
    app.get('/manufacturer/add_user', manufacturer, mHomeController().adduser)
    app.get('/manufacturer/update_user',manufacturer, mHomeController().updateuser)
    app.get('/manufacturer/requests',manufacturer, mHomeController().requests)
    app.get('/manufacturer/generatekey',manufacturer, keyController().key)
    app.get('/manufacturer/drop', manufacturer, homeController().dropManufacturer)
    app.get('/manufacturer/transaction',transactionController().manufacturerTransaction)

    //--------------Manufacturer Control Drugs-----------
    app.get('/manufacturer/drugs',drugController().seeDrugs)
    app.get('/manufacturer/drugs/upload',drugController().addDrugPage)
    app.post('/manufacturer/drugs/upload',drugController().uploadDrugs)
    
    //-----------------Manufacturer Order Control Routes-------------
    app.get('/manufacturer/orders', manufacturer, manufacturerOrderController().index)
    app.post('/manufacturer/order/status', manufacturer, statusController().statusControl)
   
    app.get('/files/:uuid', fileController().file)
    app.get('/files/download/:uuid', fileController().fileControl)
    
    
    app.get('/:id/location', auth, locationController().location)
    app.post('/locationId/location/role', auth, locationController().locationControl)
}


module.exports = initRoutes