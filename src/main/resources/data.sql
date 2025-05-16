-- 👤 Utilisateurs de test
INSERT INTO user (id, username, password, role) VALUES (1, 'user1', 'pass1', 'USER');
INSERT INTO user (id, username, password, role) VALUES (2, 'admin', 'adminpass', 'ADMIN');

-- 💳 Bons d'achat
INSERT INTO voucher (id, code, used, expiration_date) VALUES (1, 'ABC123', false, '2025-12-31');
INSERT INTO voucher (id, code, used, expiration_date) VALUES (2, 'FREE100', false, '2025-06-30');

-- 📦 Offres d’hébergement mutualisé
INSERT INTO service_offer (id, name, type, space, traffic, db, features) VALUES
(1, 'Starter', 'mutualise', '10 Go', '100 Go', 1, '1 domaine, PHP'),
(2, 'Standard', 'mutualise', '25 Go', '250 Go', 3, '3 domaines, PHP+Node'),
(3, 'Premium', 'mutualise', '50 Go', '500 Go', 5, 'SSL, backups');

-- 🖥️ VPS standards
INSERT INTO service_offer (id, name, type, space, traffic, db, features) VALUES
(4, 'VPS S1', 'vps', '25 Go', '200 Go', 0, '1 vCPU, 2Go RAM, IP dédiée'),
(5, 'VPS S2', 'vps', '50 Go', '400 Go', 0, '2 vCPU, 4Go RAM, IP dédiée'),
(6, 'VPS P1', 'vps-performance', '100 Go', '1 To', 0, 'CPU haute fréquence, NVMe');

-- 📝 Exemple de commande (Order)
INSERT INTO orders (id, os, machine_name, ip, active, date, user_id, service_id, voucher_id)
VALUES (1, 'Debian', 'vps-user1', '192.168.0.101', true, '2025-05-12', 1, 4, 1);
