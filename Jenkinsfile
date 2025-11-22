pipeline {
    agent any

    environment {
        K6_OUTPUT = "result.json"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-ssh-key',
                    url: 'https://github.com/peterthx/k6-perf-test.git'
            }
        }

        stage('Build & Deploy Application') {
            steps {
                sh '''
                    echo "Building application..."
                    # your build command
                    # npm install
                    # npm run build

                    echo "Deploying application..."
                    # your deploy command
                    # docker build -t app:latest .
                    # docker compose up -d
                    # kubectl apply -f deployment.yaml
                '''
            }
        }

        stage('Install k6 if missing') {
            steps {
                sh '''
                    if ! command -v k6 >/dev/null 2>&1; then
                        echo "Installing k6..."
                        sudo apt update
                        sudo apt install -y ca-certificates gnupg2
                        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A
                        echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
                        sudo apt update
                        sudo apt install -y k6
                    fi
                '''
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

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: '.',
                    reportFiles: 'k6-report.html',
                    reportName: 'K6 Performance Test Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'result.json, k6-report.html', allowEmptyArchive: true
        }
    }
}
