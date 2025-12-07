pipeline {
    agent any

    triggers {
        cron('H 5 * * *')
    }
    stages {
        stage('Checkout code'){
            steps {
                git branch:'main', url: 'https://github.com/peterthx/k6-perf-test.git'
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
