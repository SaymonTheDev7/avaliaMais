package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.Supervisor;
import net.weg.avaliaMais.repository.SupervisorRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;

    public Supervisor findPedagogicalAdvisorPerUsername(String username) {
        return supervisorRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Coordenador/a pedagógico não encontrado: " + username));
    }

    public Supervisor findPedagogicalAdvisorPerEmail(String email) {
        return supervisorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Coordenador/a pedagógico não encontrado: " + email));
    }
    public Supervisor findPedagogicalTechniquePerUsername(String username) {
        return supervisorRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Técnico/a pedagógico não encontrado: " + username));
    }

    public Supervisor findPedagogicalTechniquePerEmail(String email) {
        return supervisorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Técnico/a pedagógico não encontrado: " + email));
    }

    public Supervisor findTeacherPerUsername(String username) {
        return supervisorRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + username));
    }

    public Supervisor findTeacherPerEmail(String email) {
        return supervisorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + email));
    }

    public Supervisor findStudentPerUsername(String username) {
        return supervisorRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + username));
    }

    public Supervisor findStudentPerEmail(String email) {
        return supervisorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + email));
    }

    public Supervisor findSupervisorPerUsername(String username) {
        return supervisorRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado: " + username));
    }

    public Supervisor findSupervisorPerEmail(String email) {
        return supervisorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado: " + email));
    }


}
