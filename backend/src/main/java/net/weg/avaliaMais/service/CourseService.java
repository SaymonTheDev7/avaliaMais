package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.dto.request.CoursePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
import net.weg.avaliaMais.repository.CourseRepository;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseResponseDTO addCourse (CoursePostRequestDTO coursePostRequestDTO) {
        Course courseSave = courseRepository.save(coursePostRequestDTO.converter());
        return courseSave.toDto();
    }
}
