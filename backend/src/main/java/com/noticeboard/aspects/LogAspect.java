package com.noticeboard.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.logging.Level;
import java.util.logging.Logger;

@Aspect
@Component
@EnableAspectJAutoProxy
@Configuration
public class LogAspect {


    private final String POINTCUT = "within(@com.noticeboard.aspects.LogExecution *) && execution(public * *.*(..))";

    @Before(POINTCUT)
    public void logExecution(JoinPoint joinPoint) {
        Logger LOGGER = Logger.getLogger(joinPoint.getSignature().getDeclaringTypeName());

        StringBuilder sb = new StringBuilder();
        sb.append(joinPoint.getSignature()).append(", args: ");
        for (Object arg : joinPoint.getArgs()) {
            sb.append(arg).append(", ");
        }
        LOGGER.info("Method called: " + sb.toString());
    }

}
