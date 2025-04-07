package net.weg.avaliaMais.model.dto.request;

import lombok.Data;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;

public record EventPostRequestDTO(
        String name,
        String description,
        String date,
        List<ClassSchool> classes,
        List<Teacher> teachers,
        List<Course> courses,
        String status,
        String step
) { }
