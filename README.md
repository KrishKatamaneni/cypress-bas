# Cypress pipeline

This repository is a playground for Cypress on the gitlab pipeline. You will find different cypress tests here, ranging from a variety of applications SOSA, PDATA,PAG

Feel free to push your cypress scripts to the repo, to review them on the pipeline. Just make sure to push them on a different branch than the master one.

The pipeline will run everytime you push a change to the repo.

The cypress scripts should go under `cypress/integration`

### Quickstart for QA development

#### Requirements

1.  You need Docker to run Cypress:

    **Option A:** [Docker with Hyper-V ](https://docs.docker.com/get-docker/) 

    **Option B(recommended)** If your system is compatible install docker with a wsl2 sub-system, more details [here](https://docs.docker.com/docker-for-windows/wsl/) 
    > If you face any memory or CPU usage issue caused by the wsl2 sub-system make sure to limit the memory [as described here](https://medium.com/@lewwybogus/how-to-stop-wsl2-from-hogging-all-your-ram-with-docker-d7846b9c5b37). 

2. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 

   > **Important note for Windows users:** Since Docker containers run on a Linux environment, to avoid any line ending errors and incompatibilities issues. Make sure to set the CRLF to input with this command:
   >
   > `git config --global core.autocrlf input`

#### Steps

1. Clone the repository:
   ```
   git clone https://gitlab.buyandsell.gc.ca/qa/cypress-scripts.git
   ```

2. Build and start the docker containers with:

    ```
    cd cypress-scripts
    docker-compose up -d --build
    ```

3. You can access the desktop environement at: http://localhost:6901


### How to update a package

You can run this command to update a specific package:
```
docker-compose exec -T cypress bash -c "cd src && npm update yourPackage"
```
Don't forget to push your changes after
