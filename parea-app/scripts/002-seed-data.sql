-- Données de test pour Parea

-- Insertion de profils de test (nécessite des utilisateurs authentifiés)
-- Ces données seront créées via l'interface d'inscription

-- Plans d'abonnement de référence
CREATE TABLE subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  interval_type TEXT CHECK (interval_type IN ('month', 'year')) NOT NULL,
  features JSONB NOT NULL,
  is_popular BOOLEAN DEFAULT FALSE
);

INSERT INTO subscription_plans (id, name, price, interval_type, features, is_popular) VALUES
('free', 'Gratuit', 0.00, 'month', '["Calendrier basique", "Messages simples", "3 souvenirs/mois"]', false),
('monthly', 'Premium Mensuel', 9.99, 'month', '["Calendrier avancé", "IA bienveillante", "Dépenses illimitées", "Souvenirs illimités", "Export PDF", "Support prioritaire"]', false),
('annual', 'Premium Annuel', 99.99, 'year', '["Calendrier avancé", "IA bienveillante", "Dépenses illimitées", "Souvenirs illimités", "Export PDF", "Support prioritaire", "2 mois offerts"]', true);
