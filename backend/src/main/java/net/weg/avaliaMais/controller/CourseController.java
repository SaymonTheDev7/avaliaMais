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
    public ResponseEntity<CourseResponseDTO> addCourse(@RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        CourseResponseDTO response = courseService.addCourse(coursePostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/update/{nameCourse}")
    public ResponseEntity<CourseResponseDTO> updateCoursePerName(@PathVariable String nameCourse, @RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        CourseResponseDTO response = courseService.updateCoursePerName(nameCourse, coursePostRequestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{nameCourse}")
    public ResponseEntity<String> deleteCoursePerName(@PathVariable String nameCourse) {
        String response = courseService.deleteCoursePerName(nameCourse);
        if (response.equals("Curso não encontrado")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findByName/{nameCourse}")
    public ResponseEntity<CourseResponseDTO> findCoursePerName(@PathVariable String nameCourse) {
        CourseResponseDTO course = courseService.findCoursePerName(nameCourse);
        return course == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(course);
    }

    @GetMapping("/findByUuid/{uuid}")
    public ResponseEntity<CourseResponseDTO> findCoursePerUuid(@PathVariable UUID uuid) {
        CourseResponseDTO course = courseService.findCoursePerUuid(uuid);
        return course == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(course);
    }

    @GetMapping("/findAll")
    public ResponseEntity<Page<CourseResponseDTO>> findAllCourses(@RequestParam int page, @RequestParam int size) {
        Page<CourseResponseDTO> courses = courseService.findAllCourses(page, size);
        return ResponseEntity.ok(courses);
    }
}
