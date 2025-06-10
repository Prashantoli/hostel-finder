-- Insert sample hostels data
USE hostel_finder;

INSERT INTO hostels (
    name, location, address, price, type, description, amenities, images,
    contact_email, contact_phone, check_in_time, check_out_time, policies, capacity
) VALUES 
(
    'Downtown Backpackers Hostel',
    'Kathmandu',
    'Thamel, Kathmandu 44600, Nepal',
    2500.00,
    'Dormitory',
    'A vibrant hostel in the heart of Kathmandu with modern facilities and friendly staff.',
    '["WiFi", "Breakfast", "Common Area", "Parking", "24/7 Reception"]',
    '["/placeholder.svg?height=200&width=300"]',
    'info@downtownhostel.com',
    '+977-1-4441234',
    '14:00:00',
    '11:00:00',
    'No smoking inside. Quiet hours from 10 PM to 7 AM. Check-in after 2 PM.',
    20
),
(
    'Heritage Corner Hostel',
    'Bhaktapur',
    'Durbar Square, Bhaktapur 44800, Nepal',
    3200.00,
    'Private',
    'Traditional hostel in historic Bhaktapur with authentic Newari architecture.',
    '["WiFi", "Common Area", "Kitchen", "Cultural Tours", "Heritage Views"]',
    '["/placeholder.svg?height=200&width=300"]',
    'contact@heritagecorner.com',
    '+977-1-6661234',
    '15:00:00',
    '10:00:00',
    'Respect local culture. No loud music. Traditional breakfast available.',
    8
),
(
    'Patan Cultural Hostel',
    'Lalitpur',
    'Patan Durbar Square, Lalitpur 44700, Nepal',
    2800.00,
    'Shared',
    'Perfect location in Lalitpur with easy access to Patan Durbar Square.',
    '["WiFi", "Cultural Tours", "Common Area", "Breakfast", "Art Gallery"]',
    '["/placeholder.svg?height=200&width=300"]',
    'hello@patanhostel.com',
    '+977-1-5551234',
    '14:00:00',
    '11:00:00',
    'Cultural sensitivity required. Photography restrictions in certain areas.',
    12
),
(
    'Mountain View Lodge',
    'Kathmandu',
    'Nagarkot Road, Kathmandu 44600, Nepal',
    2200.00,
    'Dormitory',
    'Budget-friendly hostel in Kathmandu with stunning Himalayan views.',
    '["WiFi", "Mountain Views", "Common Area", "Parking", "Trekking Info"]',
    '["/placeholder.svg?height=200&width=300"]',
    'stay@mountainview.com',
    '+977-1-4442345',
    '13:00:00',
    '12:00:00',
    'Early morning mountain views. Trekking equipment rental available.',
    25
);

-- Insert sample reviews
INSERT INTO reviews (hostel_id, user_email, user_name, rating, comment) VALUES
(1, 'john@example.com', 'John Doe', 5, 'Amazing location in Thamel! Staff was very helpful.'),
(1, 'sarah@example.com', 'Sarah Smith', 4, 'Clean rooms and great breakfast. Would recommend!'),
(2, 'mike@example.com', 'Mike Johnson', 5, 'Beautiful traditional architecture. Loved the cultural experience.'),
(3, 'emma@example.com', 'Emma Wilson', 4, 'Great access to Patan Durbar Square. Very convenient location.'),
(4, 'david@example.com', 'David Brown', 5, 'Incredible mountain views! Perfect for trekkers.');

-- Update hostel ratings based on reviews
UPDATE hostels h SET 
    rating = (
        SELECT ROUND(AVG(r.rating), 2) 
        FROM reviews r 
        WHERE r.hostel_id = h.id
    ),
    reviews_count = (
        SELECT COUNT(*) 
        FROM reviews r 
        WHERE r.hostel_id = h.id
    );
