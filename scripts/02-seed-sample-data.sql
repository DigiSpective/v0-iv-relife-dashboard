-- Sample data for IV Therapy Management System
-- This script populates the database with sample data for testing

-- Insert sample IV protocols
INSERT INTO iv_protocols (name, description, medication_name, dosage, infusion_rate, duration_minutes, contraindications, side_effects, monitoring_requirements) VALUES
('Vitamin C Immune Boost', 'High-dose vitamin C infusion for immune system support', 'Ascorbic Acid', '25g in 250ml Normal Saline', '125ml/hr', 120, ARRAY['G6PD deficiency', 'Kidney stones history'], ARRAY['Mild nausea', 'Injection site irritation'], ARRAY['Monitor vital signs every 15 minutes', 'Check for allergic reactions']),
('Myers Cocktail', 'Nutrient cocktail for energy and wellness', 'Multi-vitamin/mineral complex', 'Standard Myers formula', '100ml/hr', 90, ARRAY['Severe kidney disease'], ARRAY['Metallic taste', 'Warm sensation'], ARRAY['Monitor blood pressure', 'Assess patient comfort']),
('Hydration Therapy', 'Basic hydration with electrolyte balance', 'Normal Saline with electrolytes', '1000ml', '200ml/hr', 60, ARRAY['Congestive heart failure', 'Severe edema'], ARRAY['Fluid overload'], ARRAY['Monitor fluid balance', 'Check for swelling']),
('NAD+ Therapy', 'Cellular regeneration and energy boost', 'Nicotinamide Adenine Dinucleotide', '500mg in 500ml Normal Saline', '83ml/hr', 360, ARRAY['Pregnancy', 'Severe cardiac conditions'], ARRAY['Chest tightness', 'Nausea'], ARRAY['Continuous monitoring', 'Slow infusion rate']),
('Glutathione Detox', 'Antioxidant therapy for detoxification', 'Glutathione', '2000mg in 100ml Normal Saline', '50ml/hr', 120, ARRAY['Asthma (use caution)'], ARRAY['Mild headache', 'Fatigue'], ARRAY['Monitor respiratory status', 'Check liver function']);

-- Insert sample staff
INSERT INTO staff (first_name, last_name, email, phone, role, license_number, certifications, hire_date) VALUES
('Sarah', 'Johnson', 'sarah.johnson@ivrelife.com', '555-0101', 'nurse', 'RN123456', ARRAY['IV Therapy Certified', 'BLS'], '2023-01-15'),
('Dr. Michael', 'Chen', 'michael.chen@ivrelife.com', '555-0102', 'doctor', 'MD789012', ARRAY['Internal Medicine Board Certified', 'IV Therapy Specialist'], '2022-06-01'),
('Lisa', 'Rodriguez', 'lisa.rodriguez@ivrelife.com', '555-0103', 'nurse', 'RN345678', ARRAY['IV Therapy Certified', 'ACLS'], '2023-03-20'),
('James', 'Wilson', 'james.wilson@ivrelife.com', '555-0104', 'technician', 'MT901234', ARRAY['Medical Assistant Certified'], '2023-05-10'),
('Amanda', 'Davis', 'amanda.davis@ivrelife.com', '555-0105', 'admin', NULL, ARRAY['Healthcare Administration'], '2022-12-01');

-- Insert sample patients
INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, medical_record_number, allergies, medical_conditions, current_medications, emergency_contact, address) VALUES
('John', 'Smith', '1985-03-15', 'male', '555-1001', 'john.smith@email.com', 'MR001', ARRAY['Penicillin'], ARRAY['Hypertension'], '{"medications": [{"name": "Lisinopril", "dosage": "10mg daily"}]}', '{"name": "Jane Smith", "relationship": "spouse", "phone": "555-1002"}', '{"street": "123 Main St", "city": "Anytown", "state": "CA", "zip": "12345"}'),
('Emily', 'Brown', '1990-07-22', 'female', '555-1003', 'emily.brown@email.com', 'MR002', ARRAY[], ARRAY['Chronic fatigue'], '{"medications": []}', '{"name": "Robert Brown", "relationship": "husband", "phone": "555-1004"}', '{"street": "456 Oak Ave", "city": "Anytown", "state": "CA", "zip": "12346"}'),
('Robert', 'Taylor', '1978-11-08', 'male', '555-1005', 'robert.taylor@email.com', 'MR003', ARRAY['Shellfish'], ARRAY['Diabetes Type 2'], '{"medications": [{"name": "Metformin", "dosage": "500mg twice daily"}]}', '{"name": "Susan Taylor", "relationship": "wife", "phone": "555-1006"}', '{"street": "789 Pine St", "city": "Anytown", "state": "CA", "zip": "12347"}'),
('Maria', 'Garcia', '1995-02-14', 'female', '555-1007', 'maria.garcia@email.com', 'MR004', ARRAY[], ARRAY[], '{"medications": []}', '{"name": "Carlos Garcia", "relationship": "brother", "phone": "555-1008"}', '{"street": "321 Elm Dr", "city": "Anytown", "state": "CA", "zip": "12348"}'),
('David', 'Lee', '1982-09-30', 'male', '555-1009', 'david.lee@email.com', 'MR005', ARRAY['Latex'], ARRAY['Anxiety'], '{"medications": [{"name": "Sertraline", "dosage": "50mg daily"}]}', '{"name": "Linda Lee", "relationship": "mother", "phone": "555-1010"}', '{"street": "654 Maple Ln", "city": "Anytown", "state": "CA", "zip": "12349"}');

