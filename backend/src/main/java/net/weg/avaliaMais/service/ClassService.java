package net.weg.avaliaMais.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;
import net.weg.avaliaMais.model.dto.request.ClassPostRequestDTO;
import net.weg.avaliaMais.model.dto.request.ClassUpdateRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.CourseRepository;
import net.weg.avaliaMais.repository.StudentRepository;
import net.weg.avaliaMais.repository.TeacherRepository;
import net.weg.avaliaMais.repository.specification.ClassSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
@Transactional
public class ClassService {

    private final ClassRepository classRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    /**
     * Adiciona uma nova turma com base nos dados fornecidos.
     *
     * @param classPostRequestDTO Objeto contendo as informações da turma, incluindo UUID do curso, IDs dos alunos e IDs dos professores.
     * @return {@link ClassResponseDTO} representando a turma criada.
     * @throws RuntimeException Se o curso, algum aluno ou professor não for encontrado.
     */
    public ClassResponseDTO addClass(ClassPostRequestDTO classPostRequestDTO) {
        List<Course> allCourses = courseRepository.findAll();
        List<Student> allStudents = studentRepository.findAll();
        List<Teacher> allTeachers = teacherRepository.findAll();

        // Verificar se o curso existe
        Course course = allCourses.stream()
                .filter(c -> c.getUuid().equals(classPostRequestDTO.courseUuid()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        // Verificar se os alunos existem
        List<Student> studentsList = classPostRequestDTO.studentIds().stream()
                .map(studentId -> allStudents.stream()
                        .filter(s -> s.getUuid().equals(studentId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + studentId)))
                .toList();

        // Verificar se os professores existem
        List<Teacher> teachersList = classPostRequestDTO.teacherIds().stream()
                .map(teacherId -> allTeachers.stream()
                        .filter(t -> t.getUuid().equals(teacherId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + teacherId)))
                .toList();

        // Converte e salva a classe
        ClassSchool classSchoolSave = classPostRequestDTO.converter(allCourses, allStudents, allTeachers);
        classSchoolSave = classRepository.save(classSchoolSave);

        return classSchoolSave.toDto();
    }


    /**
     * Atualiza uma turma existente com base nos dados fornecidos.
     *
     * @param classUpdateRequestDTO Objeto contendo as informações atualizadas da turma, incluindo UUID da turma, novo nome, carga horária, horário, quantidade de alunos e IDs dos alunos.
     * @return {@link ClassResponseDTO} representando a turma atualizada.
     * @throws RuntimeException Se a turma não for encontrada.
     */
    public ClassResponseDTO updateClass(ClassUpdateRequestDTO classUpdateRequestDTO) {
        // Busca a turma pelo UUID, lança uma exceção se não for encontrada
        ClassSchool classSchoolToUpdate = classRepository.findById(classUpdateRequestDTO.classUuid())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        // Atualiza os dados da turma
        classSchoolToUpdate.setNameClass(classUpdateRequestDTO.nameClass());
        classSchoolToUpdate.setWorkloadClass(classUpdateRequestDTO.workloadClass());
        classSchoolToUpdate.setTime(classUpdateRequestDTO.time());
        classSchoolToUpdate.setQuantityStudents(classUpdateRequestDTO.quantityStudents());
        classSchoolToUpdate.setShift(classUpdateRequestDTO.shift());

        // Atualiza a lista de alunos da turma
        List<Student> updatedStudents = studentRepository.findAll().stream()
                .filter(student -> classUpdateRequestDTO.studentIds().contains(student.getUuid()))
                .toList();
        classSchoolToUpdate.setStudents(updatedStudents);   // Salva a turma atualizada no banco de dados

        classSchoolToUpdate = classRepository.save(classSchoolToUpdate);
        return classSchoolToUpdate.toDto();   // Retorna a turma atualizada convertida para DTO
    }


    /**
     * Deleta uma turma existente com base no nome fornecido.
     *
     * <p>O método verifica se a turma existe no banco de dados antes de excluí-la.
     * Se a turma não for encontrada, lança uma exceção.</p>
     *
     * @param nameClass Nome da turma a ser deletada.
     * @throws RuntimeException Se a turma com o nome especificado não for encontrada.
     */
    public void deleteClassPerName(String nameClass) {
        // Verifica se a turma existe no banco de dados
        if (classRepository.findByNameClass(nameClass).isEmpty())
            throw new RuntimeException("Turma não encontrada");
        // Deleta a turma pelo nome
        classRepository.deleteByNameClass(nameClass);
    }

    /**
     * Busca uma turma pelo nome.
     *
     * <p>O método procura uma turma no repositório pelo nome fornecido.
     * Se encontrada, retorna um objeto {@link ClassResponseDTO} com os detalhes da turma.
     * Caso contrário, lança uma exceção informando que a turma não foi encontrada.</p>
     *
     * @param nameClass Nome da turma a ser buscada.
     * @return Um objeto {@link ClassResponseDTO} contendo os detalhes da turma encontrada.
     * @throws RuntimeException Se a turma com o nome especificado não for encontrada.
     */
    public ClassResponseDTO findClassPerName(String nameClass) {
        return classRepository.findByNameClass(nameClass).map(ClassResponseDTO::new).orElseThrow(() -> new RuntimeException("Turma não encontrada"));
    }

    /**
     * Retorna uma lista paginada de todas as turmas.
     *
     * <p>O método busca todas as turmas armazenadas no repositório e retorna uma página contendo
     * objetos {@link ClassResponseDTO}.</p>
     *
     * @param page Número da página a ser recuperada (baseado em zero).
     * @param size Número de elementos por página.
     * @return Um objeto {@link Page} contendo uma lista paginada de {@link ClassResponseDTO}.
     */
    public Page<ClassResponseDTO> findAllClasses(int page, int size) {
        Page<ClassSchool> classPage = classRepository.findAll(PageRequest.of(page, size));
        return classPage.map(ClassResponseDTO::new);
    }

    /**
     * Retorna uma lista paginada de turmas com base no ano especificado.
     *
     * <p>O método utiliza uma {@link Specification} para filtrar as turmas pelo ano informado
     * e retorna uma página contendo objetos {@link ClassResponseDTO}.</p>
     *
     * @param year O ano das turmas a serem filtradas.
     * @param pageable Objeto {@link Pageable} que define a paginação e ordenação dos resultados.
     * @return Um objeto {@link Page} contendo uma lista paginada de {@link ClassResponseDTO}.
     */
    public Page<ClassResponseDTO> findClassPerYear(Integer year, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasYear(year);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    /**
     * Retorna uma lista paginada de turmas com base na localização especificada.
     *
     * <p>O método utiliza uma {@link Specification} para filtrar as turmas pela localização informada
     * e retorna uma página contendo objetos {@link ClassResponseDTO}.</p>
     *
     * @param location A localização das turmas a serem filtradas.
     * @param pageable Objeto {@link Pageable} que define a paginação e ordenação dos resultados.
     * @return Um objeto {@link Page} contendo uma lista paginada de {@link ClassResponseDTO}.
     */
    public Page<ClassResponseDTO> findClassPerLocation(String location, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasLocation(location);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    /**
     * Retorna uma lista paginada de turmas associadas a um curso específico.
     *
     * <p>Este método utiliza uma {@link Specification} para filtrar as turmas pelo nome do curso fornecido
     * e retorna os resultados em uma página de objetos {@link ClassResponseDTO}.</p>
     *
     * @param nameCourse O nome do curso pelo qual as turmas serão filtradas.
     * @param pageable   Objeto {@link Pageable} que define a paginação e ordenação dos resultados.
     * @return Um objeto {@link Page} contendo uma lista paginada de {@link ClassResponseDTO}.
     */
    public Page<ClassResponseDTO> findClassesByCourse(String nameCourse, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasCourse(nameCourse);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    /**
     * Retorna uma lista paginada de turmas com base no turno especificado.
     *
     * <p>Este método utiliza uma {@link Specification} para filtrar as turmas pelo turno fornecido
     * e retorna os resultados em uma página de objetos {@link ClassResponseDTO}.</p>
     *
     * @param shift O turno das turmas a serem filtradas (ex: "matutino", "vespertino", "noturno").
     * @param pageable Objeto {@link Pageable} que define a paginação e ordenação dos resultados.
     * @return Um objeto {@link Page} contendo uma lista paginada de {@link ClassResponseDTO}.
     */
    public Page<ClassResponseDTO> findClassPerShift(String shift, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasShift(shift);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    /**
     * Retorna uma lista paginada de turmas com base nos filtros avançados especificados.
     *
     * <p>Este método permite a filtragem das turmas utilizando múltiplos critérios de pesquisa,
     * incluindo ano, localização, curso e turno. Os filtros podem ser combinados conforme os parâmetros fornecidos.</p>
     *
     * @param year O ano das turmas a serem filtradas. Pode ser {@code null}.
     * @param location A localização das turmas a serem filtradas. Pode ser {@code null} ou vazio.
     * @param course O nome do curso das turmas a serem filtradas. Pode ser {@code null} ou vazio.
     * @param shift O turno das turmas a serem filtradas. Pode ser {@code null} ou vazio.
     * @param pageable Objeto {@link Pageable} que define a paginação e ordenação dos resultados.
     * @return Um objeto {@link Page} contendo uma lista paginada de {@link ClassResponseDTO}.
     * @throws RuntimeException Caso ocorra algum erro durante a execução da consulta.
     */
    public Page<ClassResponseDTO> getByAdvancedFiltration(Integer year, String location, String course, String shift, Pageable pageable) {
        Specification<ClassSchool> filtros = where(null);

        if (year != null) {
            filtros = filtros.and(ClassSpecification.hasYear(year));
        }
        if (location != null && !location.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasLocation(location));
        }
        if (course != null && !course.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasCourse(course));
        }
        if (shift != null && !shift.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasShift(shift));
        }

        return classRepository.findAll(filtros, pageable).map(ClassResponseDTO::new);
    }
}
