-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    hostel_id INTEGER REFERENCES hostels(id) ON DELETE CASCADE,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE SET NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for reviews
CREATE INDEX IF NOT EXISTS idx_reviews_hostel_id ON reviews(hostel_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_user_email ON reviews(user_email);

-- Function to update hostel rating when reviews are added/updated
CREATE OR REPLACE FUNCTION update_hostel_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE hostels 
    SET 
        rating = (
            SELECT ROUND(AVG(rating::numeric), 2) 
            FROM reviews 
            WHERE hostel_id = COALESCE(NEW.hostel_id, OLD.hostel_id)
        ),
        reviews_count = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE hostel_id = COALESCE(NEW.hostel_id, OLD.hostel_id)
        )
    WHERE id = COALESCE(NEW.hostel_id, OLD.hostel_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create triggers to update hostel rating
CREATE TRIGGER update_hostel_rating_on_insert
    AFTER INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_hostel_rating();

CREATE TRIGGER update_hostel_rating_on_update
    AFTER UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_hostel_rating();

CREATE TRIGGER update_hostel_rating_on_delete
    AFTER DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_hostel_rating();
