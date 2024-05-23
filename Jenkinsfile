#!groovy

@Library("workflowlibs") _

pipeline {

    options {
        ansiColor colorMapName: 'XTerm'
        timestamps()
    }

    agent none

    environment {
        SAMUEL_chimeraendpoint = "https://chimera.secaas.live.eu.cld.nextgen.igrupobbva"
    }

    stages {

        stage('Checkout Global Library') {

            steps {

                script{

                    globalBootstrap {

                        libraryName   = "cellsworkflowlibs"
                        libraryBranch = "master"

                        entrypointParams = [
                            type: "cellsApp",
                            buildConfigs: [ config1: [config: "dev.js",
                                                build: "vulcanize"]
                                          ],
                        ]
                    }
                }
            }
        }
    }
}