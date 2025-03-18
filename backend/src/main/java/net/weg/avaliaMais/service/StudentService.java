package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;

    public StudentResponseDTO addStudent(StudentPostRequestDTO studentPostRequestDTO) {
        List<ClassSchool> allClasses = classRepository.findAll();
        Student studentSave = studentPostRequestDTO.converter(allClasses);
        studentSave = studentRepository.save(studentSave);
        return studentSave.toDto();
    }
}
