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

    public CourseResponseDTO addCourse (CoursePostRequestDTO coursePostRequestDTO) {
        Course courseSave = courseRepository.save(coursePostRequestDTO.converter());
        return courseSave.toDto();
    }

    public CourseResponseDTO updateCourse (CoursePostRequestDTO coursePostRequestDTO) {
        Course courseSave = courseRepository.save(coursePostRequestDTO.converter());
        return courseSave.toDto();
    }

    public String deleteCoursePerName (String nameCourse) {
        if (courseRepository.findByNameCourse(nameCourse) == null) {
            return "Curso não encontrado";
        }
        courseRepository.deleteByNameCourse(nameCourse);
        return "Curso deletado com sucesso";
    }

    public CourseResponseDTO findCoursePerUuid (UUID uuid) {
        if (courseRepository.findByUuid(uuid) == null) return null;
        return courseRepository.findByUuid(uuid).toDto();
    }

    public CourseResponseDTO findCoursePerName (String nameCourse) {
        if (courseRepository.findByNameCourse(nameCourse) == null) return null;
        return courseRepository.findByNameCourse(nameCourse).toDto();
    }

    public Page<CourseResponseDTO> findAllCourses (int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Course> coursePage = courseRepository.findAll(pageable);
        return coursePage.map(CourseResponseDTO::new);
    }
}
