pipeline {
    agent any
    {
        triggers {
            // poll SCM every 2 minutes
            pollSCM('H/2 * * * *')
            // Or Trigger build on GitHub push
           // githubPush()
        }
    }
    
    environment {
        // Define environment variables
        GITHUB_REPO = 'https://github.com/peterthx/k6-perf-test.git'
        BRANCH_NAME = "${env.GIT_BRANCH}"
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
    }
    
    options {
        // Keep last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Timeout for the entire pipeline
        timeout(time: 1, unit: 'HOURS')
        // Disable concurrent builds
        disableConcurrentBuilds()
    }
    triggers {
        githubPush()
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_NAME}"]], userRemoteConfigs: [[url: "${GITHUB_REPO}"]]])
                sh 'git log -1 --pretty=format:"%h - %an, %ar : %s"'
            }
        }
        
        stage('Environment Info') {
            steps {
                echo "Branch: ${BRANCH_NAME}"
                echo "Build Number: ${BUILD_NUMBER}"
                sh 'node --version || echo "Node.js not installed"'
                sh 'npm --version || echo "NPM not installed"'
                sh 'java -version || echo "Java not installed"'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                // Uncomment the line that matches your project type
                // sh 'npm install'                    // For Node.js
                // sh 'mvn clean install'              // For Maven
                // sh 'gradle build'                   // For Gradle
                // sh 'pip install -r requirements.txt' // For Python
                echo 'Skip installation (configure for your project)'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Uncomment the line that matches your project type
                // sh 'npm run build'                  // For Node.js
                // sh 'mvn package'                    // For Maven
                // sh 'gradle build'                   // For Gradle
                // sh 'python setup.py build'          // For Python
                echo 'Build step (configure for your project)'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Uncomment the line that matches your project type
                // sh 'npm test'                       // For Node.js
                // sh 'mvn test'                       // For Maven
                // sh 'gradle test'                    // For Gradle
                // sh 'pytest'                         // For Python
                echo 'Test step (configure for your project)'
            }
        }
        
        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                // Add your code quality tools here
                // sh 'npm run lint'                   // For ESLint
                // sh 'sonar-scanner'                  // For SonarQube
                echo 'Code quality step (configure for your project)'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'  // Only deploy from main branch
            }
            steps {
                echo 'Deploying application...'
                // Add your deployment commands here
                // sh 'kubectl apply -f k8s/'         // For Kubernetes
                // sh 'docker build -t app:latest .'  // For Docker
                // sh 'npm run deploy'                // For other deployments
                echo 'Deploy step (configure for your project)'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            // Add notifications here
            // emailext body: 'Build succeeded!', subject: 'Jenkins Build Success', to: 'team@example.com'
        }
        failure {
            echo 'Pipeline failed!'
            // Add notifications here
            // emailext body: 'Build failed!', subject: 'Jenkins Build Failure', to: 'team@example.com'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}