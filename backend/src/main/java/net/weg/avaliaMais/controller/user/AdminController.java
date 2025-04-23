package net.weg.avaliaMais.controller.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.*;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.service.user.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final PedagogicalAdvisorService pedagogicalAdvisorService;
    private final PedagogicalTechniqueService pedagogicalTechniqueService;
    private final TeacherService teacherService;
    private final SupervisorService supervisorService;
    private final StudentService studentService;

    @PostMapping("/add/admin")
    public ResponseEntity<AdminResponseDTO> addAdmin(@RequestBody @Valid AdminPostRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addAdmin(dto));
    }

    @PostMapping("/add/pedagogical-advisor")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> addPedagogicalAdvisor(@RequestBody @Valid PedagogicalAdvisorPostRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pedagogicalAdvisorService.addPedagogicalAdvisor(dto));
    }

    @PostMapping("/add/pedagogical-technique")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> addPedagogicalTechnique(@RequestBody @Valid PedagogicalTechniquePostRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pedagogicalTechniqueService.addPedagogicalTechnique(dto));
    }

    @PostMapping("/add/teacher")
    public ResponseEntity<TeacherResponseDTO> addTeacher(@RequestBody @Valid TeacherPostRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teacherService.addTeacher(dto));
    }

    @PostMapping("/add/supervisor")
    public ResponseEntity<SupervisorResponseDTO> addSupervisor(@RequestBody @Valid SupervisorPostRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(supervisorService.addSupervisor(dto));
    }

    @PostMapping("/add/student")
    public ResponseEntity<StudentResponseDTO> addStudent(@RequestBody @Valid StudentPostRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addStudent(dto));
    }
}
