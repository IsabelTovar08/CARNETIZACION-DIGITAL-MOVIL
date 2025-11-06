# Imagen base con Node 20 y herramientas para instalar JDK
FROM node:20-bullseye

# Instalar JDK 17 y dependencias
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip curl git gradle && \
    apt-get clean

# Configurar Android SDK
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

RUN mkdir -p $ANDROID_HOME/cmdline-tools && \
    cd $ANDROID_HOME/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O tools.zip && \
    unzip tools.zip && \
    rm tools.zip && \
    mkdir -p $ANDROID_HOME/cmdline-tools/latest && \
    mv cmdline-tools/* $ANDROID_HOME/cmdline-tools/latest/ && \
    yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses && \
    $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager \
      "platforms;android-34" \
      "build-tools;34.0.0" \
      "platform-tools"

# Directorio de trabajo
WORKDIR /app

# Copiar proyecto
COPY . .

# Permisos y compilación
RUN chmod +x android/gradlew && \
    npx yarn install && \
    cd android && \
    ./gradlew clean && \
    ./gradlew assembleRelease

# Mostrar APK generado
CMD ["bash", "-c", "ls -lh android/app/build/outputs/apk/release/"]
