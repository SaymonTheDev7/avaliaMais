package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import net.weg.avaliaMais.model.dto.response.ErrorResponseDTO;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.util.NestedServletException;

import java.time.Instant;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeoutException;

@ControllerAdvice
@Tag(name = "Exception Handling", description = "Controller responsável pelo tratamento global de exceções da aplicação.")
public class ExceptionHandleController {

    @ExceptionHandler(NoSuchElementException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "404", description = "Elemento não encontrado no banco de dados")
    })
    public ResponseEntity<ErrorResponseDTO> handleNoSuchElementException(NoSuchElementException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO(exception.getMessage(), exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, MissingServletRequestParameterException.class})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Erro de validação nos parâmetros da requisição")
    })
    public ResponseEntity<ErrorResponseDTO> handleValidationException(MethodArgumentNotValidException exception) {
        String errorMessage = exception.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        ErrorResponseDTO error = new ErrorResponseDTO(errorMessage, exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResponseStatusException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "4xx", description = "Erro de status customizado")
    })
    public ResponseEntity<ErrorResponseDTO> handleResponseStatusException(ResponseStatusException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO(exception.getReason(), exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, exception.getStatusCode());
    }

    @ExceptionHandler(Exception.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<ErrorResponseDTO> handleGenericException(Exception exception) {
        ErrorResponseDTO error = new ErrorResponseDTO("Erro interno do servidor", exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Violação de integridade de dados")
    })
    public ResponseEntity<ErrorResponseDTO> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO("Violação de integridade de dados", exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TimeoutException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "408", description = "Tempo de espera da requisição esgotado")
    })
    public ResponseEntity<ErrorResponseDTO> handleTimeoutException(TimeoutException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO("Tempo de espera esgotado", exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.REQUEST_TIMEOUT);
    }

    @ExceptionHandler(NestedServletException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "500", description = "Erro no servlet interno")
    })
    public ResponseEntity<ErrorResponseDTO> handleNestedServletException(NestedServletException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO("Erro no servlet", exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Corpo da requisição inválido ou malformado")
    })
    public ResponseEntity<ErrorResponseDTO> handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO("Mensagem de requisição inválida", exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Tipo de argumento inválido na requisição")
    })
    public ResponseEntity<ErrorResponseDTO> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO("Tipo de argumento inválido", exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado")
    })
    public ResponseEntity<ErrorResponseDTO> handleNoHandlerFoundException(NoHandlerFoundException exception) {
        ErrorResponseDTO error = new ErrorResponseDTO("Recurso não encontrado", exception.getClass(), Instant.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
