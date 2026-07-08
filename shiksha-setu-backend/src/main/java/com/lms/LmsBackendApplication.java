package com.lms;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lms.entity.User;
import com.lms.service.UserService;
import com.lms.utility.Constants.ActiveStatus;
import com.lms.utility.Constants.UserRole;

@SpringBootApplication
public class LmsBackendApplication implements CommandLineRunner {

	private final Logger LOG = LoggerFactory.getLogger(LmsBackendApplication.class);

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(LmsBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		LOG.info("🚀 Shiksha Setu Backend Application Started Successfully!");
		LOG.info("📚 API Documentation: http://localhost:8080/swagger-ui.html");
		LOG.info("🔍 Health Check: http://localhost:8080/actuator/health");

		// Check if admin exists, if not create default admin
		User admin = this.userService.getUserByEmailIdAndRoleAndStatus(
				"admin@shiksha-setu.com",
				UserRole.ROLE_ADMIN.value(),
				ActiveStatus.ACTIVE.value()
		);

		if (admin == null) {
			LOG.info("👤 Admin not found in system, creating default admin...");

			User user = new User();
			user.setFirstName("Admin");
			user.setLastName("User");
			user.setEmailId("admin@shiksha-setu.com");
			user.setPassword(passwordEncoder.encode("admin123"));
			user.setRole(UserRole.ROLE_ADMIN.value());
			user.setStatus(ActiveStatus.ACTIVE.value());
			user.setPhoneNo("9999999999");
			user.setAmount(BigDecimal.ZERO);

			User savedAdmin = this.userService.addUser(user);
			if (savedAdmin != null) {
				LOG.info("✅ Default admin created successfully!");
				LOG.info("📧 Email: admin@shiksha-setu.com");
				LOG.info("🔑 Password: admin123");
				LOG.info("👤 Role: {}", savedAdmin.getRole());
				LOG.info("📱 Phone: {}", savedAdmin.getPhoneNo());
			} else {
				LOG.error("❌ Failed to create default admin!");
			}
		} else {
			LOG.info("✅ Admin user already exists in the system");
			LOG.info("📧 Email: {}", admin.getEmailId());
			LOG.info("👤 Role: {}", admin.getRole());
		}

		LOG.info("🎓 Shiksha Setu - Learning Management System is ready!");
	}
}