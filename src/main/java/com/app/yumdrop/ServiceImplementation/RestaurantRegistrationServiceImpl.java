package com.app.yumdrop.ServiceImplementation;

import com.app.yumdrop.Entity.Restaurant;
import com.app.yumdrop.Entity.RestaurantManager;
import com.app.yumdrop.FormEntity.RestaurantRegisterForm;
import com.app.yumdrop.Messages.ErrorMessage;
import com.app.yumdrop.Messages.SuccessMessage;
import com.app.yumdrop.Repository.RestaurantManagerRepository;
import com.app.yumdrop.Repository.RestaurantRepository;
import com.app.yumdrop.Service.RestaurantRegistrationService;
import com.app.yumdrop.Utils.PasswordUtils;
import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class RestaurantRegistrationServiceImpl implements RestaurantRegistrationService {

    @Autowired
    public JavaMailSender javaMailSender;

    @Autowired
    public RestaurantManagerRepository restaurantManagerRepository;

    @Autowired
    public RestaurantRepository restaurantRepository;

    @Value("${sendgrid.api.key}")
    String sendGridAPIKey;

    @Override
    public ResponseEntity<?> registerRestaurant(RestaurantRegisterForm restaurantRegisterForm) {

        RestaurantManager restaurantPrimaryManager = new RestaurantManager(restaurantRegisterForm.getRestaurantId(), restaurantRegisterForm.getRestaurantPrimaryEmailId(),
                PasswordUtils.convertPasswordToHash(restaurantRegisterForm.getRestaurantPrimaryPassword()), false);
        RestaurantManager newRestaurantManager = restaurantManagerRepository.save(restaurantPrimaryManager);

        if(newRestaurantManager!= null) {
            Restaurant newRestaurantRegister = new Restaurant(restaurantRegisterForm.getRestaurantId(), restaurantRegisterForm.getRestaurantName(), restaurantRegisterForm.getRestaurantPrimaryEmailId(),
                    restaurantRegisterForm.getPrimaryPhoneNumber());
            Restaurant registeredRestaurant = restaurantRepository.save(newRestaurantRegister);
            if (registeredRestaurant == null) {
                ErrorMessage restaurantNotRegistered = new ErrorMessage(new Date(), "Restaurant wasn't registered. Please try again",
                        "");
                return new ResponseEntity<>(restaurantNotRegistered, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                SuccessMessage restaurantRegisteredSuccessfully = new SuccessMessage(new Date(), "Restaurant is registered successfully");
                return new ResponseEntity<>(restaurantRegisteredSuccessfully, HttpStatus.OK);
            }
        }

        ErrorMessage restaurantNotRegistered = new ErrorMessage(new Date(), "Restaurant & Restaurant manager profile wasn't registered. Please try again",
                "");
        return new ResponseEntity<>(restaurantNotRegistered, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
