package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.CoursePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
import net.weg.avaliaMais.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.UUID;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/add")
    public CourseResponseDTO addCourse(@RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        return courseService.addCourse(coursePostRequestDTO);
    }

    @PutMapping("/update/{nameCourse}")
    public CourseResponseDTO updateCoursePerName(@PathVariable String nameCourse, @RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        return courseService.updateCoursePerName(nameCourse, coursePostRequestDTO);
    }

    @DeleteMapping("/delete/{nameCourse}")
    public ResponseEntity<String> deleteCoursePerName(@PathVariable String nameCourse) {
        String response = courseService.deleteCoursePerName(nameCourse);
        return response.equals("Curso não encontrado")
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(response)
                : ResponseEntity.ok(response);
    }

    @GetMapping("/findByName/{nameCourse}")
    public ResponseEntity<CourseResponseDTO> findCoursePerName(@PathVariable String nameCourse) {
        CourseResponseDTO course = courseService.findCoursePerName(nameCourse);
        return course == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(course);
    }

    @GetMapping("/findByUuid/{uuid}")
    public ResponseEntity<CourseResponseDTO> findCoursePerUuid(@PathVariable UUID uuid) {
        CourseResponseDTO course = courseService.findCoursePerUuid(uuid);
        return course == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(course);
    }

    @GetMapping("/findAll")
    public ResponseEntity<Page<CourseResponseDTO>> findAllCourses(@RequestParam int page, @RequestParam int size) {
        Page<CourseResponseDTO> courses = courseService.findAllCourses(page, size);
        return ResponseEntity.ok(courses);
    }
}
