pipeline {
    agent any
    environment {
        SECRET_KEY = credentials('K6_SECRET_KEY')
    }
    triggers {
        cron('H 5 * * *')
    }
    stages {
        stage('Build') {
            steps {
                echo "Building..."
                sh "npm install"
                sh "npx webpack"
            }
        }
        stage('Checkout code'){
            git branch: 'main', url: 'https://github.com/peterthx/k6-perf-test.git'
        }
        stage('Test'){
            echo 'Running Tests...'
            sh 'k6 run dist/dwh-k6-perf.bundle.js'
        }
    }
}