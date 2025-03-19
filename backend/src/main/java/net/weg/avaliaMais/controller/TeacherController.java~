package net.weg.avaliaMais.controller;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.service.TeacherService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("users/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping("/add")
    public TeacherResponseDTO addTeacher(TeacherPostRequestDTO teacherPostRequestDTO) {
        return teacherService.addTeacher(teacherPostRequestDTO);
    }
}
