package com.app.yumdrop.ServiceImplementation;

import com.app.yumdrop.Entity.Users;
import com.app.yumdrop.FormEntity.UsersDetails;
import com.app.yumdrop.Repository.UsersRepository;
import com.app.yumdrop.Service.UserRegistrationService;
import com.app.yumdrop.Utils.PasswordUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class UserRegistrationServiceImpl implements UserRegistrationService {

    @Autowired
    private UsersRepository userRepository;

    @Override
    public ResponseEntity<?> registerUser(UsersDetails userDataForm) {
        boolean userExistsBool = userRepository.existsById(userDataForm.getUser_email());

        if (userExistsBool) {
            throw new ConstraintViolationException("User already exists", new SQLException(" Insert query"), "user_email");
        }

        Users userToRegister = new Users(userDataForm.getUser_email(), userDataForm.getUser_name(),
                userDataForm.getUser_phonenum(), "+1", PasswordUtils.convertToHash(userDataForm.getUserPassword()), "SYSTEM", "SYSTEM");

        userRepository.save(userToRegister);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
