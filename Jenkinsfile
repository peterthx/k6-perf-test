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
        
        stage('Run K6 Load Test') {
            steps {
                sh """
                    k6 run \
                    --vus ${params.VUS} \
                    --duration ${params.DURATION} \
                    --out json=results.json \
                    --out influxdb=http://influxdb:8086/k6 \
                    test.js
                """
            }
        }
        
        stage('Publish Results') {
            steps {
                publishHTML([
                    reportDir: '.',
                    reportFiles: 'results.html',
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