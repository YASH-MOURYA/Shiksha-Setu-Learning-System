package com.lms.config;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.lms.entity.Address;
import com.lms.entity.Category;
import com.lms.entity.User;
import com.lms.service.AddressService;
import com.lms.service.CategoryService;
import com.lms.service.UserService;
import com.lms.utility.Constants.ActiveStatus;
import com.lms.utility.Constants.UserRole;

@Component
@Order(2)
public class SimpleDataInitializer implements CommandLineRunner {

    private final Logger LOG = LoggerFactory.getLogger(SimpleDataInitializer.class);

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        LOG.info("🎯 Initializing basic sample data...");

        try {
            // Create basic categories
            createBasicCategories();
            
            // Create sample users
            createSampleUsers();

            LOG.info("✅ Basic sample data initialization completed!");
        } catch (Exception e) {
            LOG.warn("⚠️ Sample data initialization failed: {}", e.getMessage());
        }
    }

    private void createBasicCategories() {
        String[] categoryData = {
            "Web Development", "Learn to build modern websites and web applications",
            "Data Science", "Master data analysis, machine learning, and AI",
            "Mobile Development", "Create mobile apps for iOS and Android",
            "UI/UX Design", "Design beautiful and user-friendly interfaces"
        };

        for (int i = 0; i < categoryData.length; i += 2) {
            try {
                final String categoryName = categoryData[i];
                final String categoryDescription = categoryData[i + 1];
                
                // Check if category exists by trying to get categories with active status
                List<Category> existingCategories = categoryService.getCategoriesByStatusIn(
                    Arrays.asList(ActiveStatus.ACTIVE.value())
                );
                
                boolean categoryExists = existingCategories.stream()
                    .anyMatch(cat -> cat.getName().equals(categoryName));

                if (!categoryExists) {
                    Category category = new Category();
                    category.setName(categoryName);
                    category.setDescription(categoryDescription);
                    category.setStatus(ActiveStatus.ACTIVE.value());
                    
                    categoryService.addCategory(category);
                    LOG.info("📂 Created category: {}", categoryName);
                }
            } catch (Exception e) {
                LOG.warn("Category creation failed for: {} - {}", categoryData[i], e.getMessage());
            }
        }
    }

    private void createSampleUsers() {
        // Create sample mentor
        createSampleUser("John", "Mentor", "mentor@shiksha-setu.com", "mentor123", UserRole.ROLE_MENTOR);
        
        // Create sample student  
        createSampleUser("Jane", "Student", "student@shiksha-setu.com", "student123", UserRole.ROLE_STUDENT);
    }

    private void createSampleUser(String firstName, String lastName, String email, String password, UserRole role) {
        try {
            User existingUser = userService.getUserByEmailAndStatus(email, ActiveStatus.ACTIVE.value());
            if (existingUser == null) {
                // Create address first
                Address address = new Address();
                address.setStreet("123 Sample Street");
                address.setCity("Sample City");
                address.setPincode(12345); // int type
                Address savedAddress = addressService.addAddress(address);

                if (savedAddress != null) {
                    // Create user
                    User user = new User();
                    user.setFirstName(firstName);
                    user.setLastName(lastName);
                    user.setEmailId(email);
                    user.setPassword(passwordEncoder.encode(password));
                    user.setRole(role.value());
                    user.setStatus(ActiveStatus.ACTIVE.value());
                    user.setPhoneNo("9999999999");
                    user.setAmount(BigDecimal.ZERO);
                    user.setAddress(savedAddress);

                    User savedUser = userService.addUser(user);
                    if (savedUser != null) {
                        LOG.info("👤 Created sample {}: {}", role.value(), email);
                    }
                }
            }
        } catch (Exception e) {
            LOG.warn("Failed to create sample user: {} - {}", email, e.getMessage());
        }
    }
}