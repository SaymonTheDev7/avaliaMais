package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.dto.request.ClassPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;

    public ClassResponseDTO addClass (ClassPostRequestDTO classPostRequestDTO) {
        ClassSchool classSchoolSave = classRepository.save(classPostRequestDTO.converter());
        return classSchoolSave.toDto();
    }
}
