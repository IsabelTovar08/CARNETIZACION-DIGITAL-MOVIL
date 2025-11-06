/// <summary>
/// Jenkinsfile que usa un Dockerfile personalizado para construir
/// el APK de una app React Native (bare) con Gradle.
/// </summary>

pipeline {
    agent any

    environment {
        IMAGE_NAME = "react-native-apk"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('🧹 Limpiar y Checkout') {
            steps {
                echo 'Limpiando workspace y obteniendo código fuente...'
                deleteDir()
                checkout scm
            }
        }

        stage('🐳 Construir imagen de build') {
            steps {
                echo 'Construyendo imagen Docker que compila el APK...'
                sh '''
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -f Dockerfile.build .
                '''
            }
        }

        stage('🏗️ Ejecutar compilación dentro del contenedor') {
            steps {
                echo 'Ejecutando compilación de APK dentro del contenedor...'
                sh '''
                docker run --rm -v $PWD:/app ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('📦 Publicar artefacto') {
            steps {
                echo 'Publicando APK generada...'
                archiveArtifacts artifacts: 'android/app/build/outputs/apk/release/app-release.apk', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Compilación completada. APK y Docker listos.'
        }
        failure {
            echo '❌ Error durante la construcción.'
        }
    }
}
