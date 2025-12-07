pipeline {
    agent any
    environment {
        SECRET_KEY = credentials('K6_SECRET_KEY')
    }
    triggers {
        cron('H 5 * * *')
    }
    stages {
        stage('Checkout code'){
            steps {
                git branch: "${env.BRANCH_NAME}", url: 'https://github.com/peterthx/k6-perf-test.git'
            }
        }
        stage('Build') {
            steps {
                sh "npm install"
                sh "npx webpack"
            }
        }
        stage('Test'){
            steps {
                sh 'k6 run dist/dwh-k6-perf.bundle.js'
            }
        }
    }
}