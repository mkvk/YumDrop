package com.app.yumdrop.Repository;

import com.app.yumdrop.Entity.UserFutureOrders;
import org.springframework.data.repository.CrudRepository;

public interface UserFutureOrdersRepository extends CrudRepository<UserFutureOrders, String> {

    UserFutureOrders findByOrderId(String orderId);
}
