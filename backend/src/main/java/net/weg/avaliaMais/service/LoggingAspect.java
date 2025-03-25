package net.weg.avaliaMais.service;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private final LogService logService;

    public LoggingAspect(LogService logService) {
        this.logService = logService;
    }

    @Pointcut("execution(* net.weg.avaliaMais.service*.save*(..))")
    public void saveMethods() {}

    @Pointcut("execution(* net.weg.avaliaMais.service*.update*(..))")
    public void updateMethods() {}

    @Pointcut("execution(* net.weg.avaliaMais.service*.delete*(..))")
    public void deleteMethods() {}

    @Pointcut("execution(* net.weg.avaliaMais.service*.get*(..))")
    public void getMethods() {}

    @Pointcut("execution(* net.weg.avaliaMais.service*.patch*(..))")
    public void patchMethods() {}

    @Before("saveMethods()")
    public void logBeforeSave(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String entityName = args.length > 0 ? args[0].getClass().getSimpleName() : "Entidade";
        String message = "Criando a entidade " + entityName + " com dados: " + args[0];
        String actionType = "CREATE";
        logService.logAction(actionType + " | " + message);
    }

    @After("saveMethods()")
    public void logAfterSave(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "Ação de " + methodName + " concluída com sucesso.";
        String actionType = "CREATE";
        logService.logAction(actionType + " | " + message);
    }

    @Before("updateMethods()")
    public void logBeforeUpdate(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String entityName = args.length > 0 ? args[0].getClass().getSimpleName() : "Entidade";
        String message = "Atualizando a entidade " + entityName + " com dados: " + args[0];
        String actionType = "UPDATE";
        logService.logAction(actionType + " | " + message);
    }

    @After("updateMethods()")
    public void logAfterUpdate(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "Ação de " + methodName + " concluída com sucesso.";
        String actionType = "UPDATE";
        logService.logAction(actionType + " | " + message);
    }

    @Before("deleteMethods()")
    public void logBeforeDelete(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String entityName = args.length > 0 ? args[0].getClass().getSimpleName() : "Entidade";
        String message = "Deletando a entidade " + entityName + " com identificador: " + args[0];
        String actionType = "DELETE";
        logService.logAction(actionType + " | " + message);
    }

    @After("deleteMethods()")
    public void logAfterDelete(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "Ação de " + methodName + " concluída com sucesso.";
        String actionType = "DELETE";
        logService.logAction(actionType + " | " + message);
    }

    @Before("getMethods()")
    public void logBeforeGet(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "Consultando dados com o método: " + methodName;
        String actionType = "GET";
        logService.logAction(actionType + " | " + message);
    }

    @After("getMethods()")
    public void logAfterGet(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "Consulta com o método " + methodName + " concluída com sucesso.";
        String actionType = "GET";
        logService.logAction(actionType + " | " + message);
    }

    @Before("patchMethods()")
    public void logBeforePatch(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String entityName = args.length > 0 ? args[0].getClass().getSimpleName() : "Entidade";
        String message = "Atualizando parcialmente a entidade " + entityName + " com dados: " + args[0];
        String actionType = "PATCH";
        logService.logAction(actionType + " | " + message);
    }

    @After("patchMethods()")
    public void logAfterPatch(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "Ação de " + methodName + " concluída com sucesso.";
        String actionType = "PATCH";
        logService.logAction(actionType + " | " + message);
    }
}
