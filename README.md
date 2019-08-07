# LoftSmartPostmanCollection

## About this project

This is newman project to run api tests using postman collections

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependiences , needed for this project

### `npm run api_tests`

Run api smoke tests 

## Reports

After tests runs newman generates html report in reports folder in the root derictory of the project

## Jenkins set up

1. Install Jenkins
2. Sign in Jenkins
3. Install next plugins:
    1. AnsiColor
    2. HTML Publisher
4. Set up utf-8 encoding for Jenkins. For example on Windows 10 do next steps:
    1. open (path to your jenkins)/jenkins.xml
    2. Set '-Dfile.encoding=UTF8' string in arguments
    ![alt text](https://miro.medium.com/max/700/1*hf4zWYy7XRansBHCJU3yEA.png)
5. Disable Content Security Policy in Jenkins:
    1. open (path to your jenkins)/jenkins.xml
    2. Set '-Dhudson.model.DirectoryBrowserSupport.CSP=' string in arguments
    ![alt text](https://sun9-8.userapi.com/c851220/v851220118/188860/rKx1tZz9A4E.jpg)
6. Restart Jenkins
7. Create new Jenkins job
    1. Choose new item
    2. Choose pipline and, set name and click ok
    3. In pipeline script section enter code below:
    ```javascript
    node {
        environment {
                LANG                ='en_US.UTF-8'
                LANGUAGE            ='en_US.UTF-8'
                LC_CTYPE            ='en_US.UTF-8'
                LC_NUMERIC          ='en_US.UTF-8'
                LC_TIME             ='en_US.UTF-8'
                LC_COLLATE          ='en_US.UTF-8'
                LC_MONETARY         ='en_US.UTF-8'
                LC_MESSAGES         ='en_US.UTF-8'
                LC_PAPER            ='en_US.UTF-8'
                LC_NAME             ='en_US.UTF-8'
                LC_ADDRESS          ='en_US.UTF-8'
                LC_TELEPHONE        ='en_US.UTF-8'
                LC_MEASUREMENT      ='en_US.UTF-8'
                LC_IDENTIFICATION   ='en_US.UTF-8'
                LC_ALL              ='en_US.UTF-8'
        }
        stage('Postman tests') {
            git 'https://github.com/ValeryPiniazikITechArt/LoftSmartPostmanCollection'
            bat 'npm install'
            try {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    bat 'npm run api_tests'   
                }
                currentBuild.result = 'SUCCESS'
            } catch (Exception ex) {
                currentBuild.result = 'FAILURE'
            }
        }
        junit 'reports/report.xml'
        archive (includes: 'pkg/*.gem')
        publishHTML (target: [
          allowMissing: false,
          alwaysLinkToLastBuild: false,
          keepAll: true,
          reportDir: 'reports',
          reportFiles: 'report.html',
          reportName: "Postman report"
        ])
    }
