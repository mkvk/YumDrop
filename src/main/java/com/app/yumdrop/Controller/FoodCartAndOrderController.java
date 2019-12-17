package com.app.yumdrop.Controller;

import com.app.yumdrop.Entity.*;
import com.app.yumdrop.FormEntity.DeliveryAgentActiveOrders;
import com.app.yumdrop.FormEntity.RestaurantDetails;
import com.app.yumdrop.Messages.ErrorMessage;
import com.app.yumdrop.Messages.SuccessMessage;
import com.app.yumdrop.Repository.RestaurantMenuItemRepository;
import com.app.yumdrop.Repository.UserCartRepository;
import com.app.yumdrop.Repository.UserOrderRepository;
import com.app.yumdrop.Repository.UsersRepository;
import com.app.yumdrop.Service.FoodOrderService;
import com.app.yumdrop.Service.SearchDeliveryAgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@ComponentScan
@Controller
public class FoodCartAndOrderController {

    @Autowired
    UserCartRepository userCartRepository;

    @Autowired
    FoodOrderService foodOrderService;

    @Autowired
    UserOrderRepository userOrderRepository;

    @Autowired
    SearchDeliveryAgentService searchDeliveryAgentService;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    RestaurantMenuItemRepository restaurantMenuItemRepository;

    /**
     * load user cart data for user.
     * @param userCartItem
     * @return
     */

    @RequestMapping(value = "/addItemToMyCart", method = RequestMethod.POST)
    public ResponseEntity<?> addDishToUserCart(@RequestBody UserCart userCartItem) {

        Optional<RestaurantMenuItem> menuItem = restaurantMenuItemRepository.findById(
                new RestaurantMenuItemId(userCartItem.getRestaurantId(), userCartItem.getDishName())
        );
        String dishPhotoUrl="";
        if(menuItem.isPresent()){
            dishPhotoUrl = menuItem.get().getDishPhotoUrl();
            userCartItem.setDishPhotoUrl(dishPhotoUrl);
        }

        UserCart cartItemSaved = userCartRepository.save(userCartItem);
        if (cartItemSaved != null) {
            SuccessMessage itemAddedToCart = new SuccessMessage(new Date(), "Item is added to your cart");
            return new ResponseEntity<>(itemAddedToCart, HttpStatus.OK);
        } else {
            ErrorMessage itemNotAddedToCart = new ErrorMessage(new Date(), "Could not add item to cart, please try again",
                    "");
            return new ResponseEntity<>(itemNotAddedToCart, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @RequestMapping(value = "/getUserDataForMyCart", method = RequestMethod.POST)
    public ResponseEntity<?> getUserDataForCart(@RequestBody UserCart userCartItem) {
        List<UserCart> userCartItems = userCartRepository.findByuserEmail(userCartItem.getUserEmail());
        return new ResponseEntity<>(userCartItems, HttpStatus.OK);
    }

    /**
     * create an order for the user
     * @param userOrderDetails
     * @return
     */
    @RequestMapping(value = "/makeUserOrder", method = RequestMethod.POST)
    public ResponseEntity<?> createUserOrder(@RequestBody UserOrder userOrderDetails) {
        return foodOrderService.createFoodOrder(userOrderDetails);
    }

    /**
     * get current active orders for a user
     * @param userOrderDetails
     * @return
     */
    @RequestMapping(value = "/getCurrentActiveOrderForUser", method = RequestMethod.POST)
    public ResponseEntity<?> getCurrentOrdersForUser(@RequestBody UserOrder userOrderDetails) {
        return foodOrderService.getCurrentUserOrders(userOrderDetails);
    }

    /**
     * get current active orders for a restaurant
     * @param restaurantDetails
     * @return
     */
    @RequestMapping(value = "/getCurrentActiveOrderForRestaurant", method = RequestMethod.POST)
    public ResponseEntity<?> getCurrentOrdersForRestaurant(@RequestBody RestaurantDetails restaurantDetails) {
        return foodOrderService.getCurrentRestaurantOrders(restaurantDetails);
    }

    /**
     * restaurant notifying that food order is ready
     * @param orderDetails
     * @return
     */
    @RequestMapping(value = "/changeOrderStatusFromRestaurant", method = RequestMethod.POST)
    public ResponseEntity<?> changeOrderStatusFromRestaurant(@RequestBody UserOrder orderDetails) {

        UserOrder orderInDb = userOrderRepository.findByorderId(orderDetails.getOrderId());
        orderInDb.setOrderStatus(orderDetails.getOrderStatus());
        UserOrder userOrder = userOrderRepository.save(orderInDb);
        return searchDeliveryAgentService.findNearestDeliveryAgentToTheRestaurant(userOrder);
    }

    /**
     * delivery agent notifying that food order is ready
     * @param orderDetails
     * @return
     */
    @RequestMapping(value = "/changeOrderStatusFromDeliveryAgent", method = RequestMethod.POST)
    public ResponseEntity<?> changeOrderStatusFromDeliveryAgent(@RequestBody UserOrder orderDetails) {
        UserOrder orderInDb = userOrderRepository.findByorderId(orderDetails.getOrderId());
        orderInDb.setOrderStatus(orderDetails.getOrderStatus());
        UserOrder userOrder = userOrderRepository.save(orderInDb);

        // change delivery agent location to the delivered address
        Users userDetail = usersRepository.findByuserEmail(userOrder.getUserEmail());
        ResponseEntity<?> response = searchDeliveryAgentService.changeDeliveryAgentLocationAfterOrderDelivery(userOrder.getDeliveryAgentAssigned(), userDetail.getUserAddress());


        if(response.getStatusCodeValue() == 200){
            SuccessMessage successfulLoginMessage = new SuccessMessage(new Date(), "Order successfully delivered!");
            return new ResponseEntity<>(successfulLoginMessage, HttpStatus.OK);
        }

        ErrorMessage saveAddressUnsuccessful = new ErrorMessage(new Date(), "Error with the system",
                "");
        return new ResponseEntity<>(saveAddressUnsuccessful, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "/getActiveDeliveryOrderForDeliveryAgent", method = RequestMethod.POST)
    public ResponseEntity<?> getActiveOrdersForDeliveryAgent(@RequestBody DeliveryAgent deliveryAgentDetail) {
        if(deliveryAgentDetail.getDeliveryAgentEmail().length() == 0){
            ErrorMessage deliveryAgentDoesNotExist = new ErrorMessage(new Date(), "Delivery agent name not given!",
                    "");
            return new ResponseEntity<>(deliveryAgentDoesNotExist, HttpStatus.BAD_REQUEST);
        }

        List<UserOrder> activeDeliveryOrders = userOrderRepository.findBydeliveryAgentAssigned(deliveryAgentDetail.getDeliveryAgentEmail());
        return searchDeliveryAgentService.getAllDeliveryAgentActiveOrders(activeDeliveryOrders);
    }


}
