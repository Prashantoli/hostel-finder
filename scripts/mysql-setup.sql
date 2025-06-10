-- Create database
CREATE DATABASE IF NOT EXISTS hostel_finder;
USE hostel_finder;

-- Create hostels table
CREATE TABLE IF NOT EXISTS hostels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    type ENUM('Private', 'Shared', 'Dormitory', 'Single') NOT NULL,
    description TEXT NOT NULL,
    amenities JSON,
    images JSON,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    check_in_time TIME DEFAULT '14:00:00',
    check_out_time TIME DEFAULT '11:00:00',
    policies TEXT,
    capacity INT NOT NULL DEFAULT 1,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INT DEFAULT 0,
    availability BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_hostels_location ON hostels(location);
CREATE INDEX idx_hostels_price ON hostels(price);
CREATE INDEX idx_hostels_rating ON hostels(rating);
CREATE INDEX idx_hostels_type ON hostels(type);
CREATE INDEX idx_hostels_availability ON hostels(availability);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hostel_id INT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guests_count INT NOT NULL DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE
);

-- Create indexes for bookings
CREATE INDEX idx_bookings_hostel_id ON bookings(hostel_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_user_email ON bookings(user_email);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hostel_id INT NOT NULL,
    booking_id INT,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- Create indexes for reviews
CREATE INDEX idx_reviews_hostel_id ON reviews(hostel_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_user_email ON reviews(user_email);
