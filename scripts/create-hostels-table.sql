-- Create hostels table
CREATE TABLE IF NOT EXISTS hostels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Private', 'Shared', 'Dormitory', 'Single')),
    description TEXT NOT NULL,
    amenities TEXT[], -- Array of amenities
    images TEXT[], -- Array of image URLs
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    check_in_time TIME DEFAULT '14:00',
    check_out_time TIME DEFAULT '11:00',
    policies TEXT,
    capacity INTEGER NOT NULL DEFAULT 1,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    availability BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_hostels_location ON hostels(location);
CREATE INDEX IF NOT EXISTS idx_hostels_price ON hostels(price);
CREATE INDEX IF NOT EXISTS idx_hostels_rating ON hostels(rating);
CREATE INDEX IF NOT EXISTS idx_hostels_type ON hostels(type);
CREATE INDEX IF NOT EXISTS idx_hostels_availability ON hostels(availability);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hostels_updated_at 
    BEFORE UPDATE ON hostels 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
