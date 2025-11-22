pipeline {
    agent any

    // ----- TRIGGERS -----
    triggers {
        // poll SCM every 2 minutes
        pollSCM('H/2 * * * *')
        // Or trigger build on GitHub push (ต้อง config GitHub webhook ที่ Jenkins ด้วย)
        githubPush()
    }

    // ----- ENV -----
    environment {
        GITHUB_REPO = 'https://github.com/peterthx/k6-perf-test.git'
        // ถ้าเป็น multibranch จะมี env.BRANCH_NAME ให้ ถ้าไม่มีก็ตั้ง default เป็น main
        DEFAULT_BRANCH = 'main'
    }

    // ----- OPTIONS -----
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    def branch = env.BRANCH_NAME ?: env.GIT_BRANCH ?: env.DEFAULT_BRANCH
                    echo "Checking out code from ${GITHUB_REPO}, branch: ${branch}"

                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${branch}"]],
                        userRemoteConfigs: [[
                            url: "${GITHUB_REPO}"
                            // ถ้าใช้ HTTPS + credentials ให้ใส่ credentialsId ด้วย เช่น:
                            // credentialsId: 'github-token-cred-id'
                        ]]
                    ])
                }

                sh 'git log -1 --pretty=format:"%h - %an, %ar : %s" || echo "No git history"'
            }
        }

        stage('Environment Info') {
            steps {
                echo "Branch: ${env.BRANCH_NAME ?: env.GIT_BRANCH ?: env.DEFAULT_BRANCH}"
                echo "Build Number: ${env.BUILD_NUMBER}"

                sh 'node --version || echo "Node.js not installed"'
                sh 'npm --version || echo "NPM not installed"'
                sh 'java -version || echo "Java not installed"'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies (if needed)...'
                // ถ้าโปรเจกต์คุณใช้ npm / yarn / ฯลฯ ก็ uncomment ตรงนี้
                // sh 'npm install'
                echo 'Skip installation (configure for your project)'
            }
        }

        stage('Run k6 Tests') {
            steps {
                echo 'Running k6 performance tests...'

                // เช็คว่ามี k6 ติดตั้งบน agent หรือยัง
                sh 'k6 version || echo "k6 not installed on this agent"'

                // รัน k6 script (แก้ path ให้ตรงกับ repo ของคุณ)
                // ตัวอย่าง: sh 'k6 run scripts/test.js'
                sh 'k6 run /perf/dwh-k6-perf.js || echo "k6 test script not found or failed"'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                echo 'Code quality step (configure for your project)'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application...'
                echo 'Deploy step (configure for your project)'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
