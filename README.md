# Simple CRUD React App for Books 

This is a simple React App to Create, Read, Update and Delete books. For all these operations, it call a backend API developed in Python/Flask. 

You can find the source code of the backend app [here](https://github.com/carmel-wenga/python-flask-crud-api-for-book-library).

# Deploying the Application

## Using Docker
I have provided several docker files to deploy the application

### Server the application with NGINX

Here I used multi-stage build to optimize the docker image (image size dropping from 1.5Go to 77Mo), and I used nginx to serve the react application. The dockerfile used in this case is ```Dockerfile.nginx```

If using Git Bash, before building the image, set this variable:
```commandline
export MSYS_NO_PATHCONV=1
```
Build the image with the following command:
```commandline
docker build --file Dockerfile.nginx -t libexplorer:libex1 --build-arg PROTOCOL=http --build-arg HOST=localhost --build-arg PORT=80 --build-arg API_VERSION=/api/v1 .
```
Then run the docker image as follow:
```commandline
docker run -p 8081:80 libexplorer:libex1
```

### Push the image to Docker Hub
```commandline
docker tag libexplorer:libex1 carmelwenga/book-explorer:react.nginx-1.0
docker push carmelwenga/book-explorer:react.nginx-1.0
```
This first command create a tag for my local image ```libexplorer:libex1```. The second command push the tag to DockerHub 

## Using Docker-Compose

## Using Kubernetes

### Define manisfest files
Folder ```k8s``` contains the following configuration files:
* ```deployment.yaml```: create the frontend pod and expose port 3000,
* ```service.yaml```: expose the frondend pod as a service on port 80,
* ```ingress.yaml```: expose the frontend and the backend through an nginx ingress listening port 80, and redirecting traffic to the flask backend (```/api```) or the react frontend (everything that do not start with ```api```).

### Install/Configure nginx ingress controller
```commandline
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml
```

### Build the Docker Image used for the deployment of the frontend
I have set the environment variables useful the call the flask backend from the react frontend. Since the flask backend is accessible through the ingress, the environment variable will be:

```commandline
PROTOCOL=http 
HOST=localhost 
PORT=80
API_VERSION=/api/v1
```

If using Git Bash, before building the image, set this variable:
```commandline
export MSYS_NO_PATHCONV=1
```
Explanation: Git Bash converts paths that look like ```/api/v1``` into a Windows path like ```D:/Program Files/Git/api/v1```. To prevent path conversion, you can disable it before running the build with the above command.

Those values should be set as argument when building the image of the react frontend:

```commandline
docker build -t libexplorer:latest --build-arg PROTOCOL=http --build-arg HOST=localhost --build-arg PORT=80 --build-arg API_VERSION=/api/v1 .
```

These variable will help build the flask's backend URL as:
```javascript
const API_BASE_URL = `${API_SERVER.PROTOCOL}://${API_SERVER.HOST}:${API_SERVER.PORT}${API_SERVER.API_VERSION}`;
```

Result: ```API_BASE_URL=http://localhost:80/api/v1```

### Apply the manifest files inside the k8s cluster
This command will apply all the configuration in the k8s cluster.

```commandline
$ kubectl apply -f k8s/
```

### Launch the application
Deploy the [flask backend](https://github.com/carmel-wenga/python-flask-crud-api-for-book-library) first and go to ```localhost/books``` using your local browser.

### Note
I first used my local image in the deployment.yaml file. I have then set the ImagePullPolicy to "Never". Then I pushed the image to Dockerhub, try a second time with a remote image.


