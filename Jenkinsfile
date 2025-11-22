pipeline {
    agent any

    triggers {
        // Poll GitHub every 1 minute for changes
        pollSCM('H/1 * * * *')
        // OR use GitHub webhook (recommended - comment out pollSCM if using webhook)
        githubPush()
    }
    
    parameters {
        string(name: 'VUS', defaultValue: '10', description: 'Number of virtual users')
        string(name: 'DURATION', defaultValue: '30s', description: 'Test duration')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                credentialsId: 'github-ssh-key',
                url: 'https://github.com/peterthx/k6-perf-test.git'
            }
        }
        
      
        stage('Run k6 Performance Test') {
            steps {
                sh '''
                    echo "Running k6 tests..."
                    k6 run --out json=${K6_OUTPUT} ./tests/load/dwh-k6-perf.js
                '''
            }
        }

        stage('Generate Report') {
            steps {
                sh '''
                    echo "Generating HTML report..."
                    k6-reporter ${K6_OUTPUT} --out k6-report.html
                '''
            }
        }
        
        stage('Publish Results') {
            steps {
                publishHTML([
                    reportDir: '.',
                    reportFiles: 'k6-report.html',
                    reportName: 'K6 Performance Report'
                ])
            }
        }
    }
    
    post {
        success {
            echo 'K6 tests passed!'
        }
        failure {
            echo 'K6 tests failed!'
        }
    }
}