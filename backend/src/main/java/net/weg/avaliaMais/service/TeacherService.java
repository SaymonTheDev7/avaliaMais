package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Teacher;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final ClassRepository classRepository;

    public TeacherResponseDTO addTeacher(TeacherPostRequestDTO teacherPostRequestDTO) {
        List<ClassSchool> allClasses = classRepository.findAll();
        Teacher teacherSave = teacherPostRequestDTO.converter(allClasses);
        teacherSave = teacherRepository.save(teacherSave);
        return teacherSave.toDto();
    }

}
