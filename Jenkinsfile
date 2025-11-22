pipeline {
    agent any

    parameters {
        string(name: 'VUS', defaultValue: '10', description: 'Number of virtual users')
        string(name: 'DURATION', defaultValue: '30s', description: 'Test duration')
    }

    environment {
        // Output file name for k6 JSON
        K6_OUTPUT = "k6-result.json"
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    credentialsId: 'github-ssh-key',
                    url: 'git@github.com:peterthx/k6-perf-test.git'
                )
            }
        }

        stage('Run k6 Performance Test') {
            steps {
                sh """
                    echo "Running k6 tests with ${VUS} VUs for ${DURATION} ..."
                    k6 run ./tests/load/dwh-k6-perf.js \
                        --vus ${VUS} \
                        --duration ${DURATION} \
                        --out json=${K6_OUTPUT}
                """
            }
        }

        stage('Generate Report') {
            steps {
                sh """
                    echo "Generating HTML report..."
                    k6-reporter ${K6_OUTPUT} --out k6-report.html
                """
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
