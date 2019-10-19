package com.app.yumdrop.ServiceImplementation;

import com.app.yumdrop.Service.SmsTwoFactorService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

@Service
public class SmsTwoFactorServiceImpl implements SmsTwoFactorService {

    private final static String ACCOUNT_SID = "ACb1dccceafdf2b145395f15aff91fda12";
    private final static String AUTH_TOKEN = "9337c4a5d281f63782b649d78d5eb7a7";

    static {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    @Override
    public boolean send2FaCodeAsSms(String mobilePhoneNumber, String twoFactorCode) {
        Message.creator(new PhoneNumber(mobilePhoneNumber), new PhoneNumber("+16197802581"), "Hello! Your Two Factor Authentication Code is: " + twoFactorCode).create();
        return true;
    }
}
