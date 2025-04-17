/*
  # Initial Schema Setup for Cybersecurity Education Platform

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to auth.users
    - `simulations`
      - Stores available cybersecurity simulations
      - Includes difficulty levels and categories
    - `simulation_progress`
      - Tracks user progress in simulations
      - Records completion status and scores
    - `phishing_analyses`
      - Stores history of email phishing analyses
      - Links analyses to users
    - `learning_resources`
      - Stores educational resources and materials
      - Includes categories and difficulty levels

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure access to user-specific data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create simulations table
CREATE TABLE IF NOT EXISTS simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  category text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create simulation progress table
CREATE TABLE IF NOT EXISTS simulation_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  simulation_id uuid REFERENCES simulations(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  score integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, simulation_id)
);

-- Create phishing analyses table
CREATE TABLE IF NOT EXISTS phishing_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  email_content text NOT NULL,
  risk_level text NOT NULL CHECK (risk_level IN ('high', 'low')),
  analysis_result text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create learning resources table
CREATE TABLE IF NOT EXISTS learning_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('Guide', 'Course', 'Certification')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE phishing_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Simulations policies
CREATE POLICY "Simulations are viewable by all authenticated users"
  ON simulations FOR SELECT
  TO authenticated
  USING (true);

-- Simulation progress policies
CREATE POLICY "Users can view their own progress"
  ON simulation_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON simulation_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress records"
  ON simulation_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Phishing analyses policies
CREATE POLICY "Users can view their own analyses"
  ON phishing_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create new analyses"
  ON phishing_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Learning resources policies
CREATE POLICY "Learning resources are viewable by all authenticated users"
  ON learning_resources FOR SELECT
  TO authenticated
  USING (true);