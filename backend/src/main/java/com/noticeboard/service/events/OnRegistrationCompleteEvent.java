package com.noticeboard.service.events;

import com.noticeboard.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Setter
@Getter
public class OnRegistrationCompleteEvent extends ApplicationEvent {

    private User user;

    public OnRegistrationCompleteEvent(User user) {
        super(user);
        this.user = user;
    }
}
