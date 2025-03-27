package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.response.SupervisorResponseDTO;
import net.weg.avaliaMais.repository.SupervisorRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;

    public SupervisorResponseDTO findPedagogicalAdvisorPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Coordenador/a pedagógico não encontrado com os dados: " + username + " " + email));
    }

    public SupervisorResponseDTO findTeacherPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com os dados: " + username + " " + email));
    }

    public SupervisorResponseDTO findStudentPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com os dados: " + username + " " + email));
    }

    public SupervisorResponseDTO findSupervisorPerUsername(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado com os dados: " + username + " " + email));
    }

    public SupervisorResponseDTO findSupervisorPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado com os dados: " + username + " " + email));
    }

    public SupervisorResponseDTO findClassPerName(String nameClass) {
        return supervisorRepository.findByNameClass(nameClass)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + nameClass));
    }

    public SupervisorResponseDTO findClassPerYear(Integer year) {
        return supervisorRepository.findByYear(year)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + year));
    }

    public SupervisorResponseDTO findClassPerLocation(String location) {
        return supervisorRepository.findByLocation(location)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + location));
    }

    public SupervisorResponseDTO findClassPerShift(String shift) {
        return supervisorRepository.findByShift(shift)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + shift));
    }

    public SupervisorResponseDTO findCoursePerName(String nameCourse) {
        return supervisorRepository.findByNameCourse(nameCourse)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado com os dados: " + nameCourse));
    }

    public SupervisorResponseDTO findCoursePerType(String typeCourse) {
        return supervisorRepository.findByTypeCourse(typeCourse)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado com os dados: " + typeCourse));
    }

    public SupervisorResponseDTO findPedagogicalTechniquePerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Técnico/a pedagógico não encontrado com os dados: " + username + " " + email));
    }
}
