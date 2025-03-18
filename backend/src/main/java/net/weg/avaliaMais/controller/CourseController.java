package net.weg.avaliaMais.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.CoursePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
import net.weg.avaliaMais.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    @PostMapping("/add")
    public CourseResponseDTO addCourse (@RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        return courseService.addCourse(coursePostRequestDTO);
    }

    @PutMapping("/update")
    public CourseResponseDTO updateCourse (@RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        return courseService.updateCourse(coursePostRequestDTO);
    }

    @DeleteMapping("/delete/{nameCourse}")
    public void deleteCoursePerName (@PathVariable String nameCourse) {
        courseService.deleteCoursePerName(nameCourse);
    }

    @GetMapping("/find/{nameCourse}")
    public CourseResponseDTO findCoursePerName (@PathVariable String nameCourse) {
        return courseService.findCoursePerName(nameCourse);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<CourseResponseDTO>> findAllClasses(@RequestParam int page) {
        return new ResponseEntity<>(courseService.findAllCourses(page, 4), HttpStatus.OK);
    }

    @GetMapping("/find/{uuid}")
    public ResponseEntity<CourseResponseDTO> findClassPerUuid(@PathVariable UUID uuid) {
        return new ResponseEntity<>(courseService.findCoursePerUuid(uuid), HttpStatus.OK);
    }
}
