package com.noticeboard.service.listeners;

import com.noticeboard.model.User;
import com.noticeboard.service.JwtUserDetailsService;
import com.noticeboard.service.MailService;
import com.noticeboard.service.events.OnRegistrationCompleteEvent;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.UUID;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {

    private final MailService mailService;

    private final JwtUserDetailsService userService;

    @Autowired
    public RegistrationListener(MailService mailService, JwtUserDetailsService userService) {
        this.mailService = mailService;
        this.userService = userService;
    }


    @SneakyThrows
    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent onRegistrationCompleteEvent) {
        this.sendMail(onRegistrationCompleteEvent);
    }

    private void sendMail(OnRegistrationCompleteEvent event) throws MessagingException {
        User user = event.getUser();

        String recipentAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String text = "Thanks for registration " + user.getUsername() + "!";
        mailService.sendMail(recipentAddress, subject, text, false);

    }
}
