package net.weg.avaliaMais.service.user;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.model.dto.request.AdminPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.AdminResponseDTO;
import net.weg.avaliaMais.model.user.Admin;
import net.weg.avaliaMais.repository.user.AdminRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final AuthUserRepository authUserRepository;

    public AdminResponseDTO addAdmin(AdminPostRequestDTO dto) {
        Admin admin = dto.converter(authUserRepository);
        Admin savedAdmin = adminRepository.save(admin);
        return savedAdmin.toDto();
    }

    public Page<AdminResponseDTO> findAllAdmins(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return adminRepository.findAll(pageable).map(AdminResponseDTO::new);
    }

    public AdminResponseDTO findAdminById(UUID id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado com ID: " + id));
        return admin.toDto();
    }

    public void deleteAdmin(UUID id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado com ID: " + id));
        adminRepository.delete(admin);
    }

}
