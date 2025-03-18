package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;
import java.util.UUID;

public record ClassPostRequestDTO(
        UUID courseUuid,
        List<UUID> studentIds,
        List<UUID> teacherIds,
        String nameClass,
        Double workloadClass,
        Double time,
        Integer quantityStudents,
        String shift
) {

    public ClassSchool converter(List<Course> allCourses, List<Student> allStudents, List<Teacher> allTeachers) {


        Course course = allCourses.stream().filter(c -> c.getUuid().equals(courseUuid)).findFirst().orElseThrow(() -> new RuntimeException("Course not found"));


        List<Student> studentsList = allStudents.stream().filter(student -> studentIds.contains(student.getUuid())).toList();


        List<Teacher> teachersList = allTeachers.stream().filter(teacher -> teacherIds.contains(teacher.getUuid())).toList();

        return ClassSchool.builder().uuid_course(course).students(studentsList).teachers(teachersList).nameClass(nameClass).workloadClass(workloadClass).time(time).quantityStudents(quantityStudents).shift(shift).build();
    }
}
