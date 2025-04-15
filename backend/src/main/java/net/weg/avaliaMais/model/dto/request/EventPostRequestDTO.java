package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.user.Teacher;

import java.util.List;

/**
 * DTO para representar os dados necessários para a criação de um evento.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de criar um evento no sistema.
 */
public record EventPostRequestDTO(

        /**
         * Nome do evento.
         * <p>
         * Este campo representa o nome do evento.
         */
        String name,

        /**
         * Descrição do evento.
         * <p>
         * Este campo descreve os detalhes do evento, incluindo o objetivo e as atividades realizadas.
         */
        String description,

        /**
         * Data do evento.
         * <p>
         * Este campo representa a data em que o evento ocorrerá.
         */
        String date,

        /**
         * Lista de turmas associadas ao evento.
         * <p>
         * Este campo contém as turmas que estarão envolvidas no evento.
         */
        List<ClassSchool> classes,

        /**
         * Lista de professores envolvidos no evento.
         * <p>
         * Este campo contém os professores que estarão presentes ou envolvidos no evento.
         */
        List<Teacher> teachers,

        /**
         * Lista de cursos relacionados ao evento.
         * <p>
         * Este campo contém os cursos vinculados ao evento em questão.
         */
        List<Course> courses,

        /**
         * Status do evento.
         * <p>
         * Este campo indica o status atual do evento, como 'Ativo', 'Concluído', etc.
         */
        String status,

        /**
         * Etapa do evento.
         * <p>
         * Este campo descreve a etapa atual do evento, como 'Planejamento', 'Execução', etc.
         */
        String step
) {

}
