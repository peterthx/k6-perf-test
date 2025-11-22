pipeline {
    agent any

    // Triggers: enable one of the following as appropriate for your Jenkins setup
    triggers {
        // pollSCM('H/15 * * * *') // polling (not recommended if webhooks are available)
        // githubPush() // enable when GitHub webhook is configured
    }

    environment {
        GITHUB_REPO = 'https://github.com/peterthx/k6-perf-test.git'
        BRANCH_NAME = "${env.BRANCH_NAME ?: env.GIT_BRANCH ?: 'main'}"
        K6_OUTPUT = 'results.json'
    }

    parameters {
        string(name: 'VUS', defaultValue: '10', description: 'Number of virtual users')
        string(name: 'DURATION', defaultValue: '30s', description: 'Test duration')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out ${env.BRANCH_NAME} from ${env.GITHUB_REPO}"
                script {
                    if (binding.hasVariable('scm') && scm) {
                        checkout scm
                    } else {
                        // Fallback to the git step; provide credentialsId if required
                        git url: env.GITHUB_REPO, branch: env.BRANCH_NAME, credentialsId: 'github-ssh-key'
                    }
                }
                sh 'git log -1 --pretty=format:"%h - %an, %ar : %s" || true'
            }
        }

        stage('Run k6 Performance Test') {
            steps {
                sh """
                    echo "Running k6 tests (vus=${params.VUS}, duration=${params.DURATION})"
                    k6 run --vus ${params.VUS} --duration ${params.DURATION} --out json=${env.K6_OUTPUT} ./perf/dwh-k6-perf.js
                """
            }
        }

        stage('Generate Report') {
            steps {
                sh """
                    echo "Generating HTML report from ${env.K6_OUTPUT}"
                    if command -v k6-reporter >/dev/null 2>&1; then
                      k6-reporter ${env.K6_OUTPUT} --out k6-report.html
                    else
                      echo 'k6-reporter not installed; skipping report generation'
                    fi
                """
            }
        }

        stage('Publish Results') {
            steps {
                publishHTML([
                    reportDir: '.',
                    reportFiles: 'k6-report.html',
                    reportName: 'K6 Performance Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    post {
        success {
            echo 'K6 tests completed successfully.'
        }
        failure {
            echo 'K6 tests failed. Check console output and the report.'
        }
        always {
            cleanWs()
        }
    }
}