-- Insert sample inventory
INSERT INTO inventory (item_name, item_type, sku, current_stock, minimum_stock, unit_cost, supplier, expiration_date, lot_number, storage_requirements) VALUES
('Normal Saline 250ml', 'supplies', 'NS250', 150, 50, 2.50, 'MedSupply Co', '2025-12-31', 'LOT2024001', 'Room temperature'),
('Normal Saline 500ml', 'supplies', 'NS500', 200, 75, 3.75, 'MedSupply Co', '2025-12-31', 'LOT2024002', 'Room temperature'),
('Ascorbic Acid 25g', 'medication', 'VITC25', 30, 10, 45.00, 'PharmaCorp', '2025-06-30', 'LOT2024003', 'Refrigerated'),
('Myers Cocktail Mix', 'medication', 'MYERS', 25, 8, 65.00, 'PharmaCorp', '2025-08-15', 'LOT2024004', 'Refrigerated'),
('NAD+ 500mg', 'medication', 'NAD500', 15, 5, 125.00, 'BioMed Solutions', '2025-04-20', 'LOT2024005', 'Frozen'),
('Glutathione 2000mg', 'medication', 'GLUT2000', 20, 8, 85.00, 'PharmaCorp', '2025-07-10', 'LOT2024006', 'Refrigerated'),
('IV Catheter 20G', 'supplies', 'CATH20', 500, 100, 1.25, 'MedDevice Inc', '2026-01-15', 'LOT2024007', 'Room temperature'),
('IV Tubing Set', 'supplies', 'TUBE001', 300, 75, 3.50, 'MedDevice Inc', '2026-03-20', 'LOT2024008', 'Room temperature'),
('Alcohol Prep Pads', 'supplies', 'ALCO100', 1000, 200, 0.15, 'CleanMed', '2025-11-30', 'LOT2024009', 'Room temperature'),
('Gauze Pads 2x2', 'supplies', 'GAUZE22', 800, 150, 0.25, 'MedSupply Co', '2026-02-28', 'LOT2024010', 'Room temperature');

-- Insert sample appointments (next 30 days)
INSERT INTO appointments (patient_id, staff_id, protocol_id, appointment_date, duration_minutes, status, notes) VALUES
((SELECT id FROM patients WHERE medical_record_number = 'MR001'), (SELECT id FROM staff WHERE email = 'sarah.johnson@ivrelife.com'), (SELECT id FROM iv_protocols WHERE name = 'Vitamin C Immune Boost'), NOW() + INTERVAL '1 day', 120, 'scheduled', 'First-time patient, monitor closely'),
((SELECT id FROM patients WHERE medical_record_number = 'MR002'), (SELECT id FROM staff WHERE email = 'lisa.rodriguez@ivrelife.com'), (SELECT id FROM iv_protocols WHERE name = 'Myers Cocktail'), NOW() + INTERVAL '2 days', 90, 'scheduled', 'Regular patient, no issues'),
((SELECT id FROM patients WHERE medical_record_number = 'MR003'), (SELECT id FROM staff WHERE email = 'sarah.johnson@ivrelife.com'), (SELECT id FROM iv_protocols WHERE name = 'Hydration Therapy'), NOW() + INTERVAL '3 days', 60, 'scheduled', 'Pre-diabetic monitoring required'),
((SELECT id FROM patients WHERE medical_record_number = 'MR004'), (SELECT id FROM staff WHERE email = 'lisa.rodriguez@ivrelife.com'), (SELECT id FROM iv_protocols WHERE name = 'NAD+ Therapy'), NOW() + INTERVAL '5 days', 360, 'scheduled', 'Long session, ensure comfort'),
((SELECT id FROM patients WHERE medical_record_number = 'MR005'), (SELECT id FROM staff WHERE email = 'sarah.johnson@ivrelife.com'), (SELECT id FROM iv_protocols WHERE name = 'Glutathione Detox'), NOW() + INTERVAL '7 days', 120, 'scheduled', 'Check for respiratory issues');

-- Insert some completed IV sessions for analytics
INSERT INTO iv_sessions (patient_id, protocol_id, staff_id, scheduled_at, started_at, completed_at, status, vital_signs_before, vital_signs_after, notes, patient_response) VALUES
((SELECT id FROM patients WHERE medical_record_number = 'MR001'), (SELECT id FROM iv_protocols WHERE name = 'Myers Cocktail'), (SELECT id FROM staff WHERE email = 'sarah.johnson@ivrelife.com'), NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days' + INTERVAL '90 minutes', 'completed', '{"bp": "120/80", "hr": "72", "temp": "98.6", "o2sat": "98"}', '{"bp": "118/78", "hr": "70", "temp": "98.4", "o2sat": "99"}', 'Session completed without complications', 'Patient reported increased energy'),
((SELECT id FROM patients WHERE medical_record_number = 'MR002'), (SELECT id FROM iv_protocols WHERE name = 'Vitamin C Immune Boost'), (SELECT id FROM staff WHERE email = 'lisa.rodriguez@ivrelife.com'), NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '120 minutes', 'completed', '{"bp": "115/75", "hr": "68", "temp": "98.8", "o2sat": "97"}', '{"bp": "112/72", "hr": "66", "temp": "98.6", "o2sat": "98"}', 'Smooth infusion, no adverse reactions', 'Patient felt well, no side effects'),
((SELECT id FROM patients WHERE medical_record_number = 'MR003'), (SELECT id FROM iv_protocols WHERE name = 'Hydration Therapy'), (SELECT id FROM staff WHERE email = 'sarah.johnson@ivrelife.com'), NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '60 minutes', 'completed', '{"bp": "135/85", "hr": "78", "temp": "99.0", "o2sat": "96"}', '{"bp": "128/82", "hr": "74", "temp": "98.7", "o2sat": "97"}', 'Good hydration achieved', 'Patient reported feeling refreshed');
