package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.dto.request.CoursePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
import net.weg.avaliaMais.repository.CourseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseResponseDTO addCourse(CoursePostRequestDTO coursePostRequestDTO) {
        if (courseRepository.findByNameCourse(coursePostRequestDTO.nameCourse()) != null) {
            throw new IllegalArgumentException("Já existe um curso com o nome fornecido");
        }
        Course courseSave = courseRepository.save(coursePostRequestDTO.converter());
        return courseSave.toDto();
    }

    public CourseResponseDTO updateCoursePerName(String nameCourse, CoursePostRequestDTO coursePostRequestDTO) {
        Course course = courseRepository.findByNameCourse(nameCourse);
        if (course == null) {
            throw new RuntimeException("Curso não encontrado");
        }
        course.setNameCourse(coursePostRequestDTO.nameCourse());
        course.setStartAndEndLocation(coursePostRequestDTO.startAndEndLocation());
        course.setTypeCourse(coursePostRequestDTO.typeCourse());
        course.setShift(coursePostRequestDTO.shift());
        course.setWorkloadCourse(coursePostRequestDTO.workloadCourse());
        course.setTime(coursePostRequestDTO.time());
        courseRepository.save(course);
        return course.toDto();
    }

    public String deleteCoursePerName(String nameCourse) {
        List<Course> courses = courseRepository.findAllByNameCourse(nameCourse);
        if (courses.isEmpty()) {
            return "Curso não encontrado";
        }
        courseRepository.delete(courses.get(0));
        return "Curso deletado com sucesso";
    }

    public CourseResponseDTO findCoursePerUuid(UUID uuid) {
        Course course = courseRepository.findByUuid(uuid);
        return course == null ? null : course.toDto();
    }

    public CourseResponseDTO findCoursePerName(String nameCourse) {
        if (nameCourse == null || nameCourse.trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do curso não pode ser vazio");
        }
        Course course = courseRepository.findByNameCourse(nameCourse);
        return course == null ? null : course.toDto();
    }

    public Page<CourseResponseDTO> findAllCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Course> coursePage = courseRepository.findAll(pageable);
        return coursePage.map(CourseResponseDTO::new);
    }
}
